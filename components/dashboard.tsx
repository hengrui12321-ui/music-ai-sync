"use client"

import { Play, Download, Trash2, FileText } from "lucide-react"

interface DashboardProps {
  onClose: () => void
}

const MY_BGMS = [
  { id: 1, name: "治愈钢琴 · 30s", date: "2025-03-17", mood: "治愈" },
  { id: 2, name: "悬疑节奏 · 60s", date: "2025-03-16", mood: "悬疑" },
  { id: 3, name: "温暖氛围 · 15s", date: "2025-03-15", mood: "温暖" },
]

export function Dashboard({ onClose }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background pt-14">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-foreground">我的后台</h1>
            <p className="text-sm text-muted-foreground mt-0.5">管理你的专属 BGM</p>
          </div>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            返回工作台
          </button>
        </div>

        {/* 剩余次数 */}
        <div className="rounded-xl border border-border bg-card p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">本月剩余生成次数</p>
            <p className="text-2xl font-bold text-foreground">
              3 <span className="text-sm font-normal text-muted-foreground">/ 5 次</span>
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-neon-green text-background text-sm font-semibold hover:opacity-90 transition-opacity neon-green-glow">
            升级 Creator
          </button>
        </div>

        {/* BGM 列表 */}
        <div className="space-y-3 mb-8">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">我的 BGM</p>
          {MY_BGMS.map((bgm) => (
            <div
              key={bgm.id}
              className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-neon-green">{bgm.mood[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{bgm.name}</p>
                  <p className="text-xs text-muted-foreground">{bgm.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                  aria-label="播放"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
                  aria-label="下载"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label="删除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 授权下载 */}
        <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">授权下载</p>
            <p className="text-xs text-muted-foreground mt-0.5">下载音乐商用授权证书</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-2 border border-border text-sm text-foreground hover:bg-surface-3 transition-colors">
            <FileText className="w-4 h-4" />
            下载授权书
          </button>
        </div>
      </div>
    </div>
  )
}
