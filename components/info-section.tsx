"use client"

import { ArrowRight, Upload, Sliders, Music2, Check, Shield, Star, Building2, Users } from "lucide-react"

export function InfoSection() {
  return (
    <div className="bg-background">
      {/* 使用流程 */}
      <section className="max-w-4xl mx-auto px-4 py-20 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-10">
          使用流程
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
          {[
            { icon: Upload, label: "上传视频", desc: "支持 MP4、MOV 等格式" },
            { icon: Sliders, label: "选择情绪", desc: "5 种情绪 × 无限强度" },
            { icon: Music2, label: "生成音乐", desc: "3 秒内获得专属 BGM" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex flex-col items-center gap-2 text-center w-36">
                <div className="w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-neon-green" />
                </div>
                <p className="text-sm font-medium text-foreground">{step.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
              {i < 2 && (
                <ArrowRight className="w-4 h-4 text-border rotate-90 md:rotate-0 flex-shrink-0 mx-4" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 模板展示 */}
      <section id="templates" className="border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-8">
            热门模板
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: "治愈钢琴", mood: "治愈", color: "oklch(0.82 0.2 145)" },
              { name: "剧情反转", mood: "反转", color: "oklch(0.65 0.25 290)" },
              { name: "悬疑节奏", mood: "悬疑", color: "oklch(0.55 0.18 200)" },
              { name: "温暖日记", mood: "温暖", color: "oklch(0.72 0.15 60)" },
              { name: "冥想空间", mood: "冥想", color: "oklch(0.6 0.15 260)" },
            ].map((t) => (
              <div
                key={t.name}
                className="flex-shrink-0 w-36 rounded-xl border border-border bg-card p-4 cursor-pointer hover:border-muted-foreground transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${t.color.replace(")", " / 0.15)")
                      .replace("oklch(", "oklch(")}`,
                    color: t.color,
                  }}
                >
                  {t.mood[0]}
                </div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t.mood}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 定价 */}
      <section id="pricing" className="border-t border-border py-20">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-2">
            定价
          </p>
          <p className="text-center text-sm text-muted-foreground mb-10">
            选择最适合你的创作方案
          </p>

          {/* 四栏定价卡：桌面端 grid，移动端横向滑动 */}
          <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 md:overflow-visible">

            {/* Free */}
            <div className="flex-shrink-0 w-64 md:w-auto rounded-2xl border border-border bg-card p-5 flex flex-col gap-4 opacity-80">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Free</p>
                <p className="text-3xl font-bold text-foreground mt-1">¥0</p>
                <p className="text-xs text-muted-foreground mt-1">永久免费</p>
              </div>
              <ul className="space-y-2 flex-1">
                {["每月 3 次生成", "含水印下载", "基础情绪模板"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:bg-surface-2 transition-colors">
                免费开始
              </button>
            </div>

            {/* Creator - C 位 */}
            <div className="relative flex-shrink-0 w-64 md:w-auto rounded-2xl p-5 flex flex-col gap-4 md:scale-[1.05] md:-translate-y-1 z-10"
              style={{
                background: "oklch(0.11 0 0)",
                border: "1.5px solid oklch(0.82 0.2 145 / 0.7)",
                boxShadow: "0 0 24px oklch(0.82 0.2 145 / 0.2), 0 0 48px oklch(0.82 0.2 145 / 0.08)",
              }}
            >
              {/* shimmer 边框动效 */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, oklch(0.82 0.2 145 / 0.12) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2.8s linear infinite",
                }}
              />
              <style>{`
                @keyframes shimmer {
                  0% { background-position: -200% 0; }
                  100% { background-position: 200% 0; }
                }
              `}</style>

              {/* 博主首选标签 */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-neon-green text-background whitespace-nowrap">
                  <Star className="w-3 h-3 fill-current" />
                  博主首选
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-neon-green">Creator</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ¥49
                  <span className="text-sm font-normal text-muted-foreground"> / 月</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">个人创作者首选</p>
              </div>
              <ul className="space-y-2 flex-1">
                {["每月 50 次生成", "无水印下载", "全部情绪模板", "Beat Sync 卡点", "商用授权"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-neon-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* 商用授权证书 */}
              <div className="flex items-center gap-1.5 py-2 px-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <Shield className="w-3.5 h-3.5 text-neon-green flex-shrink-0" />
                <span className="text-[11px] text-neon-green font-medium leading-tight">
                  附带法律级商用授权证书
                </span>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-neon-green text-background text-sm font-bold hover:opacity-90 transition-opacity neon-green-glow">
                立即订阅
              </button>
            </div>

            {/* Team */}
            <div className="flex-shrink-0 w-64 md:w-auto rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">Team</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ¥99
                  <span className="text-sm font-normal text-muted-foreground"> / 月</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">团队协作</p>
              </div>
              <ul className="space-y-2 flex-1">
                {[
                  "不限次数生成",
                  "无水印下载",
                  "全部情绪模板",
                  "Beat Sync 卡点",
                  "分轨导出",
                  "5 个席位",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2.5 rounded-xl border border-border text-sm text-foreground hover:bg-surface-2 transition-colors">
                开始使用
              </button>
            </div>

            {/* Agency - 价格锚点 */}
            <div
              className="relative flex-shrink-0 w-64 md:w-auto rounded-2xl p-5 flex flex-col gap-4 overflow-hidden"
              style={{
                background: "linear-gradient(145deg, oklch(0.10 0.03 240), oklch(0.12 0.02 30))",
                border: "1.5px solid oklch(0.72 0.15 55 / 0.4)",
                boxShadow: "0 0 24px oklch(0.72 0.15 55 / 0.12)",
              }}
            >
              {/* 暗金光晕背景 */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                  background: "radial-gradient(ellipse at top right, oklch(0.72 0.15 55 / 0.08), transparent 60%)",
                }}
              />

              {/* 机构专属标签 */}
              <div className="absolute -top-0 right-0">
                <div
                  className="px-3 py-1 rounded-bl-xl rounded-tr-xl text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "linear-gradient(90deg, oklch(0.72 0.15 55 / 0.25), oklch(0.72 0.15 55 / 0.15))",
                    color: "oklch(0.85 0.12 55)",
                    border: "1px solid oklch(0.72 0.15 55 / 0.3)",
                    borderTop: "none",
                    borderRight: "none",
                  }}
                >
                  Enterprise · 机构专属
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-bold" style={{ color: "oklch(0.85 0.12 55)" }}>Agency</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ¥299
                  <span className="text-sm font-normal text-muted-foreground"> / 月</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">机构 · 工作室 · 企业</p>
              </div>

              <ul className="space-y-2 flex-1">
                {[
                  "无限次数生成",
                  "无水印 · 多格式导出",
                  "团队 5 席位",
                  "私人专属模板库",
                  "优先 Beat Sync 引擎",
                  "24/7 专属支持",
                  "API 接入权限",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "oklch(0.85 0.12 55)" }} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* 目标用户 */}
              <div
                className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-[10px]"
                style={{
                  background: "oklch(0.72 0.15 55 / 0.08)",
                  borderColor: "oklch(0.72 0.15 55 / 0.2)",
                  border: "1px solid oklch(0.72 0.15 55 / 0.2)",
                  color: "oklch(0.75 0.1 55)",
                }}
              >
                <Building2 className="w-3 h-3 flex-shrink-0" />
                <span>MCN机构 · 短剧公司 · 广告工作室</span>
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(90deg, oklch(0.72 0.15 55 / 0.9), oklch(0.65 0.12 40 / 0.9))",
                  color: "oklch(0.12 0 0)",
                }}
              >
                联系我们
              </button>
            </div>
          </div>

          {/* 移动端横滑提示 */}
          <p className="md:hidden text-center text-[10px] text-muted-foreground mt-3">
            左右滑动查看全部方案
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-16">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-8">
            常见问题
          </p>
          <div className="space-y-4">
            {[
              {
                q: "生成的音乐可以商用吗？",
                a: "Creator 及以上套餐包含商用授权，可用于短视频平台发布、广告等商业用途。",
              },
              {
                q: "音乐是 AI 原创的吗？",
                a: "是的，每次生成都是基于你的视频内容和情绪设置实时创作，100% 原创。",
              },
              {
                q: "会有版权风险吗？",
                a: "没有。所有 BGM 均由音AI Sync 独立生成，我们提供授权书保障你的权益。",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-medium text-foreground mb-1.5">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2025 音AI Sync · 短视频情绪增强器</p>
          <div className="flex gap-4">
            <span className="hover:text-foreground cursor-pointer transition-colors">用户协议</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">隐私政策</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">联系我们</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
