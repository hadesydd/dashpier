import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import { Analytics } from "@vercel/analytics/react";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Humanize AI | Transform AI Text to Human-Like Writing",
  description: "Transform robotic AI-generated text into natural, human-like prose. Perfect for essays, emails, and professional documents. Trusted by 50,000+ students & professionals.",
  keywords: ["AI text humanizer", "humanize AI text", "AI to human text", "essay writer", "AI detection remover"],
  authors: [{ name: "Humanize AI" }],
  openGraph: {
    title: "Humanize AI | Transform AI Text to Human-Like Writing",
    description: "Transform robotic AI-generated text into natural, human-like prose. Perfect for essays, emails, and professional documents.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanize AI | Transform AI Text to Human-Like Writing",
    description: "Transform robotic AI-generated text into natural, human-like prose. Trusted by 50,000+ students & professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
