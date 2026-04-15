"use client"

import { useEffect, useRef, useState } from "react"
import { Zap } from "lucide-react"
import { MoodSelector } from "./mood-selector"
import { IntensitySlider } from "./intensity-slider"

type Duration = "15s" | "30s" | "60s"

type GenerateState = "idle" | "preloading" | "generating" | "intercepted" | "done"

interface ControlPanelProps {
  hasVideo: boolean
  onGenerate: () => void
  generateState: GenerateState
  progress: number
  onInterceptLogin: () => void
}

export function ControlPanel({
  hasVideo,
  onGenerate,
  generateState,
  progress,
  onInterceptLogin,
}: ControlPanelProps) {
  const [mood, setMood] = useState("auto")
  const [intensity, setIntensity] = useState(60)
  const [duration, setDuration] = useState<Duration>("30s")

  const durations: Duration[] = ["15s", "30s", "60s"]

  const isDisabled = !hasVideo || generateState === "generating" || generateState === "preloading"

  // 生成阶段文案
  const getProgressLabel = (p: number) => {
    if (p < 25) return "分析画面节奏..."
    if (p < 55) return "匹配转场点..."
    if (p < 80) return "生成原创音频..."
    return "音频合成中..."
  }

  return (
    <div className="flex flex-col h-full gap-6 p-5 bg-surface-1 rounded-xl border border-border overflow-y-auto">
      {/* 标题 */}
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-neon-green" />
        <span className="text-sm font-semibold text-foreground">BGM 控制台</span>
      </div>

      {/* 情绪选择 */}
      <MoodSelector selectedMood={mood} onSelect={setMood} />

      {/* 分割线 */}
      <div className="h-px bg-border" />

      {/* 情绪强度 */}
      <IntensitySlider value={intensity} onChange={setIntensity} />

      {/* 分割线 */}
      <div className="h-px bg-border" />

      {/* 时长选择 */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">时长</p>
        <div className="flex gap-2">
          {durations.map((d) => (
            <label
              key={d}
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${duration === d
                  ? "border-neon-green bg-neon-green"
                  : "border-border group-hover:border-muted-foreground"
                }`}
              >
                {duration === d && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
              </div>
              <span className={`text-sm transition-colors ${duration === d ? "text-foreground" : "text-muted-foreground"}`}>
                {d}
              </span>
              <input
                type="radio"
                name="duration"
                value={d}
                checked={duration === d}
                onChange={() => setDuration(d)}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 间隔 */}
      <div className="flex-1" />

      {/* 生成状态 + 按钮 */}
      {generateState === "generating" || generateState === "preloading" ? (
        <div className="space-y-3">
          <div className="relative h-1.5 rounded-full bg-surface-3 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-neon-green transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground animate-pulse">
              {generateState === "preloading" ? "正在启动引擎..." : getProgressLabel(progress)}
            </p>
            <span className="text-xs font-mono text-neon-green">{progress}%</span>
          </div>
          <button
            disabled
            className="w-full py-3.5 rounded-xl bg-surface-2 text-muted-foreground text-sm font-bold cursor-not-allowed"
          >
            生成中...
          </button>
        </div>
      ) : (
        <button
          onClick={onGenerate}
          disabled={isDisabled}
          className={`
            relative w-full py-3.5 rounded-xl text-sm font-bold
            transition-all duration-150 overflow-hidden
            ${isDisabled
              ? "bg-surface-2 text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            }
          `}
        >
          {!hasVideo ? "请先上传视频" : "生成我的 BGM"}
        </button>
      )}

      {!hasVideo && (
        <p className="text-xs text-muted-foreground text-center -mt-2">
          上传视频后即可生成
        </p>
      )}
    </div>
  )
}
