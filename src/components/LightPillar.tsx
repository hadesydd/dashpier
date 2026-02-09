"use client";

import { useRef, useEffect, ReactNode, useState } from "react";

interface PillarProps {
  delay?: number;
  duration?: number;
  xPos?: number;
  colors?: [string, string, string];
  size?: number;
}

function AnimatedPillar({ 
  delay = 0, 
  duration = 25, 
  xPos = 0, 
  colors = ['#7c3aed', '#ec4899', '#06b6d4'],
  size = 1
}: PillarProps) {
  const pillarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pillarRef.current) return;
    
    pillarRef.current.style.animationDelay = `${delay}s`;
    pillarRef.current.style.animationDuration = `${duration}s`;
    pillarRef.current.style.left = `${xPos}%`;
  }, [delay, duration, xPos]);

  return (
    <div 
      ref={pillarRef}
      className="animated-pillar"
      style={{
        '--pillar-color-1': colors[0],
        '--pillar-color-2': colors[1],
        '--pillar-color-3': colors[2],
        '--pillar-size': size,
      } as React.CSSProperties}
    />
  );
}

interface FloatingOrbProps {
  delay?: number;
  duration?: number;
  xPos?: number;
  yPos?: number;
  size?: number;
  color?: string;
}

function FloatingOrb({
  delay = 0,
  duration = 20,
  xPos = 0,
  yPos = 0,
  size = 200,
  color = '#7c3aed'
}: FloatingOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current) return;
    
    orbRef.current.style.animationDelay = `${delay}s`;
    orbRef.current.style.animationDuration = `${duration}s`;
  }, [delay, duration]);

  return (
    <div 
      ref={orbRef}
      className="floating-orb"
      style={{
        left: `${xPos}%`,
        top: `${yPos}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      } as React.CSSProperties}
    />
  );
}

export function LightPillarBackground({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animated-bg ${className}`}>
      {/* Floating gradient orbs */}
      <FloatingOrb delay={0} duration={25} xPos={5} yPos={10} size={400} color="#8b5cf6" />
      <FloatingOrb delay={3} duration={30} xPos={25} yPos={60} size={300} color="#ec4899" />
      <FloatingOrb delay={7} duration={28} xPos={50} yPos={20} size={350} color="#06b6d4" />
      <FloatingOrb delay={12} duration={32} xPos={75} yPos={70} size={280} color="#10b981" />
      <FloatingOrb delay={18} duration={27} xPos={85} yPos={40} size={320} color="#f59e0b" />
      <FloatingOrb delay={22} duration={35} xPos={15} yPos={85} size={250} color="#ef4444" />
      <FloatingOrb delay={5} duration={22} xPos={60} yPos={90} size={380} color="#6366f1" />
      
      {/* Light beams */}
      <AnimatedPillar delay={0} duration={20} xPos={10} colors={['#7c3aed', '#8b5cf6', '#06b6d4']} size={0.8} />
      <AnimatedPillar delay={5} duration={25} xPos={25} colors={['#ec4899', '#f43f5e', '#f59e0b']} size={1} />
      <AnimatedPillar delay={10} duration={22} xPos={40} colors={['#06b6d4', '#10b981', '#14b8a6']} size={0.7} />
      <AnimatedPillar delay={15} duration={28} xPos={55} colors={['#8b5cf6', '#a855f7', '#d946ef']} size={0.9} />
      <AnimatedPillar delay={20} duration={24} xPos={70} colors={['#f59e0b', '#fbbf24', '#fb923c']} size={0.85} />
      <AnimatedPillar delay={8} duration={26} xPos={85} colors={['#10b981', '#14b8a6', '#06b6d4']} size={0.75} />
      <AnimatedPillar delay={3} duration={30} xPos={5} colors={['#ef4444', '#f87171', '#fb923c']} size={0.65} />
      <AnimatedPillar delay={12} duration={23} xPos={95} colors={['#6366f1', '#8b5cf6', '#a855f7']} size={0.8} />
      
      {/* Fast shooting stars */}
      <div className="shooting-star" style={{ top: '15%', left: '0%', animationDelay: '0s' }} />
      <div className="shooting-star" style={{ top: '35%', left: '0%', animationDelay: '8s' }} />
      <div className="shooting-star" style={{ top: '55%', left: '0%', animationDelay: '15s' }} />
      <div className="shooting-star" style={{ top: '75%', left: '0%', animationDelay: '22s' }} />
      
      {/* Mesh gradient overlay */}
      <div className="mesh-gradient" />
      
      {/* Vignette effect */}
      <div className="vignette" />
      
      {/* Content */}
      <div className="bg-content">
        {children}
      </div>
    </div>
  );
}
