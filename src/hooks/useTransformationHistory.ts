"use client";

import { useCallback } from "react";

interface HistoryItem {
  id: string;
  originalText: string;
  transformedText: string;
  confidence: number;
  timestamp: number;
  wordCount: number;
  isFavorite: boolean;
}

export function useTransformationHistory() {
  const saveTransformation = useCallback((
    originalText: string,
    transformedText: string,
    confidence: number
  ) => {
    const wordCount = transformedText.split(/\s+/).filter(Boolean).length;
    
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      originalText: originalText.slice(0, 500), // Limit stored text
      transformedText: transformedText.slice(0, 500),
      confidence,
      timestamp: Date.now(),
      wordCount,
      isFavorite: false,
    };

    try {
      const existing = localStorage.getItem("transformation-history");
      const history: HistoryItem[] = existing ? JSON.parse(existing) : [];
      
      // Add new item at the beginning, keep only last 50
      const updated = [newItem, ...history].slice(0, 50);
      localStorage.setItem("transformation-history", JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save transformation history:", error);
    }
  }, []);

  return { saveTransformation };
}
