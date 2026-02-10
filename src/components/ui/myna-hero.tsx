"use client";

import { useRef, useState } from "react";
import { useEffect } from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  FileText,
  Heart,
  Mail,
  MessageSquare,
  Play,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  Target,
  Users,
  Wand2,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { PillBase } from "./3d-adaptive-navigation-bar";
import { FeatureCard } from "./feature-card";
import ShinyText from "./shiny-text";
import SpotlightCard from "./spotlight-card";

const useCases = [
  {
    icon: Briefcase,
    title: "Job Applications",
    description:
      "Craft compelling cover letters and follow-up emails that get noticed by recruiters and hiring managers.",
    examples: ["Cover letters", "Thank you notes", "Interview follow-ups", "Withdrawal emails"],
  },
  {
    icon: Users,
    title: "Networking",
    description:
      "Reach out to connections with personalized messages that spark conversations and build relationships.",
    examples: ["LinkedIn outreach", "Cold introductions", "Mentorship requests", "Informational interviews"],
  },
  {
    icon: Target,
    title: "Sales & Business",
    description: "Write persuasive cold emails and sales outreach that convert prospects into customers.",
    examples: ["Cold outreach", "Product pitches", "Proposal follow-ups", "Partnership proposals"],
  },
  {
    icon: Calendar,
    title: "Scheduling & Meetings",
    description: "Professional meeting requests and scheduling emails that get quick confirmations.",
    examples: ["Meeting requests", "Interview scheduling", "Demo bookings", "Consultation setups"],
  },
  {
    icon: Heart,
    title: "Customer Support",
    description: "Respond to customer inquiries with empathy and clarity while maintaining brand voice.",
    examples: ["Support responses", "Complaint resolutions", "Refund requests", "Feature feedback"],
  },
  {
    icon: MessageSquare,
    title: "Personal & Professional",
    description: "Handle everyday email needs from Apology letters to celebration messages with the right tone.",
    examples: ["Apology letters", "Congratulations", "Condolences", "Thank you notes"],
  },
];

const features = [
  {
    label: "AI-Powered Writing",
    description: "Simply describe what you want to achieve, and our AI crafts the perfect email draft in seconds.",
  },
  {
    label: "40+ Tone Options",
    description: "From formal to casual, empathetic to assertive - choose the tone that fits every situation.",
  },
  {
    label: "Instant Generation",
    description: "Get professional email drafts in under 3 seconds. No more staring at blank screens.",
  },
  {
    label: "50+ Email Templates",
    description: "Pre-built templates for every scenario - from job applications to difficult conversations.",
  },
  {
    label: "Unlimited Revisions",
    description: "Regenerate and refine until your email is perfect. No limits on how many times you edit.",
  },
  {
    label: "Context Awareness",
    description: "Our AI understands your context and tailors length, formality, and approach accordingly.",
  },
];

const tones = [
  { name: "Professional", color: "from-blue-500 to-indigo-600" },
  { name: "Friendly", color: "from-green-500 to-emerald-600" },
  { name: "Formal", color: "from-slate-600 to-slate-800" },
  { name: "Casual", color: "from-blue-500 to-amber-600" },
  { name: "Empathetic", color: "from-pink-500 to-rose-600" },
  { name: "Assertive", color: "from-red-500 to-crimson-600" },
  { name: "Persuasive", color: "from-purple-500 to-violet-600" },
  { name: "Apologetic", color: "from-gray-500 to-gray-600" },
];

const steps = [
  {
    number: "01",
    icon: Mail,
    title: "Describe Your Need",
    description:
      "Tell us what email you need - apply for a job, follow up on a sale, apologize for a delay, or anything else.",
  },
  {
    number: "02",
    icon: Target,
    title: "Choose Your Tone",
    description:
      "Select from 40+ tones - professional, friendly, empathetic, assertive, or customize to match your voice.",
  },
  {
    number: "03",
    icon: Wand2,
    title: "Get Your Draft",
    description: "Our AI generates a polished email draft in seconds, ready to send or further customize.",
  },
  {
    number: "04",
    icon: Send,
    title: "Send with Confidence",
    description: "Review, make any final tweaks, and send your professional email knowing it's impactf.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for trying out and occasional email needs",
    features: ["50 emails per month", "10 tone options", "Basic templates", "Email length control", "Standard support"],
    highlighted: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: 19,
    description: "Best for professionals who write emails daily",
    features: [
      "Unlimited emails",
      "All 40+ tones",
      "50+ templates",
      "Custom tone blending",
      "Save favorite drafts",
      "Priority support",
      "Export to Gmail/Outlook",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Team",
    price: 49,
    description: "For teams and departments that need consistency",
    features: [
      "Everything in Pro",
      "5 team members",
      "Brand voice settings",
      "Shared templates",
      "Team analytics",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
];

const testimonials = [
  {
    quote: "This tool saved me hours of staring at a blank screen. I wrote my entire job application in 5 minutes.",
    author: "Sarah M.",
    role: "Marketing Manager",
  },
  {
    quote: "As someone who hates difficult conversations, this helped me write an apology email that actually worked.",
    author: "David K.",
    role: "Small Business Owner",
  },
  {
    quote: "Our sales team saw a 40% increase in response rates after switching to emails generated by this tool.",
    author: "Lisa R.",
    role: "Sales Director",
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
  const [activeSection, setActiveSection] = useState("home");

  const sections = ["home", "use-cases", "features", "how-it-works", "pricing"];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (section !== "home") {
              setActiveSection(section);
            } else {
              setActiveSection("home");
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, isInView]);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-8">
          <span className="font-mono text-2xl font-bold tracking-tight">
            Dash<span className="text-[#3B82F6]">Pier</span>
          </span>

          <PillBase activeSection={activeSection} onSectionChange={setActiveSection} className="cursor-pointer" />

          <Button
            variant="default"
            onClick={onGetStarted}
            className="rounded-full bg-[#3B82F6] px-6 py-2.5 font-mono text-xs font-bold shadow-lg shadow-[#3B82F6]/25 transition-all hover:bg-[#3B82F6]/90 hover:shadow-xl hover:shadow-[#3B82F6]/30"
          >
            START WRITING
          </Button>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-screen items-center">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#3B82F6]/3 to-white" />
          <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#3B82F6]/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#60A5FA]/10 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="flex flex-col items-center py-20 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-[#3B82F6]" />
                  <span className="font-mono text-sm text-[#3B82F6]">Used by 100,000+ professionals</span>
                </div>
                <h1 className="mx-auto max-w-4xl font-mono text-5xl leading-tight font-bold sm:text-6xl md:text-7xl lg:text-8xl">
                  <ShinyText
                    text="WRITE PERFECT EMAILS"
                    speed={3}
                    shineColor="#3B82F6"
                    color="#1A1A1A"
                    spread={120}
                    yoyo={true}
                    className="mb-4 block"
                  />
                  <ShinyText
                    text="IN SECONDS"
                    speed={4}
                    shineColor="#3B82F6"
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
                Stop struggling with every email. Just describe what you need, choose your tone, and get a professional
                email draft instantly. From job applications to difficult conversations - we've got you covered.
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
                  className="cursor-pointer rounded-none bg-[#3B82F6] px-10 py-6 font-mono text-lg font-bold transition-all hover:bg-[#3B82F6]/90 hover:shadow-xl hover:shadow-[#3B82F6]/25"
                >
                  WRITE YOUR FIRST EMAIL <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  className="cursor-pointer rounded-none border-2 border-[#3B82F6] bg-white px-10 py-6 font-mono text-lg font-bold text-[#3B82F6] transition-all hover:bg-[#3B82F6] hover:text-white"
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
                  <Sparkles className="h-4 w-4 text-[#3B82F6]" />
                  <span>Free to try</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#3B82F6]" />
                  <span>3-second delivery</span>
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
                    <span className="ml-2 font-mono text-xs text-[#1A1A1A]/40">mynamail.app/editor</span>
                  </div>
                  <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="bg-[#FAFAFA]/50 p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-[#1A1A1A]/40" />
                        <span className="font-mono text-xs text-[#1A1A1A]/40">Your input</span>
                      </div>
                      <div className="space-y-3 font-mono text-sm leading-relaxed text-[#1A1A1A]/60">
                        <p className="rounded-lg border border-[#3B82F6]/20 bg-[#3B82F6]/10 p-3">
                          <span className="font-semibold text-[#3B82F6]">Idea:</span> Write a follow-up email to a
                          recruiter after interviewing last week. Keep it professional but friendly, show enthusiasm
                          without being pushy.
                        </p>
                        <p className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                          <span className="font-semibold text-blue-600">Tone:</span> Professional & Friendly
                        </p>
                      </div>
                    </div>
                    <div className="relative p-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/5 to-[#60A5FA]/5" />
                      <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#3B82F6]" />
                          <span className="font-mono text-xs text-[#3B82F6]">Generated Email</span>
                        </div>
                        <div className="space-y-2 font-mono text-sm leading-relaxed text-[#1A1A1A]">
                          <p className="font-semibold text-[#1A1A1A]">
                            Subject: Great Speaking With You - Following Up
                          </p>
                          <p>Dear [Recruiter Name],</p>
                          <p>
                            Thank you so much for taking the time to meet with me last week about the [Position] role. I
                            really enjoyed learning more about the team and the exciting projects you're working on.
                          </p>
                          <p>
                            I wanted to reiterate my enthusiasm for this opportunity. The company's mission and the
                            team's culture really resonate with my career goals. I'd love the chance to contribute to
                            [specific project mentioned].
                          </p>
                          <p>
                            Please let me know if you need any additional information from me. I look forward to hearing
                            from you!
                          </p>
                          <p className="text-[#1A1A1A]/60">
                            Best regards,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-mono text-xs text-white">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="font-mono text-xs text-green-600">Ready to send</span>
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
                className="mt-8 flex flex-col items-center gap-4"
              >
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex cursor-pointer flex-col items-center gap-3"
                >
                  <div className="relative">
                    <div className="flex h-16 w-10 items-start justify-center rounded-full border-3 border-[#3B82F6] bg-white p-2 shadow-lg shadow-[#3B82F6]/20">
                      <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-3.5 w-3.5 rounded-full bg-[#3B82F6]"
                      />
                    </div>
                    <motion.div
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#3B82F6]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 90, opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="h-6 w-6 text-[#3B82F6]" />
                    </motion.div>
                    <span className="font-mono text-sm font-bold tracking-widest text-[#3B82F6]">SCROLL DOWN</span>
                    <motion.div
                      animate={{ rotate: -90, opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="h-6 w-6 text-[#3B82F6]" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="relative overflow-hidden bg-gradient-to-b from-white to-[#3B82F6]/5 py-20">
          <div className="absolute inset-0 bg-[#3B82F6]/5" />
          <div className="absolute top-0 left-1/2 h-full max-h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-r from-[#3B82F6]/10 via-[#60A5FA]/5 to-[#3B82F6]/10 blur-3xl" />
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <ShinyText
                text="EVERY EMAIL SCENARIO"
                speed={4}
                shineColor="#3B82F6"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-lg text-[#1A1A1A]/60">
                From everyday professional communication to difficult conversations - handle any email situation with
                confidence.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <SpotlightCard glowColor="blue" className="h-full cursor-pointer !rounded-3xl p-0">
                    <div className="h-full rounded-2xl border border-black/10 bg-white p-6">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3B82F6]/10">
                        <useCase.icon className="h-7 w-7 text-[#3B82F6]" />
                      </div>
                      <h3 className="mb-3 font-mono text-xl font-bold">{useCase.title}</h3>
                      <p className="mb-4 font-mono text-sm leading-relaxed text-[#1A1A1A]/60">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((example) => (
                          <span
                            key={example}
                            className="rounded-full bg-[#3B82F6]/10 px-3 py-1 font-mono text-xs text-[#3B82F6]"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <ShinyText
                text="40+ TONES TO MATCH ANY SITUATION"
                speed={4}
                shineColor="#3B82F6"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-lg text-[#1A1A1A]/60">
                Choose the perfect tone for every situation. From formal business correspondence to friendly follow-ups.
              </p>
            </motion.div>

            <div className="mx-auto max-w-6xl">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {tones.map((tone, index) => (
                  <motion.div
                    key={tone.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="group cursor-pointer"
                    onMouseEnter={() => setActiveTone(index)}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${tone.color} p-6 text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-${tone.color.split("-")[1]}/30`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative z-10">
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                          <Mail className="h-5 w-5" />
                        </div>
                        <h3 className="font-mono text-lg font-bold">{tone.name}</h3>
                        <p className="mt-2 font-mono text-xs opacity-80">
                          {tone.name === "Professional" &&
                            "Business correspondence, formal requests, workplace communication"}
                          {tone.name === "Friendly" && "Casual updates, team messages, relaxed professional tone"}
                          {tone.name === "Formal" && "Legal documents, official requests, academic correspondence"}
                          {tone.name === "Casual" && "Peer communication, quick updates, internal team messages"}
                          {tone.name === "Empathetic" &&
                            "Customer support, difficult situations, showing understanding"}
                          {tone.name === "Assertive" && "Setting boundaries, urgent requests, standing your ground"}
                          {tone.name === "Persuasive" && "Sales pitches, proposals, convincing arguments"}
                          {tone.name === "Apologetic" && "Service failures, mistakes, requesting understanding"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* how-it-works section moved below */}

        <section id="features" className="py-20" ref={ref}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="mb-4 text-center font-mono text-3xl font-bold md:text-4xl"
            >
              Why DashPier?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="mx-auto mb-12 max-w-2xl text-center font-mono text-lg text-[#1A1A1A]/60"
            >
              The only AI email writer designed to make every email you write more effective, professional, and
              impactful.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.6 }}
              className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.1, duration: 0.5 }}
                >
                  <FeatureCard title={feature.label} description={feature.description} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F5F5F5] py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="rounded-2xl bg-white p-6 shadow-lg"
                >
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#3B82F6] text-[#3B82F6]" />
                    ))}
                  </div>
                  <p className="mb-4 font-mono text-sm leading-relaxed text-[#1A1A1A]">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-mono text-sm font-bold">{testimonial.author}</p>
                    <p className="font-mono text-xs text-[#1A1A1A]/50">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#3B82F6]/5" />
          <div className="absolute top-0 left-1/2 h-full max-h-[600px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-gradient-to-r from-[#3B82F6]/10 via-[#60A5FA]/5 to-[#3B82F6]/10 blur-3xl" />
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
                shineColor="#3B82F6"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-[#1A1A1A]/60">
                Write professional emails in four simple steps - no more writer&apos;s block
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
                >
                  <SpotlightCard glowColor="blue" className="h-full cursor-pointer !rounded-3xl p-0">
                    <div className="relative h-full rounded-2xl border border-black/10 bg-white p-6">
                      <div className="absolute -top-3 -right-3 z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] shadow-lg">
                        <span className="font-mono text-xs font-bold text-white">{step.number}</span>
                      </div>
                      <div className="mt-2 mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3B82F6]/10">
                        <step.icon className="h-7 w-7 text-[#3B82F6]" />
                      </div>
                      <h3 className="mb-2 font-mono text-lg font-bold">{step.title}</h3>
                      <p className="font-mono text-sm leading-relaxed text-[#1A1A1A]/60">{step.description}</p>
                    </div>
                  </SpotlightCard>
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 -right-6 z-20 hidden lg:flex">
                      <motion.div
                        animate={{ x: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#3B82F6] bg-white shadow-sm"
                      >
                        <ArrowRight className="h-4 w-4 text-[#3B82F6]" />
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
                  <span className="ml-2 font-mono text-xs text-[#1A1A1A]/40">mynamail.app/demo</span>
                </div>
                <div className="grid items-center gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="mb-2 flex items-center gap-2 text-[#3B82F6]">
                      <span className="font-mono text-xs font-semibold">YOUR IDEA</span>
                    </div>
                    <div className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4">
                      <p className="font-mono text-sm text-[#1A1A1A]/60">
                        &quot;I need to write a cold outreach email to a potential client about our marketing services.
                        Keep it professional but not pushy. Mention we helped similar companies increase leads by
                        40%.&quot;
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-px flex-1 bg-black/10" />
                        <Target className="h-4 w-4 text-[#3B82F6]" />
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 -left-12 hidden -translate-y-1/2 md:flex"
                    >
                      <ArrowRight className="h-10 w-10 text-[#3B82F6]" />
                    </motion.div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#3B82F6]">
                        <span className="font-mono text-xs font-semibold">READY-TO-SEND EMAIL</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#3B82F6]/5 to-[#60A5FA]/5 p-4"
                      >
                        <p className="font-semibold text-[#1A1A1A]">Subject: Quick Question About Your Marketing</p>
                        <p className="mt-2 font-mono text-sm text-[#1A1A1A]">Hi [Name],</p>
                        <p className="mt-2 font-mono text-sm text-[#1A1A1A]">
                          I came across [Company] and was impressed by your recent growth. I have helped similar
                          businesses in your space achieve remarkable results - one client saw a 40% increase in
                          qualified leads within just 3 months.
                        </p>
                        <p className="mt-2 font-mono text-sm text-[#1A1A1A]">
                          I would love to share some ideas that could work for you. Would you be open to a quick
                          15-minute call this week?
                        </p>
                        <p className="mt-4 font-mono text-sm text-[#1A1A1A]/60">
                          Best regards,
                          <br />
                          [Your Name]
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="font-mono text-xs text-green-600">Professional & Persuasive</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3B82F6]/3 to-transparent" />
          <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-3xl" />
          <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#60A5FA]/10 blur-3xl" />
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
                shineColor="#3B82F6"
                color="#1A1A1A"
                spread={80}
                yoyo={true}
                className="mb-4 font-mono text-3xl font-bold md:text-4xl"
              />
              <p className="mx-auto max-w-2xl font-mono text-[#1A1A1A]/60">
                Start free, upgrade when email writing becomes your superpower.
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
                    !isYearly ? "bg-[#3B82F6] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsYearly(true)}
                  className={`rounded-full px-6 py-2 font-mono text-sm transition-all ${
                    isYearly ? "bg-[#3B82F6] text-white" : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
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
                        className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] px-4 py-1.5 font-mono text-xs font-semibold text-white"
                      >
                        <Star className="h-3 w-3" /> MOST POPULAR
                      </motion.div>
                    </div>
                  )}
                  <div
                    className={`relative h-full rounded-3xl border bg-white transition-all duration-300 ${
                      plan.highlighted
                        ? "border-[#3B82F6]/30 shadow-xl shadow-[#3B82F6]/10"
                        : "border-black/10 hover:border-[#3B82F6]/30"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#3B82F6]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                          <p className="mt-1 font-mono text-xs text-green-600">Billed $182 yearly</p>
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
                            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10">
                              <Check className="h-3 w-3 text-[#3B82F6]" />
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
                            ? "bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white hover:shadow-lg hover:shadow-[#3B82F6]/25"
                            : "bg-black/5 text-[#1A1A1A] hover:bg-[#3B82F6]/10 hover:text-[#3B82F6]"
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
              <div className="rounded-3xl border border-[#3B82F6]/20 bg-gradient-to-r from-[#3B82F6]/10 via-white to-[#3B82F6]/10 p-8 text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#3B82F6]" />
                  <span className="font-mono text-sm font-semibold text-[#3B82F6]">SATISFACTION GUARANTEE</span>
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">Love Your Emails or It's Free</h3>
                <p className="mx-auto max-w-xl font-mono text-[#1A1A1A]/60">
                  Try DashPier risk-free for 7 days. If you don't write better emails, cancel anytime. No questions, no
                  hassle, no hard feelings.
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
                Ready to Write Better Emails?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8 font-mono text-lg text-[#1A1A1A]/60"
              >
                Join 100,000+ professionals who never struggle with email again. From job applications to difficult
                conversations - write with confidence.
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
                  className="cursor-pointer rounded-none bg-[#3B82F6] px-10 py-6 font-mono text-base hover:bg-[#3B82F6]/90"
                >
                  START WRITING FREE <ArrowRight className="ml-2 h-5 w-5" />
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
              <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-[#3B82F6] to-[#60A5FA]">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="font-mono text-sm font-bold">DashPier</span>
            </div>
            <p className="font-mono text-sm text-[#1A1A1A]/40">
              © 2025 DashPier. Write better emails, get better results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
