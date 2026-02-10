import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

export const PillBase: React.FC<{
  items?: NavItem[];
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  className?: string;
}> = ({ items, activeSection, onSectionChange, className }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems: NavItem[] = items || [
    { label: "USE CASES", href: "#use-cases" },
    { label: "FEATURES", href: "#features" },
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "PRICING", href: "#pricing" },
  ];

  const pillWidth = useSpring(160, { stiffness: 220, damping: 25, mass: 1 });

  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(600);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(160);
      }, 400);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [hovering, pillWidth]);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  const handleSectionClick = (sectionId: string) => {
    onSectionChange?.(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeItem = navItems.find((item) => item.href === "#" + activeSection) || navItems[0];

  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-full", className)}
      style={{
        width: pillWidth,
        height: "48px",
        background: expanded ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: expanded
          ? "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
          : "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-out",
      }}
    >
      <AnimatePresence mode="wait">
        {!expanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              key={activeItem.href}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs font-bold tracking-widest uppercase"
              style={{
                color: "#1A1A1A",
                textShadow: "0 1px 0 rgba(255, 255, 255, 0.5)",
              }}
            >
              {activeItem.label}
            </motion.span>
          </motion.div>
        )}

        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-evenly px-4"
          >
            {navItems.map((item, index) => {
              const isActive = item.href === "#" + activeSection;

              return (
                <motion.button
                  key={item.id || item.label}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.15 }}
                  onClick={() => handleSectionClick(item.href.replace("#", ""))}
                  className="relative font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200"
                  style={{
                    color: isActive ? "#3B82F6" : "rgba(0, 0, 0, 0.65)",
                    padding: "8px 12px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#1A1A1A";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(0, 0, 0, 0.65)";
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full"
                      style={{ background: "#3B82F6" }}
                    />
                  )}
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default PillBase;
