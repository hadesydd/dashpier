"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export function GlassButton({
  children,
  onClick,
  disabled,
  variant = "secondary",
  size = "md",
  className = "",
  type = "button",
}: GlassButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [contentRect, setContentRect] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    // Update content position for accurate clipping
    if (contentRef.current) {
      const contentBox = contentRef.current.getBoundingClientRect();
      setContentRect({
        width: contentBox.width,
        height: contentBox.height,
        left: contentBox.left - rect.left,
        top: contentBox.top - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (buttonRef.current && contentRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const contentBox = contentRef.current.getBoundingClientRect();
      setContentRect({
        width: contentBox.width,
        height: contentBox.height,
        left: contentBox.left - rect.left,
        top: contentBox.top - rect.top,
      });
    }
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
    secondary: "glass-card text-foreground hover:shadow-premium bg-white/50 dark:bg-white/5",
    ghost: "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
  };

  // Calculate magnified content position
  const lensSize = 70;
  const zoomLevel = 1.6;
  const magnifiedX = mousePosition.x - (contentRect.left + contentRect.width / 2) * zoomLevel + lensSize / 2;
  const magnifiedY = mousePosition.y - (contentRect.top + contentRect.height / 2) * zoomLevel + lensSize / 2;

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-xl font-medium transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {/* Progressive magnifying glass effect */}
      <AnimatePresence>
        {isHovered && !disabled && (
          <>
            {/* Outer glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 0.3,
                scale: 1,
                x: mousePosition.x - 42,
                y: mousePosition.y - 42,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute pointer-events-none z-10"
              style={{
                width: 84,
                height: 84,
                background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                filter: "blur(8px)",
                borderRadius: "50%",
              }}
            />

            {/* The magnifying lens container */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: mousePosition.x - lensSize / 2,
                y: mousePosition.y - lensSize / 2,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-30 overflow-hidden"
              style={{
                width: lensSize,
                height: lensSize,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 40%, rgba(220,235,255,0.8) 100%)",
                boxShadow: `
                  inset -3px -3px 8px rgba(0,0,0,0.15),
                  inset 3px 3px 8px rgba(255,255,255,1),
                  0 4px 15px rgba(0,100,255,0.2),
                  0 0 0 1px rgba(255,255,255,0.5)
                `,
              }}
            >
              {/* Magnified content - shows only what's under cursor */}
              <div
                className="absolute flex items-center justify-center whitespace-nowrap"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  left: magnifiedX,
                  top: magnifiedY,
                  minWidth: contentRect.width,
                  minHeight: contentRect.height,
                }}
              >
                {children}
              </div>
            </motion.div>

            {/* Glass border ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 0.7,
                scale: 1,
                x: mousePosition.x - 37,
                y: mousePosition.y - 37,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-40"
              style={{
                width: 74,
                height: 74,
                border: "2.5px solid rgba(255,255,255,0.8)",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0,100,255,0.1)",
              }}
            />

            {/* Highlight reflection */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.9,
                x: mousePosition.x - 20,
                y: mousePosition.y - 24,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-50"
              style={{
                width: 16,
                height: 12,
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                borderRadius: "50%",
                filter: "blur(0.5px)",
              }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Original content - dims when hovering */}
      <span 
        ref={contentRef}
        className="relative z-20 flex items-center justify-center gap-2"
        style={{ opacity: isHovered ? 0.35 : 1 }}
      >
        {children}
      </span>
    </button>
  );
}

// Nav item with progressive magnifying effect
interface GlassNavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export function GlassNavItem({ children, active, onClick }: GlassNavItemProps) {
  const itemRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [contentRect, setContentRect] = useState({ width: 0, height: 0, left: 0, top: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!itemRef.current) return;
    
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    if (contentRef.current) {
      const contentBox = contentRef.current.getBoundingClientRect();
      setContentRect({
        width: contentBox.width,
        height: contentBox.height,
        left: contentBox.left - rect.left,
        top: contentBox.top - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (itemRef.current && contentRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      const contentBox = contentRef.current.getBoundingClientRect();
      setContentRect({
        width: contentBox.width,
        height: contentBox.height,
        left: contentBox.left - rect.left,
        top: contentBox.top - rect.top,
      });
    }
  };

  const lensSize = 60;
  const zoomLevel = 1.5;
  const magnifiedX = mousePosition.x - (contentRect.left + contentRect.width / 2) * zoomLevel + lensSize / 2;
  const magnifiedY = mousePosition.y - (contentRect.top + contentRect.height / 2) * zoomLevel + lensSize / 2;

  return (
    <button
      ref={itemRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden px-5 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-300
        ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}
      `}
    >
      {/* Progressive magnifying glass for nav */}
      <AnimatePresence>
        {isHovered && !active && (
          <>
            {/* Outer glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 0.25,
                scale: 1,
                x: mousePosition.x - 35,
                y: mousePosition.y - 35,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute pointer-events-none z-10"
              style={{
                width: 70,
                height: 70,
                background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                filter: "blur(6px)",
                borderRadius: "50%",
              }}
            />

            {/* The magnifying lens */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: mousePosition.x - lensSize / 2,
                y: mousePosition.y - lensSize / 2,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-30 overflow-hidden"
              style={{
                width: lensSize,
                height: lensSize,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 40%, rgba(220,235,255,0.8) 100%)",
                boxShadow: `
                  inset -2px -2px 6px rgba(0,0,0,0.12),
                  inset 2px 2px 6px rgba(255,255,255,1),
                  0 3px 12px rgba(0,100,255,0.18),
                  0 0 0 1px rgba(255,255,255,0.5)
                `,
              }}
            >
              {/* Magnified content */}
              <div
                className="absolute flex items-center justify-center whitespace-nowrap"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  left: magnifiedX,
                  top: magnifiedY,
                  minWidth: contentRect.width,
                  minHeight: contentRect.height,
                }}
              >
                {children}
              </div>
            </motion.div>

            {/* Glass border */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 0.6,
                scale: 1,
                x: mousePosition.x - 31,
                y: mousePosition.y - 31,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-40"
              style={{
                width: 62,
                height: 62,
                border: "2px solid rgba(255,255,255,0.8)",
                borderRadius: "50%",
              }}
            />

            {/* Highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.9,
                x: mousePosition.x - 16,
                y: mousePosition.y - 20,
              }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute pointer-events-none z-50"
              style={{
                width: 14,
                height: 10,
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                borderRadius: "50%",
              }}
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Active background */}
      {active && (
        <motion.div
          layoutId="nav-bg"
          className="absolute inset-0 bg-card rounded-xl shadow-premium border border-border"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
      
      <span 
        ref={contentRef}
        className="relative z-20"
        style={{ opacity: isHovered && !active ? 0.25 : 1 }}
      >
        {children}
      </span>
    </button>
  );
}
