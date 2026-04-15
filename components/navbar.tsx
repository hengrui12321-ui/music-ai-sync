"use client"

import Link from "next/link"
import { useState } from "react"
import { Music2, User, Menu, X } from "lucide-react"

interface NavbarProps {
  onLoginClick?: () => void
  isLoggedIn?: boolean
  onDashboardClick?: () => void
}

export function Navbar({ onLoginClick, isLoggedIn, onDashboardClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-neon-green flex items-center justify-center">
            <Music2 className="w-4 h-4 text-background" />
          </div>
          <span className="font-bold text-base tracking-tight text-foreground">
            音<span className="text-neon-green">AI</span> Sync
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#templates" className="hover:text-foreground transition-colors">
            模板
          </Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">
            定价
          </Link>
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={onDashboardClick}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="w-4 h-4" />
              我的后台
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-sm px-4 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-medium"
            >
              登录
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="#templates" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            模板
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            定价
          </Link>
          <button
            onClick={() => { onLoginClick?.(); setMenuOpen(false) }}
            className="text-left text-sm text-neon-green font-medium"
          >
            登录 / 注册
          </button>
        </div>
      )}
    </header>
  )
}
