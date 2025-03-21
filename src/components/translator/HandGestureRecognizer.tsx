import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Video,
  Save,
  Trash,
  Copy,
  RotateCcw,
  Hand,
} from "lucide-react";

interface HandGestureRecognizerProps {
  onGestureDetected?: (gesture: string) => void;
  onSaveGesture?: (gesture: string) => void;
}

const HandGestureRecognizer = ({
  onGestureDetected = () => {},
  onSaveGesture = () => {},
}: HandGestureRecognizerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedGesture, setDetectedGesture] = useState<string>("");
  const [confidence, setConfidence] = useState(0);
  const [recentGestures, setRecentGestures] = useState<string[]>([]);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Request camera permission and setup video stream
  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasPermission(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  // Start/stop gesture recognition
  const toggleRecognition = () => {
    if (!isActive) {
      startRecognition();
    } else {
      stopRecognition();
    }
  };

  // Start gesture recognition
  const startRecognition = () => {
    if (!hasPermission) return;

    setIsActive(true);
    if (canvasRef.current && videoRef.current) {
      // In a real implementation, this would initialize a hand tracking model
      // For demo purposes, we'll simulate gesture detection
      simulateGestureDetection();
    }
  };

  // Stop gesture recognition
  const stopRecognition = () => {
    setIsActive(false);
    setDetectedGesture("");
    setConfidence(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  // Cleanup function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      stopRecognition();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate hand gesture detection
  const simulateGestureDetection = () => {
    if (!isActive) return;

    const gestures = [
      "Hello",
      "Thank you",
      "Yes",
      "No",
      "Please",
      "Sorry",
      "Help",
      "Friend",
      "Family",
      "Love",
      "Happy",
      "Sad",
    ];

    // Randomly change gesture every few seconds
    const changeGesture = () => {
      const randomGesture =
        gestures[Math.floor(Math.random() * gestures.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%

      setDetectedGesture(randomGesture);
      setConfidence(randomConfidence);
      onGestureDetected(randomGesture);

      // Add to recent gestures list
      setRecentGestures((prev) => {
        const updated = [randomGesture, ...prev];
        return updated.slice(0, 5); // Keep only the 5 most recent
      });
    };

    // Initial detection
    changeGesture();

    // Simulate continuous detection
    const interval = setInterval(() => {
      if (isActive) {
        changeGesture();
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  // Start calibration process
  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationProgress(0);

    // Simulate calibration process
    const calibrationInterval = setInterval(() => {
      setCalibrationProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(calibrationInterval);
          setIsCalibrating(false);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  // Save detected gesture
  const saveGesture = () => {
    if (detectedGesture) {
      onSaveGesture(detectedGesture);
      // Could add a toast notification here
    }
  };

  // Get confidence level color
  const getConfidenceColor = () => {
    if (confidence >= 90) return "text-green-500";
    if (confidence >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
      <Tabs defaultValue="recognize" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="recognize" className="flex items-center gap-2">
            <Hand size={16} />
            Recognize Gestures
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Save size={16} />
            Recent Detections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recognize" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Hand Gesture Recognition</span>
                <Badge
                  variant="outline"
                  className={
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {hasPermission === null ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mb-6">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <div className="relative w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden border-2 border-white dark:border-gray-500">
                          <svg
                            viewBox="0 0 24 24"
                            className="absolute inset-0 w-full h-full text-gray-500 dark:text-gray-400 p-2"
                          >
                            <path
                              fill="currentColor"
                              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/20 p-2 flex items-center justify-center">
                        <div className="flex items-center justify-center gap-4 bg-gray-300 dark:bg-gray-600 rounded-full py-1 px-4">
                          <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 text-gray-600 dark:text-gray-400"
                          >
                            <path
                              fill="currentColor"
                              d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 flex flex-col items-center justify-center aspect-video relative">
                      <div className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
                        ASL Translation
                      </div>
                      <div className="flex-grow w-full flex items-center justify-center">
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                          Hello
                        </div>
                      </div>
                      <div className="mt-auto w-full flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Confidence: 95%
                        </div>
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5 text-gray-600 dark:text-gray-400"
                        >
                          <path
                            fill="currentColor"
                            d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={setupCamera}
                    size="lg"
                    className="mb-4 bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Enable Camera to See You
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Camera access is required for hand gesture recognition. Your
                    privacy is important - all processing happens locally.
                  </p>
                </div>
              ) : hasPermission === false ? (
                <div className="text-center p-8">
                  <p className="text-red-500 mb-4">Camera permission denied</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please enable camera access in your browser settings to use
                    the gesture recognizer.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />

                    {/* Detected gesture overlay */}
                    {isActive && detectedGesture && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-2xl font-bold">
                              {detectedGesture}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className={`text-sm ${getConfidenceColor()}`}
                              >
                                Confidence: {confidence}%
                              </span>
                              <Progress
                                value={confidence}
                                className="h-1 w-24"
                              />
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={saveGesture}
                            className="text-white border-white hover:bg-white/20"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Calibration overlay */}
                    {isCalibrating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                        <div className="text-center p-6 max-w-md">
                          <p className="text-xl mb-4">Calibrating...</p>
                          <Progress
                            value={calibrationProgress}
                            className="h-2 mb-2"
                          />
                          <p className="text-sm opacity-80">
                            Please hold your hand in view of the camera
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <Button
                      onClick={toggleRecognition}
                      size="lg"
                      variant={isActive ? "destructive" : "default"}
                      className="flex-1"
                      disabled={isCalibrating}
                    >
                      {isActive ? (
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

                    <div className="flex gap-2">
                      <Button
                        onClick={startCalibration}
                        variant="outline"
                        disabled={isCalibrating || !hasPermission}
                      >
                        <RotateCcw className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={saveGesture}
                        variant="outline"
                        disabled={!detectedGesture || !isActive}
                      >
                        <Save className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {isActive && (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
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
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSaveGesture(gesture)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(gesture)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
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

export default HandGestureRecognizer;
