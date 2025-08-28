import { Bell, UserCircle } from "lucide-react";
import React from "react";

export const Navbar = () => {
  return (
    <header className="min-h-16 bg-white shadow flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-l-lg px-3 py-1 w-64"
      />
      <div className="flex items-center gap-4">
        <Bell className="size-6 text-gray-600 cursor-pointer" />
        <UserCircle className="size-8 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};
