"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  RotateCcw,
  CheckCircle2,
  Sword,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_SHARDS, CUSTOM_SHARD_COLORS, Shard } from "@/lib/shards";
import ShardCard from "./ShardCard";
import SummaryCard from "./SummaryCard";

const STORAGE_KEY = "summon-rush-calculator";

interface SavedState {
  quantities: Record<string, number>;
  target: number;
  customShards: Shard[];
}

function loadFromStorage(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function SummonRushCalculator() {
  const [target, setTarget] = useState<number>(5500);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customShards, setCustomShards] = useState<Shard[]>([]);
  const [, setShowAddForm] = useState(false);
  const [newShardName, setNewShardName] = useState("");
  const [newShardPoints, setNewShardPoints] = useState<string>("");
  const [, setFormError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setTarget(saved.target ?? 5500);
      setQuantities(saved.quantities ?? {});
      setCustomShards(saved.customShards ?? []);
    }
    setHydrated(true);
  }, []);

  const allShards = [...DEFAULT_SHARDS, ...customShards];

  const totalPoints = allShards.reduce(
    (sum, shard) => sum + (quantities[shard.id] ?? 0) * shard.pointsEach,
    0
  );

  const remaining = Math.max(0, target - totalPoints);
  const progressPercent = Math.min(100, (totalPoints / Math.max(target, 1)) * 100);
  const isGoalMet = totalPoints >= target;

  const handleQuantityChange = useCallback((id: string, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
  }, []);

  const handleDeleteCustom = useCallback((id: string) => {
    setCustomShards((prev) => prev.filter((s) => s.id !== id));
    setQuantities((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const handleReset = () => {
    setQuantities({});
  };

  const handleAddShard = () => {
    setFormError("");
    const name = newShardName.trim();
    const pts = parseInt(newShardPoints, 10);

    if (!name) {
      setFormError("Please enter a shard name.");
      return;
    }
    if (isNaN(pts) || pts <= 0) {
      setFormError("Points must be a positive number.");
      return;
    }
    if (allShards.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setFormError("A shard with this name already exists.");
      return;
    }

    const colorIndex = customShards.length % CUSTOM_SHARD_COLORS.length;
    const colorSet = CUSTOM_SHARD_COLORS[colorIndex];

    const newShard: Shard = {
      id: `custom-${Date.now()}`,
      name,
      pointsEach: pts,
      color: colorSet.color,
      glowColor: colorSet.glowColor,
      gradient: colorSet.gradient,
      emoji: "⚡",
      isCustom: true,
    };

    setCustomShards((prev) => [...prev, newShard]);
    setNewShardName("");
    setNewShardPoints("");
    setShowAddForm(false);
  };

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      setTarget(val);
    } else if (e.target.value === "") {
      setTarget(0);
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
          <p className="text-slate-500 text-sm">Loading calculator...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-5xl lg:max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 lg:px-6 pt-3 pb-8 sm:pt-5 sm:pb-12">
        {/* ── Header ── */}
        <header className="text-center mb-3">
          <Image
            src="/images/Header-main.png"
            alt="Summon Rush Calculator"
            width={800}
            height={200}
            priority
            className="mx-auto h-auto w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[360px] 2xl:max-w-[580px]"
          />
        </header>

        {/* ── Target Input ── */}
        <div
          className={cn(
            "mb-3 rounded-2xl border border-white/10 backdrop-blur-md",
            "bg-gradient-to-br from-purple-500/10 via-slate-900/50 to-blue-500/10",
            "p-3 lg:p-4 shadow-xl mt-10"
          )}
        >
          <div className="flex flex-col min-[900px]:relative min-[900px]:min-h-12 lg:min-h-16 min-[900px]:flex-row items-stretch min-[900px]:items-center gap-3 lg:gap-4">
            <div className="flex items-center gap-3 lg:gap-4 min-[900px]:w-48 lg:w-64 min-[900px]:flex-shrink-0">
              <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sword size={16} className="text-white lg:hidden" />
                <Sword size={20} className="text-white hidden lg:block" />
              </div>
              <div className="w-24 lg:w-36 min-w-0">
                <p className="text-xs lg:text-sm font-medium text-slate-100 uppercase tracking-wider">
                  Point Target
                </p>
                <p className="text-[10px] lg:text-xs leading-[1.15] text-slate-500">
                  Set your summon
                  <br />
                  rush goal
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex items-center overflow-hidden rounded-xl",
                "bg-white/5 border border-white/10",
                "w-full min-[520px]:w-44 min-[900px]:order-3 min-[900px]:w-48 lg:w-60 2xl:w-72 min-[900px]:ml-auto min-[900px]:flex-shrink-0",
                "focus-within:border-purple-500/50 focus-within:bg-white/10 focus-within:ring-1 focus-within:ring-purple-500/30",
                "transition-all duration-200"
              )}
            >
              <span className="self-stretch flex items-center px-3 lg:px-4 text-[10px] lg:text-xs font-bold uppercase tracking-wider text-purple-200 bg-purple-500/15 backdrop-blur-sm border-r border-white/10">
                Target
              </span>
              <input
                id="target-input"
                type="number"
                min="0"
                value={target}
                onChange={handleTargetChange}
                className={cn(
                  "min-w-0 flex-1 text-right font-black text-xl lg:text-2xl text-white tabular-nums",
                  "h-10 lg:h-12 bg-transparent px-3 lg:px-4",
                  "focus:outline-none",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
                aria-label="Target points"
              />
            </div>

        {/* ── Summary Cards ── */}
            <div className="grid grid-cols-2 min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:top-1/2 min-[900px]:-translate-x-1/2 min-[900px]:-translate-y-1/2 min-[900px]:grid-cols-3 min-[900px]:w-[40%] min-[900px]:items-center min-[900px]:justify-center gap-3 lg:gap-4">
            <SummaryCard
              label="Target Points"
              value={target.toLocaleString()}
              type="target"
            />
            <SummaryCard
              label="Total Points"
              value={totalPoints.toLocaleString()}
              type="total"
            />
            <SummaryCard
              label="Remaining"
              value={isGoalMet ? "0" : remaining.toLocaleString()}
              type="remaining"
              highlight={isGoalMet}
            />
          </div>
        </div>

        {/* ── Progress Bar ── */}
          <div className="mt-2 lg:mt-3 border-t border-white/10 pt-2 lg:pt-3">
          <div className="flex items-center justify-between mb-2 lg:mb-3">
            <span className="text-sm lg:text-base font-medium text-slate-300">
              Summon Rush Progress
            </span>
            <span
              className={cn(
                "text-sm lg:text-base font-bold tabular-nums",
                isGoalMet ? "text-emerald-400" : "text-slate-300"
              )}
            >
              {totalPoints.toLocaleString()} / {target.toLocaleString()} pts
            </span>
          </div>

          {/* Bar track */}
          <div className="relative h-4 lg:h-5 rounded-full bg-white/5 border border-white/10 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
                isGoalMet
                  ? "bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"
                  : "bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500"
              )}
              style={{ width: `${progressPercent}%` }}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Status message */}
          <div className="hidden">
            {isGoalMet ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-emerald-300 font-semibold text-sm">
                    🎉 Enough points — you&apos;re ready!
                  </p>
                  {totalPoints > target && (
                    <p className="text-emerald-500/70 text-xs mt-0.5">
                      You have {(totalPoints - target).toLocaleString()} extra points
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
                <p className="text-amber-300 text-sm">
                  Need{" "}
                  <span className="font-bold text-amber-200">
                    {remaining.toLocaleString()}
                  </span>{" "}
                  more points to reach your target.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── Shard Cards Grid ── */}
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg lg:text-2xl font-bold text-white flex items-center gap-2 lg:gap-3">
              <span className="w-1 lg:w-1.5 h-5 lg:h-7 rounded-full bg-gradient-to-b from-purple-400 to-blue-400 inline-block" />
              Your Shards
            </h2>
            <button
              onClick={handleReset}
              id="reset-btn"
              className={cn(
                "flex items-center justify-center gap-2",
                "h-9 lg:h-11 px-4 lg:px-5 rounded-xl text-sm lg:text-base font-semibold cursor-pointer",
                "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
                "text-slate-300 hover:text-white",
                "transition-all duration-150 active:scale-95"
              )}
            >
              <RotateCcw size={14} className="lg:hidden" />
              <RotateCcw size={16} className="hidden lg:block" />
              Reset All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {allShards.map((shard) => (
              <ShardCard
                key={shard.id}
                shard={shard}
                quantity={quantities[shard.id] ?? 0}
                onQuantityChange={handleQuantityChange}
                onDelete={shard.isCustom ? handleDeleteCustom : undefined}
              />
            ))}
          </div>
        </div>

        {/* ── Add Custom Shard ── */}
        {/* ── Action Buttons ── */}
        {/* ── Footer ── */}
        <footer className="mt-15 text-center">
          <p className="text-xs text-slate-700">
            Summon Rush Calculator · Raid: Shadow Legends Utility Tool
          </p>
          <p className="text-xs text-slate-700">
           Develop by - Omor Riduan
          </p>
        </footer>
      </div>
    </div>
  );
}
