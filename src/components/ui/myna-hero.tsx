"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart,
  Check,
  ChevronRight,
  FileText,
  Menu,
  Play,
  RefreshCw,
  Sparkles,
  Star,
  Wand2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import ShinyText from "./shiny-text";

const navigationItems = [
  { title: "FEATURES", href: "#" },
  { title: "HOW IT WORKS", href: "#" },
  { title: "PRICING", href: "#" },
  { title: "ABOUT", href: "#" },
];

const features = [
  {
    icon: BarChart,
    label: "High Accuracy",
    description: "Our advanced AI models ensure your content passes all major AI detectors with 99% accuracy.",
  },
  {
    icon: Zap,
    label: "Lightning Fast",
    description: "Transform your AI-generated text into human-like content in seconds, not minutes.",
  },
  {
    icon: Activity,
    label: "Natural Flow",
    description: "Preserve the original meaning while adding natural language patterns and variations.",
  },
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Paste Your Content",
    description: "Simply paste your AI-generated text into our editor. We support all types of content.",
  },
  {
    number: "02",
    icon: Wand2,
    title: "Choose Your Style",
    description: "Select from Standard, Academic, or Casual modes to match your target audience.",
  },
  {
    number: "03",
    icon: RefreshCw,
    title: "Instant Transformation",
    description: "Our AI analyzes and rewrites your content to sound naturally human in seconds.",
  },
  {
    number: "04",
    icon: Check,
    title: "Copy & Use",
    description: "Get your humanized text with a confidence score. Copy, download, or use it directly.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out the service",
    features: ["500 words per month", "Standard mode", "Basic support", "1 result at a time"],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: 19,
    description: "Best for content creators",
    features: [
      "50,000 words per month",
      "All modes (Standard, Academic, Casual)",
      "Priority support",
      "Batch processing",
      "Confidence scores",
      "Export options",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For teams and businesses",
    features: [
      "Unlimited words",
      "All modes + Custom modes",
      "Dedicated support",
      "API access",
      "Team collaboration",
      "Custom integrations",
      "Analytics dashboard",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

interface MynaHeroProps {
  onGetStarted?: () => void;
}

export function MynaHero({ onGetStarted }: MynaHeroProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B2C] to-[#FF8F5A]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-mono text-xl font-bold">Humanize AI</span>
              </div>
            </a>

            <nav className="hidden items-center space-x-8 md:flex">
              {navigationItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="font-mono text-sm text-[#1A1A1A]/70 transition-colors hover:text-[#FF6B2C]"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                onClick={onGetStarted}
                className="hidden rounded-none bg-[#FF6B2C] font-mono text-sm hover:bg-[#FF6B2C]/90 md:inline-flex"
              >
                GET STARTED <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#1A1A1A] md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="border-black/5 bg-white">
                  <nav className="mt-6 flex flex-col gap-6">
                    {navigationItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="font-mono text-sm text-[#1A1A1A]/70 transition-colors hover:text-[#FF6B2C]"
                      >
                        {item.title}
                      </a>
                    ))}
                    <Button
                      className="w-full cursor-pointer rounded-none bg-[#FF6B2C] font-mono hover:bg-[#FF6B2C]/90"
                      onClick={onGetStarted}
                    >
                      GET STARTED <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-screen items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FF6B2C]/3 to-white" />
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#FF6B2C]/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#FF8F5A]/10 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex flex-col items-center py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF6B2C]/20 bg-[#FF6B2C]/10 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
                  <span className="font-mono text-sm text-[#FF6B2C]">AI Detection Safe</span>
                </div>
                <h1 className="mx-auto max-w-4xl font-mono text-5xl leading-tight font-bold sm:text-6xl md:text-7xl lg:text-8xl">
                  <ShinyText
                    text="HUMANIZE YOUR AI TEXT"
                    speed={3}
                    shineColor="#FF6B2C"
                    color="#1A1A1A"
                    spread={120}
                    yoyo={true}
                    className="mb-4 block"
                  />
                  <ShinyText
                    text="INSTANTLY"
                    speed={4}
                    shineColor="#FF6B2C"
                    color="#1A1A1A"
                    spread={120}
                    yoyo={true}
                    delay={0.5}
                    className="block"
                  />
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mx-auto mt-8 max-w-2xl font-mono text-lg text-[#1A1A1A]/60 md:text-xl"
              >
                Transform robotic AI content into natural, authentic human writing that bypasses all AI detectors.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-12 flex flex-wrap justify-center gap-4"
              >
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="cursor-pointer rounded-none bg-[#FF6B2C] px-10 py-6 font-mono text-lg font-bold transition-all hover:bg-[#FF6B2C]/90 hover:shadow-xl hover:shadow-[#FF6B2C]/25"
                >
                  START HUMANIZING <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  className="cursor-pointer rounded-none border-2 border-[#FF6B2C] bg-white px-10 py-6 font-mono text-lg font-bold text-[#FF6B2C] transition-all hover:bg-[#FF6B2C] hover:text-white"
                >
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="mt-12 flex items-center gap-8 font-mono text-sm text-[#1A1A1A]/40"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
                  <span>Free to try</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#FF6B2C]" />
                  <span>Works with any AI content</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="mt-16 w-full max-w-5xl"
              >
                <div className="shadow-premium relative overflow-hidden rounded-2xl border border-black/10 bg-white">
                  <div className="flex items-center gap-2 border-b border-black/10 bg-[#FAFAFA] px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <span className="ml-2 font-mono text-xs text-[#1A1A1A]/40">humanize-ai.app</span>
                  </div>
                  <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="bg-[#FAFAFA]/50 p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#1A1A1A]/40" />
                        <span className="font-mono text-xs text-[#1A1A1A]/40">AI Generated</span>
                      </div>
                      <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/60">
                        The rapid advancement of artificial intelligence presents both unprecedented opportunities and
                        significant challenges for modern society.
                      </p>
                    </div>
                    <div className="relative p-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B2C]/5 to-[#FF8F5A]/5" />
                      <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
                          <span className="font-mono text-xs text-[#FF6B2C]">Humanized</span>
                        </div>
                        <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]">
                          Technology has evolved at a breathtaking pace, opening doors we never imagined while
                          preserving authentic human creativity.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-mono text-xs text-white">
                            99%
                          </div>
                          <span className="font-mono text-xs text-green-600">Human Score</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.6 }}
                className="mt-24 flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex cursor-pointer flex-col items-center gap-3"
                >
                  <div className="relative">
                    <div className="flex h-16 w-10 items-start justify-center rounded-full border-3 border-[#FF6B2C] bg-white p-2 shadow-lg shadow-[#FF6B2C]/20">
                      <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-3.5 w-3.5 rounded-full bg-[#FF6B2C]"
                      />
                    </div>
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FF6B2C]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 90, opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="h-6 w-6 text-[#FF6B2C]" />
                    </motion.div>
                    <span className="font-mono text-sm font-bold tracking-widest text-[#FF6B2C]">SCROLL DOWN</span>
                    <motion.div
                      animate={{ rotate: -90, opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="h-6 w-6 text-[#FF6B2C]" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#FF6B2C]/5" />
          <div className="absolute top-0 left-1/2 h-full max-h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF6B2C]/10 via-[#FF8F5A]/5 to-[#FF6B2C]/10 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <ShinyText
                text="HOW IT WORKS"
                speed={4}
                shineColor="#FF6B2C"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-[#1A1A1A]/60">
                Transform AI content to human-like writing in four simple steps
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6B2C]/20 to-[#FF8F5A]/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative rounded-3xl border border-black/10 bg-white p-6 transition-colors hover:border-[#FF6B2C]/30">
                    <div className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B2C] to-[#FF8F5A] shadow-lg">
                      <span className="font-mono text-xs font-bold text-white">{step.number}</span>
                    </div>
                    <div className="mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#FF6B2C]/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF6B2C]/20">
                      <step.icon className="h-7 w-7 text-[#FF6B2C]" />
                    </div>
                    <h3 className="mb-2 font-mono text-lg font-bold">{step.title}</h3>
                    <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/60">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-6 z-20 hidden lg:flex">
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FF6B2C] bg-white shadow-sm"
                      >
                        <ArrowRight className="h-4 w-4 text-[#FF6B2C]" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-16 max-w-5xl"
            >
              <div className="shadow-premium overflow-hidden rounded-3xl border border-black/10 bg-white p-8">
                <div className="mb-6 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <span className="ml-2 font-mono text-xs text-[#1A1A1A]/40">humanizer demo</span>
                </div>
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="mb-2 flex items-center gap-2 text-[#FF6B2C]">
                      <span className="font-mono text-xs font-semibold">INPUT</span>
                    </div>
                    <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
                      <p className="font-mono text-sm text-[#1A1A1A]/60">
                        The rapid advancement of artificial intelligence presents both unprecedented opportunities and
                        significant challenges for modern society. AI systems can process vast amounts of data and
                        generate content at unprecedented speeds.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-black/10" />
                        <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 -left-12 hidden -translate-y-1/2 md:flex"
                    >
                      <RefreshCw className="h-10 w-10 text-[#FF6B2C]" />
                    </motion.div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#FF6B2C]">
                        <span className="font-mono text-xs font-semibold">OUTPUT</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl border border-[#FF6B2C]/20 bg-gradient-to-br from-[#FF6B2C]/5 to-[#FF8F5A]/5 p-4"
                      >
                        <p className="font-mono text-sm text-[#1A1A1A]">
                          Technology has evolved at a breathtaking pace, opening doors we never imagined. While AI tools
                          can crunch numbers and spit out text lightning-fast, there's something irreplaceable about
                          human creativity.
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="font-mono text-xs text-green-600">99% Human Score</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mb-4 text-center font-mono text-3xl font-bold md:text-4xl"
            >
              Why Choose Humanize AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="mx-auto mb-12 max-w-2xl text-center font-mono text-[#1A1A1A]/60"
            >
              The most advanced AI humanization tool that preserves your content's intent while making it undetectable.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.15, duration: 0.5 }}
                  className="group flex flex-col items-center rounded-2xl border border-black/10 bg-black/5 p-8 text-center transition-colors hover:border-[#FF6B2C]/30"
                >
                  <div className="mb-6 rounded-2xl bg-[#FF6B2C]/10 p-4 transition-colors group-hover:bg-[#FF6B2C]/20">
                    <feature.icon className="h-8 w-8 text-[#FF6B2C]" />
                  </div>
                  <h3 className="mb-4 font-mono text-xl font-bold">{feature.label}</h3>
                  <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/50">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B2C]/3 to-transparent" />
          <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-[#FF6B2C]/10 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#FF8F5A]/10 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <ShinyText
                text="PRICING PLANS"
                speed={4}
                shineColor="#FF6B2C"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-[#1A1A1A]/60">
                Choose the plan that fits your needs. Start free, upgrade when ready.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex justify-center"
            >
              <div className="shadow-premium inline-flex items-center gap-3 rounded-full border border-black/10 bg-white p-1.5">
                <button
                  onClick={() => setIsYearly(false)}
                  className={`rounded-full px-6 py-2 font-mono text-sm transition-all ${
                    !isYearly ? "bg-[#FF6B2C] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`rounded-full px-6 py-2 font-mono text-sm transition-all ${
                    isYearly ? "bg-[#FF6B2C] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                  }`}
                >
                  Yearly
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">-20%</span>
                </button>
              </div>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className={`group relative ${plan.highlighted ? "md:-mt-4" : ""}`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FF6B2C] to-[#FF8F5A] px-4 py-1.5 font-mono text-xs font-semibold text-white"
                      >
                        <Star className="h-3 w-3" /> MOST POPULAR
                      </motion.div>
                    </div>
                  )}
                  <div
                    className={`relative h-full rounded-3xl border bg-white transition-all duration-300 ${
                      plan.highlighted
                        ? "border-[#FF6B2C]/30 shadow-xl shadow-[#FF6B2C]/10"
                        : "border-black/10 hover:border-[#FF6B2C]/30"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FF6B2C]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative z-10 p-8">
                      <h3 className="mb-2 font-mono text-xl font-bold">{plan.name}</h3>
                      <p className="mb-6 font-mono text-sm text-[#1A1A1A]/60">{plan.description}</p>
                      <div className="mb-6">
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-4xl font-bold">
                            ${plan.highlighted && isYearly ? Math.floor(plan.price * 0.8) : plan.price}
                          </span>
                          <span className="font-mono text-[#1A1A1A]/40">/month</span>
                        </div>
                        {plan.highlighted && isYearly && (
                          <p className="mt-1 font-mono text-xs text-green-600">Billed $95 yearly</p>
                        )}
                      </div>
                      <ul className="mb-8 space-y-4">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={feature}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6B2C]/10">
                              <Check className="h-3 w-3 text-[#FF6B2C]" />
                            </div>
                            <span className="font-mono text-sm text-[#1A1A1A]/70">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onGetStarted}
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-mono font-semibold transition-all ${
                          plan.highlighted
                            ? "bg-gradient-to-r from-[#FF6B2C] to-[#FF8F5A] text-white hover:shadow-lg hover:shadow-[#FF6B2C]/25"
                            : "bg-black/5 text-[#1A1A1A] hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C]"
                        }`}
                      >
                        {plan.cta}
                        <ChevronRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-16 max-w-4xl"
            >
              <div className="rounded-3xl border border-[#FF6B2C]/20 bg-gradient-to-r from-[#FF6B2C]/10 via-white to-[#FF6B2C]/10 p-8 text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#FF6B2C]" />
                  <span className="font-mono text-sm font-semibold text-[#FF6B2C]">GUARANTEE</span>
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">30-Day Money Back Guarantee</h3>
                <p className="mx-auto max-w-xl font-mono text-[#1A1A1A]/60">
                  Not satisfied? Get a full refund within 30 days, no questions asked. Your satisfaction is our
                  priority.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F5F5F5] py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8 font-mono text-3xl font-bold md:text-4xl"
              >
                Ready to Humanize Your Content?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8 font-mono text-[#1A1A1A]/60"
              >
                Join thousands of users who trust Humanize AI for their content needs.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="cursor-pointer rounded-none bg-[#FF6B2C] px-10 py-6 font-mono text-base hover:bg-[#FF6B2C]/90"
                >
                  GET STARTED FREE <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-[#FF6B2C] to-[#FF8F5A]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-mono text-sm font-bold">Humanize AI</span>
            </div>
            <p className="font-mono text-sm text-[#1A1A1A]/40">© 2024 Humanize AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
