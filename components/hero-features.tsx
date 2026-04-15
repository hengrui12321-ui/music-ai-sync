"use client"

import { Zap, CheckCircle2, Sparkles } from "lucide-react"

export function HeroFeatures() {
  return (
    <div className="rounded-xl border border-border bg-surface-1 px-5 py-4">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8">
        {/* 核心科技标签 */}
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: "oklch(0.82 0.2 145 / 0.12)",
              boxShadow: "0 0 12px oklch(0.82 0.2 145 / 0.25)",
            }}
          >
            <Zap className="w-4 h-4 text-neon-green" />
          </div>
          <div>
            <p className="text-xs font-bold text-neon-green uppercase tracking-wider mb-0.5">
              核心科技：Beat Sync 自动卡点引擎
            </p>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              降维打击传统模板音乐，告别千篇一律的机械循环。
            </p>
          </div>
        </div>

        {/* 分割线（桌面端竖向） */}
        <div className="hidden sm:block w-px bg-border self-stretch flex-shrink-0" />

        {/* 功能点列表 */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            {
              text: "系统自动识别：画面节奏 · 转场点 · 高潮点",
              color: "oklch(0.82 0.2 145)",
            },
            {
              text: "AI 自动匹配节奏，生成 100% 专属原创 BGM",
              color: "oklch(0.82 0.2 145)",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                style={{ color: item.color }}
              />
              <span
                className="text-xs font-medium leading-relaxed"
                style={{
                  background: `linear-gradient(90deg, ${item.color}, oklch(0.85 0.05 145))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.text}
              </span>
            </div>
          ))}

          {/* Sparkle 强调 */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <Sparkles className="w-3 h-3 text-neon-purple" />
            <span className="text-[10px] text-muted-foreground">
              降维打击传统模板音乐，告别千篇一律的机械循环
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
