"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-gradient-shift" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl animate-gradient-shift" style={{ animationDelay: "-4s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/20 rounded-full blur-3xl animate-gradient-shift" style={{ animationDelay: "-2s" }} />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        {/* Noise Texture */}
        <div className="absolute inset-0 noise-bg" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-border shadow-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-muted-foreground">
            Trusted by 50,000+ students & professionals
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Humanize Your</span>
          <br />
          <span className="gradient-text">AI Writing</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Transform robotic AI-generated text into natural, human-like prose.
          Perfect for essays, emails, and professional documents that need to sound authentically you.
        </motion.p>

        {/* Floating Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Before</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;The implementation of strategic frameworks necessitates a comprehensive analysis of prevailing market conditions and the subsequent deployment of targeted interventions...&rdquo;
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </div>

              {/* After */}
              <div className="text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">After</span>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 text-sm text-foreground leading-relaxed border border-indigo-100 dark:border-indigo-800">
                  &ldquo;To make this work, we need to really understand what&apos;s happening in the market right now. Then we can figure out the best way to tackle the challenges we&apos;re facing...&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center border border-border"
          >
            <span className="text-3xl font-bold gradient-text">98%</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-border flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium">AI Undetectable</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
