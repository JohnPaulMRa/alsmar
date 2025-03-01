import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import GestureLibrary from "@/components/gestures/GestureLibrary";

const GesturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Gesture Library | ASL Learning</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2 mb-4">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        <GestureLibrary />
      </div>
    </div>
  );
};

export default GesturesPage;
