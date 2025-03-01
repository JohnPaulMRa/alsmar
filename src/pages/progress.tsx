import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressOverview from "@/components/progress/ProgressOverview";
import GestureStatusLists from "@/components/progress/GestureStatusLists";
import { Link } from "react-router-dom";

interface Gesture {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
}

const ProgressPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  // Mock data for the progress page
  const progressData = {
    totalGestures: 100,
    completedGestures: 42,
    streakDays: 7,
    lastPracticed: "Today",
    mostPracticedCategory: "Greetings",
  };

  // Mock completed and remaining gestures
  const completedGestures: Gesture[] = [
    {
      id: "1",
      name: "Hello",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
      category: "Greetings",
      difficulty: "beginner",
      isCompleted: true,
    },
    {
      id: "2",
      name: "Thank You",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-thankyou",
      category: "Greetings",
      difficulty: "beginner",
      isCompleted: true,
    },
    {
      id: "3",
      name: "Please",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-please",
      category: "Common Phrases",
      difficulty: "beginner",
      isCompleted: true,
    },
  ];

  const remainingGestures: Gesture[] = [
    {
      id: "4",
      name: "Goodbye",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-goodbye",
      category: "Greetings",
      difficulty: "beginner",
      isCompleted: false,
    },
    {
      id: "5",
      name: "Friend",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-friend",
      category: "Relationships",
      difficulty: "intermediate",
      isCompleted: false,
    },
    {
      id: "6",
      name: "Family",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-family",
      category: "Relationships",
      difficulty: "intermediate",
      isCompleted: false,
    },
    {
      id: "7",
      name: "Love",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-love",
      category: "Emotions",
      difficulty: "beginner",
      isCompleted: false,
    },
    {
      id: "8",
      name: "Help",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-help",
      category: "Common Phrases",
      difficulty: "beginner",
      isCompleted: false,
    },
  ];

  const handleGestureClick = (gesture: Gesture) => {
    console.log("Gesture clicked:", gesture);
    // In a real app, this would navigate to the gesture detail view
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    console.log("Filter changed to:", filter);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Helmet>
        <title>Your Progress | ASL Learning</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2 mb-4">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Learning Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your ASL learning journey and see how far you've come
          </p>
        </div>

        <div className="space-y-8">
          {/* Progress Overview Section */}
          <section>
            <ProgressOverview
              totalGestures={progressData.totalGestures}
              completedGestures={progressData.completedGestures}
              streakDays={progressData.streakDays}
              lastPracticed={progressData.lastPracticed}
              mostPracticedCategory={progressData.mostPracticedCategory}
            />
          </section>

          {/* Gesture Status Lists Section */}
          <section>
            <GestureStatusLists
              completedGestures={completedGestures}
              remainingGestures={remainingGestures}
              onGestureClick={handleGestureClick}
              onFilterChange={handleFilterChange}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
