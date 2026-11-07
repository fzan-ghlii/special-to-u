"use client";

import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { content } from "@/content.config";
import { Countdown } from "@/components/Countdown";
import { useAudio } from "@/components/AudioProvider";

type Stage = "countdown" | "gift" | "hero" | "letter" | "memories" | "video" | "closing";

function checkIsUnlocked(): boolean {
  if (!content.siteLock.enabled) return true;
  if (content.siteLock.bypassForTesting) return true;
  const target = new Date(content.siteLock.unlockAt).getTime();
  return Date.now() >= target;
}

function formatTimer(sec: number): string {
  if (!sec || isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ── 60fps HTML5 Canvas Starlight & Golden Sparkle Particle System ── */
function StarlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      baseAlpha: number;
      phase: number;
      speed: number;
      swayAmp: number;
      kind: "ember" | "star" | "glow";
      color: string;
    }

    const palette = ["#FFF8F0", "#F5DEC2", "#E8CFAF", "#D4A373", "#C89F7B"];
    const count = Math.min(75, Math.max(42, Math.floor(width / 22)));

    const particles: Particle[] = Array.from({ length: count }, (_, i) => {
      const r = Math.random();
      const kind: Particle["kind"] =
        i % 5 === 0 ? "star" : r > 0.65 ? "glow" : "ember";
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(0.12 + Math.random() * 0.36),
        vx: (Math.random() - 0.5) * 0.18,
        size:
          kind === "star"
            ? 3.2 + Math.random() * 3.8
            : kind === "glow"
            ? 2.2 + Math.random() * 2.8
            : 1 + Math.random() * 1.8,
        baseAlpha: 0.25 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        speed: 0.012 + Math.random() * 0.025,
        swayAmp: 0.25 + Math.random() * 0.55,
        kind,
        color: palette[i % palette.length],
      };
    });

    const drawFourPointStar = (
      cx: number,
      cy: number,
      outerR: number,
      alpha: number,
      color: string
    ) => {
      const innerR = outerR * 0.26;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowColor = "#E8CFAF";
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const r = i % 2 === 0 ? outerR : innerR;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.phase += p.speed;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.phase) * p.swayAmp;

        if (p.y < -16) {
          p.y = height + 16;
          p.x = Math.random() * width;
        }
        if (p.x < -16) p.x = width + 16;
        if (p.x > width + 16) p.x = -16;

        const twinkle = 0.5 + 0.5 * Math.sin(p.phase * 1.6);
        const alpha = Math.max(0.06, Math.min(1, p.baseAlpha * (0.35 + 0.65 * twinkle)));

        if (p.kind === "star") {
          drawFourPointStar(
            p.x,
            p.y,
            p.size * (0.75 + 0.35 * twinkle),
            alpha,
            p.color
          );
        } else if (p.kind === "glow") {
          ctx.save();
          ctx.globalAlpha = alpha * 0.85;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2);
          grad.addColorStop(0, "#FFF9F2");
          grad.addColorStop(0.4, p.color);
          grad.addColorStop(1, "rgba(212, 163, 115, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = "#E8CFAF";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cine-sparkle-canvas" aria-hidden="true" />;
}

/* ── Polaroid Photo Item with Smart Romantic Illustration Fallback ── */
function PolaroidThumb({
  src,
  alt,
  index,
  caption,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  index: number;
  caption?: string;
  className?: string;
  onClick?: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  const fallbackGradients = [
    "linear-gradient(145deg, #3c2418 0%, #6b442e 50%, #9c6b49 100%)",
    "linear-gradient(145deg, #2d1b12 0%, #593825 50%, #8c5c3e 100%)",
    "linear-gradient(145deg, #42281b 0%, #754b34 50%, #b07d56 100%)",
    "linear-gradient(145deg, #331f14 0%, #633e29 50%, #996847 100%)",
  ];

  return (
    <div
      className={`cine-polaroid ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") onClick();
            }
          : undefined
      }
    >
      <div className="cine-polaroid-inner">
        {!imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="cine-polaroid-img"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="cine-polaroid-fallback"
            style={{ background: fallbackGradients[index % fallbackGradients.length] }}
          >
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="20" stroke="rgba(250,243,235,0.25)" strokeWidth="1" strokeDasharray="3 3" />
              <path
                d="M24 33C24 33 14 26.5 14 19.8C14 16.5 16.6 14 19.8 14C21.8 14 23.5 15 24 16.5C24.5 15 26.2 14 28.2 14C31.4 14 34 16.5 34 19.8C34 26.5 24 33 24 33Z"
                fill="rgba(232, 207, 176, 0.75)"
              />
              <text x="33" y="15" fontSize="8" fill="#FAF3EB" opacity="0.8">✦</text>
            </svg>
            <span className="cine-polaroid-fallback-tag">
              Moment #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
      {caption && <p className="cine-polaroid-caption">{caption}</p>}
    </div>
  );
}

export default function CinematicExperiencePage() {
  const { startPlayback, pause: pauseBgMusic } = useAudio();
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [stage, setStage] = useState<Stage>("countdown");
  const [stageTransitioning, setStageTransitioning] = useState(false);

  // Stage 1: Gift opening state
  const [giftOpening, setGiftOpening] = useState(false);

  // Stage 3: Typewriter state for letter
  const fullLetterText = [
    ...content.letter.paragraphs,
    content.letter.closing,
  ].join("\n\n");
  const [typedLength, setTypedLength] = useState(0);

  // Stage 4: Lightbox state for polaroid memories
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Stage 5: Video / Reel player state & playlist
  const videoItems = useMemo(() => {
    if (content.videoMoment.items && content.videoMoment.items.length > 0) {
      return content.videoMoment.items;
    }
    return [
      {
        id: 1,
        title: content.videoMoment.title,
        label: "Video 1",
        src: content.videoMoment.videoSrc,
        poster: content.videoMoment.posterSrc,
        caption: content.videoMoment.caption,
      },
    ];
  }, []);

  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const currentVideo = videoItems[currentVideoIdx] || videoItems[0];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isPlayingMedia, setIsPlayingMedia] = useState(false);
  const [mediaTime, setMediaTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(30);

  // Stage 6: Closing title morph typewriter state ("Happy Birthday" -> "With All My Love")
  const [closingTitle, setClosingTitle] = useState("");
  const [closingCursorVisible, setClosingCursorVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    setUnlocked(checkIsUnlocked());
  }, []);

  const handleExpire = useCallback(() => {
    setUnlocked(true);
  }, []);

  const goToStage = useCallback((nextStage: Stage) => {
    // Pause video if transitioning away
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlayingMedia(false);
    }
    setStageTransitioning(true);
    setTimeout(() => {
      setStage(nextStage);
      setStageTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 360);
  }, []);

  /* ── Stage 0 -> Stage 1 ── */
  const handleOpenGiftScreen = () => {
    if (!unlocked) return;
    startPlayback();
    setGiftOpening(false);
    goToStage("gift");
  };

  /* ── Stage 1 -> Stage 2 ── */
  const handleUnboxGift = () => {
    if (giftOpening) return;
    setGiftOpening(true);
    setTimeout(() => {
      goToStage("hero");
    }, 1150);
  };

  /* ── Stage 3: Letter Typewriter Effect ── */
  useEffect(() => {
    if (stage !== "letter") return;
    setTypedLength(0);
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= fullLetterText.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 24);
    return () => clearInterval(interval);
  }, [stage, fullLetterText]);

  /* ── Stage 5: Fallback Slideshow Reel Timer when video file is not present ── */
  useEffect(() => {
    if (stage !== "video" || !videoFailed || !isPlayingMedia) return;
    const id = setInterval(() => {
      setMediaTime((prev) => {
        if (prev >= mediaDuration) {
          setIsPlayingMedia(false);
          return 0;
        }
        return prev + 0.25;
      });
    }, 250);
    return () => clearInterval(id);
  }, [stage, videoFailed, isPlayingMedia, mediaDuration]);

  /* ── Stage 6: Closing Title Typewriter Morph ("Happy Birthday" -> "With All My Love") ── */
  useEffect(() => {
    if (stage !== "closing") return;
    const first = content.closingScreen.firstTitle || "Happy Birthday";
    const second = content.closingScreen.finalTitle || "With All My Love";
    let cancelled = false;
    setClosingTitle("");
    setClosingCursorVisible(true);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    async function runMorph() {
      // 1. Type "Happy Birthday"
      for (let i = 1; i <= first.length; i++) {
        if (cancelled) return;
        setClosingTitle(first.slice(0, i));
        await sleep(75);
      }
      await sleep(700);
      // 2. Backspace "Happy Birthday"
      for (let i = first.length; i >= 0; i--) {
        if (cancelled) return;
        setClosingTitle(first.slice(0, i));
        await sleep(45);
      }
      await sleep(250);
      // 3. Type "With All My Love"
      for (let i = 1; i <= second.length; i++) {
        if (cancelled) return;
        setClosingTitle(second.slice(0, i));
        await sleep(85);
      }
      await sleep(1200);
      if (!cancelled) setClosingCursorVisible(false);
    }

    runMorph();
    return () => {
      cancelled = true;
    };
  }, [stage]);

  const handleSelectVideo = useCallback(
    (idx: number) => {
      setCurrentVideoIdx(idx);
      setMediaTime(0);
      setVideoFailed(false);
      setIsPlayingMedia(true);
      pauseBgMusic();
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current
            .play()
            .then(() => setIsPlayingMedia(true))
            .catch(() => {
              // Browser may require user interaction for autoplay with sound
              setIsPlayingMedia(false);
            });
        }
      }, 100);
    },
    [pauseBgMusic]
  );

  const handlePrevVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentVideoIdx - 1 + videoItems.length) % videoItems.length;
    handleSelectVideo(prevIdx);
  };

  const handleNextVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentVideoIdx + 1) % videoItems.length;
    handleSelectVideo(nextIdx);
  };

  const handleVideoEnded = () => {
    if (currentVideoIdx < videoItems.length - 1) {
      handleSelectVideo(currentVideoIdx + 1);
    } else {
      setIsPlayingMedia(false);
    }
  };

  const handleTimelineSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * (mediaDuration || 1);
    setMediaTime(newTime);
    if (videoRef.current && !videoFailed) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleMediaPlayback = () => {
    if (!videoFailed && videoRef.current) {
      if (videoRef.current.paused) {
        pauseBgMusic();
        videoRef.current
          .play()
          .then(() => {
            setIsPlayingMedia(true);
          })
          .catch(() => {
            setVideoFailed(true);
            setIsPlayingMedia(true);
          });
      } else {
        videoRef.current.pause();
        setIsPlayingMedia(false);
      }
    } else {
      setIsPlayingMedia((prev) => !prev);
    }
  };

  const photos = content.gallery;
  const heroPolaroids = Array.from({ length: 6 }, (_, i) => photos[i % photos.length]);
  const wallPolaroids = photos;
  const activeSlideIdx =
    photos.length > 0
      ? Math.floor((mediaTime / (mediaDuration || 30)) * photos.length) % photos.length
      : 0;

  if (!mounted) {
    return (
      <div className="cine-stage-shell">
        <div className="cine-center-wrap">
          <p className="cine-eyebrow">{content.cover.eyebrow}</p>
          <h1 className="cine-display-title">
            {content.cover.title}
            <br />
            <span className="cine-display-italic">{content.cover.titleItalic}</span>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="cine-stage-shell">
      {/* ── Ambient Starlight Dust, Canvas Sparkles & Blurred Heart Bokeh ── */}
      <div className="cine-ambient-layer" aria-hidden="true">
        <StarlightCanvas />

        {/* Soft blurred glowing heart bokeh */}
        <span className="cine-heart-bokeh hb-1">♥</span>
        <span className="cine-heart-bokeh hb-2">♥</span>
        <span className="cine-heart-bokeh hb-3">♥</span>
        <span className="cine-heart-bokeh hb-4">♥</span>
        <span className="cine-heart-bokeh hb-5">♥</span>
        <span className="cine-heart-bokeh hb-6">♥</span>
      </div>

      {/* ── Subtle Top Progress Dots once inside the surprise ── */}
      {stage !== "countdown" && stage !== "gift" && (
        <nav className="cine-step-dots" aria-label="Tahapan kejutan">
          {(["hero", "letter", "memories", "video", "closing"] as Stage[]).map((s, idx) => (
            <button
              key={s}
              type="button"
              className={`cine-step-dot ${stage === s ? "active" : ""}`}
              onClick={() => goToStage(s)}
              aria-label={`Layar ${idx + 1}`}
              title={`Layar ${idx + 1}`}
            />
          ))}
        </nav>
      )}

      {/* =====================================================================
          STAGE 0: MYSTERIOUS COUNTDOWN SCREEN (Matches early_01 & early_03)
         ===================================================================== */}
      {stage === "countdown" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="Hitung mundur menuju waktu spesial"
        >
          <div className="cine-center-wrap">
            <p className="cine-eyebrow">{content.cover.eyebrow}</p>

            <h1 className="cine-display-title">
              {content.cover.title}
              <br />
              <span className="cine-display-italic">{content.cover.titleItalic}</span>
            </h1>

            <p className="cine-subtitle">{content.cover.subtitle}</p>

            {/* 4 Frosted Glass Countdown Boxes */}
            <Countdown onExpire={handleExpire} />

            {/* Status Text Under Countdown */}
            <p className="cine-status-line">
              {unlocked ? content.cover.unlockedStatus : content.cover.lockedStatus}
            </p>

            {/* Action Pill Button */}
            {unlocked ? (
              <button
                type="button"
                id="btn-buka-ucapan"
                className="cine-pill-btn cine-pill-btn-glow"
                onClick={handleOpenGiftScreen}
              >
                <span className="cine-btn-sparkle">✦</span>
                <span>{content.cover.unlockedButtonText}</span>
                <span aria-hidden="true">🎁</span>
                <span className="cine-btn-sparkle">✦</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="cine-pill-btn cine-pill-btn-locked"
                  disabled
                >
                  <span aria-hidden="true">🔒</span>
                  <span>{content.cover.lockedButtonText}</span>
                  <span aria-hidden="true">🔒</span>
                </button>
                <p className="cine-lock-date">{content.cover.lockMessage}</p>
              </>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          STAGE 1: INTERACTIVE GLOWING GIFT BOX (Matches frame_002 & early_06)
         ===================================================================== */}
      {stage === "gift" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="Buka kado spesial"
        >
          <div className="cine-center-wrap">
            <p className="cine-eyebrow">{content.giftScreen.eyebrow}</p>

            <button
              type="button"
              className={`cine-gift-stage-btn ${giftOpening ? "is-opening" : ""}`}
              onClick={handleUnboxGift}
              aria-label="Klik untuk membuka kado"
            >
              {/* Radial Warm Glow Halo */}
              <div className="cine-gift-halo" aria-hidden="true" />

              {/* Bursting Sparkles on Click */}
              {giftOpening && (
                <div className="cine-gift-burst" aria-hidden="true">
                  <span className="burst-item b-1">✦</span>
                  <span className="burst-item b-2">🤍</span>
                  <span className="burst-item b-3">✨</span>
                  <span className="burst-item b-4">🎉</span>
                  <span className="burst-item b-5">✦</span>
                  <span className="burst-item b-6">🤍</span>
                  <span className="burst-item b-7">✨</span>
                  <span className="burst-item b-8">✦</span>
                </div>
              )}

              {/* Glowing Gift Box SVG */}
              <svg
                className="cine-gift-svg"
                width="180"
                height="180"
                viewBox="0 0 180 180"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="giftGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#F5DEC2" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#D4A373" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="boxBody" x1="40" y1="75" x2="140" y2="155" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4A2E20" />
                    <stop offset="100%" stopColor="#26160E" />
                  </linearGradient>
                  <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFF6EB" />
                    <stop offset="50%" stopColor="#E8CFAF" />
                    <stop offset="100%" stopColor="#C89F7B" />
                  </linearGradient>
                </defs>

                <circle cx="90" cy="95" r="76" fill="url(#giftGlow)" />

                {/* Gift Box Base */}
                <g className="cine-gift-base">
                  <rect
                    x="42"
                    y="82"
                    width="96"
                    height="68"
                    rx="8"
                    fill="url(#boxBody)"
                    stroke="#D4A373"
                    strokeWidth="1.6"
                  />
                  {/* Horizontal Ribbon */}
                  <rect x="42" y="109" width="96" height="14" fill="url(#goldRibbon)" opacity="0.92" />
                  {/* Vertical Ribbon */}
                  <rect x="83" y="82" width="14" height="68" fill="url(#goldRibbon)" />
                </g>

                {/* Gift Box Lid + Glowing Bow */}
                <g className="cine-gift-lid">
                  <rect
                    x="36"
                    y="66"
                    width="108"
                    height="20"
                    rx="6"
                    fill="#5A3827"
                    stroke="#E8CFAF"
                    strokeWidth="1.6"
                  />
                  <rect x="83" y="66" width="14" height="20" fill="url(#goldRibbon)" />

                  {/* Left Bow Loop */}
                  <path
                    d="M90 66 C74 42, 48 48, 60 64 C66 70, 82 68, 90 66 Z"
                    fill="url(#goldRibbon)"
                  />
                  {/* Right Bow Loop */}
                  <path
                    d="M90 66 C106 42, 132 48, 120 64 C114 70, 98 68, 90 66 Z"
                    fill="url(#goldRibbon)"
                  />
                  {/* Ribbon Tails */}
                  <path
                    d="M86 66 L72 86"
                    stroke="#E8CFAF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M94 66 L108 86"
                    stroke="#E8CFAF"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Center Knot */}
                  <circle cx="90" cy="65" r="6" fill="#FFFDF9" />
                </g>
              </svg>
            </button>

            <p className="cine-gift-hint">{content.giftScreen.hint}</p>
          </div>
        </section>
      )}

      {/* =====================================================================
          STAGE 2: "YOUR SPECIAL DAY" WITH FLOATING POLAROIDS (Matches frame_003)
         ===================================================================== */}
      {stage === "hero" && (
        <section
          className={`cine-scene cine-hero-scene ${
            stageTransitioning ? "scene-exit" : "scene-enter"
          }`}
          aria-label="Your Special Day"
        >
          {/* Floating Left Polaroids */}
          <div className="cine-hero-polaroids-left">
            {heroPolaroids.slice(0, 3).map((p, idx) => (
              <PolaroidThumb
                key={`left-${idx}`}
                src={p.src}
                alt={`Kenangan ${idx + 1}`}
                index={idx}
                className={`hero-pol hp-left-${idx + 1}`}
                onClick={() => setActivePhotoIdx(idx)}
              />
            ))}
          </div>

          {/* Center Hero Title & CTA */}
          <div className="cine-center-wrap cine-hero-center">
            <p className="cine-eyebrow">{content.heroScreen.eyebrow}</p>

            <h1 className="cine-hero-big-title">
              {content.heroScreen.titleTop}
              <br />
              <span>{content.heroScreen.titleBottom}</span>
            </h1>

            <p className="cine-hero-italic-sub">{content.heroScreen.subtitle}</p>

            <div className="cine-diamond-divider" aria-hidden="true">
              <span className="div-line" />
              <span className="div-diamond">✦</span>
              <span className="div-line" />
            </div>

            <button
              type="button"
              className="cine-pill-btn cine-pill-btn-glow"
              onClick={() => goToStage("letter")}
            >
              <span>{content.heroScreen.buttonText}</span>
            </button>
          </div>

          {/* Floating Right Polaroids */}
          <div className="cine-hero-polaroids-right">
            {heroPolaroids.slice(3, 6).map((p, idx) => (
              <PolaroidThumb
                key={`right-${idx}`}
                src={p.src}
                alt={`Kenangan ${idx + 4}`}
                index={idx + 3}
                className={`hero-pol hp-right-${idx + 1}`}
                onClick={() => setActivePhotoIdx(idx + 3)}
              />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          STAGE 3: "HAPPY BIRTHDAY" TYPEWRITER LETTER (Matches frame_004 - 007)
         ===================================================================== */}
      {stage === "letter" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="Surat ulang tahun"
        >
          <div className="cine-letter-stage-wrap">
            <h1 className="cine-section-serif-title">{content.letter.pageTitle}</h1>

            <article
              className="cine-glass-letter-card"
              onClick={() => setTypedLength(fullLetterText.length)}
              title="Ketuk untuk menampilkan seluruh surat sekaligus"
            >
              <div className="cine-letter-top-bar">
                <h2 className="cine-letter-greeting">{content.letter.greeting}</h2>
                {typedLength < fullLetterText.length && (
                  <button
                    type="button"
                    className="cine-skip-type-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTypedLength(fullLetterText.length);
                    }}
                  >
                    Tampilkan Semua ⏭
                  </button>
                )}
              </div>

              <div className="cine-letter-typed-body">
                {fullLetterText
                  .slice(0, typedLength)
                  .split("\n\n")
                  .map((para, idx, arr) => (
                    <p key={idx} className="cine-letter-para">
                      {para}
                      {idx === arr.length - 1 &&
                        typedLength < fullLetterText.length && (
                          <span className="cine-type-cursor" aria-hidden="true">
                            |
                          </span>
                        )}
                    </p>
                  ))}
              </div>
            </article>

            <div className="cine-stage-bottom-action">
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() => goToStage("memories")}
              >
                <span>{content.letter.nextButtonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          STAGE 4: "OUR MEMORIES" POLAROID WALL (Matches frame_008 & frame_009)
         ===================================================================== */}
      {stage === "memories" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="Galeri Polaroid Kenangan"
        >
          <div className="cine-memories-stage-wrap">
            <div className="cine-Polaroid-wall-grid">
              {wallPolaroids.map((photo, idx) => (
                <PolaroidThumb
                  key={idx}
                  src={photo.src}
                  alt={`Foto kenangan ${idx + 1}`}
                  index={idx}
                  caption={photo.story}
                  className={`wall-pol wp-${(idx % 8) + 1}`}
                  onClick={() => setActivePhotoIdx(idx % photos.length)}
                />
              ))}
            </div>

            <div className="cine-stage-bottom-action">
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() => goToStage("video")}
              >
                <span>A MOMENT FOR YOU →</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Global Polaroid Lightbox Modal (for both Your Special Day & Our Memories) */}
      {activePhotoIdx !== null && photos[activePhotoIdx] && (
        <div
          className="cine-lightbox-backdrop"
          onClick={() => setActivePhotoIdx(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="cine-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="cine-lightbox-close"
              onClick={() => setActivePhotoIdx(null)}
              aria-label="Tutup foto"
            >
              ✕
            </button>
            <PolaroidThumb
              src={photos[activePhotoIdx].src}
              alt={`Kenangan ${activePhotoIdx + 1}`}
              index={activePhotoIdx}
              className="lightbox-pol"
            />
            <p className="cine-lightbox-story">
              “{photos[activePhotoIdx].story}”
            </p>
            <div className="cine-lightbox-nav">
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() =>
                  setActivePhotoIdx(
                    (activePhotoIdx - 1 + photos.length) % photos.length
                  )
                }
              >
                ← Sebelumnya
              </button>
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() =>
                  setActivePhotoIdx((activePhotoIdx + 1) % photos.length)
                }
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          STAGE 5: "A MOMENT FOR YOU" VIDEO / MEMORY PLAYER (Matches frame_010-014)
         ===================================================================== */}
      {stage === "video" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="A Moment For You"
        >
          <div className="cine-video-stage-wrap">
            <h1 className="cine-section-serif-title">{content.videoMoment.title}</h1>
            <p className="cine-video-sub">{content.videoMoment.subtitle}</p>

            {/* Video Playlist Pills Selector (Matches the 4 configured videos) */}
            {videoItems.length > 1 && (
              <div
                className="cine-video-playlist-tabs"
                role="tablist"
                aria-label="Pilih video kenangan"
              >
                {videoItems.map((item, idx) => {
                  const isActive = idx === currentVideoIdx;
                  return (
                    <button
                      key={item.id || idx}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`cine-video-tab-btn ${isActive ? "active" : ""}`}
                      onClick={() => handleSelectVideo(idx)}
                    >
                      <span className="cine-video-tab-num">0{idx + 1}</span>
                      <span className="cine-video-tab-label">
                        {item.title || item.label}
                      </span>
                      {isActive && <span className="cine-video-tab-dot">✦</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Video / Cinematic Reel Frame */}
            <div className="cine-video-card">
              <div className="cine-video-viewport" onClick={toggleMediaPlayback}>
                {!videoFailed ? (
                  <video
                    key={currentVideo.src}
                    ref={videoRef}
                    className="cine-video-element"
                    src={currentVideo.src}
                    poster={currentVideo.poster}
                    playsInline
                    onLoadedMetadata={(e) => {
                      const dur = e.currentTarget.duration;
                      if (dur && !isNaN(dur)) setMediaDuration(dur);
                    }}
                    onTimeUpdate={(e) => setMediaTime(e.currentTarget.currentTime)}
                    onEnded={handleVideoEnded}
                    onError={() => setVideoFailed(true)}
                  />
                ) : (
                  /* Automatic Romantic Slideshow Reel if video file fails to load */
                  <div className="cine-reel-fallback">
                    <div
                      className={`cine-reel-slide ${
                        isPlayingMedia ? "ken-burns-active" : ""
                      }`}
                      key={activeSlideIdx}
                    >
                      <PolaroidThumb
                        src={photos[activeSlideIdx]?.src || "/photos/1.jpeg"}
                        alt="Momen Spesial"
                        index={activeSlideIdx}
                        className="reel-pol-frame"
                      />
                      <p className="cine-reel-caption">
                        “{photos[activeSlideIdx]?.story || currentVideo.caption}”
                      </p>
                    </div>
                  </div>
                )}

                {/* Center Circular Play/Pause Overlay Button (Matches frame_010 & frame_014) */}
                <button
                  type="button"
                  className={`cine-video-center-play ${
                    isPlayingMedia ? "is-playing" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMediaPlayback();
                  }}
                  aria-label={isPlayingMedia ? "Jeda video" : "Putar video"}
                >
                  {isPlayingMedia ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Bottom Player Timeline Controls */}
              <div className="cine-video-controls">
                {videoItems.length > 1 && (
                  <button
                    type="button"
                    className="cine-vc-btn cine-vc-btn-skip"
                    onClick={handlePrevVideo}
                    aria-label="Video sebelumnya"
                    title="Video sebelumnya"
                  >
                    ⏮
                  </button>
                )}

                <button
                  type="button"
                  className="cine-vc-btn"
                  onClick={toggleMediaPlayback}
                  aria-label={isPlayingMedia ? "Jeda" : "Putar"}
                >
                  {isPlayingMedia ? "⏸" : "▶"}
                </button>

                {videoItems.length > 1 && (
                  <button
                    type="button"
                    className="cine-vc-btn cine-vc-btn-skip"
                    onClick={handleNextVideo}
                    aria-label="Video berikutnya"
                    title="Video berikutnya"
                  >
                    ⏭
                  </button>
                )}

                <span className="cine-vc-time">
                  {formatTimer(mediaTime)} / {formatTimer(mediaDuration)}
                </span>

                <div
                  className="cine-vc-bar-wrap"
                  onClick={handleTimelineSeek}
                  role="slider"
                  aria-label="Progres video"
                  aria-valuenow={mediaTime}
                  aria-valuemin={0}
                  aria-valuemax={mediaDuration || 1}
                  tabIndex={0}
                >
                  <div
                    className="cine-vc-bar-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        (mediaTime / (mediaDuration || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>

                {videoItems.length > 1 && (
                  <span className="cine-vc-badge">
                    {currentVideoIdx + 1}/{videoItems.length}
                  </span>
                )}
              </div>
            </div>

            {/* Video Caption & Info Banner */}
            <div className="cine-video-info-banner">
              <p className="cine-video-caption-text">
                “{currentVideo.caption}”
              </p>
            </div>

            <div className="cine-stage-bottom-action">
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() => goToStage("closing")}
              >
                <span>{content.videoMoment.nextButtonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          STAGE 6: "WITH ALL MY LOVE" CLOSING SCREEN (Matches frame_015 & 016)
         ===================================================================== */}
      {stage === "closing" && (
        <section
          className={`cine-scene ${stageTransitioning ? "scene-exit" : "scene-enter"}`}
          aria-label="With All My Love"
        >
          <div className="cine-center-wrap cine-closing-wrap">
            <h1 className="cine-closing-morph-title">
              <span>{closingTitle}</span>
              {closingCursorVisible && (
                <span className="cine-type-cursor" aria-hidden="true">
                  |
                </span>
              )}
            </h1>

            <p className="cine-closing-line">{content.closingScreen.messageLine1}</p>
            <p className="cine-closing-line">{content.closingScreen.messageLine2}</p>

            <p className="cine-closing-signoff">{content.closingScreen.signOff}</p>

            <div className="cine-closing-actions">
              <button
                type="button"
                className="cine-pill-btn cine-pill-btn-outline"
                onClick={() => goToStage("countdown")}
              >
                <span>{content.closingScreen.replayButtonText}</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
