"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="absolute inset-0 opacity-30">
          <div className="animate-gradient-shift absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-400/30 blur-3xl" />
          <div
            className="animate-gradient-shift absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-violet-400/30 blur-3xl"
            style={{ animationDelay: "-4s" }}
          />
          <div
            className="animate-gradient-shift absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-400/20 blur-3xl"
            style={{ animationDelay: "-2s" }}
          />
        </div>

        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="noise-bg absolute inset-0" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-border mb-8 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:bg-slate-800/80"
        >
          <Mail className="h-4 w-4 text-indigo-500" />
          <span className="text-muted-foreground text-sm font-medium">Trusted by 100,000+ professionals</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-5xl font-bold tracking-tight md:text-7xl"
        >
          <span className="text-foreground">Write Perfect</span>
          <br />
          <span className="gradient-text">Emails in Seconds</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mx-auto mb-12 max-w-3xl text-xl leading-relaxed md:text-2xl"
        >
          Describe what you need, choose your tone, and get a professional email draft instantly. From job applications
          to difficult conversations, we have got you covered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="glass rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="text-left">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    Your Idea
                  </span>
                </div>
                <div className="text-muted-foreground rounded-xl bg-slate-50 p-4 text-sm leading-relaxed dark:bg-slate-800/50">
                  &quot;Write a follow-up email to a recruiter after interviewing. Express enthusiasm and ask about next
                  steps.&quot;
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg"
                >
                  <Sparkles className="h-6 w-6 text-white" />
                </motion.div>
              </div>

              <div className="text-left">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                    Your Email
                  </span>
                </div>
                <div className="text-foreground rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 text-sm leading-relaxed dark:border-indigo-800 dark:from-indigo-900/20 dark:to-violet-900/20">
                  <p className="font-semibold">Subject: Following Up - [Position Name]</p>
                  <p>Dear [Recruiter Name],</p>
                  <p>Thank you for taking the time to meet...</p>
                  <p className="mt-2 text-emerald-600">✓ Professional and Ready to Send</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="border-border absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl border bg-white shadow-xl dark:bg-slate-800"
          >
            <span className="gradient-text text-3xl font-bold">3s</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="border-border absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-xl dark:bg-slate-800"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">40+ Tones</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
