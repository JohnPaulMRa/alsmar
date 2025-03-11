import React from "react";
import { Helmet } from "react-helmet";
import GestureLibrary from "@/components/gestures/GestureLibrary";

const GesturesPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Gesture Library | ASL Learning</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">ASL Gesture Library</h1>
        <GestureLibrary />
      </div>
    </div>
  );
};

export default GesturesPage;
