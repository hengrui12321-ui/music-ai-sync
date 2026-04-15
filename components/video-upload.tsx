"use client"

import { useState, useRef } from "react"
import { Upload, Film, X } from "lucide-react"

interface VideoUploadProps {
  onVideoSelected: (file: File) => void
  videoFile: File | null
  videoUrl: string | null
  onRemove: () => void
}

export function VideoUpload({ onVideoSelected, videoFile, videoUrl, onRemove }: VideoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("video/")) {
      onVideoSelected(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onVideoSelected(file)
  }

  if (videoUrl && videoFile) {
    return (
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-surface-1 border border-border group">
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={onRemove}
            className="bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
            aria-label="移除视频"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-3">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-neon-green flex-shrink-0" />
            <span className="text-xs text-foreground truncate">{videoFile.name}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative w-full h-full rounded-lg border-2 border-dashed cursor-pointer
        flex flex-col items-center justify-center gap-4
        transition-all duration-200
        ${isDragging
          ? "border-neon-green bg-neon-green/5 neon-green-glow"
          : "border-border bg-surface-1 hover:border-muted-foreground hover:bg-surface-2"
        }
      `}
      role="button"
      aria-label="上传视频"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors
        ${isDragging ? "bg-neon-green/20" : "bg-surface-3"}`}>
        <Upload className={`w-7 h-7 ${isDragging ? "text-neon-green" : "text-muted-foreground"}`} />
      </div>
      <div className="text-center px-4">
        <p className="text-sm font-medium text-foreground mb-1">
          {isDragging ? "松开即可上传" : "拖拽视频到这里"}
        </p>
        <p className="text-xs text-muted-foreground">或点击选择文件 · 支持 MP4、MOV、AVI</p>
      </div>
      <button
        type="button"
        className="px-5 py-2 rounded-md text-sm font-medium bg-surface-3 text-foreground border border-border hover:border-muted-foreground transition-colors"
      >
        选择视频文件
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  )
}
