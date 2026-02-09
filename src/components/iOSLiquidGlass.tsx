"use client";

import React, { useId } from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  borderRadius?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "light" | "dark";
}

export function LiquidGlass({
  children,
  className = "",
  intensity = "medium",
  borderRadius = "xl",
  variant = "light",
}: LiquidGlassProps) {
  const filterId = useId().replace(/:/g, "");
  
  const blurIntensity = {
    low: "backdrop-blur-sm",
    medium: "backdrop-blur-md",
    high: "backdrop-blur-xl",
  };
  
  const bgOpacity = {
    low: variant === "light" ? "bg-white/5" : "bg-black/5",
    medium: variant === "light" ? "bg-white/10" : "bg-black/20",
    high: variant === "light" ? "bg-white/20" : "bg-black/30",
  };
  
  const borderOpacity = {
    low: variant === "light" ? "border-white/10" : "border-white/5",
    medium: variant === "light" ? "border-white/20" : "border-white/10",
    high: variant === "light" ? "border-white/30" : "border-white/20",
  };
  
  const radiusClass = {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    full: "rounded-full",
  };

  return (
    <div className={`relative ${className}`}>
      {/* SVG Filter for liquid distortion */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={`${filterId}-turbulence`}>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Main glass container */}
      <div
        className={`
          relative overflow-hidden
          ${bgOpacity[intensity]}
          ${blurIntensity[intensity]}
          ${borderOpacity[intensity]}
          ${radiusClass[borderRadius]}
          border
          shadow-lg
          transition-all duration-300
        `}
        style={{
          boxShadow: variant === "light" 
            ? "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            : "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Inner glass highlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: variant === "light"
              ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
          }}
        />
        
        {/* Top edge shine */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: variant === "light"
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.6) 80%, transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

// iOS-style Button with Liquid Glass
interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GlassButton({
  children,
  onClick,
  disabled,
  variant = "secondary",
  size = "md",
  className = "",
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const baseClasses = `
    relative overflow-hidden
    rounded-full font-medium
    transition-all duration-200 ease-out
    ${sizeClasses[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"}
    ${className}
  `;

  if (variant === "primary") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} bg-[#007AFF] text-white`}
        style={{
          boxShadow: "0 4px 20px rgba(0, 122, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} bg-white/10 backdrop-blur-xl border border-white/20 text-foreground`}
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Glass highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// iOS Control Center-style Panel
interface ControlPanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ControlPanel({ children, className = "", title }: ControlPanelProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      }}
    >
      {/* Top highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      {/* Inner gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
      
      {title && (
        <div className="px-4 pt-4 pb-2">
          <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
            {title}
          </span>
        </div>
      )}
      
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
}

// iOS-style Slider/Progress
interface GlassSliderProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
}

export function GlassSlider({ value, onChange, className = "" }: GlassSliderProps) {
  return (
    <div className={`relative h-12 rounded-full overflow-hidden ${className}`}>
      {/* Glass background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />
      
      {/* Progress fill */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-[#007AFF] transition-all duration-100"
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
      
      {/* Slider handle */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg"
        style={{ left: `calc(${value}% - 16px)` }}
      >
        <div className="absolute inset-0 rounded-full border border-black/5" />
      </div>
      
      {/* Invisible input */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}

// iOS Toggle Switch
interface GlassToggleProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function GlassToggle({ checked, onChange, className = "" }: GlassToggleProps) {
  return (
    <button
      onClick={() => onChange?.(!checked)}
      className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${className}`}
      style={{
        background: checked ? "#34C759" : "rgba(255, 255, 255, 0.2)",
        backdropFilter: checked ? "none" : "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="absolute top-0.5 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-200"
        style={{
          transform: checked ? "translateX(26px)" : "translateX(2px)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div className="absolute inset-0 rounded-full border border-black/5" />
      </div>
    </button>
  );
}

// iOS-style Card
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function GlassCard({ children, className = "", icon, title, subtitle }: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(30px) saturate(180%)",
        WebkitBackdropFilter: "blur(30px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
        }}
      />
      
      {(icon || title) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && (
            <div className="w-10 h-10 rounded-xl bg-[#007AFF]/20 flex items-center justify-center text-[#007AFF]">
              {icon}
            </div>
          )}
          {(title || subtitle) && (
            <div>
              {title && <h3 className="font-semibold text-foreground">{title}</h3>}
              {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
