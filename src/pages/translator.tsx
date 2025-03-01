import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CameraTranslator from "@/components/translator/CameraTranslator";

const TranslatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>ASL Translator | ASL Learning</title>
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

        <CameraTranslator />
      </div>
    </div>
  );
};

export default TranslatorPage;
