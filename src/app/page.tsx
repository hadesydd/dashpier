"use client";

import { useState } from "react";

import EmailWriterInterface from "@/components/ui/humanizer-interface";
import { MynaHero } from "@/components/ui/myna-hero";

import "./shiny-text.css";

export default function Home() {
  const [showEditor, setShowEditor] = useState(false);

  if (showEditor) {
    return <EmailWriterInterface onBack={() => setShowEditor(false)} />;
  }

  return <MynaHero onGetStarted={() => setShowEditor(true)} />;
}
