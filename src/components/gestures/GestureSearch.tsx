import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface GestureSearchProps {
  onSearch?: (query: string) => void;
  onSelectSuggestion?: (suggestion: string) => void;
  suggestions?: string[];
  placeholder?: string;
  className?: string;
}

const GestureSearch = ({
  onSearch = () => {},
  onSelectSuggestion = () => {},
  suggestions = [
    "Hello",
    "Thank you",
    "Please",
    "Sorry",
    "Good morning",
    "Good night",
    "Yes",
    "No",
    "Help",
    "Friend",
  ],
  placeholder = "Search for ASL gestures...",
  className = "",
}: GestureSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setIsOpen(true);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  }, [searchQuery, suggestions]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSelectSuggestion(suggestion);
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div
      className={`w-full max-w-[600px] h-[80px] bg-white dark:bg-gray-800 ${className}`}
    >
      <div className="relative w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="pr-10 h-12"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button onClick={handleSearch} className="h-12">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {isOpen && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700">
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                {filteredSuggestions.length === 0 ? (
                  <CommandEmpty>No results found.</CommandEmpty>
                ) : (
                  <CommandGroup heading="Suggestions">
                    {filteredSuggestions.map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        onSelect={() => handleSelectSuggestion(suggestion)}
                        className="cursor-pointer"
                      >
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestureSearch;
