import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";

const LoginPage = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("asl-current-user");
    if (storedUser) {
      navigate("/");
    }
  }, [navigate]);

  const handleAuthSuccess = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Helmet>
        <title>
          {authMode === "signin" ? "Sign In" : "Sign Up"} | ASL Learning
        </title>
      </Helmet>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            ASL
          </div>
          <h1 className="text-3xl font-bold">
            {authMode === "signin" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {authMode === "signin"
              ? "Sign in to continue your ASL learning journey"
              : "Join our community of ASL learners today"}
          </p>
        </div>

        {authMode === "signin" ? (
          <SignIn
            onLogin={handleAuthSuccess}
            onSwitchToSignUp={() => setAuthMode("signup")}
          />
        ) : (
          <SignUp
            onSignup={handleAuthSuccess}
            onSwitchToSignIn={() => setAuthMode("signin")}
          />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
