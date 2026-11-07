"use client";

import { useEffect, useState } from "react";
import { content } from "@/content.config";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calcTimeLeft(): TimeLeft {
  const target = new Date(content.siteLock.unlockAt).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

interface CountdownProps {
  onExpire?: () => void;
}

export function Countdown({ onExpire }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const initial = calcTimeLeft();
    setTimeLeft(initial);
    if (initial.expired) {
      onExpire?.();
    }

    const id = setInterval(() => {
      const t = calcTimeLeft();
      setTimeLeft(t);
      if (t.expired) {
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [onExpire]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="cine-countdown-wrap" role="timer" aria-live="polite">
      <div className="cine-countdown-row">
        <div className="cine-cd-group">
          <div className="cine-cd-box">
            <span className="cine-cd-num">{pad(timeLeft.days)}</span>
          </div>
          <span className="cine-cd-label">HARI</span>
        </div>

        <span className="cine-cd-colon" aria-hidden="true">
          :
        </span>

        <div className="cine-cd-group">
          <div className="cine-cd-box">
            <span className="cine-cd-num">{pad(timeLeft.hours)}</span>
          </div>
          <span className="cine-cd-label">JAM</span>
        </div>

        <span className="cine-cd-colon" aria-hidden="true">
          :
        </span>

        <div className="cine-cd-group">
          <div className="cine-cd-box">
            <span className="cine-cd-num">{pad(timeLeft.minutes)}</span>
          </div>
          <span className="cine-cd-label">MENIT</span>
        </div>

        <span className="cine-cd-colon" aria-hidden="true">
          :
        </span>

        <div className="cine-cd-group">
          <div className="cine-cd-box">
            <span className="cine-cd-num">{pad(timeLeft.seconds)}</span>
          </div>
          <span className="cine-cd-label">DETIK</span>
        </div>
      </div>
    </div>
  );
}
