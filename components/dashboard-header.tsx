"use client";

import { useState } from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const { setSearchQuery } = useStore();

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearchQuery(value);
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="relative flex-1 max-w-[400px]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <Input
          placeholder="Search your course"
          className="pl-9 bg-gray-50 border-gray-200"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>

        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">{userName}</span>
        </div>
      </div>
    </header>
  );
}
