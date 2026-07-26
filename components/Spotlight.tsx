"use client";

import { useRef } from "react";

/**
 * Mimics a stage light following the cursor across the dark "Experiential"
 * hero half — a nod to physical event lighting rather than a generic glow
 * effect. Pure CSS custom-property update on pointer move; no state/re-render.
 */
export default function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      className={`relative overflow-hidden ${className}`}
      style={{ ["--x" as string]: "50%", ["--y" as string]: "30%" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(480px circle at var(--x) var(--y), rgba(255,78,50,0.16), transparent 65%)",
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
