import React, { useState } from "react";
import GestureCard from "./GestureCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

interface Gesture {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
}

interface GestureGridProps {
  gestures?: Gesture[];
  onGestureClick?: (id: string) => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const GestureGrid = ({
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
  ],
  onGestureClick = (id) => console.log(`Gesture ${id} clicked`),
  searchTerm = "",
  onSearchChange = () => {},
  selectedCategory = "All",
  onCategoryChange = () => {},
}: GestureGridProps) => {
  // Extract unique categories from gestures
  const categories = [
    "All",
    ...new Set(gestures.map((gesture) => gesture.category)),
  ];

  // Filter gestures based on search term and selected category
  const filteredGestures = gestures.filter((gesture) => {
    const matchesSearch = gesture.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || gesture.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search gestures..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <span className="text-sm text-gray-500">Filter by:</span>
          <Tabs
            defaultValue={selectedCategory}
            onValueChange={onCategoryChange}
            className="w-full md:w-auto"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:flex">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredGestures.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-xl text-gray-500 mb-2">No gestures found</p>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGestures.map((gesture) => (
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
      )}
    </div>
  );
};

export default GestureGrid;
