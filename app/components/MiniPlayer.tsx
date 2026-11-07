"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAudio } from "./AudioProvider";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export function MiniPlayer() {
  const {
    tracks,
    currentIndex,
    isPlaying,
    toggle,
    currentTime,
    duration,
    seek,
    next,
    prev,
    volume,
    setVolume,
    selectTrack,
  } = useAudio();
  const pathname = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const isHidden =
    pathname === "/musik" ||
    pathname.startsWith("/musik/") ||
    tracks.length === 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isPopupOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isPopupOpen) {
        setIsPopupOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen]);

  if (isHidden) return null;

  const track = tracks[currentIndex] || tracks[0];

  return (
    <div
      className="corner-music-root"
      ref={containerRef}
      role="region"
      aria-label="Pemutar musik sudut kanan bawah"
    >
      {/* Pop-up Card above the bottom-right pill */}
      {isPopupOpen && (
        <div className="corner-music-popup" role="dialog" aria-label="Kontrol musik">
          <div className="corner-popup-header">
            <div className="corner-popup-disc-wrap">
              <div className={`corner-popup-disc ${isPlaying ? "spinning" : ""}`}>
                <span className="corner-disc-center">♪</span>
              </div>
              <div className="corner-popup-meta">
                <span className="corner-popup-badge">
                  {isPlaying ? "✦ NOW PLAYING" : "✦ PAUSED"}
                </span>
                <h4 className="corner-popup-title">{track.title}</h4>
                <p className="corner-popup-artist">{track.artist}</p>
              </div>
            </div>
            <button
              type="button"
              className="corner-popup-close"
              onClick={() => setIsPopupOpen(false)}
              aria-label="Tutup pop-up musik"
            >
              ✕
            </button>
          </div>

          {/* Progress scrub bar */}
          <div className="corner-popup-scrub">
            <input
              type="range"
              className="corner-scrub-input"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Posisi waktu lagu"
            />
            <div className="corner-scrub-times">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main transport controls */}
          <div className="corner-popup-controls">
            <button
              type="button"
              className="corner-ctrl-btn"
              onClick={prev}
              aria-label="Lagu sebelumnya"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            <button
              type="button"
              className="corner-ctrl-play"
              onClick={toggle}
              aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="corner-ctrl-btn"
              onClick={next}
              aria-label="Lagu berikutnya"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Volume & Playlist mini selector */}
          <div className="corner-popup-volume">
            <span className="corner-vol-icon" aria-hidden="true">
              {volume === 0 ? "🔇" : "🔉"}
            </span>
            <input
              type="range"
              className="corner-vol-slider"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume musik"
            />
          </div>

          {tracks.length > 1 && (
            <div className="corner-popup-playlist">
              {tracks.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`corner-track-item ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => selectTrack(idx)}
                >
                  <span className="corner-track-num">0{idx + 1}</span>
                  <span className="corner-track-name">{t.title}</span>
                  {idx === currentIndex && isPlaying && (
                    <span className="corner-track-playing-dot">●</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom-Right Pill (Exact Video Style) */}
      <div className={`corner-music-pill ${isPlaying ? "is-playing" : "is-paused"}`}>
        <button
          type="button"
          className="corner-pill-circle"
          onClick={toggle}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          title={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className="corner-pill-status"
          onClick={() => setIsPopupOpen((prev) => !prev)}
          aria-expanded={isPopupOpen}
          aria-label="Buka pop-up detail musik"
          title="Ketuk untuk detail musik"
        >
          <span className={`corner-eq-bars ${isPlaying ? "active" : ""}`} aria-hidden="true">
            <span className="c-bar b1" />
            <span className="c-bar b2" />
            <span className="c-bar b3" />
            <span className="c-bar b4" />
          </span>
          <span className="corner-pill-text">
            {isPlaying ? "Playing" : "Music"}
          </span>
        </button>
      </div>
    </div>
  );
}
