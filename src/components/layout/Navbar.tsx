import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Moon, Sun, Camera, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar = ({ onLoginClick }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  // Check if user is logged in
  const userData = JSON.parse(
    localStorage.getItem("asl-current-user") || "null",
  );

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userData?.name) return "U";
    return userData.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="w-full h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px]">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">ASL</span>
            </div>
            <span className="text-xl font-bold hidden md:block">
              ASL Gestures
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-medium transition-colors ${location.pathname === "/" ? "text-blue-500" : "hover:text-blue-500"}`}
          >
            Home
          </Link>
          <Link
            to="/translator"
            className={`font-medium transition-colors group relative flex items-center gap-1 ${location.pathname === "/translator" ? "text-blue-500" : "hover:text-blue-500"}`}
          >
            <Camera
              size={16}
              className={
                location.pathname === "/translator"
                  ? "text-blue-500"
                  : "group-hover:text-blue-500"
              }
            />
            Translator
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              New
            </span>
          </Link>
          <Link
            to="/gestures"
            className={`font-medium transition-colors ${location.pathname === "/gestures" ? "text-blue-500" : "hover:text-blue-500"}`}
          >
            Gesture Library
          </Link>
          <Link
            to="/progress"
            className={`font-medium transition-colors ${location.pathname === "/progress" ? "text-blue-500" : "hover:text-blue-500"}`}
          >
            My Progress
          </Link>
        </nav>

        {/* Search and Controls */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search gestures..."
              className="w-64 pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {userData ? (
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full transition-opacity hover:opacity-80"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`}
                  alt={userData.name}
                />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onLoginClick}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
