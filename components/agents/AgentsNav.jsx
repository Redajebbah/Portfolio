"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const T = {
  accent:    "var(--accent)",
  border:    "var(--border)",
  textDim:   "var(--c-text-dim)",
  text:      "var(--c-text)",
  bgGlass:   "var(--bg-glass)",
  borderHover: "var(--border-hover)",
};

export default function AgentsNav({ agentTitle } = {}) {
  const [isDark, setIsDark]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("nexagen-theme");
    setIsDark(saved === "dark");

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("nexagen-theme", next ? "dark" : "light");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        background: scrolled ? T.bgGlass : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* ── Logo → home ── */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            fontFamily: "var(--f-display)",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.03em",
            color: T.text,
          }}
        >
          nexa<span style={{ color: T.accent }}>gen</span>
        </span>
        <span
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.65rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: T.textDim,
            fontWeight: 500,
            marginTop: 2,
          }}
        >
          studio
        </span>
      </Link>

      {/* ── Centre breadcrumb (only on detail pages) ── */}
      {agentTitle && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--f-body)",
            fontSize: "0.82rem",
            color: T.textDim,
          }}
        >
          <Link
            href="/ai-agents"
            style={{
              color: T.accent,
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            AI Agents
          </Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: T.text, fontWeight: 500 }}>{agentTitle}</span>
        </div>
      )}

      {/* ── Right: nav links + theme toggle ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link
          href="/ai-agents"
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: T.textDim,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "color 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
        >
          All Agents
        </Link>

        <Link
          href="/#contact"
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: T.textDim,
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "color 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
        >
          Contact
        </Link>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          style={{
            background: "none",
            border: `1px solid ${T.border}`,
            borderRadius: "2rem",
            padding: "0.28rem 0.65rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: T.textDim,
            fontSize: "0.8rem",
            fontFamily: "var(--f-body)",
            fontWeight: 500,
            transition: "all 0.3s",
            letterSpacing: "0.03em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.borderHover;
            e.currentTarget.style.color = T.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = T.textDim;
          }}
        >
          <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>{isDark ? "☀" : "☽"}</span>
        </button>
      </div>
    </nav>
  );
}
