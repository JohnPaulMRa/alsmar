import React, { useState } from "react";
import HandGestureRecognizer from "./HandGestureRecognizer";

function CameraTranslator() {
  const [savedTranslations, setSavedTranslations] = useState([]);

  const handleSaveGesture = (gesture) => {
    setSavedTranslations((prev) => [
      ...prev,
      {
        text: gesture,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ASL Camera Translator</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Use your camera to translate American Sign Language gestures in
        real-time.
      </p>

      <HandGestureRecognizer onSaveGesture={handleSaveGesture} />

      {savedTranslations.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Saved Translations</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {savedTranslations.map((item, index) => (
                <li
                  key={index}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() =>
                      setSavedTranslations((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CameraTranslator;
