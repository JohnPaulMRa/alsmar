import React from "react";
import { Helmet } from "react-helmet";
import ASLCameraTranslator from "@/components/translator/ASLCameraTranslator";

const TranslatorPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>ASL Translator | ASL Learning</title>
      </Helmet>

      <ASLCameraTranslator />
    </div>
  );
};

export default TranslatorPage;
