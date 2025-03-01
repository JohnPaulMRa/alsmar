import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface GestureCardProps {
  id?: string;
  name?: string;
  imageUrl?: string;
  category?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  isCompleted?: boolean;
  onClick?: () => void;
}

const GestureCard = ({
  id = "1",
  name = "Hello",
  imageUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=asl-hello",
  category = "Greetings",
  difficulty = "beginner",
  isCompleted = false,
  onClick = () => {},
}: GestureCardProps) => {
  // Map difficulty to appropriate colors
  const difficultyColor = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
  };

  return (
    <Card
      className="w-full max-w-[320px] h-[280px] overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer bg-white dark:bg-gray-800"
      onClick={onClick}
    >
      <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={imageUrl}
          alt={`ASL sign for ${name}`}
          className="w-full h-full object-cover"
        />
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <CheckCircle size={16} />
          </div>
        )}
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{name}</CardTitle>
          <Badge variant="secondary" className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{category}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full">
          {isCompleted ? "Review Again" : "Learn Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GestureCard;
