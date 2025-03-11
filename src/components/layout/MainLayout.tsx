import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const handleLoginClick = () => {
    setAuthMode("signin");
    setIsAuthDialogOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthDialogOpen(false);
    // Force a re-render to update the profile dropdown
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Navbar onLoginClick={handleLoginClick} />

      {/* Main content */}
      <div id="content-wrapper" className="container mx-auto px-4 py-8">
        <Outlet />
      </div>

      {/* Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {authMode === "signin" ? (
            <SignIn
              onLogin={handleAuthSuccess}
              onClose={() => setIsAuthDialogOpen(false)}
              onSwitchToSignUp={() => setAuthMode("signup")}
            />
          ) : (
            <SignUp
              onSignup={handleAuthSuccess}
              onClose={() => setIsAuthDialogOpen(false)}
              onSwitchToSignIn={() => setAuthMode("signin")}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLayout;
