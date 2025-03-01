import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Video, Save, Trash, Copy, Settings, Info } from "lucide-react";

interface CameraTranslatorProps {
  onSaveTranslation?: (text: string) => void;
}

const CameraTranslator = ({
  onSaveTranslation = () => {},
}: CameraTranslatorProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [translatedText, setTranslatedText] = useState("");
  const [savedTranslations, setSavedTranslations] = useState<string[]>([]);
  const [captionSize, setCaptionSize] = useState("medium");
  const [showInfo, setShowInfo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load saved translations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("asl-translations");
    if (saved) {
      setSavedTranslations(JSON.parse(saved));
    }
  }, []);

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

  // Start/stop recording
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording/translation
      setIsRecording(true);
      // Simulate ASL recognition with random words
      simulateTranslation();
    } else {
      // Stop recording/translation
      setIsRecording(false);
      clearTimeout(translationTimeoutRef.current);
    }
  };

  // Cleanup function to stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Simulate ASL translation (in a real app, this would be ML-based)
  const translationTimeoutRef = useRef<NodeJS.Timeout>();
  const simulateTranslation = () => {
    if (!isRecording) return;

    const aslWords = [
      "Hello",
      "Thank you",
      "Please",
      "Sorry",
      "Yes",
      "No",
      "Help",
      "Friend",
      "Family",
      "Love",
      "Happy",
      "Sad",
    ];

    const randomWord = aslWords[Math.floor(Math.random() * aslWords.length)];
    setTranslatedText((prev) => (prev ? `${prev} ${randomWord}` : randomWord));

    // Continue simulation while recording
    translationTimeoutRef.current = setTimeout(simulateTranslation, 2000);
  };

  // Save current translation to localStorage
  const saveTranslation = () => {
    if (translatedText) {
      const updatedTranslations = [...savedTranslations, translatedText];
      setSavedTranslations(updatedTranslations);
      localStorage.setItem(
        "asl-translations",
        JSON.stringify(updatedTranslations),
      );
      onSaveTranslation(translatedText);
      setTranslatedText("");
    }
  };

  // Delete a saved translation
  const deleteTranslation = (index: number) => {
    const updatedTranslations = savedTranslations.filter((_, i) => i !== index);
    setSavedTranslations(updatedTranslations);
    localStorage.setItem(
      "asl-translations",
      JSON.stringify(updatedTranslations),
    );
  };

  // Copy translation to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  // Caption size classes
  const captionSizeClasses = {
    small: "text-lg",
    medium: "text-2xl",
    large: "text-4xl",
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white dark:bg-gray-900 p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ASL Translator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Use your camera to translate American Sign Language in real-time.
        </p>
      </div>

      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="camera" className="flex items-center gap-2">
            <Camera size={16} />
            Camera
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Save size={16} />
            Saved Translations
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="mt-0">
          <Card>
            <CardContent className="p-6">
              {hasPermission === null ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <Button onClick={setupCamera} size="lg" className="mb-4">
                    <Camera className="mr-2 h-5 w-5" />
                    Enable Camera
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                    Camera access is required for ASL translation. Your privacy
                    is important - video is processed locally and not stored.
                  </p>
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
                <div className="space-y-6">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Captions overlay */}
                    {translatedText && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white text-center">
                        <p
                          className={`font-semibold ${captionSizeClasses[captionSize as keyof typeof captionSizeClasses]}`}
                        >
                          {translatedText}
                        </p>
                      </div>
                    )}

                    {/* Info overlay */}
                    {showInfo && !isRecording && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
                        <div>
                          <Info size={48} className="mx-auto mb-4 opacity-70" />
                          <p className="text-xl mb-2">Ready to translate ASL</p>
                          <p className="text-sm opacity-80 max-w-md mx-auto">
                            Position yourself in frame and press Start
                            Translation to begin.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <Button
                      onClick={toggleRecording}
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      className="flex-1"
                    >
                      {isRecording ? (
                        <>
                          <Video className="mr-2 h-5 w-5" />
                          Stop Translation
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-5 w-5" />
                          Start Translation
                        </>
                      )}
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setTranslatedText("")}
                        variant="outline"
                        disabled={!translatedText}
                      >
                        <Trash className="h-5 w-5" />
                      </Button>
                      <Button
                        onClick={saveTranslation}
                        variant="outline"
                        disabled={!translatedText}
                      >
                        <Save className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Saved Translations</CardTitle>
            </CardHeader>
            <CardContent>
              {savedTranslations.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Save className="mx-auto h-12 w-12 mb-4 opacity-30" />
                  <p>No saved translations yet</p>
                  <p className="text-sm mt-2">
                    Translations you save will appear here
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {savedTranslations.map((translation, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-medium">{translation}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(translation)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTranslation(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Translator Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Caption Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="caption-size">Caption Size</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          variant={
                            captionSize === "small" ? "default" : "outline"
                          }
                          onClick={() => setCaptionSize("small")}
                        >
                          Small
                        </Button>
                        <Button
                          variant={
                            captionSize === "medium" ? "default" : "outline"
                          }
                          onClick={() => setCaptionSize("medium")}
                        >
                          Medium
                        </Button>
                        <Button
                          variant={
                            captionSize === "large" ? "default" : "outline"
                          }
                          onClick={() => setCaptionSize("large")}
                        >
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="show-info">
                          Show Camera Instructions
                        </Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Display helpful overlay when not translating
                        </p>
                      </div>
                      <Switch
                        id="show-info"
                        checked={showInfo}
                        onCheckedChange={setShowInfo}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Privacy</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <Badge variant="outline" className="mb-2">
                        Local Processing
                      </Badge>
                      <br />
                      All video processing happens directly in your browser. No
                      video data is sent to any server or stored permanently.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CameraTranslator;
