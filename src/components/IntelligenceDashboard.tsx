"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Zap,
  Trash2,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryItem {
  id: string;
  originalText: string;
  transformedText: string;
  confidence: number;
  timestamp: number;
  wordCount: number;
  isFavorite: boolean;
}

function getInitialHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("transformation-history");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
}

export function IntelligenceDashboard() {
  const [history, setHistory] = useState<HistoryItem[]>(getInitialHistory);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const toggleFavorite = (id: string) => {
    const updated = history.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updated);
    localStorage.setItem("transformation-history", JSON.stringify(updated));
  };

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem("transformation-history", JSON.stringify(updated));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("transformation-history");
    setSelectedItem(null);
  };

  const stats = {
    totalTransformations: history.length,
    avgConfidence: history.length > 0 
      ? history.reduce((acc, item) => acc + item.confidence, 0) / history.length 
      : 0,
    totalWords: history.reduce((acc, item) => acc + item.wordCount, 0),
    favorites: history.filter(item => item.isFavorite).length,
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full max-w-7xl mx-auto px-4 py-12"
    >
      <div className="glass rounded-2xl p-1 shadow-xl border border-white/20">
        <div className="bg-card rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Intelligence Dashboard</h3>
                <p className="text-xs text-muted-foreground">Your transformation analytics</p>
              </div>
            </div>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Transformations</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalTransformations}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Avg Confidence</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(stats.avgConfidence)}%</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Words Processed</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Favorites</span>
              </div>
              <p className="text-2xl font-bold">{stats.favorites}</p>
            </div>
          </div>

          {/* History List */}
          {history.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* History Items */}
              <ScrollArea className="h-[400px]">
                <div className="space-y-3 pr-4">
                  {history.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedItem?.id === item.id
                          ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                          : "border-border hover:border-indigo-200 dark:hover:border-indigo-800"
                      }`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {item.originalText.slice(0, 60)}...
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatDate(item.timestamp)}
                            </span>
                            <span className="text-xs font-medium text-emerald-500">
                              {Math.round(item.confidence)}% confidence
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.wordCount} words
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                item.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteItem(item.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Selected Item Preview */}
              <AnimatePresence mode="wait">
                {selectedItem ? (
                  <motion.div
                    key={selectedItem.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-6 rounded-xl bg-muted/30 space-y-4"
                  >
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Original</span>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
                        {selectedItem.originalText}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <ChevronRight className="w-5 h-5 text-muted-foreground rotate-90" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Humanized</span>
                      <p className="mt-2 text-sm text-foreground line-clamp-4">
                        {selectedItem.transformedText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                    <p>Select an item to view details</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">No History Yet</h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Your transformation history will appear here. Start humanizing text to build your analytics.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
