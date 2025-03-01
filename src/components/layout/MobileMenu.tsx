import React, { useState } from "react";
import {
  X,
  Menu,
  Home,
  BookOpen,
  BarChart,
  Sun,
  Moon,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
  currentTheme?: "light" | "dark";
  onThemeToggle?: () => void;
}

const MobileMenu = ({
  isOpen = false,
  onClose = () => {},
  currentTheme = "light",
  onThemeToggle = () => {},
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(true); // Default to open when no props passed

  const handleNavigation = (path: string) => {
    navigate(path);
    setSheetOpen(false);
    onClose();
  };

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="mr-2 h-5 w-5" />,
    },
    {
      name: "ASL Translator",
      path: "/translator",
      icon: <Camera className="mr-2 h-5 w-5" />,
      isNew: true,
    },
    {
      name: "Gesture Library",
      path: "/gestures",
      icon: <BookOpen className="mr-2 h-5 w-5" />,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: <BarChart className="mr-2 h-5 w-5" />,
    },
  ];

  return (
    <div className="md:hidden bg-white dark:bg-gray-900">
      <Sheet open={isOpen || sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[80%] max-w-[320px] p-0 bg-white dark:bg-gray-800"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <img
                  src="/vite.svg"
                  alt="ASL Learning App"
                  className="h-8 w-8 mr-2"
                />
                <h2 className="text-lg font-bold">ASL Learning</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            <nav className="flex-1 overflow-auto py-4">
              <ul className="space-y-2 px-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left h-12 relative"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      {item.name}
                      {item.isNew && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                          New
                        </span>
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={onThemeToggle}
              >
                {currentTheme === "light" ? (
                  <>
                    <Moon className="mr-2 h-5 w-5" />
                    Dark Mode
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-5 w-5" />
                    Light Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
