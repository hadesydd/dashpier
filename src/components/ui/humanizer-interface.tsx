"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { ArrowLeft, Check, Copy, Download, PenLine, RefreshCw, Sparkles } from "lucide-react";

import ShinyText from "./shiny-text";

const TONES = [
  { id: "professional", name: "Professional", description: "Business formal" },
  { id: "formal", name: "Formal", description: "Highly ceremonial" },
  { id: "semi-formal", name: "Semi-Formal", description: "Professional yet friendly" },
  { id: "friendly", name: "Friendly", description: "Warm and approachable" },
  { id: "casual", name: "Casual", description: "Relaxed conversation" },
  { id: "empathetic", name: "Empathetic", description: "Understanding and caring" },
];

const LENGTHS = [
  { id: "concise", name: "Short", description: "50-100 words" },
  { id: "balanced", name: "Medium", description: "100-200 words" },
  { id: "detailed", name: "Long", description: "200-400 words" },
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
    };

    const length = selectedLength === "concise" ? 2 : selectedLength === "detailed" ? 6 : 4;
    const body = toneStyles[selectedTone] || toneStyles["professional"];
    const selectedParagraphs = body.slice(0, length);

    const getSubjectLine = (input: string): string => {
      const keywords = input.toLowerCase();
      if (keywords.includes("job") || keywords.includes("application")) return "Application for [Position Name]";
      if (keywords.includes("meeting") || keywords.includes("schedule")) return "Meeting Request";
      if (keywords.includes("follow") || keywords.includes("interview")) return "Following Up";
      if (keywords.includes("thank")) return "Thank You";
      if (keywords.includes("sales") || keywords.includes("service")) return "Quick Question";
      if (keywords.includes("apology") || keywords.includes("sorry")) return "My Apologies";
      return "Quick Introduction";
    };

    let email = "";
    email += `Subject: ${getSubjectLine(inputText)}\n\n`;
    email += "Dear [Recipient Name],\n\n";
    email += selectedParagraphs.join("\n\n");
    email += "\n\n";
    email += "Best regards,\n[Your Name]";
    email += `\n\n---\nTone: ${TONES.find((t) => t.id === selectedTone)?.name} | Length: ${LENGTHS.find((l) => l.id === selectedLength)?.name}`;

    setOutputText(email);
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
    a.download = "email.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A1A1A]">
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-center">
            <div className="absolute left-4 flex items-center gap-4">
              <motion.button
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-[#1A1A1A]/70 transition-colors hover:text-[#1A1A1A]"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#60A5FA]">
                <PenLine className="h-5 w-5 text-white" />
              </div>
              <span className="font-mono text-xl font-bold">DashPier</span>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <ShinyText
              text="EMAIL WRITER"
              speed={3}
              shineColor="#3B82F6"
              color="#1A1A1A"
              spread={80}
              yoyo={true}
              className="font-mono text-2xl font-bold"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-6 rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap gap-2">
              <div className="min-w-[200px] flex-1">
                <label className="mb-2 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                  Tone
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((tone) => (
                    <motion.button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-all ${
                        selectedTone === tone.id ? "bg-[#3B82F6] text-white" : "bg-[#FAFAFA] hover:bg-[#1A1A1A]/5"
                      }`}
                    >
                      {tone.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="w-32">
                <label className="mb-2 block font-mono text-xs font-semibold tracking-wider text-[#1A1A1A]/50 uppercase">
                  Length
                </label>
                <div className="space-y-1">
                  {LENGTHS.map((length) => (
                    <motion.button
                      key={length.id}
                      onClick={() => setSelectedLength(length.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all ${
                        selectedLength === length.id ? "bg-[#3B82F6] text-white" : "bg-[#FAFAFA] hover:bg-[#1A1A1A]/5"
                      }`}
                    >
                      {length.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-4 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm"
          >
            <div className="grid divide-y divide-black/10 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="relative min-h-[200px] bg-[#FAFAFA]">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Describe your email..."
                  className="h-full min-h-[200px] w-full resize-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:ring-0 focus:outline-none"
                />
              </div>

              <div className="relative min-h-[200px] bg-white">
                {outputText ? (
                  <div className="h-full min-h-[200px] w-full px-4 py-3 font-mono text-sm leading-relaxed whitespace-pre-wrap text-[#1A1A1A]/80">
                    {outputText}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="mx-auto mb-2 h-8 w-8 text-[#1A1A1A]/20" />
                      <p className="font-mono text-xs text-[#1A1A1A]/40">Your email will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-black/10 bg-[#FAFAFA]/50 px-4 py-3">
              <span className="font-mono text-xs text-[#1A1A1A]/40">
                {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
              </span>

              <div className="flex items-center gap-2">
                {outputText && (
                  <>
                    <motion.button
                      onClick={handleCopy}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 font-mono text-xs transition-all hover:bg-[#1A1A1A]/5"
                    >
                      {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                      {copied ? "Copied" : "Copy"}
                    </motion.button>

                    <motion.button
                      onClick={handleDownload}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-1.5 font-mono text-xs transition-all hover:bg-[#1A1A1A]/5"
                    >
                      <Download className="h-3 w-3" />
                      Download
                    </motion.button>
                  </>
                )}

                <motion.button
                  onClick={handleGenerate}
                  disabled={isLoading || !inputText.trim()}
                  whileHover={{ scale: isLoading || !inputText.trim() ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading || !inputText.trim() ? 1 : 0.98 }}
                  className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-mono text-xs font-medium transition-all ${
                    isLoading || !inputText.trim()
                      ? "cursor-not-allowed bg-[#1A1A1A]/10 text-[#1A1A1A]/40"
                      : "bg-[#3B82F6] text-white"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-3 w-3 rounded-full border border-current border-t-transparent"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" />
                      Generate
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { icon: Sparkles, title: "Fast", desc: "Seconds" },
              { icon: RefreshCw, title: "Custom", desc: "8 tones" },
              { icon: PenLine, title: "Clean", desc: "Professional" },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-black/10 bg-white p-4">
                <div className="mb-1 flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-[#3B82F6]" />
                  <span className="font-mono text-sm font-semibold">{item.title}</span>
                </div>
                <p className="font-mono text-xs text-[#1A1A1A]/50">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-black/5 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-mono text-xs text-[#1A1A1A]/30">© 2025 DashPier</p>
        </div>
      </footer>
    </div>
  );
}
