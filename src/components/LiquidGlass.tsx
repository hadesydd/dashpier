"use client";

import React, { useId, useMemo } from "react";
import {
  generateDisplacementMap,
  displacementMapToDataURL,
  generateSpecularMap,
  SurfaceType,
} from "@/lib/liquidGlass";

interface LiquidGlassProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  bezelWidth?: number;
  glassThickness?: number;
  surfaceType?: SurfaceType;
  blurLevel?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function LiquidGlass({
  children,
  width = 200,
  height = 60,
  bezelWidth = 12,
  glassThickness = 8,
  surfaceType = "squircle",
  blurLevel = 0,
  className = "",
  style = {},
}: LiquidGlassProps) {
  const filterId = useId().replace(/:/g, "");
  
  // Generate maps synchronously using useMemo
  const { displacementMapURL, specularMapURL, maxDisplacement, hasError } = useMemo(() => {
    try {
      const size = Math.max(width, height);
      
      // Generate displacement map
      const { displacementMap, maxDisplacement: maxDisp } = generateDisplacementMap(
        size,
        bezelWidth,
        glassThickness,
        surfaceType
      );
      
      const dispURL = displacementMapToDataURL(displacementMap, size, size);
      
      // Generate specular map
      const specularMap = generateSpecularMap(size, bezelWidth, surfaceType);
      const specURL = displacementMapToDataURL(specularMap, size, size);
      
      return {
        displacementMapURL: dispURL,
        specularMapURL: specURL,
        maxDisplacement: maxDisp,
        hasError: false,
      };
    } catch {
      return {
        displacementMapURL: "",
        specularMapURL: "",
        maxDisplacement: 0,
        hasError: true,
      };
    }
  }, [width, height, bezelWidth, glassThickness, surfaceType]);

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {/* SVG Filter Definition */}
      {!hasError && displacementMapURL && (
        <svg
          width="0"
          height="0"
          style={{ position: "absolute", pointerEvents: "none" }}
        >
          <defs>
            <filter
              id={filterId}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              {/* Blur input (optional) */}
              {blurLevel > 0 && (
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation={blurLevel}
                  result="blurred"
                />
              )}
              
              {/* Displacement map */}
              <feImage
                href={displacementMapURL}
                x={0}
                y={0}
                width={Math.max(width, height)}
                height={Math.max(width, height)}
                result="displacementMap"
              />
              <feDisplacementMap
                in={blurLevel > 0 ? "blurred" : "SourceGraphic"}
                in2="displacementMap"
                scale={maxDisplacement}
                xChannelSelector="R"
                yChannelSelector="G"
                result="refracted"
              />

              {/* Specular highlight */}
              {specularMapURL && (
                <>
                  <feImage
                    href={specularMapURL}
                    x={0}
                    y={0}
                    width={Math.max(width, height)}
                    height={Math.max(width, height)}
                    result="specularMap"
                  />
                  <feBlend
                    in="refracted"
                    in2="specularMap"
                    mode="screen"
                    result="withSpecular"
                  />
                </>
              )}

              {/* Final composite */}
              <feComposite
                in={specularMapURL ? "withSpecular" : "refracted"}
                in2="SourceGraphic"
                operator="over"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Content with liquid glass effect */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          overflow: "hidden",
          filter: !hasError && displacementMapURL ? `url(#${filterId})` : undefined,
          backdropFilter: hasError || !displacementMapURL ? "blur(10px)" : undefined,
          background: hasError || !displacementMapURL ? "rgba(255, 255, 255, 0.5)" : undefined,
        }}
      >
        {children}
      </div>

      {/* Glass overlay for shine effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 12,
          background: `
            radial-gradient(
              ellipse at 30% 20%,
              rgba(255, 255, 255, 0.4) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 70% 80%,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 40%
            )
          `,
          boxShadow: `
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -1px 1px rgba(0, 0, 0, 0.05),
            0 4px 20px rgba(0, 0, 0, 0.08)
          `,
        }}
      />
    </div>
  );
}

// Simplified Liquid Glass for buttons
interface LiquidGlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LiquidGlassButton({
  children,
  onClick,
  disabled,
  variant = "secondary",
  size = "md",
  className = "",
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: {
      background: "linear-gradient(135deg, #007AFF 0%, #0051D5 100%)",
      color: "white",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.7)",
      color: "#1a1a1a",
    },
    ghost: {
      background: "transparent",
      color: "#666",
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-xl font-medium
        transition-all duration-300
        ${sizeClasses[size]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:translate-y-[-1px]"}
        ${className}
      `}
      style={{
        ...variantStyles[variant],
        border: variant === "secondary" ? "1px solid rgba(255, 255, 255, 0.5)" : "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* Glass layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)",
        }}
      />
      
      <div
        className="absolute inset-0 pointer-events-none rounded-xl"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}

// Glass Panel component for larger surfaces
interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function GlassPanel({
  children,
  className = "",
  intensity = "medium",
}: GlassPanelProps) {
  const intensities = {
    low: { blur: 10, opacity: 0.3 },
    medium: { blur: 20, opacity: 0.5 },
    high: { blur: 30, opacity: 0.7 },
  };

  const { blur, opacity } = intensities[intensity];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px) saturate(180%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 8px 32px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, transparent)",
        }}
      />
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
