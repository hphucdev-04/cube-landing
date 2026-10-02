"use client";

import { useEffect, useState } from "react";

export function useDownloadCount() {
  const [count, setCount] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/downloads")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (isMounted && typeof data.total === "number") {
          setCount(data.total);
          setLoaded(true);
        }
      })
      .catch(() => {
        if (isMounted) setLoaded(true);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { count, loaded };
}

export function DownloadCounterBadge() {
  const { count } = useDownloadCount();
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (count <= 0) return;
    let startTimestamp: number | null = null;
    let frameId: number;
    const duration = 1000; // ms
    const startValue = 0;
    const endValue = count;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setDisplayCount(endValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [count]);

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#A1A1AA]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      <span className="text-white font-semibold">
        {displayCount.toLocaleString()}
      </span>
      <span>developers installed across Windows, MacOS & Linux</span>
    </div>
  );
}
