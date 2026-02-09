"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Copy, 
  Check, 
  FileText, 
  Sparkles,
  Type,
  History,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ConfidenceRing } from "./ConfidenceRing";
import { useToast } from "@/hooks/use-toast";

interface WorkspaceProps {
  inputText: string;
  setInputText: (text: string) => void;
  outputText: string;
  isLoading: boolean;
  confidence: number;
  onTransform: () => void;
  wordCount: number;
  targetWordCount?: number;
}

const SAMPLE_TEMPLATES = [
  {
    id: "essay",
    name: "Academic Essay",
    icon: FileText,
    text: "The rapid advancement of artificial intelligence presents both unprecedented opportunities and significant challenges for modern society. While AI technologies have demonstrated remarkable capabilities in processing vast amounts of data and automating complex tasks, concerns regarding privacy, employment displacement, and ethical decision-making remain paramount. This essay examines the multifaceted implications of AI integration across various sectors, arguing that proactive regulatory frameworks and educational initiatives are essential to harness AI's potential while mitigating associated risks.",
  },
  {
    id: "email",
    name: "Professional Email",
    icon: Share2,
    text: `Dear Professor Johnson,

I am writing to request an extension on the research paper due next Friday. Unfortunately, I have encountered unforeseen circumstances that have significantly impacted my ability to complete the assignment on time. Specifically, I have been dealing with a family emergency that required my immediate attention and travel.

I understand the importance of meeting deadlines and do not make this request lightly. I have completed approximately 60% of the paper and can provide a detailed outline of my progress if that would be helpful. Would it be possible to receive a one-week extension? I am committed to submitting high-quality work and ensuring this delay does not impact my overall performance in your course.

Thank you for your consideration.

Sincerely,
Alex Chen`,
  },
  {
    id: "social",
    name: "LinkedIn Post",
    icon: Sparkles,
    text: `Excited to share that I recently completed my certification in Data Analytics! 📊

Over the past 3 months, I've been diving deep into statistical analysis, Python programming, and machine learning fundamentals. The journey has been challenging but incredibly rewarding.

Key takeaways:
• Data-driven decision making is essential in today's business landscape
• Python and SQL are game-changers for data manipulation
• Visualization skills are just as important as technical abilities

Looking forward to applying these skills in my upcoming projects! 

#DataAnalytics #ProfessionalDevelopment #ContinuousLearning`,
  },
];

export function DualPaneWorkspace({
  inputText,
  setInputText,
  outputText,
  isLoading,
  confidence,
  onTransform,
  wordCount,
  targetWordCount = 0,
}: WorkspaceProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your humanized text is ready to paste",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "humanized-text.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded",
      description: "Your text has been saved",
    });
  };

  const loadTemplate = (template: typeof SAMPLE_TEMPLATES[0]) => {
    setInputText(template.text);
    toast({
      title: `Loaded ${template.name}`,
      description: "You can now customize this template",
    });
  };

  const progress = targetWordCount > 0 ? Math.min((wordCount / targetWordCount) * 100, 100) : 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Mobile Tabs */}
      <div className="lg:hidden flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("input")}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === "input"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Input
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
            activeTab === "output"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          Output
        </button>
      </div>

      {/* Main Workspace */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Pane */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${activeTab !== "input" ? "hidden lg:block" : ""}`}
        >
          <div className="glass rounded-2xl p-1 shadow-xl border border-white/20 h-full">
            <div className="bg-card rounded-xl p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <Type className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Original Text</h3>
                    <p className="text-xs text-muted-foreground">Paste your AI-generated content</p>
                  </div>
                </div>
                
                {/* Templates Dropdown */}
                <div className="relative group">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <History className="w-4 h-4" />
                    <span className="hidden sm:inline">Templates</span>
                  </Button>
                  <div className="absolute right-0 top-full mt-2 w-56 py-2 bg-card rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {SAMPLE_TEMPLATES.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => loadTemplate(template)}
                        className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                      >
                        <template.icon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{template.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="flex-1 relative">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your AI-generated essay, email, or report here..."
                  className="min-h-[300px] lg:min-h-[400px] resize-none border-0 bg-transparent text-base leading-relaxed focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{wordCount}</span> words
                  </span>
                  {targetWordCount > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                  )}
                </div>
                <Button
                  onClick={onTransform}
                  disabled={isLoading || !inputText.trim()}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-indigo-500/25 btn-press"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Humanizing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Humanize Text
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Output Pane */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${activeTab !== "output" ? "hidden lg:block" : ""}`}
        >
          <div className="glass rounded-2xl p-1 shadow-xl border border-white/20 h-full">
            <div className="bg-card rounded-xl p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Humanized Result</h3>
                    <p className="text-xs text-muted-foreground">Your transformed text</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {outputText && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2"
                      >
                        <Button variant="ghost" size="icon" onClick={handleDownload} className="rounded-xl">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="rounded-xl relative"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Check className="w-4 h-4 text-emerald-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-4 h-4" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 relative">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-20 blur-xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
                        </div>
                      </div>
                      <p className="mt-4 text-muted-foreground text-sm">Transforming your text...</p>
                      <div className="mt-2 flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            className="w-2 h-2 rounded-full bg-indigo-500"
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : outputText ? (
                    <motion.div
                      key="output"
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.5 }}
                      className="min-h-[300px] lg:min-h-[400px] overflow-auto"
                    >
                      <div className="text-base leading-relaxed whitespace-pre-wrap">
                        {outputText}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-4">
                        <Sparkles className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        Ready to Transform
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Enter your text on the left and click &quot;Humanize Text&quot; to see the magic happen
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Confidence Score */}
              <AnimatePresence>
                {outputText && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="pt-4 border-t border-border mt-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ConfidenceRing percentage={confidence} size={48} />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {confidence >= 80 ? "Excellent" : confidence >= 60 ? "Good" : "Fair"} Humanization
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Confidence score based on natural language patterns
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
