"use client"

import { useState, useCallback, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { VideoUpload } from "@/components/video-upload"
import { ControlPanel } from "@/components/control-panel"
import { WaveformPlayer } from "@/components/waveform-player"
import { LoginModal } from "@/components/login-modal"
import { Dashboard } from "@/components/dashboard"
import { InfoSection } from "@/components/info-section"
import { BeatSyncVisualizer } from "@/components/beat-sync-visualizer"
import { HeroFeatures } from "@/components/hero-features"

type GenerateState = "idle" | "preloading" | "generating" | "intercepted" | "done"

export default function Home() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [generateState, setGenerateState] = useState<GenerateState>("idle")
  const [progress, setProgress] = useState(0)
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleVideoSelected = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    setVideoFile(file)
    setVideoUrl(url)
    setGenerateState("idle")
    setProgress(0)
  }, [])

  const handleRemoveVideo = useCallback(() => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    setVideoFile(null)
    setVideoUrl(null)
    setGenerateState("idle")
    setProgress(0)
  }, [videoUrl])

  const handleGenerate = useCallback(() => {
    setGenerateState("preloading")
    setProgress(0)

    // 阶段1: 0-1s 预加载，假进度到12%
    setTimeout(() => {
      setGenerateState("generating")
      setProgress(12)

      // 阶段2: 快速推进到87%
      let p = 12
      progressRef.current = setInterval(() => {
        p += Math.random() * 4 + 1.5
        if (p >= 87) {
          p = 87
          if (progressRef.current) clearInterval(progressRef.current)

          // 停在87% 1.5s 制造紧张感
          setTimeout(() => {
            // 阶段2: 继续到99%
            let p2 = 87
            const timer2 = setInterval(() => {
              p2 += Math.random() * 2 + 0.5
              if (p2 >= 99) {
                p2 = 99
                clearInterval(timer2)
                setProgress(99)

                // 阶段3: 99% 拦截
                setTimeout(() => {
                  if (!isLoggedIn) {
                    setGenerateState("intercepted")
                    setShowLogin(true)
                  } else {
                    setProgress(100)
                    setGenerateState("done")
                  }
                }, 600)
              } else {
                setProgress(Math.round(p2))
              }
            }, 150)
          }, 1500)
        } else {
          setProgress(Math.round(p))
        }
      }, 120)
    }, 800)
  }, [isLoggedIn])

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true)
    setShowLogin(false)
    setProgress(100)
    setGenerateState("done")
  }, [])

  if (showDashboard) {
    return (
      <>
        <Navbar
          isLoggedIn={isLoggedIn}
          onDashboardClick={() => setShowDashboard(true)}
          onLoginClick={() => setShowLogin(true)}
        />
        <Dashboard onClose={() => setShowDashboard(false)} />
      </>
    )
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLogin(true)}
        onDashboardClick={() => setShowDashboard(true)}
      />

      <main className="min-h-screen bg-background">
        {/* 工作台区域 */}
        <div className="pt-14 min-h-screen flex flex-col">
          {/* 主标语 */}
          <div className="text-center pt-10 pb-6 px-4">
            <p className="text-xs font-medium text-neon-green uppercase tracking-widest mb-2">
              短视频情绪增强器
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              上传视频 · 选择情绪 ·{" "}
              <span className="text-neon-green">AI 生成专属 BGM</span>
            </h1>
          </div>

          {/* Hero 核心卖点 */}
          <div className="max-w-6xl mx-auto w-full px-4 mb-4">
            <HeroFeatures />
          </div>

          {/* 工作台主体 */}
          <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
            <div className="flex flex-col lg:flex-row gap-4 h-full">
              {/* 左侧：视频区 60% */}
              <div className="lg:w-[60%] flex flex-col gap-4">
                <div className="h-64 md:h-80 lg:h-96">
                  <VideoUpload
                    videoFile={videoFile}
                    videoUrl={videoUrl}
                    onVideoSelected={handleVideoSelected}
                    onRemove={handleRemoveVideo}
                  />
                </div>

                {/* Beat Sync 波形可视化（上传视频后展示） */}
                {videoFile && generateState !== "done" && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <BeatSyncVisualizer />
                  </div>
                )}

                {/* 生成完成后：波形播放器 */}
                {generateState === "done" && (
                  <div className="rounded-xl border border-border bg-card p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <WaveformPlayer
                      isLoggedIn={isLoggedIn}
                      onDownloadClick={() => {
                        if (!isLoggedIn) setShowLogin(true)
                      }}
                    />
                  </div>
                )}
              </div>

              {/* 右侧：控制区 40% */}
              <div className="lg:w-[40%] min-h-72 lg:min-h-0">
                <ControlPanel
                  hasVideo={!!videoFile}
                  onGenerate={handleGenerate}
                  generateState={generateState}
                  progress={progress}
                  onInterceptLogin={() => setShowLogin(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 下方信息区 */}
        <InfoSection />
      </main>

      {/* 登录弹窗 */}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false)
            if (generateState === "intercepted") {
              setGenerateState("idle")
              setProgress(0)
            }
          }}
          onLogin={handleLogin}
        />
      )}
    </>
  )
}
