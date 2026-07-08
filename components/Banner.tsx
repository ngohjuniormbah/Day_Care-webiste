"use client";

import { useEffect, useState } from "react";

export function Banner({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Re-show whenever the message changes; respect a per-message dismissal.
    const key = "gdc_banner_dismissed";
    setShow(sessionStorage.getItem(key) !== text);
  }, [text]);

  if (!show) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand to-brand-dark px-4 py-2.5 text-center text-sm font-medium text-white">
      <span className="pr-6">{text}</span>
      <button
        aria-label="Dismiss"
        onClick={() => {
          sessionStorage.setItem("gdc_banner_dismissed", text);
          setShow(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1.5 text-white/80 transition hover:text-white"
      >
        ✕
      </button>
    </div>
  );
}
