import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  BookOpen,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Play,
  Pause,
} from "lucide-react";
import { motion } from "framer-motion";

interface GestureDetailProps {
  id?: string;
  name?: string;
  imageUrl?: string;
  videoUrl?: string;
  animationUrl?: string;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  isCompleted?: boolean;
  description?: string;
  instructions?: string[];
  tips?: string[];
  relatedGestures?: Array<{ id: string; name: string }>;
  onClose?: () => void;
  onMarkAsLearned?: (id: string) => void;
}

const GestureDetail = ({
  id = "1",
  name = "Hello",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
  videoUrl = "https://example.com/videos/hello.mp4",
  animationUrl = "https://example.com/animations/hello.gif",
  category = "Greetings",
  difficulty = "beginner",
  isCompleted = false,
  description = "The sign for 'Hello' is a friendly greeting gesture in American Sign Language. It's one of the first signs most people learn.",
  instructions = [
    "Start with your hand near your forehead, palm facing outward",
    "Move your hand outward and away from your body in a slight arc",
    "Smile while making the gesture to convey friendliness",
    "Keep your other hand relaxed at your side",
  ],
  tips = [
    "Practice in front of a mirror to see your hand position",
    "The movement should be smooth and natural",
    "This gesture is similar to a military salute but more relaxed",
  ],
  relatedGestures = [
    { id: "2", name: "Goodbye" },
    { id: "3", name: "Thank You" },
    { id: "4", name: "Please" },
  ],
  onClose = () => {},
  onMarkAsLearned = () => {},
}: GestureDetailProps) => {
  const [activeTab, setActiveTab] = useState("learn");
  const [isPlaying, setIsPlaying] = useState(false);
  const [practiceProgress, setPracticeProgress] = useState(0);

  // Map difficulty to appropriate colors
  const difficultyColor = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control video playback
  };

  const handleMarkAsLearned = () => {
    onMarkAsLearned(id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto bg-white dark:bg-gray-900">
      <Card className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  Learned
                </Badge>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAsLearned}
                  className="flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  Mark as Learned
                </Button>
              )}
            </div>
          </div>
        </div>

        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">{name}</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {category}
              </p>
            </div>
            <Badge variant="secondary" className={difficultyColor[difficulty]}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="learn" className="p-6 pt-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Demonstration</h3>
                <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`ASL sign for ${name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                      onClick={togglePlayback}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <ol className="space-y-2 list-decimal list-inside text-gray-700 dark:text-gray-300">
                  {instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tips</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Related Gestures</h3>
              <div className="flex flex-wrap gap-2">
                {relatedGestures.map((gesture) => (
                  <Button
                    key={gesture.id}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    {gesture.name}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="p-6 pt-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Practice Mode</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Practice the gesture by following along with the animation. Use
                the controls below to track your progress.
              </p>

              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-6">
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  animate={{ opacity: isPlaying ? [0.8, 1, 0.8] : 1 }}
                  transition={{ repeat: isPlaying ? Infinity : 0, duration: 2 }}
                >
                  <img
                    src={animationUrl || imageUrl}
                    alt={`ASL sign for ${name} animation`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                    onClick={togglePlayback}
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6" />
                    ) : (
                      <Play className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Your Progress</h4>
                  <span className="text-sm text-gray-500">
                    {practiceProgress}%
                  </span>
                </div>
                <Progress value={practiceProgress} className="h-2" />
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    setPracticeProgress(Math.max(0, practiceProgress - 10))
                  }
                >
                  <ThumbsDown className="h-4 w-4" />
                  Needs Practice
                </Button>
                <Button
                  className="flex items-center gap-2"
                  onClick={() =>
                    setPracticeProgress(Math.min(100, practiceProgress + 20))
                  }
                >
                  <ThumbsUp className="h-4 w-4" />
                  Got It!
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <CardContent className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            {!isCompleted && (
              <Button onClick={handleMarkAsLearned}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Learned
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestureDetail;
