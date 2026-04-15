"use client"

import { Sparkles } from "lucide-react"

interface MoodSelectorProps {
  selectedMood: string
  onSelect: (mood: string) => void
}

const MOODS = [
  { id: "heal", label: "治愈" },
  { id: "mystery", label: "悬疑" },
  { id: "warm", label: "温暖" },
  { id: "twist", label: "反转" },
  { id: "zen", label: "冥想" },
]

export function MoodSelector({ selectedMood, onSelect }: MoodSelectorProps) {
  const isAuto = selectedMood === "auto"

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">选择情绪</p>

      {/* AI 自动匹配 — 首选项，独占一行 */}
      <button
        onClick={() => onSelect("auto")}
        className={`
          w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold
          border transition-all duration-150
          ${isAuto
            ? "border-neon-purple text-neon-purple bg-neon-purple/10 neon-purple-glow"
            : "border-border text-muted-foreground bg-surface-2 hover:border-muted-foreground hover:text-foreground"
          }
        `}
      >
        <Sparkles className={`w-4 h-4 flex-shrink-0 ${isAuto ? "text-neon-purple" : "text-muted-foreground"}`} />
        <span>AI 自动匹配</span>
        <span className={`ml-auto text-[10px] font-normal px-1.5 py-0.5 rounded-md ${isAuto ? "bg-neon-purple/20 text-neon-purple" : "bg-surface-3 text-muted-foreground"}`}>
          推荐
        </span>
      </button>

      {/* 手动情绪按钮组 */}
      <div className="flex flex-wrap gap-2">
        {MOODS.map((mood) => {
          const isSelected = selectedMood === mood.id
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-150
                ${isSelected
                  ? "border-neon-green text-neon-green bg-neon-green/10 neon-green-glow"
                  : "border-border text-muted-foreground bg-surface-2 hover:border-muted-foreground hover:text-foreground"
                }
              `}
            >
              {mood.label}
            </button>
          )
        })}
      </div>

      {/* AI 自动匹配时显示说明文字 */}
      {isAuto && (
        <p className="text-[11px] text-neon-purple/70 leading-relaxed pl-0.5">
          系统将分析视频画面节奏，自动判断最匹配的情绪风格
        </p>
      )}
    </div>
  )
}
