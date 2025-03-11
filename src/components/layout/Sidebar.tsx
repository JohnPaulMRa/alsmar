import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, BookOpen, Camera, BarChart, Moon, X } from "lucide-react";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar = ({ className, onClose = () => {} }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "/",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      label: "ASL Translator",
      href: "/translator",
      isNew: true,
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Gesture Library",
      href: "/gestures",
    },
    {
      icon: <BarChart className="h-5 w-5" />,
      label: "Progress",
      href: "/progress",
    },
  ];

  return (
    <div
      className={cn(
        "w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col",
        className,
      )}
    >
      {/* Header with logo and close button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-purple-500 to-blue-500 rounded-md flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-white"
              fill="currentColor"
            >
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            </svg>
          </div>
          <span className="font-bold text-lg">ASL Learning</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="md:hidden"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 py-4 overflow-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium dark:bg-gray-800 dark:text-gray-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.isNew && (
                    <span className="absolute right-2 top-2 bg-red-500 text-white text-xs px-1 rounded-full">
                      New
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Dark mode toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Moon className="h-5 w-5" />
          Dark Mode
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
