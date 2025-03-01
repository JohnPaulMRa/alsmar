import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Activity, Award, BookOpen } from "lucide-react";

interface ProgressOverviewProps {
  totalGestures?: number;
  completedGestures?: number;
  streakDays?: number;
  lastPracticed?: string;
  mostPracticedCategory?: string;
}

const ProgressOverview = ({
  totalGestures = 100,
  completedGestures = 42,
  streakDays = 7,
  lastPracticed = "Today",
  mostPracticedCategory = "Greetings",
}: ProgressOverviewProps) => {
  const completionPercentage = Math.round(
    (completedGestures / totalGestures) * 100,
  );

  const stats = [
    {
      title: "Completion",
      value: `${completionPercentage}%`,
      description: `${completedGestures}/${totalGestures} gestures learned`,
      icon: <BarChart className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Current Streak",
      value: streakDays,
      description: `${streakDays} days in a row`,
      icon: <Activity className="h-5 w-5 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Last Practiced",
      value: lastPracticed,
      description: "Keep up the good work!",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Most Practiced",
      value: mostPracticedCategory,
      description: "Your strongest category",
      icon: <Award className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900/20",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-6">Your Learning Progress</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Overall Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Progress value={completionPercentage} className="h-3" />
            </div>
            <span className="text-lg font-bold">{completionPercentage}%</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            You've learned {completedGestures} out of {totalGestures} ASL
            gestures
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;
