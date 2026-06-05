import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const META = {
  title: "Summon Rush Calculator — Raid: Shadow Legends",
  description:
    "Plan your Summon Rush shards in seconds. Track Sacred, Primal, Void, Ancient & Mystery shards and see exactly how many points you need to hit your target.",
  url: "https://rsl-summon-rush.vercel.app",
  siteName: "RSL Summon Rush Calculator",
  author: "Omor Riduan",
};

export const metadata: Metadata = {
  /* ── Core ── */
  title: META.title,
  description: META.description,
  authors: [{ name: META.author }],
  creator: META.author,
  keywords: [
    "Raid Shadow Legends",
    "RSL",
    "Summon Rush",
    "Shard Calculator",
    "Sacred Shard",
    "Primal Shard",
    "Void Shard",
    "Ancient Shard",
    "Mystery Shard",
    "points tracker",
    "gaming utility",
  ],

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    url: META.url,
    siteName: META.siteName,
    title: META.title,
    description: META.description,
    locale: "en_US",
  },

  /* ── Twitter / X ── */
  twitter: {
    card: "summary",
    title: META.title,
    description: META.description,
    creator: "@omorriduan",
  },

  /* ── Crawlers ── */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  /* ── Browser / PWA hints ── */
  applicationName: META.siteName,
  category: "gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <meta name="theme-color" content="#080b14" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
