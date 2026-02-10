"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ title, description, className = "" }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className={`relative rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 ${className}`}
    >
      <div className="mb-4">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.5, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
          className="h-1 w-12 rounded-full bg-blue-500"
        />
      </div>
      <h3 className="mb-2 font-mono text-lg font-bold text-[#1A1A1A]">{title}</h3>
      <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/60">{description}</p>
    </motion.div>
  );
}

export function FeatureCardSimple({ title, description, className = "" }: FeatureCardProps) {
  return (
    <div
      className={`relative rounded-xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-black/20 hover:shadow-md ${className}`}
    >
      <div className="mb-4 h-1 w-12 rounded-full bg-blue-500" />
      <h3 className="mb-2 font-mono text-lg font-bold text-[#1A1A1A]">{title}</h3>
      <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/60">{description}</p>
    </div>
  );
}
