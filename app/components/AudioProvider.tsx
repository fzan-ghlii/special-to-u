"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { content } from "@/content.config";

export interface Track {
  title: string;
  artist: string;
  src: string;
}

interface AudioContextValue {
  tracks: Track[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isLooping: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  setLooping: (loop: boolean) => void;
  selectTrack: (index: number) => void;
  startPlayback: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}

// Gentle birthday music box melody notes (frequencies in Hz)
const MELODY = [
  { note: 261.63, dur: 0.5 }, // C4
  { note: 261.63, dur: 0.5 }, // C4
  { note: 293.66, dur: 1.0 }, // D4
  { note: 261.63, dur: 1.0 }, // C4
  { note: 349.23, dur: 1.0 }, // F4
  { note: 329.63, dur: 2.0 }, // E4
  { note: 261.63, dur: 0.5 }, // C4
  { note: 261.63, dur: 0.5 }, // C4
  { note: 293.66, dur: 1.0 }, // D4
  { note: 261.63, dur: 1.0 }, // C4
  { note: 392.00, dur: 1.0 }, // G4
  { note: 349.23, dur: 2.0 }, // F4
  { note: 261.63, dur: 0.5 }, // C4
  { note: 261.63, dur: 0.5 }, // C4
  { note: 523.25, dur: 1.0 }, // C5
  { note: 440.00, dur: 1.0 }, // A4
  { note: 349.23, dur: 1.0 }, // F4
  { note: 329.63, dur: 1.0 }, // E4
  { note: 293.66, dur: 1.5 }, // D4
  { note: 466.16, dur: 0.5 }, // Bb4
  { note: 466.16, dur: 0.5 }, // Bb4
  { note: 440.00, dur: 1.0 }, // A4
  { note: 349.23, dur: 1.0 }, // F4
  { note: 392.00, dur: 1.0 }, // G4
  { note: 349.23, dur: 2.5 }, // F4
];

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isSynthPlayingRef = useRef(false);

  const [tracks] = useState<Track[]>(content.music.tracks);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // default 2 mins for synth
  const [isLooping, setIsLoopingState] = useState(false);
  const [started, setStarted] = useState(false);

  // Helper: Play single soft chime note
  const playChimeNote = useCallback((freq: number, dur: number, vol: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Bell-like / music-box envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol * 0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur * 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch {
      // AudioContext not allowed yet
    }
  }, []);

  // Synthetic Music Box Loop (used as fallback when mp3 is placeholder)
  const startSynthLoop = useCallback(() => {
    if (isSynthPlayingRef.current) return;
    isSynthPlayingRef.current = true;
    setIsPlaying(true);

    let noteIdx = 0;
    let elapsed = 0;

    const playNext = () => {
      if (!isSynthPlayingRef.current) return;
      const cur = MELODY[noteIdx];
      playChimeNote(cur.note, cur.dur, volume);

      elapsed += cur.dur;
      setCurrentTime(elapsed % 120);

      noteIdx = (noteIdx + 1) % MELODY.length;
      synthTimerRef.current = setTimeout(playNext, cur.dur * 850);
    };

    playNext();
  }, [playChimeNote, volume]);

  const stopSynthLoop = useCallback(() => {
    isSynthPlayingRef.current = false;
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Initialize HTML Audio
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.8;
    audio.loop = false;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (!isSynthPlayingRef.current) setCurrentTime(audio.currentTime);
    };
    const onDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onEnded = () => {
      if (isLooping) {
        audio.currentTime = 0;
        audio.play().catch(() => startSynthLoop());
      } else {
        next();
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => {
      if (!isSynthPlayingRef.current) setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      stopSynthLoop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLooping]);

  // Load track when currentIndex changes
  useEffect(() => {
    if (!audioRef.current || tracks.length === 0) return;
    audioRef.current.src = tracks[currentIndex]?.src || "";
    audioRef.current.load();

    if (started && isPlaying) {
      audioRef.current.play().catch(() => {
        // Fallback to soothing chime music box
        startSynthLoop();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, tracks]);

  const play = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Fallback to synthetic music box
        startSynthLoop();
      });
  }, [startSynthLoop]);

  const pause = useCallback(() => {
    if (audioRef.current) audioRef.current.pause();
    stopSynthLoop();
  }, [stopSynthLoop]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const next = useCallback(() => {
    stopSynthLoop();
    setCurrentIndex((prev) => (prev + 1) % (tracks.length || 1));
  }, [stopSynthLoop, tracks.length]);

  const prev = useCallback(() => {
    stopSynthLoop();
    setCurrentIndex((prev) => (prev - 1 + (tracks.length || 1)) % (tracks.length || 1));
  }, [stopSynthLoop, tracks.length]);

  const seek = useCallback((time: number) => {
    setCurrentTime(time);
    if (audioRef.current && !isSynthPlayingRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  }, []);

  const setLooping = useCallback((loop: boolean) => {
    setIsLoopingState(loop);
    if (audioRef.current) audioRef.current.loop = loop;
  }, []);

  const selectTrack = useCallback(
    (index: number) => {
      stopSynthLoop();
      setCurrentIndex(index);
      setTimeout(() => play(), 100);
    },
    [play, stopSynthLoop]
  );

  const startPlayback = useCallback(() => {
    if (!started && content.music.autoPlayAfterEnter && tracks.length > 0) {
      setStarted(true);
      play();
    }
  }, [play, started, tracks.length]);

  return (
    <AudioCtx.Provider
      value={{
        tracks,
        currentIndex,
        isPlaying,
        volume,
        currentTime,
        duration,
        isLooping,
        play,
        pause,
        toggle,
        next,
        prev,
        seek,
        setVolume,
        setLooping,
        selectTrack,
        startPlayback,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
}
