"use client"

import { X, Music2, MessageCircle, Phone } from "lucide-react"

interface LoginModalProps {
  onClose: () => void
  onLogin: () => void
}

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      {/* 遮罩 */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 弹窗 */}
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 图标 */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-neon-green/10 border border-neon-green/30 flex items-center justify-center neon-green-glow">
            <Music2 className="w-7 h-7 text-neon-green" />
          </div>
          <div className="text-center">
            <h2 id="login-title" className="text-lg font-bold text-foreground">
              你的专属 BGM 已生成
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              登录即可试听 & 下载完整版
            </p>
          </div>
        </div>

        {/* 登录按钮 */}
        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl
              bg-neon-green text-background font-semibold text-sm
              hover:opacity-90 transition-opacity neon-green-glow"
          >
            <MessageCircle className="w-5 h-5" />
            微信登录
          </button>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl
              bg-surface-2 border border-border text-foreground font-medium text-sm
              hover:bg-surface-3 transition-colors"
          >
            <Phone className="w-5 h-5" />
            手机号登录
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          登录即表示同意{" "}
          <span className="underline cursor-pointer hover:text-foreground">用户协议</span>
          {" "}和{" "}
          <span className="underline cursor-pointer hover:text-foreground">隐私政策</span>
        </p>
      </div>
    </div>
  )
}
