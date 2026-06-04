"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  RotateCcw,
  Plus,
  Copy,
  CheckCircle2,
  Sword,
  X,
  Sparkles,
  ChevronRight,
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

function saveToStorage(state: SavedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function SummonRushCalculator() {
  const [target, setTarget] = useState<number>(5500);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [customShards, setCustomShards] = useState<Shard[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newShardName, setNewShardName] = useState("");
  const [newShardPoints, setNewShardPoints] = useState<string>("");
  const [formError, setFormError] = useState("");
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

  const handleSave = () => {
    saveToStorage({ quantities, target, customShards });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopy = () => {
    const activeShards = allShards.filter((s) => (quantities[s.id] ?? 0) > 0);
    const shardList = activeShards
      .map((s) => `${s.name}: ${quantities[s.id]}`)
      .join(", ");
    const text = `Total: ${totalPoints.toLocaleString()} / ${target.toLocaleString()} points. ${shardList || "No shards used"}.`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 sm:py-12">
        {/* ── Header ── */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-medium text-purple-300 uppercase tracking-widest">
              Raid: Shadow Legends
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3">
            Summon Rush
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {" "}Calculator
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Plan your shard usage and hit your summon rush target with precision.
          </p>
        </header>

        {/* ── Target Input ── */}
        <div className="mb-8">
          <div
            className={cn(
              "relative rounded-2xl border border-white/10 backdrop-blur-md",
              "bg-gradient-to-r from-purple-500/10 via-slate-900/50 to-blue-500/10",
              "p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4",
              "shadow-xl"
            )}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Sword size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Point Target
                </p>
                <p className="text-xs text-slate-600">
                  Set your summon rush goal
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                id="target-input"
                type="number"
                min="0"
                value={target}
                onChange={handleTargetChange}
                className={cn(
                  "w-full sm:w-48 text-right font-black text-2xl text-white tabular-nums",
                  "bg-white/5 border border-white/10 rounded-xl",
                  "h-12 px-4",
                  "focus:outline-none focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/30",
                  "transition-all duration-200",
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
                aria-label="Target points"
              />
              <ChevronRight size={16} className="text-slate-600 hidden sm:block" />
            </div>
          </div>
        </div>

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <SummaryCard
            label="Total Points"
            value={totalPoints.toLocaleString()}
            type="total"
          />
          <SummaryCard
            label="Target Points"
            value={target.toLocaleString()}
            type="target"
          />
          <SummaryCard
            label="Remaining"
            value={isGoalMet ? "0" : remaining.toLocaleString()}
            type="remaining"
            highlight={isGoalMet}
          />
          <SummaryCard
            label="Progress"
            value={`${Math.round(progressPercent)}%`}
            type="progress"
            highlight={isGoalMet}
          />
        </div>

        {/* ── Progress Bar ── */}
        <div className="mb-8 rounded-2xl border border-white/10 backdrop-blur-md bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-300">
              Summon Rush Progress
            </span>
            <span
              className={cn(
                "text-sm font-bold tabular-nums",
                isGoalMet ? "text-emerald-400" : "text-slate-300"
              )}
            >
              {totalPoints.toLocaleString()} / {target.toLocaleString()} pts
            </span>
          </div>

          {/* Bar track */}
          <div className="relative h-4 rounded-full bg-white/5 border border-white/10 overflow-hidden">
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
          <div className="mt-4">
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
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-purple-400 to-blue-400 inline-block" />
              Your Shards
            </h2>
            <span className="text-xs text-slate-500">
              {allShards.length} shard types
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="mb-8">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              id="add-custom-shard-btn"
              className={cn(
                "w-full rounded-2xl border border-dashed border-white/15 hover:border-purple-500/40",
                "bg-white/[0.02] hover:bg-purple-500/5",
                "py-4 flex items-center justify-center gap-2",
                "transition-all duration-200 group"
              )}
            >
              <Plus
                size={16}
                className="text-slate-500 group-hover:text-purple-400 transition-colors"
              />
              <span className="text-sm text-slate-500 group-hover:text-purple-300 transition-colors font-medium">
                Add Custom Shard Type
              </span>
            </button>
          ) : (
            <div
              className={cn(
                "rounded-2xl border border-purple-500/30 backdrop-blur-md",
                "bg-gradient-to-br from-purple-500/10 to-slate-900/50",
                "p-5 shadow-xl shadow-purple-500/10"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                  <Plus size={14} />
                  Add Custom Shard
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setFormError("");
                    setNewShardName("");
                    setNewShardPoints("");
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Shard name..."
                  value={newShardName}
                  onChange={(e) => setNewShardName(e.target.value)}
                  id="custom-shard-name"
                  className={cn(
                    "flex-1 bg-white/5 border border-white/10 rounded-xl",
                    "h-10 px-3 text-sm text-white placeholder:text-slate-600",
                    "focus:outline-none focus:border-purple-500/50 focus:bg-white/10",
                    "transition-all duration-150"
                  )}
                  onKeyDown={(e) => e.key === "Enter" && handleAddShard()}
                />
                <input
                  type="number"
                  placeholder="Points each..."
                  value={newShardPoints}
                  onChange={(e) => setNewShardPoints(e.target.value)}
                  id="custom-shard-points"
                  min="1"
                  className={cn(
                    "w-full sm:w-40 bg-white/5 border border-white/10 rounded-xl",
                    "h-10 px-3 text-sm text-white placeholder:text-slate-600",
                    "focus:outline-none focus:border-purple-500/50 focus:bg-white/10",
                    "transition-all duration-150",
                    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  )}
                  onKeyDown={(e) => e.key === "Enter" && handleAddShard()}
                />
                <button
                  onClick={handleAddShard}
                  id="confirm-add-shard-btn"
                  className={cn(
                    "h-10 px-5 rounded-xl font-semibold text-sm text-white flex-shrink-0",
                    "bg-gradient-to-r from-purple-600 to-violet-600",
                    "hover:from-purple-500 hover:to-violet-500",
                    "shadow-lg shadow-purple-500/30",
                    "transition-all duration-150 active:scale-95"
                  )}
                >
                  Add
                </button>
              </div>

              {formError && (
                <p className="mt-2 text-xs text-red-400">{formError}</p>
              )}
            </div>
          )}
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleReset}
            id="reset-btn"
            className={cn(
              "flex items-center justify-center gap-2",
              "h-11 px-6 rounded-xl text-sm font-semibold",
              "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
              "text-slate-300 hover:text-white",
              "transition-all duration-150 active:scale-95"
            )}
          >
            <RotateCcw size={15} />
            Reset All
          </button>

          <button
            onClick={handleSave}
            id="save-btn"
            className={cn(
              "flex items-center justify-center gap-2",
              "h-11 px-6 rounded-xl text-sm font-semibold flex-1 sm:flex-none",
              "transition-all duration-150 active:scale-95",
              saved
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                : "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-500/30"
            )}
          >
            {saved ? (
              <>
                <CheckCircle2 size={15} />
                Saved!
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Save Setup
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            id="copy-result-btn"
            className={cn(
              "flex items-center justify-center gap-2",
              "h-11 px-6 rounded-xl text-sm font-semibold flex-1 sm:flex-none",
              "transition-all duration-150 active:scale-95",
              copied
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
            )}
          >
            {copied ? (
              <>
                <CheckCircle2 size={15} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={15} />
                Copy Result
              </>
            )}
          </button>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-700">
            Summon Rush Calculator · Raid: Shadow Legends Utility Tool
          </p>
        </footer>
      </div>
    </div>
  );
}
