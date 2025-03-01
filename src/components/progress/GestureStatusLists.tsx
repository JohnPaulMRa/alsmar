import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, CheckCircle, Clock } from "lucide-react";
import GestureCard from "../gestures/GestureCard";

interface Gesture {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  isCompleted: boolean;
}

interface GestureStatusListsProps {
  completedGestures?: Gesture[];
  remainingGestures?: Gesture[];
  onGestureClick?: (gesture: Gesture) => void;
  onFilterChange?: (filter: string) => void;
}

const GestureStatusLists = ({
  completedGestures = [
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
      isCompleted: true,
    },
    {
      id: "3",
      name: "Please",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-please",
      category: "Common Phrases",
      difficulty: "beginner" as const,
      isCompleted: true,
    },
  ],
  remainingGestures = [
    {
      id: "4",
      name: "Goodbye",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-goodbye",
      category: "Greetings",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "5",
      name: "Friend",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-friend",
      category: "Relationships",
      difficulty: "intermediate" as const,
      isCompleted: false,
    },
    {
      id: "6",
      name: "Family",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-family",
      category: "Relationships",
      difficulty: "intermediate" as const,
      isCompleted: false,
    },
    {
      id: "7",
      name: "Love",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-love",
      category: "Emotions",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
    {
      id: "8",
      name: "Help",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-help",
      category: "Common Phrases",
      difficulty: "beginner" as const,
      isCompleted: false,
    },
  ],
  onGestureClick = () => {},
  onFilterChange = () => {},
}: GestureStatusListsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("remaining");

  // Filter gestures based on search query
  const filteredCompleted = completedGestures.filter((gesture) =>
    gesture.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredRemaining = remainingGestures.filter((gesture) =>
    gesture.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          {activeTab === "completed" ? (
            <>
              <CheckCircle className="text-green-500" />
              Completed Gestures
            </>
          ) : (
            <>
              <Clock className="text-blue-500" />
              Gestures To Learn
            </>
          )}
        </h2>

        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search gestures..."
            className="pl-10 pr-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="remaining"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="remaining" className="flex items-center gap-2">
            <Clock size={16} />
            To Learn ({remainingGestures.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle size={16} />
            Completed ({completedGestures.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="remaining" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredRemaining.length} gestures remaining to learn
            </p>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
          </div>

          {filteredRemaining.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRemaining.map((gesture) => (
                <GestureCard
                  key={gesture.id}
                  id={gesture.id}
                  name={gesture.name}
                  imageUrl={gesture.imageUrl}
                  category={gesture.category}
                  difficulty={gesture.difficulty}
                  isCompleted={gesture.isCompleted}
                  onClick={() => onGestureClick(gesture)}
                />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No gestures found matching your search.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredCompleted.length} gestures completed
            </p>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filter
            </Button>
          </div>

          {filteredCompleted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCompleted.map((gesture) => (
                <GestureCard
                  key={gesture.id}
                  id={gesture.id}
                  name={gesture.name}
                  imageUrl={gesture.imageUrl}
                  category={gesture.category}
                  difficulty={gesture.difficulty}
                  isCompleted={gesture.isCompleted}
                  onClick={() => onGestureClick(gesture)}
                />
              ))}
            </div>
          ) : (
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  No completed gestures found matching your search.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestureStatusLists;
