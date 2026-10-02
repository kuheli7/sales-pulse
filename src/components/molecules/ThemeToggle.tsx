"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/atoms/Button";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, (): Theme => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  };

  return (
    <Button onClick={toggle} aria-label={`Switch to ${next} mode`} aria-pressed={undefined}>
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </Button>
  );
}
