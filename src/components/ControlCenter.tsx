"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Mail, 
  Share2, 
  Settings2, 
  Lock, 
  Unlock,
  Sparkles,
  ChevronDown,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TransformationOptions } from "@/core/entities/transformation";

interface ControlCenterProps {
  options: TransformationOptions;
  onChange: (options: TransformationOptions) => void;
  selectedMode: string;
  onModeChange: (mode: string) => void;
}

const MODES = [
  {
    id: "essay",
    name: "Essay Mode",
    description: "Academic tone, formal language",
    icon: GraduationCap,
    options: {
      formality: "formal" as const,
      emotionalTone: "neutral" as const,
      creativity: 0.3,
      preserveIntent: true,
      varietyLevel: 0.4,
      contextPreservation: 0.9,
    },
  },
  {
    id: "email",
    name: "Email Mode",
    description: "Professional correspondence",
    icon: Mail,
    options: {
      formality: "formal" as const,
      emotionalTone: "professional" as const,
      creativity: 0.2,
      preserveIntent: true,
      varietyLevel: 0.3,
      contextPreservation: 0.95,
    },
  },
  {
    id: "social",
    name: "Social Mode",
    description: "Casual but polished",
    icon: Share2,
    options: {
      formality: "informal" as const,
      emotionalTone: "positive" as const,
      creativity: 0.6,
      preserveIntent: true,
      varietyLevel: 0.7,
      contextPreservation: 0.8,
    },
  },
];

const TONE_OPTIONS = [
  { value: "neutral", label: "😐 Neutral", color: "bg-slate-500" },
  { value: "positive", label: "😊 Positive", color: "bg-emerald-500" },
  { value: "negative", label: "😔 Negative", color: "bg-rose-500" },
  { value: "professional", label: "👔 Professional", color: "bg-blue-500" },
  { value: "casual", label: "😎 Casual", color: "bg-violet-500" },
];

const FORMALITY_OPTIONS = [
  { value: "formal", label: "Academic", description: "Scholarly tone" },
  { value: "informal", label: "Casual", description: "Conversational" },
];

export function ControlCenter({ options, onChange, selectedMode, onModeChange }: ControlCenterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleModeSelect = (mode: typeof MODES[0]) => {
    onModeChange(mode.id);
    onChange({ ...options, ...mode.options });
  };

  const handleOptionChange = (key: keyof TransformationOptions, value: string | number | boolean) => {
    if (isLocked) return;
    onChange({ ...options, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <div className="glass rounded-2xl p-1 shadow-xl border border-white/20">
        <div className="bg-card rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Smart Settings</h3>
                <p className="text-xs text-muted-foreground">Customize your transformation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Advanced</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="gap-1"
              >
                <motion.div
                  animate={{ rotate: showAdvanced ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </Button>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {MODES.map((mode) => (
              <motion.button
                key={mode.id}
                onClick={() => handleModeSelect(mode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedMode === mode.id
                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                    : "border-border hover:border-indigo-200 dark:hover:border-indigo-800"
                }`}
              >
                {selectedMode === mode.id && (
                  <motion.div
                    layoutId="mode-indicator"
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500"
                  />
                )}
                <mode.icon className={`w-6 h-6 mb-2 ${
                  selectedMode === mode.id ? "text-indigo-500" : "text-muted-foreground"
                }`} />
                <p className={`font-semibold text-sm ${
                  selectedMode === mode.id ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {mode.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{mode.description}</p>
              </motion.button>
            ))}
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => handleOptionChange("formality", "informal")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                options.formality === "informal"
                  ? "bg-indigo-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Make it more casual
            </button>
            <button
              onClick={() => handleOptionChange("formality", "formal")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                options.formality === "formal"
                  ? "bg-indigo-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Make it more academic
            </button>
            <button
              onClick={() => handleOptionChange("emotionalTone", "positive")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                options.emotionalTone === "positive"
                  ? "bg-emerald-500 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Add enthusiasm
            </button>
          </div>

          {/* Advanced Controls */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-border space-y-6">
                  {/* Accuracy Lock */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isLocked ? "bg-emerald-500/20 text-emerald-500" : "bg-muted text-muted-foreground"
                      }`}>
                        {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Accuracy Lock</p>
                        <p className="text-xs text-muted-foreground">
                          {isLocked ? "Settings locked for consistency" : "Prevent accidental changes"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={isLocked}
                      onCheckedChange={setIsLocked}
                    />
                  </div>

                  {/* Originality Slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium text-sm">Originality</span>
                      </div>
                      <span className="text-sm font-semibold text-indigo-500">{Math.round(options.creativity * 100)}%</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-200 via-violet-200 to-pink-200 dark:from-indigo-900/50 dark:via-violet-900/50 dark:to-pink-900/50" />
                      <Slider
                        value={[options.creativity * 100]}
                        onValueChange={(value) => handleOptionChange("creativity", value[0] / 100)}
                        max={100}
                        step={1}
                        disabled={isLocked}
                        className="relative z-10"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Conservative</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Emotional Tone */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-indigo-500" />
                      <span className="font-medium text-sm">Emotional Tone</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {TONE_OPTIONS.map((tone) => (
                        <button
                          key={tone.value}
                          onClick={() => handleOptionChange("emotionalTone", tone.value)}
                          disabled={isLocked}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
                            options.emotionalTone === tone.value
                              ? "bg-foreground text-background"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {tone.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Formality Level */}
                  <div className="space-y-3">
                    <span className="font-medium text-sm">Formality Level</span>
                    <div className="grid grid-cols-2 gap-2">
                      {FORMALITY_OPTIONS.map((formality) => (
                        <button
                          key={formality.value}
                          onClick={() => handleOptionChange("formality", formality.value)}
                          disabled={isLocked}
                          className={`p-3 rounded-xl border-2 text-left transition-all disabled:opacity-50 ${
                            options.formality === formality.value
                              ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                              : "border-border hover:border-indigo-200 dark:hover:border-indigo-800"
                          }`}
                        >
                          <p className="font-semibold text-sm">{formality.label}</p>
                          <p className="text-xs text-muted-foreground">{formality.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
