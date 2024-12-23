// components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HelpCircle,
  BarChart2,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    href: "/students",
    icon: Users,
  },
  {
    name: "Chapter",
    href: "/chapter",
    icon: BookOpen,
  },
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart2,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="flex items-center px-6 py-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8">
            <svg
              className="h-8 w-8 text-[#4A4A4A]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#4A4A4A]">Quyl.</span>
        </Link>
      </div>

      <nav className="flex-1 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#F8F9FC] text-[#4A4A4A]"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
