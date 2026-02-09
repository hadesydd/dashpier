"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlignLeft,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Download,
  Heart,
  Mail,
  MessageSquare,
  RefreshCw,
  Send,
  Settings,
  Sliders,
  Sparkles,
  Sparkles as SparklesIcon,
  Type,
  Users,
  Zap,
} from "lucide-react";

import ShinyText from "./shiny-text";
import SpotlightCard from "./spotlight-card";

const TONES = [
  { id: "professional", name: "Professional", description: "Business formal", formality: 5 },
  { id: "formal", name: "Formal", description: "Highly ceremonial", formality: 7 },
  { id: "semi-formal", name: "Semi-Formal", description: "Professional yet friendly", formality: 4 },
  { id: "friendly", name: "Friendly", description: "Warm and approachable", formality: 2 },
  { id: "casual", name: "Casual", description: "Relaxed conversation", formality: 1 },
  { id: "empathetic", name: "Empathetic", description: "Understanding and caring", formality: 3 },
  { id: "assertive", name: "Assertive", description: "Direct and confident", formality: 4 },
  { id: "persuasive", name: "Persuasive", description: "Convincing and compelling", formality: 4 },
  { id: "apologetic", name: "Apologetic", description: "Sincere and accountable", formality: 5 },
  { id: "grateful", name: "Grateful", description: "Thankful and appreciative", formality: 3 },
  { id: "enthusiastic", name: "Enthusiastic", description: "Energetic and excited", formality: 1 },
  { id: "sympathetic", name: "Sympathetic", description: "Compassionate support", formality: 3 },
];

const LENGTHS = [
  { id: "concise", name: "Concise", description: "Short and direct", words: "50-100" },
  { id: "balanced", name: "Balanced", description: "Moderate length", words: "100-200" },
  { id: "detailed", name: "Detailed", description: "Comprehensive", words: "200-400" },
];

const FORMALITY_LEVELS = [
  { id: "very-casual", name: "Very Casual", emoji: "😊" },
  { id: "casual", name: "Casual", emoji: "🙂" },
  { id: "balanced", name: "Balanced", emoji: "😐" },
  { id: "formal", name: "Formal", emoji: "👔" },
  { id: "very-formal", name: "Very Formal", emoji: "🎩" },
];

const STRUCTURES = [
  { id: "standard", name: "Standard", description: "Intro, body, conclusion" },
  { id: "aida", name: "AIDA", description: "Attention, Interest, Desire, Action" },
  { id: "past", name: "P.A.S.T.", description: "Problem, Agitation, Solution, Testimonial" },
  { id: "direct", name: "Direct", description: "Get straight to the point" },
];

interface EmailWriterInterfaceProps {
  onBack: () => void;
}

export default function EmailWriterInterface({ onBack }: EmailWriterInterfaceProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState("professional");
  const [selectedLength, setSelectedLength] = useState("balanced");
  const [selectedFormality, setSelectedFormality] = useState("balanced");
  const [selectedStructure, setSelectedStructure] = useState("standard");
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [includeSubject, setIncludeSubject] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");

    await new Promise((resolve) => setTimeout(resolve, 2500));

    const length = selectedLength === "concise" ? 2 : selectedLength === "detailed" ? 6 : 4;
    const formalityMultiplier =
      selectedFormality === "very-casual"
        ? 0.3
        : selectedFormality === "casual"
          ? 0.6
          : selectedFormality === "formal"
            ? 1.4
            : selectedFormality === "very-formal"
              ? 1.8
              : 1;

    const toneStyles: Record<string, string[]> = {
      professional: [
        "I hope this message finds you well.",
        "I am reaching out regarding",
        "I would like to express my interest",
        "Please let me know if you require additional information.",
        "Thank you for your time and consideration.",
      ],
      formal: [
        "I am writing to formally address",
        "Please accept my sincere regards",
        "I wish to respectfully bring to your attention",
        "I would be most grateful for your favorable consideration",
        "I remain, yours respectfully",
      ],
      "semi-formal": [
        "I hope you are doing well.",
        "I wanted to reach out about",
        "I am interested in discussing",
        "Let me know what you think",
        "Looking forward to hearing from you",
      ],
      friendly: [
        "Hope you are doing great!",
        "I wanted to share some thoughts",
        "It has been a while since we connected",
        "I would love to hear what you think",
        "Looking forward to catching up soon!",
      ],
      casual: [
        "Hey there!",
        "Just wanted to shoot you a quick message",
        "Been thinking about what we talked about",
        "Let me know what you think",
        "Talk soon!",
      ],
      empathetic: [
        "I understand this situation may be challenging",
        "I want you to know I truly appreciate",
        "Your feelings and perspective are valid",
        "I am here to support you",
        "Thank you for trusting me",
      ],
      assertive: [
        "I need to address this directly",
        "I want to be clear about my expectations",
        "This requires immediate attention",
        "I expect a prompt response",
        "Let us resolve this efficiently",
      ],
      persuasive: [
        "Here is an opportunity you will not want to miss",
        "I have something that could make a difference",
        "Imagine the results you could achieve",
        "Many others have seen success",
        "The next step is simple",
      ],
      apologetic: [
        "I sincerely apologize for what happened",
        "I take full responsibility",
        "I understand your disappointment",
        "Please allow me to make this up",
        "I am committed to ensuring this never happens again",
      ],
      grateful: [
        "I wanted to express my heartfelt thanks",
        "Your support means a lot to me",
        "I am deeply grateful for your help",
        "This would not have been possible without you",
        "Thank you for everything",
      ],
      enthusiastic: [
        "I am so excited to share this with you!",
        "This is going to be amazing!",
        "I can barely contain my excitement",
        "This is going to change everything!",
        "Let us do this!",
      ],
      sympathetic: [
        "I truly understand what you are going through",
        "My heart goes out to you",
        "I am here for you during this time",
        "Please know you are not alone",
        "Sending you my warmest thoughts",
      ],
    };

    const body = toneStyles[selectedTone] || toneStyles["professional"];
    const selectedParagraphs = body.slice(0, length);

    let email = "";
    if (includeSubject) {
      email += `Subject: ${getSubjectLine(inputText)}\n\n`;
    }
    email += "Dear [Recipient Name],\n\n";
    email += selectedParagraphs.join("\n\n");
    email += "\n\n";
    if (includeSignature) {
      email += "Best regards,\n[Your Name]\n[Your Title]\n\n";
    }
    if (includeCTA && !email.includes("Looking forward")) {
      email += getCTA(selectedTone);
    }
    email += `\n\n---\n📝 Tone: ${TONES.find((t) => t.id === selectedTone)?.name} | Length: ${selectedLength} | Formality: ${FORMALITY_LEVELS.find((f) => f.id === selectedFormality)?.name}`;

    setOutputText(email);
    setIsLoading(false);
  };

  const getSubjectLine = (input: string): string => {
    const keywords = input.toLowerCase();
    if (keywords.includes("job") || keywords.includes("application") || keywords.includes("position")) {
      return "Application for [Position Name] - [Your Name]";
    } else if (keywords.includes("meeting") || keywords.includes("schedule")) {
      return "Meeting Request: [Topic Discussion]";
    } else if (keywords.includes("follow") || keywords.includes("interview")) {
      return "Following Up - [Interview/Discussion Topic]";
    } else if (keywords.includes("thank") || keywords.includes("grateful")) {
      return "Thank You for Your Help";
    } else if (keywords.includes("sales") || keywords.includes("service") || keywords.includes("solution")) {
      return "Quick Question About [Company Name]'s Goals";
    } else if (keywords.includes("apology") || keywords.includes("sorry") || keywords.includes("delay")) {
      return "My Apologies - [Situation/Issue]";
    } else if (keywords.includes("complaint")) {
      return "Regarding Your Recent Experience";
    } else {
      return "Quick Hello & Introduction";
    }
  };

  const getCTA = (tone: string): string => {
    const ctas: Record<string, string> = {
      professional: "Please let me know if you have any questions.",
      formal: "I remain at your disposal for any further information.",
      friendly: "Looking forward to hearing from you!",
      casual: "Let me know what you think!",
      empathetic: "I'm here if you need any support.",
      assertive: "I look forward to your prompt response.",
      persuasive: "Let's connect and discuss further.",
      apologetic: "Thank you for your understanding.",
      grateful: "Once again, thank you for everything!",
      enthusiastic: "Can't wait to see what you think!",
      sympathetic: "Sending you strength and support.",
    };
    return ctas[tone] || "Looking forward to hearing from you.";
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-draft.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-[#1A1A1A]/70 transition-colors hover:text-[#1A1A1A]"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-mono text-sm">Back</span>
              </motion.button>

              <div className="h-6 w-px bg-black/10" />

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF6B2C] to-[#FF8F5A]">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span className="font-mono text-xl font-bold">DashPier</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowAdvanced(!showAdvanced)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                  showAdvanced ? "bg-[#FF6B2C] text-white" : "bg-black/5 text-[#1A1A1A]/70 hover:bg-black/10"
                }`}
              >
                <Sliders className="h-4 w-4" />
                {showAdvanced ? "Simple Mode" : "Advanced Mode"}
              </motion.button>

              <button className="rounded-lg p-2 text-[#1A1A1A]/70 transition-colors hover:bg-black/5 hover:text-[#1A1A1A]">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <ShinyText
              text={showAdvanced ? "ADVANCED EMAIL GENERATOR" : "WRITE YOUR EMAIL"}
              speed={3}
              shineColor="#FF6B2C"
              color="#1A1A1A"
              spread={100}
              yoyo={true}
              className="mb-4 font-mono text-3xl font-bold md:text-4xl"
            />
            <p className="font-mono text-[#1A1A1A]/60">
              {showAdvanced
                ? "Full control over tone, length, formality, and structure"
                : "Describe what you need and get a professional email draft instantly"}
            </p>
          </motion.div>

          <SpotlightCard glowColor="orange" className="w-full overflow-hidden !rounded-3xl p-0">
            <AnimatePresence mode="wait">
              {showAdvanced ? (
                <motion.div
                  key="advanced"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div>
                        <label className="mb-3 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                          <Type className="h-4 w-4" />
                          TONE ({TONES.length}+ options)
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TONES.slice(0, 9).map((tone) => (
                            <motion.button
                              key={tone.id}
                              onClick={() => setSelectedTone(tone.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`rounded-lg px-3 py-2 text-left font-mono text-xs transition-all ${
                                selectedTone === tone.id
                                  ? "bg-[#FF6B2C] text-white shadow-lg"
                                  : "bg-black/5 hover:bg-black/10"
                              }`}
                            >
                              <div className="font-semibold">{tone.name}</div>
                              <div className="text-[10px] opacity-70">{tone.description}</div>
                            </motion.button>
                          ))}
                        </div>
                        <motion.button
                          onClick={() => {}}
                          className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg py-2 font-mono text-xs text-[#FF6B2C] transition-colors hover:bg-[#FF6B2C]/10"
                        >
                          <ChevronDown className="h-4 w-4" />
                          View All 40+ Tones
                        </motion.button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                            <AlignLeft className="h-4 w-4" />
                            Length
                          </label>
                          <div className="space-y-1">
                            {LENGTHS.map((length) => (
                              <motion.button
                                key={length.id}
                                onClick={() => setSelectedLength(length.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full rounded-lg px-3 py-2 text-left font-mono text-xs transition-all ${
                                  selectedLength === length.id
                                    ? "bg-[#FF6B2C] text-white shadow-lg"
                                    : "bg-black/5 hover:bg-black/10"
                                }`}
                              >
                                <div className="font-semibold">
                                  {length.name} ({length.words} words)
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                            <Users className="h-4 w-4" />
                            Formality
                          </label>
                          <div className="space-y-1">
                            {FORMALITY_LEVELS.map((level) => (
                              <motion.button
                                key={level.id}
                                onClick={() => setSelectedFormality(level.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full rounded-lg px-3 py-2 text-left font-mono text-xs transition-all ${
                                  selectedFormality === level.id
                                    ? "bg-[#FF6B2C] text-white shadow-lg"
                                    : "bg-black/5 hover:bg-black/10"
                                }`}
                              >
                                <span className="mr-2">{level.emoji}</span>
                                {level.name}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                          <MessageSquare className="h-4 w-4" />
                          Structure
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {STRUCTURES.map((structure) => (
                            <motion.button
                              key={structure.id}
                              onClick={() => setSelectedStructure(structure.id)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`rounded-lg px-3 py-2 text-left font-mono text-xs transition-all ${
                                selectedStructure === structure.id
                                  ? "bg-[#FF6B2C] text-white shadow-lg"
                                  : "bg-black/5 hover:bg-black/10"
                              }`}
                            >
                              <div className="font-semibold">{structure.name}</div>
                              <div className="text-[10px] opacity-70">{structure.description}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                          <SparklesIcon className="h-4 w-4" />
                          Options
                        </label>
                        <div className="space-y-2">
                          {[
                            { label: "Include Subject Line", checked: includeSubject, set: setIncludeSubject },
                            {
                              label: "Add Professional Signature",
                              checked: includeSignature,
                              set: setIncludeSignature,
                            },
                            { label: "Include Call to Action", checked: includeCTA, set: setIncludeCTA },
                          ].map((option) => (
                            <motion.label
                              key={option.label}
                              className="flex cursor-pointer items-center gap-3 rounded-lg bg-black/5 p-3 transition-colors hover:bg-black/10"
                            >
                              <input
                                type="checkbox"
                                checked={option.checked}
                                onChange={(e) => option.set(e.target.checked)}
                                className="h-4 w-4 accent-[#FF6B2C]"
                              />
                              <span className="font-mono text-xs">{option.label}</span>
                            </motion.label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 flex items-center gap-2 font-mono text-sm font-semibold text-[#1A1A1A]/60">
                          <Clock className="h-4 w-4" />
                          Quick Templates
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["Job Application", "Follow Up", "Cold Outreach", "Thank You", "Apology", "Sales Pitch"].map(
                            (template) => (
                              <motion.button
                                key={template}
                                onClick={() => {
                                  setInputText(`Write a ${template.toLowerCase()} email.`);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="rounded-full bg-black/5 px-3 py-1 font-mono text-xs transition-colors hover:bg-[#FF6B2C]/20 hover:text-[#FF6B2C]"
                              >
                                {template}
                              </motion.button>
                            )
                          )}
                        </div>
                      </div>

                      <motion.button
                        onClick={clearAll}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-black/5 py-3 font-mono text-sm text-[#1A1A1A]/60 transition-colors hover:bg-black/10"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Clear All Settings
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="simple"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8"
                >
                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-sm font-semibold text-[#1A1A1A]/60">TONE</label>
                      <div className="flex flex-wrap gap-2">
                        {TONES.slice(0, 6).map((tone) => (
                          <motion.button
                            key={tone.id}
                            onClick={() => setSelectedTone(tone.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                              selectedTone === tone.id
                                ? "bg-[#FF6B2C] text-white shadow-lg"
                                : "bg-black/5 hover:bg-black/10"
                            }`}
                          >
                            {tone.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-sm font-semibold text-[#1A1A1A]/60">LENGTH</label>
                      <div className="flex flex-wrap gap-2">
                        {LENGTHS.map((length) => (
                          <motion.button
                            key={length.id}
                            onClick={() => setSelectedLength(length.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                              selectedLength === length.id
                                ? "bg-[#FF6B2C] text-white shadow-lg"
                                : "bg-black/5 hover:bg-black/10"
                            }`}
                          >
                            {length.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="relative min-h-[250px] bg-[#FAFAFA]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe what email you need to write...\n\nExample: Write a follow-up email to a recruiter after interviewing for a marketing position."
                  className="h-full min-h-[250px] w-full resize-none border-0 bg-transparent px-6 py-5 font-mono text-[15px] leading-relaxed text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:ring-0 focus:outline-none"
                />
                {!inputText && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-sm text-center">
                      <Sparkles className="mx-auto mb-3 h-12 w-12 text-[#1A1A1A]/20" />
                      <p className="mb-2 font-mono text-sm text-[#1A1A1A]/40">Describe your email need</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative min-h-[250px] bg-white">
                {outputText ? (
                  <div className="h-full min-h-[250px] w-full px-6 py-5 font-mono text-[15px] leading-relaxed whitespace-pre-wrap text-[#1A1A1A]/80">
                    {outputText}
                  </div>
                ) : (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 h-12 w-12 text-[#1A1A1A]/20" />
                      <p className="font-mono text-sm text-[#1A1A1A]/40">Your email will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 bg-white/50 px-6 py-4">
              <div className="font-mono text-sm text-[#1A1A1A]/40">
                {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
              </div>

              <div className="flex flex-wrap gap-3">
                {outputText && (
                  <>
                    <motion.button
                      onClick={handleCopy}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-5 py-2.5 transition-all hover:bg-black/10"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="font-mono text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span className="font-mono text-sm">Copy</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleDownload}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 rounded-xl border border-black/10 bg-black/5 px-5 py-2.5 transition-all hover:bg-black/10"
                    >
                      <Download className="h-4 w-4" />
                      <span className="font-mono text-sm">Download</span>
                    </motion.button>
                  </>
                )}

                <motion.button
                  onClick={handleGenerate}
                  disabled={isLoading || !inputText.trim()}
                  whileHover={{ scale: isLoading || !inputText.trim() ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || !inputText.trim() ? 1 : 0.98 }}
                  className={`flex items-center gap-2 rounded-xl px-8 py-2.5 font-mono font-semibold transition-all ${
                    isLoading || !inputText.trim()
                      ? "cursor-not-allowed bg-black/10 text-[#1A1A1A]/40"
                      : "bg-[#FF6B2C] text-white shadow-lg shadow-[#FF6B2C]/25 hover:bg-[#FF6B2C]/90"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                      />
                      <span>Writing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Write Email</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </SpotlightCard>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            <div className="rounded-2xl border border-[#FF6B2C]/20 bg-gradient-to-br from-orange-50 to-[#FF6B2C]/10 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B2C]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-mono font-bold">3 Seconds</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/70">Average generation time</p>
            </div>

            <div className="rounded-2xl border border-[#FF6B2C]/20 bg-gradient-to-br from-orange-50 to-[#FF6B2C]/10 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B2C]">
                  <Sliders className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-mono font-bold">40+ Tones</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/70">Full customization control</p>
            </div>

            <div className="rounded-2xl border border-[#FF6B2C]/20 bg-gradient-to-br from-orange-50 to-[#FF6B2C]/10 p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B2C]">
                  <RefreshCw className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-mono font-bold">Unlimited</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/70">Regenerate and perfect</p>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-black/5 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-xs text-[#1A1A1A]/30">
            © 2025 DashPier - Write better emails, get better results.
          </p>
        </div>
      </footer>
    </div>
  );
}
