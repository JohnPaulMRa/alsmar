import React, { useState } from "react";
import GestureSearch from "./GestureSearch";
import GestureGrid from "./GestureGrid";
import GestureCard from "./GestureCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, TrendingUp, Star } from "lucide-react";

interface Gesture {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
}

interface GestureLibraryProps {
  gestures?: Gesture[];
  onGestureClick?: (id: string) => void;
  featuredGestures?: Gesture[];
  popularGestures?: Gesture[];
}

const GestureLibrary = ({
  gestures = [
    {
      id: "1",
      name: "Hello",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: true,
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
    {
      id: "4",
      name: "Family",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-family",
      category: "Relationships",
      difficulty: "intermediate" as const,
      isCompleted: false,
    },
    {
      id: "5",
      name: "Friend",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-friend",
      category: "Relationships",
      difficulty: "beginner" as const,
      isCompleted: true,
    },
    {
      id: "6",
      name: "Love",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-love",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "7",
      name: "Happy",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-happy",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: true,
    },
    {
      id: "8",
      name: "Sad",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-sad",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "9",
      name: "Conversation",
      imageUrl:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-conversation",
      category: "Advanced Concepts",
      difficulty: "advanced" as const,
      isCompleted: false,
    },
    {
      id: "10",
      name: "Goodbye",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-goodbye",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "11",
      name: "Help",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-help",
      category: "Common Phrases",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "12",
      name: "Sorry",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-sorry",
      category: "Common Phrases",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
  ],
  onGestureClick = (id) => console.log(`Gesture ${id} clicked`),
  featuredGestures = [
    {
      id: "1",
      name: "Hello",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: true,
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
    {
      id: "4",
      name: "Family",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-family",
      category: "Relationships",
      difficulty: "intermediate" as const,
      isCompleted: false,
    },
  ],
  popularGestures = [
    {
      id: "5",
      name: "Friend",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-friend",
      category: "Relationships",
      difficulty: "beginner" as const,
      isCompleted: true,
    },
    {
      id: "6",
      name: "Love",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-love",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "7",
      name: "Happy",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-happy",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: true,
    },
    {
      id: "8",
      name: "Sad",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-sad",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
  ],
}: GestureLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("all");

  // Handle search from GestureSearch component
  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  // Handle suggestion selection from GestureSearch component
  const handleSelectSuggestion = (suggestion: string) => {
    setSearchTerm(suggestion);
  };

  // Get unique gesture names for search suggestions
  const searchSuggestions = [
    ...new Set(gestures.map((gesture) => gesture.name)),
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white dark:bg-gray-900 p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ASL Gesture Library</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse, search, and learn American Sign Language gestures with our
          comprehensive collection.
        </p>
      </div>

      <div className="mb-8">
        <GestureSearch
          onSearch={handleSearch}
          onSelectSuggestion={handleSelectSuggestion}
          suggestions={searchSuggestions}
          placeholder="Search for ASL gestures..."
          className="mx-auto"
        />
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen size={16} />
            All Gestures
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Star size={16} />
            Featured
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <TrendingUp size={16} />
            Popular
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <GestureGrid
                gestures={gestures}
                onGestureClick={onGestureClick}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="text-yellow-500" size={20} />
                Featured Gestures
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredGestures.map((gesture) => (
                  <div key={gesture.id} className="flex justify-center">
                    <GestureCard
                      id={gesture.id}
                      name={gesture.name}
                      imageUrl={gesture.imageUrl}
                      category={gesture.category}
                      difficulty={gesture.difficulty}
                      isCompleted={gesture.isCompleted}
                      onClick={() => onGestureClick(gesture.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={20} />
                Popular Gestures
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {popularGestures.map((gesture) => (
                  <div key={gesture.id} className="flex justify-center">
                    <GestureCard
                      id={gesture.id}
                      name={gesture.name}
                      imageUrl={gesture.imageUrl}
                      category={gesture.category}
                      difficulty={gesture.difficulty}
                      isCompleted={gesture.isCompleted}
                      onClick={() => onGestureClick(gesture.id)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Learning Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Practice each gesture in front of a mirror to see your form</li>
          <li>Focus on hand shape, movement, and facial expressions</li>
          <li>
            Learn related gestures together to build your vocabulary faster
          </li>
          <li>Practice regularly with a friend for better retention</li>
        </ul>
      </div>
    </div>
  );
};

export default GestureLibrary;
