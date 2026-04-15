"use client"

import { useEffect, useRef, useState } from "react"
import { Zap } from "lucide-react"

interface BeatNode {
  position: number // 0-100 percentage
  type: "cut" | "climax"
  label: string
}

const BEAT_NODES: BeatNode[] = [
  { position: 18, type: "cut", label: "转场点" },
  { position: 42, type: "cut", label: "转场点" },
  { position: 63, type: "climax", label: "高潮点" },
  { position: 81, type: "cut", label: "转场点" },
]

export function BeatSyncVisualizer() {
  const [animOffset, setAnimOffset] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let start: number | null = null
    const animate = (ts: number) => {
      if (!start) start = ts
      const elapsed = (ts - start) / 1000
      setAnimOffset(elapsed)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // 生成波形bars：模拟音频节奏感
  const bars = Array.from({ length: 80 }, (_, i) => {
    const t = animOffset * 1.5
    const base =
      Math.sin(i * 0.25 + t * 0.8) * 35 +
      Math.sin(i * 0.55 + t * 1.2) * 22 +
      Math.sin(i * 1.1 + t * 0.5) * 12
    return Math.max(6, Math.abs(base) + 6)
  })

  return (
    <div className="relative rounded-xl border border-border bg-surface-1 p-4 overflow-hidden">
      {/* 顶部标签 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-neon-green" />
          <span className="text-xs font-bold text-neon-green uppercase tracking-widest">
            Beat Sync
          </span>
        </div>
        <span className="text-xs text-muted-foreground">自动卡点引擎 · 实时分析</span>
        {/* 脉冲指示器 */}
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-neon-green"
            style={{
              boxShadow: "0 0 6px oklch(0.82 0.2 145 / 0.9)",
              animation: "pulse 1.2s ease-in-out infinite",
            }}
          />
          <span className="text-xs text-muted-foreground">分析中</span>
        </div>
      </div>

      {/* 波形区域 */}
      <div className="relative h-20 bg-surface-2 rounded-lg overflow-visible border border-border/50">
        {/* 横向时间轴 */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-border/30" />

        {/* 波形 bars */}
        <div className="absolute inset-x-2 inset-y-2 flex items-center gap-px">
          {bars.map((h, i) => {
            const pct = (i / bars.length) * 100
            // 判断是否靠近某个节点，增强亮度
            const nearNode = BEAT_NODES.find((n) => Math.abs(n.position - pct) < 4)
            const isNeonPurple = nearNode?.type === "climax"
            return (
              <div
                key={i}
                className="flex-1 rounded-[1px] transition-all duration-75"
                style={{
                  height: `${(h / 70) * 100}%`,
                  background: nearNode
                    ? isNeonPurple
                      ? "oklch(0.65 0.25 290)"
                      : "oklch(0.82 0.2 145)"
                    : `oklch(0.82 0.2 145 / ${0.25 + (h / 70) * 0.55})`,
                  boxShadow: nearNode
                    ? isNeonPurple
                      ? "0 0 6px oklch(0.65 0.25 290 / 0.7)"
                      : "0 0 6px oklch(0.82 0.2 145 / 0.7)"
                    : "none",
                }}
              />
            )
          })}
        </div>

        {/* 节点标签 */}
        {BEAT_NODES.map((node, i) => {
          const isClimax = node.type === "climax"
          return (
            <div
              key={i}
              className="absolute -top-1 flex flex-col items-center"
              style={{ left: `${node.position}%`, transform: "translateX(-50%)" }}
            >
              {/* 节点竖线 */}
              <div
                className="w-px h-24 absolute top-0"
                style={{
                  background: isClimax
                    ? "linear-gradient(to bottom, oklch(0.65 0.25 290 / 0.8), transparent)"
                    : "linear-gradient(to bottom, oklch(0.82 0.2 145 / 0.8), transparent)",
                }}
              />
              {/* 标签 chip */}
              <div
                className="relative z-10 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap border"
                style={
                  isClimax
                    ? {
                        background: "oklch(0.65 0.25 290 / 0.18)",
                        borderColor: "oklch(0.65 0.25 290 / 0.6)",
                        color: "oklch(0.75 0.2 290)",
                        boxShadow: "0 0 8px oklch(0.65 0.25 290 / 0.4)",
                      }
                    : {
                        background: "oklch(0.82 0.2 145 / 0.15)",
                        borderColor: "oklch(0.82 0.2 145 / 0.5)",
                        color: "oklch(0.82 0.2 145)",
                        boxShadow: "0 0 8px oklch(0.82 0.2 145 / 0.35)",
                      }
                }
              >
                {node.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* 底部说明 */}
      <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "oklch(0.82 0.2 145)", boxShadow: "0 0 4px oklch(0.82 0.2 145 / 0.7)" }}
            />
            转场点 (Cut)
          </div>
          <div className="flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "oklch(0.65 0.25 290)", boxShadow: "0 0 4px oklch(0.65 0.25 290 / 0.7)" }}
            />
            高潮点 (Climax)
          </div>
        </div>
        <span>已识别 {BEAT_NODES.length} 个节点</span>
      </div>
    </div>
  )
}
