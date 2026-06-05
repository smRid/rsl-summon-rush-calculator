export interface Shard {
  id: string;
  name: string;
  pointsEach: number;
  color: string;
  glowColor: string;
  gradient: string;
  emoji: string;
  imageSrc?: string;
  isCustom?: boolean;
}

export const DEFAULT_SHARDS: Shard[] = [
  {
    id: "sacred",
    name: "Sacred Shard",
    pointsEach: 500,
    color: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.4)",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    emoji: "✨",
    imageSrc: "/images/sacred-shard.png",
  },
  {
    id: "primal",
    name: "Primal Shard",
    pointsEach: 200,
    color: "#FF4560",
    glowColor: "rgba(255, 69, 96, 0.4)",
    gradient: "from-rose-400 via-pink-500 to-red-600",
    emoji: "🔮",
    imageSrc: "/images/mythical-shard.png",
  },
  {
    id: "void",
    name: "Void Shard",
    pointsEach: 120,
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
    emoji: "💜",
    imageSrc: "/images/void-shard.png",
  },
  {
    id: "ancient",
    name: "Ancient Shard",
    pointsEach: 20,
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    gradient: "from-blue-400 via-cyan-500 to-indigo-600",
    emoji: "💎",
    imageSrc: "/images/ancient-shard.png",
  },
  {
    id: "mystery",
    name: "Mystery Shard",
    pointsEach: 1,
    color: "#86EFAC",
    glowColor: "rgba(134, 239, 172, 0.35)",
    gradient: "from-lime-200 via-green-300 to-emerald-400",
    emoji: "❓",
    imageSrc: "/images/Mystery_Shard-icon.webp",
  },
];

export const CUSTOM_SHARD_COLORS = [
  {
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
  },
  {
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
    gradient: "from-amber-400 via-yellow-500 to-orange-600",
  },
  {
    color: "#EC4899",
    glowColor: "rgba(236, 72, 153, 0.4)",
    gradient: "from-pink-400 via-rose-500 to-fuchsia-600",
  },
  {
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
  },
];
