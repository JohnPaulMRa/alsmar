import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Video, Save, Hand, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ASLCameraTranslator = () => {
  const [activeTab, setActiveTab] = useState("recognize");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [recentGestures, setRecentGestures] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Request camera permission and setup video stream
  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Camera access is required for ASL gesture recognition.");
      setHasPermission(false);
    }
  };

  // Start gesture recognition
  const startRecognition = () => {
    setIsRecognizing(true);
    simulateGestureDetection();
  };

  // Stop gesture recognition
  const stopRecognition = () => {
    setIsRecognizing(false);
    clearTimeout(recognitionTimeoutRef.current);
  };

  // Cleanup function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      clearTimeout(recognitionTimeoutRef.current);
    };
  }, []);

  // Simulate gesture detection (in a real app, this would use ML model)
  const recognitionTimeoutRef = useRef<NodeJS.Timeout>();
  const simulateGestureDetection = () => {
    if (!isRecognizing) return;

    const gestures = [
      "Hello",
      "Thank you",
      "Please",
      "Yes",
      "No",
      "Help",
      "Friend",
      "Family",
      "Love",
    ];

    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    const randomConfidence = Math.floor(Math.random() * 15) + 85; // 85-100%

    setDetectedGesture(randomGesture);
    setConfidence(randomConfidence);

    // Add to recent gestures
    setRecentGestures((prev) => {
      const updated = [randomGesture, ...prev];
      return updated.slice(0, 5); // Keep only the 5 most recent
    });

    // Continue detection while recognizing
    recognitionTimeoutRef.current = setTimeout(simulateGestureDetection, 3000);
  };

  // Play text-to-speech for the detected gesture
  const speakGesture = () => {
    if (detectedGesture && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(detectedGesture);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white dark:bg-gray-900 p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">ASL Camera Translator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use your camera to translate American Sign Language gestures in
          real-time.
        </p>
      </div>

      <Tabs defaultValue="recognize" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="recognize" className="flex items-center gap-2">
            <Hand size={16} />
            Recognize Gestures
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Save size={16} />
            Recent Detections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recognize">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Hand Gesture Recognition</span>
                <Badge
                  variant="outline"
                  className={
                    isRecognizing
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {isRecognizing ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasPermission === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Camera Preview Placeholder */}
                  <div className="camera-wrapper bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex flex-col items-center justify-center p-6 relative">
                    <video
                      id="aslCamera"
                      autoPlay
                      playsInline
                      style={{
                        width: "100%",
                        borderRadius: "12px",
                        display: "none",
                      }}
                      ref={videoRef}
                    ></video>
                    <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full py-1 px-4 flex items-center gap-2">
                        <Camera className="h-4 w-4 text-gray-500" />
                        <div className="h-4 w-[1px] bg-gray-400"></div>
                        <Volume2 className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Translation Preview Placeholder */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex flex-col p-6">
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
                      ASL Translation
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-3xl font-bold text-gray-400 dark:text-gray-500">
                        Hello
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Confidence: 95%</p>
                      <Volume2 className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex flex-col items-center">
                    <Button
                      onClick={() => {
                        setupCamera();
                        if (videoRef.current) {
                          videoRef.current.style.display = "block";
                          const placeholder =
                            videoRef.current.parentElement?.querySelector(
                              ".w-24",
                            );
                          if (placeholder) placeholder.style.display = "none";
                        }
                      }}
                      size="lg"
                      className="mb-4 bg-[#0f172a] text-white font-bold"
                    >
                      <Camera className="mr-2 h-5 w-5" />
                      📷 Enable Camera to See You
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                      Camera access is required for hand gesture recognition.
                      Your privacy is important - all processing happens
                      locally.
                    </p>
                  </div>
                </div>
              ) : hasPermission === false ? (
                <div className="text-center p-8">
                  <p className="text-red-500 mb-4">Camera permission denied</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please enable camera access in your browser settings to use
                    the ASL translator.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Live Camera Feed */}
                  <div className="camera-wrapper relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: "100%", borderRadius: "12px" }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Translation Display */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg aspect-video flex flex-col p-6">
                    <p className="text-gray-700 dark:text-gray-300 text-center mb-4 font-medium">
                      ASL Translation
                    </p>
                    <div className="flex-1 flex items-center justify-center">
                      <p className="text-3xl font-bold">
                        {isRecognizing
                          ? detectedGesture || "Waiting..."
                          : "Start recognition"}
                      </p>
                    </div>
                    {isRecognizing && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Confidence: {confidence}%
                          </p>
                          <Progress
                            value={confidence}
                            className="h-1 w-32 mt-1"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={speakGesture}
                          disabled={!detectedGesture}
                        >
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                      <Button
                        onClick={
                          isRecognizing ? stopRecognition : startRecognition
                        }
                        size="lg"
                        variant={isRecognizing ? "destructive" : "default"}
                        className="flex-1"
                      >
                        {isRecognizing ? (
                          <>
                            <Video className="mr-2 h-5 w-5" />
                            Stop Recognition
                          </>
                        ) : (
                          <>
                            <Hand className="mr-2 h-5 w-5" />
                            Start Recognition
                          </>
                        )}
                      </Button>
                    </div>

                    {isRecognizing && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">
                          Tips for Better Recognition
                        </h3>
                        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
                          <li>Ensure good lighting on your hands</li>
                          <li>Keep your hand in the center of the frame</li>
                          <li>Make clear, deliberate gestures</li>
                          <li>Try to avoid busy backgrounds</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Detections</CardTitle>
            </CardHeader>
            <CardContent>
              {recentGestures.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Hand className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p>No gestures detected yet</p>
                  <p className="text-sm mt-2">
                    Start recognition to detect hand gestures
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {recentGestures.map((gesture, index) => (
                    <li
                      key={index}
                      className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <Hand className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium">{gesture}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if ("speechSynthesis" in window) {
                            const utterance = new SpeechSynthesisUtterance(
                              gesture,
                            );
                            window.speechSynthesis.speak(utterance);
                          }
                        }}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ASLCameraTranslator;
