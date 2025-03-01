import React from "react";
import { BookOpen, Award, Camera } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Real-time Translation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Use your device's camera to detect and translate ASL gestures into
              text in real-time with our AI-powered recognition system.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Comprehensive Library
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access our extensive collection of ASL gestures with detailed
              instructions, animations, and practice exercises.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your learning journey with visual progress indicators,
              saved translations, and achievement milestones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
