import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, User, Settings } from "lucide-react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface UserMenuProps {
  onLogin?: () => void;
  onLogout?: () => void;
}

interface UserData {
  name: string;
  email: string;
  loggedInAt: string;
}

const UserMenu = ({
  onLogin = () => {},
  onLogout = () => {},
}: UserMenuProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("asl-current-user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("asl-current-user");
      }
    }
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsAuthDialogOpen(false);
    onLogin();
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("asl-current-user");
    setIsLoggedIn(false);
    setUserData(null);
    onLogout();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return "U";
    return userData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Generate avatar image URL based on user name
  const getAvatarUrl = () => {
    if (!userData?.name) return "";
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      userData.name,
    )}`;
  };

  return (
    <div className="relative">
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full transition-opacity hover:opacity-80"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={getAvatarUrl()}
                  alt={userData?.name || "User"}
                />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userData?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <LogIn className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            {authMode === "signin" ? (
              <SignIn
                onLogin={handleLogin}
                onClose={() => setIsAuthDialogOpen(false)}
                onSwitchToSignUp={() => setAuthMode("signup")}
              />
            ) : (
              <SignUp
                onSignup={handleLogin}
                onClose={() => setIsAuthDialogOpen(false)}
                onSwitchToSignIn={() => setAuthMode("signin")}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserMenu;
