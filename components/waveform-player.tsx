"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Download, Waves } from "lucide-react"

interface WaveformPlayerProps {
  isLoggedIn: boolean
  onDownloadClick: () => void
}

export function WaveformPlayer({ isLoggedIn, onDownloadClick }: WaveformPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 模拟播放进度
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false)
            return 0
          }
          return p + 0.5
        })
      }, 50)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPlaying])

  // 模拟波形数据
  const bars = Array.from({ length: 60 }, (_, i) => {
    const base = Math.sin(i * 0.4) * 30 + Math.sin(i * 0.8) * 20 + Math.sin(i * 1.5) * 10
    return Math.max(8, Math.abs(base) + 8)
  })

  return (
    <div className="space-y-4">
      {/* 波形条 */}
      <div className="relative h-16 flex items-center gap-0.5 px-1 overflow-hidden rounded-lg bg-surface-2 border border-border">
        {bars.map((h, i) => {
          const pct = (i / bars.length) * 100
          const isPast = pct <= progress
          return (
            <div
              key={i}
              className="flex-1 rounded-sm transition-colors duration-150"
              style={{
                height: `${h}%`,
                backgroundColor: isPast
                  ? "oklch(0.82 0.2 145)"
                  : "oklch(0.3 0 0)",
                opacity: isPast ? 1 : 0.6,
                ...(isPast && isPlaying
                  ? { boxShadow: "0 0 4px oklch(0.82 0.2 145 / 0.5)" }
                  : {}),
              }}
            />
          )
        })}
        {/* 进度标记 */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-foreground/50"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-neon-green text-background flex items-center justify-center hover:opacity-90 transition-opacity neon-green-glow"
            aria-label={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying
              ? <Pause className="w-4 h-4 fill-current" />
              : <Play className="w-4 h-4 fill-current translate-x-0.5" />
            }
          </button>
          <div className="flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-foreground font-medium">你的专属 BGM</span>
          </div>
        </div>

        <button
          onClick={onDownloadClick}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
            bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          {isLoggedIn ? "下载" : "下载（含水印）"}
        </button>
      </div>
    </div>
  )
}
