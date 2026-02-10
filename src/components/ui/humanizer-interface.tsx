"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Download, PenLine, RefreshCw, Settings, Sparkles } from "lucide-react";

import ShinyText from "./shiny-text";

const TONES = [
  { id: "professional", name: "Professional", description: "Business formal" },
  { id: "formal", name: "Formal", description: "Highly ceremonial" },
  { id: "semi-formal", name: "Semi-Formal", description: "Professional yet friendly" },
  { id: "friendly", name: "Friendly", description: "Warm and approachable" },
  { id: "casual", name: "Casual", description: "Relaxed conversation" },
  { id: "empathetic", name: "Empathetic", description: "Understanding and caring" },
  { id: "assertive", name: "Assertive", description: "Direct and confident" },
  { id: "persuasive", name: "Persuasive", description: "Convincing and compelling" },
];

const LENGTHS = [
  { id: "concise", name: "Concise", description: "Short and direct", words: "50-100" },
  { id: "balanced", name: "Balanced", description: "Moderate length", words: "100-200" },
  { id: "detailed", name: "Detailed", description: "Comprehensive", words: "200-400" },
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
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setOutputText("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

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
    };

    const length = selectedLength === "concise" ? 2 : selectedLength === "detailed" ? 6 : 4;
    const body = toneStyles[selectedTone] || toneStyles["professional"];
    const selectedParagraphs = body.slice(0, length);

    let email = "";
    email += `Subject: ${getSubjectLine(inputText)}\n\n`;
    email += "Dear [Recipient Name],\n\n";
    email += selectedParagraphs.join("\n\n");
    email += "\n\n";
    email += "Best regards,\n[Your Name]\n[Your Title]";
    email += `\n\n---\nTone: ${TONES.find((t) => t.id === selectedTone)?.name} | Length: ${selectedLength}`;

    setOutputText(email);
    setIsLoading(false);
  };

  const getSubjectLine = (input: string): string => {
    const keywords = input.toLowerCase();
    if (keywords.includes("job") || keywords.includes("application")) {
      return "Application for [Position Name]";
    } else if (keywords.includes("meeting") || keywords.includes("schedule")) {
      return "Meeting Request";
    } else if (keywords.includes("follow") || keywords.includes("interview")) {
      return "Following Up";
    } else if (keywords.includes("thank")) {
      return "Thank You";
    } else if (keywords.includes("sales") || keywords.includes("service")) {
      return "Quick Question";
    } else if (keywords.includes("apology") || keywords.includes("sorry")) {
      return "My Apologies";
    } else {
      return "Quick Introduction";
    }
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
                  <PenLine className="h-5 w-5 text-white" />
                </div>
                <span className="font-mono text-xl font-bold">DashPier</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setShowAdvanced(!showAdvanced)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                  showAdvanced ? "bg-[#FF6B2C] text-white" : "bg-black/5 text-[#1A1A1A]/70 hover:bg-black/10"
                }`}
              >
                <Settings className="h-4 w-4" />
                {showAdvanced ? "Simple" : "Advanced"}
              </motion.button>
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
                ? "Full control over tone, length, and structure"
                : "Describe what you need and get a professional email draft instantly"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm"
          >
            {!showAdvanced && (
              <div className="border-b border-black/5 bg-[#FAFAFA]/50 px-6 py-4">
                <div className="flex flex-wrap gap-4">
                  <div className="min-w-[200px] flex-1">
                    <label className="mb-3 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                      Tone
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TONES.slice(0, 6).map((tone) => (
                        <motion.button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                            selectedTone === tone.id
                              ? "bg-[#FF6B2C] text-white shadow-md"
                              : "border border-black/10 bg-white hover:bg-black/5"
                          }`}
                        >
                          {tone.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="w-48">
                    <label className="mb-3 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                      Length
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LENGTHS.map((length) => (
                        <motion.button
                          key={length.id}
                          onClick={() => setSelectedLength(length.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-lg px-4 py-2 font-mono text-sm transition-all ${
                            selectedLength === length.id
                              ? "bg-[#FF6B2C] text-white shadow-md"
                              : "border border-black/10 bg-white hover:bg-black/5"
                          }`}
                        >
                          {length.name}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showAdvanced && (
              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                      Tone Selection
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TONES.map((tone) => (
                        <motion.button
                          key={tone.id}
                          onClick={() => setSelectedTone(tone.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-lg px-4 py-3 text-left font-mono text-sm transition-all ${
                            selectedTone === tone.id
                              ? "bg-[#FF6B2C] text-white shadow-md"
                              : "bg-[#FAFAFA] hover:bg-black/5"
                          }`}
                        >
                          <div className="font-semibold">{tone.name}</div>
                          <div className="text-xs opacity-70">{tone.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                      Length
                    </label>
                    <div className="space-y-2">
                      {LENGTHS.map((length) => (
                        <motion.button
                          key={length.id}
                          onClick={() => setSelectedLength(length.id)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`w-full rounded-lg px-4 py-3 text-left font-mono text-sm transition-all ${
                            selectedLength === length.id
                              ? "bg-[#FF6B2C] text-white shadow-md"
                              : "bg-[#FAFAFA] hover:bg-black/5"
                          }`}
                        >
                          <div className="font-semibold">
                            {length.name} ({length.words} words)
                          </div>
                          <div className="text-xs opacity-70">{length.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-3 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                      Quick Templates
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Job Application", "Follow Up", "Cold Outreach", "Thank You", "Apology"].map((template) => (
                        <motion.button
                          key={template}
                          onClick={() => setInputText(`Write a ${template.toLowerCase()} email.`)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="rounded-full bg-[#FAFAFA] px-4 py-2 font-mono text-sm transition-colors hover:bg-[#FF6B2C]/10 hover:text-[#FF6B2C]"
                        >
                          {template}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#FAFAFA] p-4">
                    <p className="font-mono text-sm text-[#1A1A1A]/60">
                      Tip: Be specific about your email purpose for better results.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="relative min-h-[280px] bg-[#FAFAFA]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe what email you need to write..."
                  className="h-full min-h-[280px] w-full resize-none border-0 bg-transparent px-6 py-5 font-mono text-[15px] leading-relaxed text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:ring-0 focus:outline-none"
                />
                {!inputText && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <PenLine className="mx-auto mb-3 h-10 w-10 text-[#1A1A1A]/20" />
                      <p className="font-mono text-sm text-[#1A1A1A]/40">Describe your email</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative min-h-[280px] bg-white">
                {outputText ? (
                  <div className="h-full min-h-[280px] w-full px-6 py-5 font-mono text-[15px] leading-relaxed whitespace-pre-wrap text-[#1A1A1A]/80">
                    {outputText}
                  </div>
                ) : (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-3 h-10 w-10 text-[#1A1A1A]/20" />
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-2.5 font-mono text-sm transition-all hover:bg-black/5"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleDownload}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-2.5 font-mono text-sm transition-all hover:bg-black/5"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
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
                      : "bg-[#FF6B2C] text-white shadow-md hover:bg-[#FF6B2C]/90"
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
                      <span>Generate</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 grid gap-4 md:grid-cols-3"
          >
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                  <Sparkles className="h-4 w-4 text-[#FF6B2C]" />
                </div>
                <h3 className="font-mono font-semibold">Fast</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/60">Generate professional emails in seconds</p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                  <RefreshCw className="h-4 w-4 text-[#FF6B2C]" />
                </div>
                <h3 className="font-mono font-semibold">Customizable</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/60">Choose from 8 different tones and lengths</p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF6B2C]/10">
                  <PenLine className="h-4 w-4 text-[#FF6B2C]" />
                </div>
                <h3 className="font-mono font-semibold">Professional</h3>
              </div>
              <p className="font-mono text-sm text-[#1A1A1A]/60">Polished results every time</p>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-black/5 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-xs text-[#1A1A1A]/30">© 2025 DashPier - Write better emails</p>
        </div>
      </footer>
    </div>
  );
}
