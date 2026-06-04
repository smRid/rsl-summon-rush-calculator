"use client";

import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Shard } from "@/lib/shards";

interface ShardCardProps {
  shard: Shard;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete?: (id: string) => void;
}

export default function ShardCard({
  shard,
  quantity,
  onQuantityChange,
  onDelete,
}: ShardCardProps) {
  const points = quantity * shard.pointsEach;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      onQuantityChange(shard.id, val);
    } else if (e.target.value === "") {
      onQuantityChange(shard.id, 0);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) onQuantityChange(shard.id, quantity - 1);
  };

  const handleIncrement = () => {
    onQuantityChange(shard.id, quantity + 1);
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-white/10 backdrop-blur-md",
        "bg-gradient-to-br from-white/[0.06] to-white/[0.02]",
        "p-4 flex flex-col gap-3",
        "transition-all duration-300",
        "hover:border-white/20 hover:shadow-xl hover:scale-[1.01]",
        quantity > 0 && "border-white/15"
      )}
      style={{
        boxShadow:
          quantity > 0
            ? `0 0 20px ${shard.glowColor}, 0 4px 20px rgba(0,0,0,0.4)`
            : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Delete button for custom shards */}
      {onDelete && (
        <button
          onClick={() => onDelete(shard.id)}
          className={cn(
            "absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center",
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300",
            "border border-red-500/20"
          )}
          title="Delete custom shard"
        >
          <Trash2 size={12} />
        </button>
      )}

      {/* Top: icon + name */}
      <div className="flex items-center gap-3">
        {/* Shard icon orb */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
            "bg-gradient-to-br",
            shard.gradient,
            "shadow-lg flex-shrink-0"
          )}
          style={{ boxShadow: `0 4px 15px ${shard.glowColor}` }}
        >
          {shard.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-sm leading-tight truncate">
            {shard.name}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {shard.pointsEach.toLocaleString()} pts each
          </p>
        </div>
      </div>

      {/* Points badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500">Total from this</span>
        <span
          className={cn(
            "text-sm font-bold tabular-nums transition-all duration-200",
            quantity > 0 ? "text-white" : "text-slate-600"
          )}
          style={{ color: quantity > 0 ? shard.color : undefined }}
        >
          {points.toLocaleString()} pts
        </span>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrement}
          disabled={quantity === 0}
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            "border border-white/10 bg-white/5",
            "transition-all duration-150 active:scale-95",
            "hover:bg-white/10 hover:border-white/20",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          )}
          aria-label="Decrease quantity"
        >
          <Minus size={14} className="text-white" />
        </button>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={handleInputChange}
          className={cn(
            "flex-1 text-center font-bold text-white tabular-nums",
            "bg-white/5 border border-white/10 rounded-xl",
            "h-9 px-2 text-sm",
            "focus:outline-none focus:border-white/30 focus:bg-white/10",
            "transition-all duration-150",
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          )}
          aria-label={`${shard.name} quantity`}
          id={`shard-qty-${shard.id}`}
        />

        <button
          onClick={handleIncrement}
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            "transition-all duration-150 active:scale-95",
            "text-white font-bold"
          )}
          style={{
            background: `linear-gradient(135deg, ${shard.color}cc, ${shard.color}88)`,
            boxShadow: `0 4px 12px ${shard.glowColor}`,
          }}
          aria-label="Increase quantity"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Glow overlay when active */}
      {quantity > 0 && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-5"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${shard.color}, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
