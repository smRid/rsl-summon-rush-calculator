import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Summon Rush Calculator | Raid: Shadow Legends",
  description:
    "Calculate your summon rush points for Raid: Shadow Legends. Track Sacred, Primal, Void, Ancient, and Mystery shards to hit your target with ease.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  keywords: [
    "Raid Shadow Legends",
    "Summon Rush",
    "Calculator",
    "Shards",
    "Sacred Shard",
    "Void Shard",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
