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
  title: "DashPier | AI Email Writer - Write Perfect Emails in Seconds",
  description: "Stop struggling with every email. Describe what you need, choose from 40+ tones, and get professional email drafts instantly. From job applications to difficult conversations. Trusted by 100,000+ professionals.",
  keywords: ["AI email writer", "email generator", "professional email templates", "cover letter writer", "follow up email", "cold email template", "business email generator"],
  authors: [{ name: "DashPier" }],
  openGraph: {
    title: "DashPier | AI Email Writer - Write Perfect Emails in Seconds",
    description: "Write professional emails in seconds with AI. Choose from 40+ tones for any situation - job applications, sales, customer service, and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DashPier | AI Email Writer",
    description: "Write perfect emails in seconds. 40+ tones, 50+ templates, trusted by 100,000+ professionals.",
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
