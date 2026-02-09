"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import AccentDropdown from "@/components/ui/AccentDropdown";
import GithubIcon from "@/components/ui/githubIcon";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="flex gap-2">
        <div className="h-9 w-9 rounded-lg bg-white/10" />
        <AccentDropdown />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={toggleTheme}
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-[18px] w-[18px] text-white/80" />
        ) : (
          <Moon className="h-[18px] w-[18px] text-white/80" />
        )}
      </button>
      <AccentDropdown />
      <GithubIcon
        url="https://github.com/sanjaysah101/humanize-ai"
        label="GitHub Repository"
        darkSrc="/githubIcon2.svg"
        lightSrc="/githubIcon1.svg"
      />
    </div>
  );
};
