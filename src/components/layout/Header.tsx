import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Sun, Menu, Search, X, Camera } from "lucide-react";
import UserMenu from "@/components/auth/UserMenu";

interface HeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  onSearch?: (query: string) => void;
}

const Header = ({
  onThemeToggle = () => {},
  isDarkMode = false,
  onSearch = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-full h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-xl">ASL</span>
          </div>
          <span className="text-xl font-bold hidden md:block">
            ASL Gestures
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/translator"
            className="font-medium hover:text-blue-500 transition-colors group relative"
          >
            <span className="flex items-center gap-1">
              <Camera size={16} className="group-hover:text-blue-500" />
              Translator
            </span>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              New
            </span>
          </Link>
          <Link
            to="/gestures"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            Gesture Library
          </Link>
          <Link
            to="/progress"
            className="font-medium hover:text-blue-500 transition-colors"
          >
            My Progress
          </Link>
        </nav>

        {/* Search and Theme Toggle (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search gestures..."
              className="w-64 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </form>

          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
            className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <UserMenu />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            {isSearchOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  to="/"
                  className="font-medium py-2 hover:text-blue-500 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/gestures"
                  className="font-medium py-2 hover:text-blue-500 transition-colors"
                >
                  Gesture Library
                </Link>
                <Link
                  to="/progress"
                  className="font-medium py-2 hover:text-blue-500 transition-colors"
                >
                  My Progress
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar (Expandable) */}
      {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search gestures..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
