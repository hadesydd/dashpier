"use client";

import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, FileText, Home, Mail, Search, Settings, Sparkles, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DockMorphProps {
  className?: string;
  items?: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    onClick?: () => void;
  }[];
  position?: "bottom" | "top" | "left";
}

export default function DockMorph({ items, className, position = "bottom" }: DockMorphProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const dockItems =
    items && items.length > 0
      ? items
      : [
          { icon: Home, label: "Home", onClick: () => (window.location.href = "/") },
          { icon: FileText, label: "Templates", onClick: () => alert("Templates clicked") },
          { icon: Sparkles, label: "Generate", onClick: () => alert("Generate clicked") },
          { icon: Bell, label: "Notifications", onClick: () => alert("Notifications clicked") },
          { icon: Settings, label: "Settings", onClick: () => alert("Settings clicked") },
        ];

  const positionClasses = {
    bottom: "fixed bottom-6 left-1/2 -translate-x-1/2",
    top: "fixed top-6 left-1/2 -translate-x-1/2",
    left: "fixed left-6 top-1/2 -translate-y-1/2 flex-col",
  };

  return (
    <div className={cn("z-50 flex items-center justify-center", positionClasses[position], className)}>
      <TooltipProvider delayDuration={100}>
        <div
          className={cn(
            "relative flex items-center gap-6 rounded-3xl p-3",
            position === "left" ? "flex-col gap-4 px-4 py-8" : "flex-row",
            "bg-background/30 border shadow-lg backdrop-blur-xl",
            "border-black/10 dark:border-white/10"
          )}
        >
          {dockItems.map((item, i) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <div
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1.4, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                        }}
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          "bg-gradient-to-tr from-blue-500/40 via-blue-300/20 to-transparent",
                          "backdrop-blur-2xl",
                          "shadow-md dark:shadow-blue-500/20"
                        )}
                      />
                    )}
                  </AnimatePresence>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative z-10 rounded-full transition-transform hover:scale-110"
                    onClick={item.onClick}
                  >
                    <item.icon className="h-6 w-6" />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side={position === "left" ? "right" : "top"} className="text-xs">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}
