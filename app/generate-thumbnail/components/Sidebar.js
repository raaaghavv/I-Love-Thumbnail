import React from "react";
import {
  Plus,
  Home,
  MessageSquare,
  User,
  Minus,
  Palette,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <Link
        href="/"
        className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center mb-6"
      >
        <Sparkles className="w-4 h-4 text-white" />
      </Link>

      {/* Navigation Icons */}
      {/* <div className="flex flex-col space-y-3">
        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center  text-gray-600 hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <Home className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <MessageSquare className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <Palette className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <Minus className="w-4 h-4" />
        </button>
      </div> */}

      {/* User Avatar - already using neutral colors */}
      <div className="mt-auto">
        <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
          <User className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
