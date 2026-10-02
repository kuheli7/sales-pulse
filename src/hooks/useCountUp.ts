"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a number toward `target`, starting from wherever it currently is. */
export function useCountUp(target: number, duration = 700) {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const from = current.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = reduced ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current.current = from + (target - from) * eased;
      setValue(current.current);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
