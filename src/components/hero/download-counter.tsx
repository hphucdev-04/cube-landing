"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export function useDownloadCount() {
  const [count, setCount] = useState<number>(1420);
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
        // Fallback to initial base count if API not reachable
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
  const [displayCount, setDisplayCount] = useState(count > 100 ? count - 30 : 0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1200; // ms
    const startValue = displayCount;
    const endValue = count;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [count]);

  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#A1A1AA]">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      <span className="text-white font-semibold">
        {displayCount.toLocaleString()}
      </span>
      <span>developers installed across Windows, macOS & Linux</span>
    </div>
  );
}
