"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, Target, Zap, BarChart3 } from "lucide-react";

interface SummaryCardProps {
  label: string;
  value: string | number;
  type: "total" | "target" | "remaining" | "progress";
  highlight?: boolean;
}

const iconMap = {
  total: TrendingUp,
  target: Target,
  remaining: Zap,
  progress: BarChart3,
};

const colorMap = {
  total: {
    icon: "text-cyan-400",
    bg: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/10",
    value: "text-cyan-300",
  },
  target: {
    icon: "text-purple-400",
    bg: "from-purple-500/10 to-violet-500/10",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/10",
    value: "text-purple-300",
  },
  remaining: {
    icon: "text-amber-400",
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
    value: "text-amber-300",
  },
  progress: {
    icon: "text-emerald-400",
    bg: "from-emerald-500/10 to-green-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
    value: "text-emerald-300",
  },
};

export default function SummaryCard({
  label,
  value,
  type,
  highlight = false,
}: SummaryCardProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  return (
    <div
      className={cn(
        "relative rounded-lg border backdrop-blur-sm px-2 py-1.5 pr-6 flex flex-col",
        "bg-gradient-to-br",
        colors.bg,
        colors.border,
        "shadow-lg",
        colors.glow,
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
        highlight && "ring-1 ring-emerald-400/50 border-emerald-400/40"
      )}
    >
      {/* Top row */}
      <div className="flex items-center">
        <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>
      </div>

      <div
        className={cn(
          "absolute right-1.5 top-1/2 -translate-y-1/2",
          "w-5 h-5 rounded-md flex items-center justify-center",
          "bg-white/5"
        )}
      >
        <Icon size={12} className={colors.icon} />
      </div>

      {/* Value */}
      <div
        className={cn(
          "text-base leading-tight font-bold tabular-nums",
          colors.value
        )}
      >
        {value}
      </div>

      {/* Subtle shine overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
    </div>
  );
}
