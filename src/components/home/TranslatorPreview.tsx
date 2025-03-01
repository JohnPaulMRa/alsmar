import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hand, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const TranslatorPreview = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Real-time ASL Translation
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Our advanced camera-based translation system detects your hand
              gestures and instantly converts them to text. Perfect for practice
              or real-world communication.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Accurate recognition of common ASL gestures
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Save and review your translations
                </span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Works entirely in your browser - no data sent to servers
                </span>
              </li>
            </ul>
            <Link to="/translator">
              <Button className="flex items-center gap-2">
                Try Translator Now
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="md:w-1/2">
            <Card className="overflow-hidden border-2 border-blue-100 dark:border-blue-900">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/30">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  ASL Translator
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-black">
                  <img
                    src="https://images.unsplash.com/photo-1567595747888-c0e777da9e1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                    alt="Hand gesture recognition"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">Hello</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-green-500">
                            Confidence: 95%
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-white border-white hover:bg-white/20"
                      >
                        <Hand className="h-4 w-4 mr-1" />
                        Detect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TranslatorPreview;
