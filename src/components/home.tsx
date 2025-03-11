import React, { useState } from "react";
import { Link } from "react-router-dom";
import GestureDetail from "./gestures/GestureDetail";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import ASLHero from "./home/ASLHero";
import FeatureSection from "./home/FeatureSection";
import TranslatorPreview from "./home/TranslatorPreview";

const Home = () => {
  const [selectedGestureId, setSelectedGestureId] = useState<string | null>(
    null,
  );
  const [showGestureDetail, setShowGestureDetail] = useState(false);

  // Mock data for featured gestures
  const featuredGestures = [
    {
      id: "1",
      name: "Hello",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "2",
      name: "Thank You",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-thankyou",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "3",
      name: "Please",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-please",
      category: "Common Phrases",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
  ];

  // Mock data for selected gesture
  const selectedGesture = {
    id: "1",
    name: "Hello",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
    category: "Greetings",
    difficulty: "beginner" as const,
    isCompleted: false,
    description:
      "The sign for 'Hello' is a friendly greeting gesture in American Sign Language. It's one of the first signs most people learn.",
    instructions: [
      "Start with your hand near your forehead, palm facing outward",
      "Move your hand outward and away from your body in a slight arc",
      "Smile while making the gesture to convey friendliness",
      "Keep your other hand relaxed at your side",
    ],
    tips: [
      "Practice in front of a mirror to see your hand position",
      "The movement should be smooth and natural",
      "This gesture is similar to a military salute but more relaxed",
    ],
    relatedGestures: [
      { id: "2", name: "Goodbye" },
      { id: "3", name: "Thank You" },
      { id: "4", name: "Please" },
    ],
  };

  const handleGestureClick = (id: string) => {
    setSelectedGestureId(id);
    setShowGestureDetail(true);
  };

  const handleCloseGestureDetail = () => {
    setShowGestureDetail(false);
  };

  const handleMarkAsLearned = (id: string) => {
    console.log(`Marked gesture ${id} as learned`);
    // In a real app, this would update the user's progress in localStorage or a database
    setShowGestureDetail(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <ASLHero />

      {/* Featured Gestures Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Featured Gestures
            </h2>
            <Link to="/gestures">
              <Button variant="ghost" className="flex items-center gap-2">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredGestures.map((gesture) => (
              <Card
                key={gesture.id}
                className="cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
                onClick={() => handleGestureClick(gesture.id)}
              >
                <div className="h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={gesture.imageUrl}
                    alt={`ASL sign for ${gesture.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{gesture.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {gesture.category}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection />

      {/* Translator Preview Section */}
      <TranslatorPreview />

      {/* Get Started Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Learning ASL?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners mastering American Sign Language through
            our interactive platform.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Gesture Detail Modal */}
      {showGestureDetail && (
        <GestureDetail
          {...selectedGesture}
          onClose={handleCloseGestureDetail}
          onMarkAsLearned={handleMarkAsLearned}
        />
      )}
    </div>
  );
};

export default Home;
