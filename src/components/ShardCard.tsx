"use client";

import React from "react";
import Image from "next/image";
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const normalized = e.target.value.replace(/\D/g, "").replace(/^0+(?=\d)/, "");
    const val = parseInt(normalized, 10);
    if (!isNaN(val) && val >= 0) {
      onQuantityChange(shard.id, val);
    } else if (normalized === "") {
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
        "group relative rounded-xl border border-white/10 backdrop-blur-md",
        "bg-gradient-to-br from-white/[0.06] to-white/[0.02]",
        "p-3 flex flex-col gap-2",
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
      <div className="flex items-center gap-2">
        {/* Shard icon orb */}
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-xl",
            "bg-gradient-to-br",
            shard.gradient,
            "shadow-lg flex-shrink-0 overflow-hidden"
          )}
          style={{ boxShadow: `0 4px 15px ${shard.glowColor}` }}
        >
          {shard.imageSrc ? (
            <Image
              src={shard.imageSrc}
              alt=""
              width={40}
              height={40}
              className="h-full w-full object-contain p-1"
            />
          ) : (
            shard.emoji
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-xs leading-tight truncate">
            {shard.name}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            {shard.pointsEach.toLocaleString()} pts each
          </p>
        </div>
      </div>

      {/* Quantity controls */}
      <div className="grid grid-cols-[1.75rem_minmax(0,1fr)_1.75rem] items-center gap-1.5 min-w-0">
        <button
          onClick={handleDecrement}
          disabled={quantity === 0}
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer",
            "border border-white/10 bg-white/5",
            "transition-all duration-150 active:scale-95",
            "hover:bg-white/10 hover:border-white/20",
            "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5"
          )}
          aria-label="Decrease quantity"
        >
          <Minus size={12} className="text-white" />
        </button>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={quantity}
          onChange={handleInputChange}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            "min-w-0 w-full text-center font-bold text-white tabular-nums",
            "bg-white/5 border border-white/10 rounded-lg",
            "h-7 px-1.5 text-xs",
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
            "w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer",
            "transition-all duration-150 active:scale-95",
            "text-white font-bold"
          )}
          style={{
            background: `linear-gradient(135deg, ${shard.color}cc, ${shard.color}88)`,
            boxShadow: `0 4px 12px ${shard.glowColor}`,
          }}
          aria-label="Increase quantity"
        >
          <Plus size={12} />
        </button>
      </div>

      {/* Glow overlay when active */}
      {quantity > 0 && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-5"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${shard.color}, transparent 70%)`,
          }}
        />
      )}
    </div>
  );
}
