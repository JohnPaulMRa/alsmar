import React from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

interface ASLHeroProps {
  onStartTranslation?: () => void;
}

const ASLHero = ({ onStartTranslation = () => {} }: ASLHeroProps) => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learn American Sign Language{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Interactively
            </span>
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Master ASL gestures through our intuitive learning platform with
            real-time translation. Track your progress and build your signing
            vocabulary at your own pace.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/translator">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Camera className="mr-2 h-5 w-5" />
                Start ASL Translation
              </Button>
            </Link>
            <Link to="/gestures">
              <Button size="lg" variant="outline">
                Browse Gestures
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1531951634065-2def7c9b465a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            alt="Person using sign language"
            className="rounded-lg shadow-xl max-w-full h-auto max-h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ASLHero;
