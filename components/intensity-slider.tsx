"use client"

import { useEffect, useRef } from "react"

interface IntensitySliderProps {
  value: number
  onChange: (v: number) => void
}

const STAGES = [
  { threshold: 33, label: "平淡", color: "oklch(0.55 0 0)" },
  { threshold: 66, label: "高涨", color: "oklch(0.82 0.2 145)" },
  { threshold: 101, label: "爆发", color: "oklch(0.65 0.25 290)" },
]

function getStage(v: number) {
  return STAGES.find((s) => v < s.threshold) ?? STAGES[STAGES.length - 1]
}

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const animRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  // EQ bar 数量
  const EQ_BARS = 28

  // 生成 EQ bars 高度（基于 value 的动态感）
  const eqBars = Array.from({ length: EQ_BARS }, (_, i) => {
    const t = timeRef.current
    const center = EQ_BARS / 2
    const distFromCenter = Math.abs(i - center) / center
    const baseHeight = (value / 100) * (1 - distFromCenter * 0.4)
    const wave =
      Math.sin(i * 0.6 + t * 2) * 0.15 * (value / 100) +
      Math.sin(i * 1.2 + t * 3.1) * 0.1 * (value / 100)
    return Math.max(0.06, baseHeight + wave)
  })

  useEffect(() => {
    let raf: number
    const animate = (ts: number) => {
      timeRef.current = ts / 1000
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    animRef.current = raf
    return () => cancelAnimationFrame(raf)
  }, [])

  const stage = getStage(value)
  const isErupting = value >= 66

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">情绪强度</p>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full transition-all duration-300"
          style={{
            color: stage.color,
            background: `${stage.color.replace(")", " / 0.12)").replace("oklch(", "oklch(")}`,
            boxShadow: value > 33 ? `0 0 8px ${stage.color.replace(")", " / 0.35)").replace("oklch(", "oklch(")}` : "none",
          }}
        >
          {stage.label}
        </span>
      </div>

      {/* EQ 可视化区 */}
      <div
        className="flex items-end gap-0.5 h-10 px-1 rounded-lg border transition-all duration-300"
        style={{
          background: "oklch(0.14 0 0)",
          borderColor: value > 33
            ? `${stage.color.replace(")", " / 0.4)").replace("oklch(", "oklch(")}`
            : "oklch(0.22 0 0)",
          boxShadow: value > 33
            ? `0 0 12px ${stage.color.replace(")", " / 0.2)").replace("oklch(", "oklch(")}`
            : "none",
        }}
        aria-hidden="true"
      >
        {eqBars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-[1px] transition-all duration-75"
            style={{
              height: `${h * 100}%`,
              background: stage.color,
              opacity: 0.5 + h * 0.8,
              ...(isErupting
                ? { boxShadow: `0 0 3px ${stage.color.replace(")", " / 0.6)").replace("oklch(", "oklch(")}` }
                : {}),
            }}
          />
        ))}
      </div>

      {/* 滑杆 */}
      <div className="relative">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-background
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-125"
          style={{
            background: `linear-gradient(to right, ${stage.color} 0%, ${stage.color} ${value}%, oklch(0.22 0 0) ${value}%, oklch(0.22 0 0) 100%)`,
            ["--tw-ring-color" as string]: stage.color,
          }}
          aria-label="情绪强度滑杆"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
        />
        <style>{`
          input[type=range]::-webkit-slider-thumb {
            background: ${stage.color};
            box-shadow: 0 0 8px ${stage.color.replace(")", " / 0.8)").replace("oklch(", "oklch(")};
          }
        `}</style>
      </div>

      <div className="flex justify-between text-xs text-muted-foreground px-0.5">
        {STAGES.map((s) => (
          <span
            key={s.label}
            className="transition-all duration-200"
            style={{ color: stage.label === s.label ? s.color : undefined }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
