import React, { ReactNode, useEffect, useRef } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "orange" | "blue" | "purple" | "green" | "red";
  size?: "sm" | "md" | "lg";
}

const glowColorMap = {
  orange: { base: 30, spread: 200 },
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

export default function SpotlightCard({
  children,
  className = "",
  glowColor = "orange",
  size = "md",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (cardRef.current) {
        cardRef.current.style.setProperty("--x", x.toFixed(2));
        cardRef.current.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty("--y", y.toFixed(2));
        cardRef.current.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));
      }
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const beforeAfterStyles = `
    [data-spotlight-card]::before,
    [data-spotlight-card]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 1rem;
      background-attachment: fixed;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }

    [data-spotlight-card]::before {
      background-image: radial-gradient(
        200px 200px at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 30) 100% 50% / 0.15), transparent 100%
      );
      filter: brightness(1.5);
    }

    [data-spotlight-card]::after {
      background-image: radial-gradient(
        100px 100px at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / 0.15), transparent 100%
      );
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-spotlight-card
        className={` ${sizeMap[size]} relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg ${className} `}
        style={{
          "--base": base,
          "--spread": spread,
          "--hue": `calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))`,
        }}
      >
        <div className="relative z-10 h-full w-full">{children}</div>
      </div>
    </>
  );
}
