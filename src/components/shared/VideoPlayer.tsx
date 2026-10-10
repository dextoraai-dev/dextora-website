"use client";

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Subtitles,
} from "lucide-react";

export interface VideoPlayerProps {
  srcName: string; // e.g. "dextora-explainer", "hero-loop", "dhyeya-ias-explainer", "dextora-learn-explainer"
  title: string;
  poster: string;
  captionSrc?: string;
  mode?: "hero" | "interactive";
  aspectRatio?: "16/9" | "4/3" | "1/1";
  className?: string;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function VideoPlayer({
  srcName,
  title,
  poster,
  captionSrc,
  mode = "interactive",
  aspectRatio = "16/9",
  className = "",
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsActive, setCaptionsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // IntersectionObserver to pause when off-screen & visibilitychange to pause on tab change
  useEffect(() => {
    const video = videoRef.current;
    if (!video || mode !== "hero") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefersReducedMotion) {
          video.play().catch(() => {});
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (!prefersReducedMotion) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mode, prefersReducedMotion]);

  // Video state handlers
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleCaptions = () => {
    const video = videoRef.current;
    if (!video || !video.textTracks || video.textTracks.length === 0) return;
    const track = video.textTracks[0];
    if (captionsActive) {
      track.mode = "disabled";
      setCaptionsActive(false);
    } else {
      track.mode = "showing";
      setCaptionsActive(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === "hero") return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "f") {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === "c") {
      e.preventDefault();
      toggleCaptions();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime += 5;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (videoRef.current) videoRef.current.currentTime -= 5;
    }
  };

  if (mode === "hero") {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden w-full h-full select-none ${className}`}
        aria-label={title}
      >
        <video
          ref={videoRef}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay={!prefersReducedMotion}
          preload="metadata"
          className="w-full h-full object-cover"
          title={title}
        >
          <source src={`/videos/${srcName}.webm`} type="video/webm" />
          <source src={`/videos/${srcName}.mp4`} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className={`group relative rounded-3xl overflow-hidden bg-[#0B0E14] border border-[var(--border-subtle)] shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--brand-terracotta)] ${className}`}
      style={{ aspectRatio }}
      aria-label={`Video Player: ${title}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        poster={poster}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={() => {
          if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={`/videos/${srcName}.webm`} type="video/webm" />
        <source src={`/videos/${srcName}.mp4`} type="video/mp4" />
        {captionSrc && (
          <track
            kind="captions"
            src={captionSrc}
            srcLang="en"
            label="English Captions"
            default={captionsActive}
          />
        )}
      </video>

      {/* Large Center Play Overlay (when paused) */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity z-10"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--brand-terracotta)]/90 hover:bg-[var(--brand-terracotta)] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-200">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
          </div>
          <span className="mt-4 text-xs sm:text-sm font-semibold text-white tracking-wide">
            {title}
          </span>
        </div>
      )}

      {/* Accessible Control Bar */}
      <div
        className={`absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2.5 transition-opacity duration-300 z-20 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Scrubber timeline */}
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video scrubber"
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--brand-terracotta)]"
          />
        </div>

        {/* Action buttons & telemetry */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-2 rounded-lg hover:bg-white/15 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="p-2 rounded-lg hover:bg-white/15 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <span className="font-mono text-xs text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {captionSrc && (
              <button
                type="button"
                onClick={toggleCaptions}
                aria-label={captionsActive ? "Disable captions" : "Enable captions"}
                className={`p-2 rounded-lg transition-colors ${
                  captionsActive ? "bg-[var(--brand-terracotta)] text-white" : "hover:bg-white/15 text-white/80"
                }`}
              >
                <Subtitles className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              className="p-2 rounded-lg hover:bg-white/15 transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
