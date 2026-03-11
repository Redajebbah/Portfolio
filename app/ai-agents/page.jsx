"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { agents } from "../../data/agents";
import AgentsNav from "../../components/agents/AgentsNav";

/* ── Design tokens (mirrors nexagen-studio.jsx T constant) ── */
const T = {
  bg:          "var(--bg)",
  bgAlt:       "var(--bg-alt)",
  bgCard:      "var(--bg-card)",
  text:        "var(--c-text)",
  textMuted:   "var(--c-text-muted)",
  textDim:     "var(--c-text-dim)",
  accent:      "var(--accent)",
  accentAlt:   "var(--accent-alt)",
  border:      "var(--border)",
  borderHover: "var(--border-hover)",
};

/* ── Reusable reveal hook (same pattern as main site) ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════════════
   AGENT CARD
══════════════════════════════════════════════════════════════ */
function AgentCard({ agent, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal(0.1);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18;
    const y = -((e.clientY - rect.top)  / rect.height - 0.5) * 18;
    e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px) scale(1.01)`;
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    setHovered(false);
  };

  const c = agent.color;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.08}s,
                     transform 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.08}s`,
      }}
    >
      <Link href={`/ai-agents/${agent.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            background: T.bgCard,
            border: `1px solid ${hovered ? c + "55" : T.border}`,
            borderRadius: "1.5rem",
            overflow: "hidden",
            cursor: "pointer",
            transition: "border-color 0.35s, box-shadow 0.35s",
            boxShadow: hovered
              ? `0 24px 60px ${c}22, 0 0 0 1px ${c}33`
              : "0 2px 20px rgba(0,0,0,0.04)",
            willChange: "transform",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Coloured header band ── */}
          <div
            style={{
              position: "relative",
              height: 180,
              background: `linear-gradient(135deg, ${c}1a 0%, ${c}08 60%, transparent 100%)`,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Grid dot pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `radial-gradient(circle, ${c}30 1px, transparent 1px)`,
                backgroundSize: "22px 22px",
                opacity: hovered ? 0.6 : 0.3,
                transition: "opacity 0.4s",
              }}
            />
            {/* Glow orb */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${c}35, transparent 70%)`,
                transform: "translate(-50%,-50%)",
                filter: "blur(30px)",
                opacity: hovered ? 0.9 : 0.5,
                transition: "opacity 0.4s",
              }}
            />
            {/* Pulsing rings (visible on hover) */}
            {hovered && (
              <>
                <div style={{ position:"absolute", top:"50%", left:"50%", width:80, height:80, borderRadius:"50%", border:`1px solid ${c}50`, animation:"ag-pulse-ring 1.4s ease-out infinite" }} />
                <div style={{ position:"absolute", top:"50%", left:"50%", width:80, height:80, borderRadius:"50%", border:`1px solid ${c}35`, animation:"ag-pulse-ring 1.4s ease-out 0.6s infinite" }} />
              </>
            )}
            {/* Icon */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                width: 72,
                height: 72,
                borderRadius: 20,
                background: `linear-gradient(135deg, ${c}28, ${c}10)`,
                border: `1px solid ${c}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                boxShadow: hovered ? `0 12px 36px ${c}50` : `0 6px 20px ${c}30`,
                transition: "box-shadow 0.35s, transform 0.35s",
                transform: hovered ? "scale(1.08) translateY(-4px)" : "scale(1)",
                animation: "ag-float-icon 4s ease-in-out infinite",
              }}
            >
              {agent.icon}
              {/* Scan line effect */}
              {hovered && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    overflow: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${c}88, transparent)`,
                      animation: "ag-scan-line 1.2s linear infinite",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Corner badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                fontFamily: "var(--f-body)",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "0.25rem 0.65rem",
                borderRadius: "2rem",
                background: `${c}18`,
                border: `1px solid ${c}35`,
                color: c,
              }}
            >
              AI Agent
            </div>
          </div>

          {/* ── Card body ── */}
          <div style={{ padding: "1.75rem 1.75rem 1.5rem" }}>
            <h3
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 800,
                fontSize: "1.18rem",
                letterSpacing: "-0.025em",
                color: T.text,
                marginBottom: "0.5rem",
                lineHeight: 1.25,
              }}
            >
              {agent.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--f-body)",
                fontSize: "0.85rem",
                lineHeight: 1.65,
                color: T.textMuted,
                fontWeight: 300,
                marginBottom: "1.25rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {agent.description}
            </p>

            {/* Mini stats */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                paddingBottom: "1.25rem",
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              {agent.stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--f-display)",
                      fontWeight: 800,
                      fontSize: "1.05rem",
                      color: c,
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                      marginBottom: 3,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--f-body)",
                      fontSize: "0.68rem",
                      color: T.textDim,
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-body)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: hovered ? c : T.textMuted,
                  transition: "color 0.3s",
                  letterSpacing: "0.02em",
                }}
              >
                Explore Agent
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: hovered ? c : `${c}15`,
                  border: `1px solid ${hovered ? c : c + "30"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.9rem",
                  color: hovered ? "#08090d" : c,
                  transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                  transform: hovered ? "translateX(3px)" : "translateX(0)",
                }}
              >
                →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO STAT ITEM
══════════════════════════════════════════════════════════════ */
function HeroStat({ value, label, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ${delay}s, transform 0.5s ${delay}s`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--f-display)",
          fontWeight: 900,
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          letterSpacing: "-0.04em",
          color: T.accent,
          lineHeight: 1,
          marginBottom: "0.35rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--f-body)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: T.textDim,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function AIAgentsPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionRef, sectionVisible] = useReveal(0.08);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <AgentsNav />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 2rem 6rem",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* ── Background: animated dot grid ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            animation: "ag-hero-grid 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* ── Glow orbs ── */}
        <div style={{ position:"absolute", top:"15%", left:"5%",  width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, var(--accent)18, transparent 65%)", filter:"blur(80px)", pointerEvents:"none", animation:"ag-glow-breathe 5s ease-in-out infinite" }} />
        <div style={{ position:"absolute", bottom:"10%", right:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, var(--accent-alt)14, transparent 65%)", filter:"blur(80px)", pointerEvents:"none", animation:"ag-glow-breathe 7s ease-in-out 1.5s infinite" }} />
        <div style={{ position:"absolute", top:"55%", left:"50%",  width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, var(--accent)10, transparent 65%)", filter:"blur(100px)", transform:"translateX(-50%)", pointerEvents:"none" }} />

        {/* ── Orbiting particles ── */}
        <div style={{ position:"absolute", top:"50%", left:"50%", width:0, height:0, pointerEvents:"none" }}>
          {["#00e5a0","#a78bfa","#60a5fa","#fbbf24"].map((col, i) => (
            <div key={i} style={{
              position:"absolute",
              width:6, height:6,
              borderRadius:"50%",
              background:col,
              boxShadow:`0 0 10px ${col}`,
              animation:`ag-orbit ${8 + i * 2}s linear ${i * -2}s infinite`,
              top: -3, left: -3,
              opacity: 0.7,
            }} />
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ position:"relative", zIndex:1, maxWidth:800 }}>
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s 0.1s, transform 0.6s 0.1s",
            }}
          >
            <span style={{ width:28, height:1, background:"var(--accent)", display:"block" }} />
            <span style={{
              fontFamily:"var(--f-body)",
              fontSize:"0.68rem",
              letterSpacing:"0.2em",
              textTransform:"uppercase",
              color:"var(--accent)",
              fontWeight:600,
            }}>
              Studio Capabilities
            </span>
            <span style={{ width:28, height:1, background:"var(--accent)", display:"block" }} />
          </div>

          {/* Main title — character split animation */}
          <div
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 900,
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              letterSpacing: "-0.04em",
              color: T.text,
              lineHeight: 0.92,
              marginBottom: "1.5rem",
              perspective: "800px",
            }}
          >
            {"AI Agents".split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: ch === " " ? "inline" : "inline-block",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0) rotateX(0deg)" : "translateY(60%) rotateX(-80deg)",
                  transition: `opacity 0.55s cubic-bezier(.16,1,.3,1) ${0.25 + i * 0.04}s,
                               transform 0.55s cubic-bezier(.16,1,.3,1) ${0.25 + i * 0.04}s`,
                }}
              >
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--f-serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1.1rem, 2.2vw, 1.55rem)",
              color: T.textMuted,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "0 auto 3rem",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s 0.55s, transform 0.7s 0.55s",
            }}
          >
            Powerful AI agents designed to automate real&nbsp;business workflows.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s 0.7s, transform 0.6s 0.7s",
            }}
          >
            <a
              href="#agents"
              style={{
                fontFamily: "var(--f-body)",
                fontWeight: 600,
                fontSize: "0.9rem",
                padding: "0.85rem 2.2rem",
                borderRadius: "2rem",
                background: "var(--accent)",
                color: "#08090d",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                boxShadow: "0 8px 28px var(--accent)44",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 14px 36px var(--accent)55"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 28px var(--accent)44"; }}
            >
              Explore All Agents
              <span style={{ fontSize:"1rem" }}>↓</span>
            </a>
            <Link
              href="/#contact"
              style={{
                fontFamily: "var(--f-body)",
                fontWeight: 500,
                fontSize: "0.9rem",
                padding: "0.85rem 2.2rem",
                borderRadius: "2rem",
                background: "transparent",
                color: T.text,
                textDecoration: "none",
                letterSpacing: "0.02em",
                border: `1px solid ${T.border}`,
                transition: "all 0.3s",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor="var(--border-hover)"; e.currentTarget.style.color="var(--accent)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor=T.border; e.currentTarget.style.color=T.text; }}
            >
              Talk to Us
            </Link>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            opacity: heroVisible ? 0.45 : 0,
            transition: "opacity 0.8s 1.2s",
          }}
        >
          <span style={{ fontFamily:"var(--f-body)", fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase", color:T.textDim }}>
            scroll
          </span>
          <div style={{ width:1, height:40, background:`linear-gradient(to bottom, var(--accent), transparent)`, animation:"float-s 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════ */}
      <div
        style={{
          background: T.bgAlt,
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {[
            { value: "6",     label: "AI Agents"         },
            { value: "500+",  label: "Hours Saved / mo"  },
            { value: "99%+",  label: "Accuracy Rate"     },
            { value: "24/7",  label: "Always On"         },
          ].map((s, i) => (
            <HeroStat key={s.label} value={s.value} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          AGENTS GRID
      ════════════════════════════════════════ */}
      <section id="agents" style={{ padding: "6rem 2rem 8rem", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Section header */}
          <div
            ref={sectionRef}
            style={{
              marginBottom: "4rem",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem" }}>
              <span style={{ width:32, height:1, background:"var(--accent)", display:"block" }} />
              <span style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--accent)", fontWeight:600 }}>
                Available Agents
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--f-display)",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                color: T.text,
                lineHeight: 1.1,
                maxWidth: 560,
              }}
            >
              Pick the agent that fits{" "}
              <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:"var(--accent)" }}>
                your workflow.
              </em>
            </h2>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {agents.map((agent, i) => (
              <AgentCard key={agent.slug} agent={agent} index={i} />
            ))}
          </div>

          {/* Bottom CTA block */}
          <BottomCTA />
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTOM CTA
══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  const [ref, visible] = useReveal(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        marginTop: "5rem",
        padding: "3.5rem",
        borderRadius: "2rem",
        background: `linear-gradient(135deg, var(--accent)12 0%, var(--accent-alt)06 50%, transparent 100%)`,
        border: `1px solid var(--border-hover)`,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: "opacity 0.7s, transform 0.7s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, var(--border) 1px, transparent 1px)", backgroundSize:"24px 24px", opacity:0.4, pointerEvents:"none" }} />

      <div style={{ position:"relative", zIndex:1 }}>
        <p style={{ fontFamily:"var(--f-body)", fontSize:"0.7rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--accent)", fontWeight:600, marginBottom:"1rem" }}>
          Can't find what you need?
        </p>
        <h3 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing:"-0.03em", color:T.text, marginBottom:"1rem", lineHeight:1.15 }}>
          We build custom AI agents<br />
          <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:"var(--accent)" }}>tailored to your exact workflow.</em>
        </h3>
        <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", color:T.textMuted, fontWeight:300, marginBottom:"2rem", maxWidth:480, margin:"0 auto 2rem" }}>
          Every business is unique. Tell us your challenge and we'll design an AI agent that solves it precisely.
        </p>
        <Link
          href="/#contact"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontFamily: "var(--f-body)",
            fontWeight: 600,
            fontSize: "0.92rem",
            padding: "0.9rem 2.4rem",
            borderRadius: "2rem",
            background: hovered ? "var(--accent)" : "transparent",
            color: hovered ? "#08090d" : "var(--accent)",
            border: "1.5px solid var(--accent)",
            textDecoration: "none",
            letterSpacing: "0.02em",
            transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
            boxShadow: hovered ? "0 10px 32px var(--accent)44" : "none",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          Start a Custom Project
          <span style={{ fontSize:"1rem" }}>→</span>
        </Link>
      </div>
    </div>
  );
}
