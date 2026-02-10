"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ title, description, className = "" }: FeatureCardProps) {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      className={`relative rounded-2xl border border-white/10 bg-[linear-gradient(110deg,#1A1A1A_0.6%,#0D0D0D)] p-8 ${className}`}
    >
      <Illustration mouseEnter={mouseEnter} />
      <div className="relative z-10">
        <h3 className="mb-3 font-mono text-xl font-bold text-white">{title}</h3>
        <p className="font-mono text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </div>
  );
}

export function FeatureCardSimple({ title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-[linear-gradient(110deg,#1A1A1A_0.6%,#0D0D0D)] p-8 transition-colors hover:border-white/20 ${className}`}
    >
      <h3 className="mb-3 font-mono text-xl font-bold text-white">{title}</h3>
      <p className="font-mono text-sm leading-relaxed text-white/60">{description}</p>
    </div>
  );
}

const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 60;
  const columns = 12;

  const [glowingStars, setGlowingStars] = useState<number[]>([]);
  const highlightedStars = useRef<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 3 }, () => Math.floor(Math.random() * stars));
      setGlowingStars([...highlightedStars.current]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="mb-6 h-24 w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
      }}
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx);
        const delay = (starIdx % 10) * 0.15;
        return (
          <div key={`matrix-col-${starIdx}`} className="relative flex items-center justify-center">
            <Star isGlowing={isGlowing} delay={mouseEnter ? starIdx * 0.005 : delay} />
            {isGlowing && <Glow delay={delay} />}
          </div>
        );
      })}
    </div>
  );
};

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.4 }}
      animate={{
        scale: isGlowing ? [1, 1.5, 2, 1.8, 1.2] : 1,
        opacity: isGlowing ? 1 : 0.4,
      }}
      transition={{ duration: 2, ease: "easeInOut", delay }}
      className="relative z-10 h-[1px] w-[1px] rounded-full bg-white/40"
    />
  );
};

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 2, ease: "easeInOut", delay }}
      className="absolute left-1/2 z-0 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400 blur-[2px]"
    />
  );
};
