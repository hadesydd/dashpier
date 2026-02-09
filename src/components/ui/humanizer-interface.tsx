"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  FileText,
  GraduationCap,
  MessageSquare,
  RotateCcw,
  Settings,
  Sparkles,
  Type,
  Zap,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const TEMPLATES: Template[] = [
  {
    id: "essay",
    name: "Essay",
    icon: FileText,
    text: "The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant challenges for modern society.",
  },
  {
    id: "email",
    name: "Email",
    icon: MessageSquare,
    text: "Dear Professor Johnson,\n\nI am writing to request an extension on the research paper due next Friday.",
  },
  {
    id: "blog",
    name: "Blog",
    icon: Type,
    text: "Artificial intelligence has revolutionized the way we approach content creation.",
  },
  {
    id: "social",
    name: "Social Media",
    icon: MessageSquare,
    text: "Excited to announce our new product launch! Check out our website for more details. #innovation #tech #newproduct",
  },
  {
    id: "business",
    name: "Business",
    icon: FileText,
    text: "We are pleased to inform you that your application has been reviewed and we would like to schedule an interview.",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Type,
    text: "The sunset painted the sky in shades of orange and pink, creating a breathtaking view that captivated everyone who witnessed it.",
  },
];

const MODES = [
  { id: "standard", name: "Standard", icon: Type },
  { id: "academic", name: "Academic", icon: GraduationCap },
  { id: "casual", name: "Casual", icon: MessageSquare },
];

interface HumanizerInterfaceProps {
  onBack: () => void;
}

export default function HumanizerInterface({ onBack }: HumanizerInterfaceProps) {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [selectedMode, setSelectedMode] = useState("standard");
  const [copied, setCopied] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTransform = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOutputText(inputText + " This text has been humanized to sound more natural and authentic.");
    setConfidence(99);
    setIsLoading(false);
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
    a.download = "humanized.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setInputText("");
    setOutputText("");
    setConfidence(0);
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
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-mono text-xl font-bold">Humanize AI</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm text-[#1A1A1A]/70 transition-colors hover:bg-black/5 hover:text-[#1A1A1A]"
              >
                <FileText className="h-4 w-4" />
                Templates
              </button>

              <button className="rounded-lg p-2 text-[#1A1A1A]/70 transition-colors hover:bg-black/5 hover:text-[#1A1A1A]">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="shadow-premium overflow-hidden rounded-3xl border border-black/10 bg-white"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {MODES.map((mode) => (
                    <motion.button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-sm transition-all ${
                        selectedMode === mode.id
                          ? "bg-[#FF6B2C] text-white"
                          : "bg-black/5 text-[#1A1A1A]/70 hover:bg-black/10"
                      }`}
                    >
                      <mode.icon className="h-4 w-4" />
                      {mode.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {confidence > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5"
                  >
                    <Zap className="h-4 w-4 text-[#FF6B2C]" />
                    <span className="font-mono text-sm font-semibold">{confidence}%</span>
                  </motion.div>
                )}

                <button
                  onClick={clearAll}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-sm text-[#1A1A1A]/60 transition-colors hover:bg-black/5 hover:text-[#1A1A1A]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>

            <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="relative min-h-[400px] bg-[#FAFAFA]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your AI-generated text here..."
                  className="h-full min-h-[400px] w-full resize-none border-0 bg-transparent px-6 py-5 font-mono text-[15px] leading-relaxed text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:ring-0 focus:outline-none"
                />
                {!inputText && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 h-12 w-12 text-[#1A1A1A]/20" />
                      <p className="font-mono text-sm text-[#1A1A1A]/40">Paste text to humanize</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative min-h-[400px] bg-white">
                {outputText ? (
                  <div className="h-full min-h-[400px] w-full px-6 py-5 font-mono text-[15px] leading-relaxed whitespace-pre-wrap text-[#1A1A1A]/80">
                    {outputText}
                  </div>
                ) : (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 h-12 w-12 text-[#1A1A1A]/20" />
                      <p className="font-mono text-sm text-[#1A1A1A]/40">Result will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-black/10 px-6 py-4">
              <div className="font-mono text-sm text-[#1A1A1A]/40">
                {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
              </div>

              <div className="flex gap-3">
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
                  onClick={handleTransform}
                  disabled={isLoading || !inputText.trim()}
                  whileHover={{ scale: isLoading || !inputText.trim() ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || !inputText.trim() ? 1 : 0.98 }}
                  className={`flex items-center gap-2 rounded-xl px-8 py-2.5 font-mono font-semibold transition-all ${
                    isLoading || !inputText.trim()
                      ? "cursor-not-allowed bg-black/10 text-[#1A1A1A]/40"
                      : "bg-[#FF6B2C] text-white hover:bg-[#FF6B2C]/90"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                      />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Humanize</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            {MODES.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
                  selectedMode === mode.id
                    ? "bg-[#FF6B2C] text-white"
                    : "border border-black/10 bg-white text-[#1A1A1A]/70 hover:bg-black/5"
                }`}
              >
                <mode.icon className="h-8 w-8" />
                <span className="font-mono text-sm">{mode.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </main>

      {showTemplates && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24"
          onClick={() => setShowTemplates(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-black/10 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-black/10 px-4 py-3">
              <span className="font-mono text-sm font-semibold">Templates</span>
            </div>
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setInputText(template.text);
                  setShowTemplates(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-black/5"
              >
                <template.icon className="h-5 w-5 text-[#FF6B2C]" />
                <span className="font-mono text-sm">{template.name}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}

      <footer className="border-t border-black/5 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-xs text-[#1A1A1A]/30">
            © 2024 Humanize AI. Transform AI text into human-like writing.
          </p>
        </div>
      </footer>
    </div>
  );
}
