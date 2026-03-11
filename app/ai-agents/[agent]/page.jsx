"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAgentBySlug } from "../../../data/agents";
import AgentsNav from "../../../components/agents/AgentsNav";

/* ── Design tokens ── */
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

/* ── Reveal hook ── */
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
   FEATURE CARD
══════════════════════════════════════════════════════════════ */
function FeatureCard({ feature, color, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.5rem",
        borderRadius: "1.25rem",
        background: hovered ? `${color}0d` : T.bgCard,
        border: `1px solid ${hovered ? color + "44" : T.border}`,
        transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.07}s`,
        cursor: "default",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.25rem",
          marginBottom: "1rem",
          boxShadow: hovered ? `0 6px 20px ${color}30` : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {feature.icon}
      </div>
      <h4
        style={{
          fontFamily: "var(--f-display)",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: T.text,
          marginBottom: "0.4rem",
          letterSpacing: "-0.01em",
        }}
      >
        {feature.label}
      </h4>
      <p
        style={{
          fontFamily: "var(--f-body)",
          fontSize: "0.82rem",
          lineHeight: 1.6,
          color: T.textMuted,
          fontWeight: 300,
        }}
      >
        {feature.desc}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STEP CARD
══════════════════════════════════════════════════════════════ */
function StepCard({ step, color, index, isLast }) {
  const [ref, visible] = useReveal(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "1.5rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-24px)",
        transition: `opacity 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.12}s,
                     transform 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.12}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left: number + connector line */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: hovered ? color : `${color}15`,
            border: `1.5px solid ${hovered ? color : color + "44"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.35s",
            boxShadow: hovered ? `0 8px 24px ${color}44` : "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--f-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1rem",
              color: hovered ? "#08090d" : color,
              transition: "color 0.35s",
              lineHeight: 1,
            }}
          >
            {step.number}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            style={{
              width: 1,
              flexGrow: 1,
              minHeight: 40,
              background: `linear-gradient(to bottom, ${color}55, transparent)`,
              marginTop: 8,
            }}
          />
        )}
      </div>
      {/* Right: content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.5rem", paddingTop: "0.6rem" }}>
        <h4
          style={{
            fontFamily: "var(--f-display)",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "-0.02em",
            color: T.text,
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </h4>
        <p
          style={{
            fontFamily: "var(--f-body)",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            color: T.textMuted,
            fontWeight: 300,
            maxWidth: 460,
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION WRAPPER (shared layout)
══════════════════════════════════════════════════════════════ */
function Section({ children, alt = false, style: extraStyle }) {
  return (
    <section
      style={{
        padding: "6rem 2rem",
        background: alt ? T.bgAlt : T.bg,
        ...extraStyle,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

/* ── Section label component ── */
function SLabel({ text, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
      <span style={{ width:28, height:1, background:color, display:"block" }} />
      <span style={{ fontFamily:"var(--f-body)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color, fontWeight:600 }}>
        {text}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DEMO PLACEHOLDER
══════════════════════════════════════════════════════════════ */
function DemoPlaceholder({ agent, color }) {
  const [ref, visible] = useReveal(0.1);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 2200);
    return () => clearInterval(t);
  }, []);

  const messages = [
    { role: "user",  text: `Hi, I need help with ${agent.title.toLowerCase()}.` },
    { role: "agent", text: `Absolutely! I can handle that for you right now. Here's what I'll do...` },
    { role: "agent", text: `✓ Task identified  ✓ Data retrieved  ✓ Action queued` },
    { role: "user",  text: "Amazing, that was instant!" },
    { role: "agent", text: `That's what I do 24/7. Anything else I can automate for you?` },
  ];

  const shown = messages.slice(0, Math.min(tick + 1, messages.length));

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.96)",
        transition: "opacity 0.7s, transform 0.7s",
        borderRadius: "1.75rem",
        overflow: "hidden",
        border: `1px solid ${color}33`,
        background: T.bgCard,
        boxShadow: `0 32px 80px ${color}18`,
      }}
    >
      {/* Window chrome */}
      <div style={{ background:`${color}12`, borderBottom:`1px solid ${color}22`, padding:"1rem 1.5rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
        {["#ff5f57","#febc2e","#28c840"].map((c) => (
          <div key={c} style={{ width:12, height:12, borderRadius:"50%", background:c, opacity:0.8 }} />
        ))}
        <span style={{ marginLeft:"auto", fontFamily:"var(--f-body)", fontSize:"0.72rem", color, letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:500, display:"flex", alignItems:"center", gap:"0.4rem" }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:color, animation:"ag-indicator 1s ease-in-out infinite", display:"inline-block" }} />
          {agent.title} — Live Demo
        </span>
      </div>

      {/* Chat messages */}
      <div style={{ padding:"1.75rem", minHeight:260, display:"flex", flexDirection:"column", gap:"1rem" }}>
        {shown.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              animation: "ag-fade-up 0.4s ease-out",
            }}
          >
            {msg.role === "agent" && (
              <div style={{ width:28, height:28, borderRadius:"50%", background:`${color}22`, border:`1px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", marginRight:"0.6rem", flexShrink:0, marginTop:2 }}>
                {agent.icon}
              </div>
            )}
            <div
              style={{
                maxWidth: "72%",
                padding: "0.65rem 1rem",
                borderRadius: msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                background: msg.role === "user" ? `${color}22` : T.bgAlt,
                border: `1px solid ${msg.role === "user" ? color+"33" : T.border}`,
                fontFamily: "var(--f-body)",
                fontSize: "0.82rem",
                lineHeight: 1.55,
                color: T.text,
                fontWeight: 300,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* Typing indicator */}
        {tick < messages.length && (
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:`${color}22`, border:`1px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", flexShrink:0 }}>
              {agent.icon}
            </div>
            <div style={{ display:"flex", gap:4 }}>
              {[0,1,2].map((d) => (
                <div key={d} style={{ width:6, height:6, borderRadius:"50%", background:color, opacity:0.5, animation:`dot-bounce 1.2s ease-in-out ${d*0.2}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN DETAIL PAGE
══════════════════════════════════════════════════════════════ */
export default function AgentDetailPage() {
  const { agent: slug } = useParams();
  const agent = getAgentBySlug(slug);

  const [heroVisible, setHeroVisible] = useState(false);
  const [featRef, featVisible] = useReveal(0.06);
  const [stepRef, stepVisible] = useReveal(0.06);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* 404 fallback */
  if (!agent) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:T.bg, gap:"1.5rem" }}>
        <AgentsNav />
        <span style={{ fontSize:"4rem" }}>🤖</span>
        <h1 style={{ fontFamily:"var(--f-display)", fontSize:"2rem", color:T.text, fontWeight:800 }}>Agent not found</h1>
        <Link href="/ai-agents" style={{ color:T.accent, fontFamily:"var(--f-body)", fontSize:"0.9rem", textDecoration:"none", fontWeight:500 }}>← Back to AI Agents</Link>
      </div>
    );
  }

  const c = agent.color;

  return (
    <div style={{ background:T.bg, minHeight:"100vh", overflowX:"hidden" }}>
      <AgentsNav agentTitle={agent.title} />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "8rem 2rem 5rem",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Full gradient background */}
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(160deg, ${c}14 0%, ${c}06 40%, transparent 70%)`, pointerEvents:"none" }} />

        {/* Animated dot grid */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${c}25 1px, transparent 1px)`, backgroundSize:"28px 28px", opacity:0.35, pointerEvents:"none" }} />

        {/* Giant glowing orb */}
        <div style={{ position:"absolute", top:"50%", left:"50%", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle, ${c}18, transparent 65%)`, filter:"blur(100px)", transform:"translate(-50%,-50%)", pointerEvents:"none", animation:"ag-glow-breathe 5s ease-in-out infinite" }} />

        {/* Orbiting decorative rings */}
        <div style={{ position:"absolute", top:"50%", left:"50%", width:0, height:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", border:`1px solid ${c}18`, borderRadius:"50%", width:380, height:380, top:-190, left:-190, animation:"rb-float 8s ease-in-out infinite" }} />
          <div style={{ position:"absolute", border:`1px solid ${c}10`, borderRadius:"50%", width:560, height:560, top:-280, left:-280, animation:"rb-float 12s ease-in-out 2s infinite" }} />
        </div>

        {/* ── Hero content ── */}
        <div style={{ position:"relative", zIndex:1, maxWidth:860 }}>
          {/* Back link */}
          <Link
            href="/ai-agents"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--f-body)",
              fontSize: "0.8rem",
              color: T.textDim,
              textDecoration: "none",
              marginBottom: "2rem",
              letterSpacing: "0.04em",
              fontWeight: 500,
              transition: "color 0.25s",
              opacity: heroVisible ? 1 : 0,
              animation: heroVisible ? "ag-fade-in 0.5s ease-out" : "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = c)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
          >
            ← All AI Agents
          </Link>

          {/* Icon */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 26,
              background: `linear-gradient(135deg, ${c}30, ${c}12)`,
              border: `1.5px solid ${c}55`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.8rem",
              margin: "0 auto 2rem",
              boxShadow: `0 20px 60px ${c}44`,
              position: "relative",
              animation: "ag-float-icon 4.5s ease-in-out infinite",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s 0.2s",
            }}
          >
            {agent.icon}
            {/* Pulse rings */}
            <div style={{ position:"absolute", inset:-1, borderRadius:27, border:`1px solid ${c}30`, animation:"ag-pulse-ring 2.5s ease-out infinite" }} />
            <div style={{ position:"absolute", inset:-1, borderRadius:27, border:`1px solid ${c}20`, animation:"ag-pulse-ring 2.5s ease-out 1s infinite" }} />
            {/* Scan line */}
            <div style={{ position:"absolute", inset:0, borderRadius:26, overflow:"hidden", pointerEvents:"none" }}>
              <div style={{ position:"absolute", left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${c}77, transparent)`, animation:"ag-scan-line 2s linear infinite" }} />
            </div>
          </div>

          {/* Agent category badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.3rem 0.9rem",
              borderRadius: "2rem",
              background: `${c}15`,
              border: `1px solid ${c}35`,
              marginBottom: "1.5rem",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.5s 0.3s",
            }}
          >
            <span style={{ width:6, height:6, borderRadius:"50%", background:c, animation:"ag-indicator 1s ease-in-out infinite", display:"inline-block" }} />
            <span style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", letterSpacing:"0.14em", textTransform:"uppercase", fontWeight:600, color:c }}>
              AI Agent
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--f-display)",
              fontWeight: 900,
              fontSize: "clamp(2rem, 3.8vw, 4rem)",
              letterSpacing: "-0.04em",
              color: T.text,
              lineHeight: 1,
              marginBottom: "1rem",
              perspective: "600px",
            }}
          >
            {agent.title.split("").map((ch, i) => (
              <span
                key={i}
                style={{
                  display: ch === " " ? "inline" : "inline-block",
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0) rotateX(0deg)" : "translateY(60%) rotateX(-80deg)",
                  transition: `opacity 0.5s cubic-bezier(.16,1,.3,1) ${0.4 + i * 0.035}s,
                               transform 0.5s cubic-bezier(.16,1,.3,1) ${0.4 + i * 0.035}s`,
                }}
              >
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--f-serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              color: T.textMuted,
              marginBottom: "3rem",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s 0.75s",
            }}
          >
            {agent.tagline}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.6s 0.9s",
            }}
          >
            {agent.stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "1rem 1.5rem",
                  borderRadius: "1rem",
                  background: `${c}10`,
                  border: `1px solid ${c}25`,
                  minWidth: 100,
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ${0.95 + i*0.1}s, transform 0.5s ${0.95 + i*0.1}s`,
                }}
              >
                <div style={{ fontFamily:"var(--f-display)", fontWeight:900, fontSize:"1.6rem", letterSpacing:"-0.04em", color:c, lineHeight:1, marginBottom:4 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", color:T.textDim, fontWeight:500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROBLEM
      ════════════════════════════════════════ */}
      <ProblemSection agent={agent} color={c} />

      {/* ════════════════════════════════════════
          SOLUTION
      ════════════════════════════════════════ */}
      <SolutionSection agent={agent} color={c} />

      {/* ════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════ */}
      <section style={{ padding:"6rem 2rem", background:T.bgAlt }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div ref={featRef} style={{ marginBottom:"3.5rem", opacity:featVisible?1:0, transform:featVisible?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s, transform 0.6s" }}>
            <SLabel text="Capabilities" color={c} />
            <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.7rem, 3.5vw, 2.8rem)", letterSpacing:"-0.03em", color:T.text, lineHeight:1.1, maxWidth:500 }}>
              What{" "}
              <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:c }}>
                {agent.title}
              </em>{" "}
              can do
            </h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"1.25rem" }}>
            {agent.features.map((f, i) => (
              <FeatureCard key={f.label} feature={f} color={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DEMO
      ════════════════════════════════════════ */}
      <section style={{ padding:"6rem 2rem", background:T.bg }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }}>
            <SLabel text="Live Preview" color={c} />
            <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.7rem, 3.5vw, 2.8rem)", letterSpacing:"-0.03em", color:T.text, lineHeight:1.1 }}>
              See it in{" "}
              <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:c }}>action</em>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", color:T.textMuted, fontWeight:300, marginTop:"0.8rem" }}>
              A live simulation of how the agent handles real interactions.
            </p>
          </div>
          <DemoPlaceholder agent={agent} color={c} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section style={{ padding:"6rem 2rem", background:T.bgAlt }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"4rem", alignItems:"start" }}>
          {/* Left: label + heading */}
          <div ref={stepRef} style={{ opacity:stepVisible?1:0, transform:stepVisible?"translateY(0)":"translateY(24px)", transition:"opacity 0.6s, transform 0.6s" }}>
            <SLabel text="The Process" color={c} />
            <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.7rem, 3.5vw, 2.8rem)", letterSpacing:"-0.03em", color:T.text, lineHeight:1.1, marginBottom:"1.5rem" }}>
              How it{" "}
              <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:c }}>works</em>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.9rem", lineHeight:1.7, color:T.textMuted, fontWeight:300, maxWidth:380 }}>
              From setup to full automation — {agent.title.toLowerCase()} is running in hours, not weeks. No dev resources needed.
            </p>
            {/* Decorative block */}
            <div style={{ marginTop:"2.5rem", padding:"1.5rem", borderRadius:"1.25rem", background:`${c}08`, border:`1px solid ${c}22` }}>
              <div style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"1.8rem", color:c, marginBottom:4 }}>4 steps</div>
              <div style={{ fontFamily:"var(--f-body)", fontSize:"0.8rem", color:T.textMuted, fontWeight:300 }}>From zero to fully automated</div>
            </div>
          </div>
          {/* Right: steps */}
          <div>
            {agent.steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                color={c}
                index={i}
                isLast={i === agent.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <CTASection agent={agent} color={c} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PROBLEM SECTION
══════════════════════════════════════════════════════════════ */
function ProblemSection({ agent, color }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section style={{ padding:"6rem 2rem", background:T.bg }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"4rem", alignItems:"center" }}>
        {/* Left */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <SLabel text="The Challenge" color="#f87171" />
          <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.7rem, 3.5vw, 2.8rem)", letterSpacing:"-0.03em", color:T.text, lineHeight:1.1, marginBottom:"1.5rem" }}>
            The problem{" "}
            <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color:"#f87171" }}>you're facing</em>
          </h2>
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", lineHeight:1.8, color:T.textMuted, fontWeight:300, maxWidth:480 }}>
            {agent.problem}
          </p>
        </div>
        {/* Right: visual callout */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0) scale(1)" : "translateX(24px) scale(0.96)",
            transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
          }}
        >
          <div style={{ padding:"2.5rem", borderRadius:"1.75rem", background:"rgba(248,113,113,0.06)", border:"1px solid rgba(248,113,113,0.2)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg, #f87171, #fb923c)" }} />
            <div style={{ fontSize:"3rem", marginBottom:"1.25rem" }}>⚠️</div>
            <h3 style={{ fontFamily:"var(--f-display)", fontWeight:700, fontSize:"1.1rem", color:T.text, marginBottom:"0.75rem" }}>
              Without automation
            </h3>
            {[
              "Hours wasted on repetitive manual tasks",
              "Human errors create downstream failures",
              "Scaling requires hiring, not systems",
              "Competitors move faster while you lag",
            ].map((item) => (
              <div key={item} style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start", marginBottom:"0.6rem" }}>
                <span style={{ color:"#f87171", fontSize:"0.8rem", marginTop:3, flexShrink:0 }}>✗</span>
                <span style={{ fontFamily:"var(--f-body)", fontSize:"0.83rem", color:T.textMuted, fontWeight:300, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SOLUTION SECTION
══════════════════════════════════════════════════════════════ */
function SolutionSection({ agent, color }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <section style={{ padding:"6rem 2rem", background:T.bgAlt }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"4rem", alignItems:"center" }}>
        {/* Left: visual callout */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0) scale(1)" : "translateX(-24px) scale(0.96)",
            transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
          }}
        >
          <div style={{ padding:"2.5rem", borderRadius:"1.75rem", background:`${color}08`, border:`1px solid ${color}25`, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${color}, ${color}88)` }} />
            <div style={{ fontSize:"3rem", marginBottom:"1.25rem" }}>✦</div>
            <h3 style={{ fontFamily:"var(--f-display)", fontWeight:700, fontSize:"1.1rem", color:T.text, marginBottom:"0.75rem" }}>
              With {agent.title}
            </h3>
            {[
              "Runs 24/7 without breaks or burnout",
              "Zero errors — AI is consistent every time",
              "Scale instantly without adding headcount",
              "Frees your team for high-value work",
            ].map((item) => (
              <div key={item} style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start", marginBottom:"0.6rem" }}>
                <span style={{ color, fontSize:"0.8rem", marginTop:3, flexShrink:0 }}>✓</span>
                <span style={{ fontFamily:"var(--f-body)", fontSize:"0.83rem", color:T.textMuted, fontWeight:300, lineHeight:1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: text */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <SLabel text="Our Solution" color={color} />
          <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(1.7rem, 3.5vw, 2.8rem)", letterSpacing:"-0.03em", color:T.text, lineHeight:1.1, marginBottom:"1.5rem" }}>
            How we{" "}
            <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color }}>solve it</em>
          </h2>
          <p style={{ fontFamily:"var(--f-body)", fontSize:"0.95rem", lineHeight:1.8, color:T.textMuted, fontWeight:300, maxWidth:480 }}>
            {agent.solution}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CTA SECTION
══════════════════════════════════════════════════════════════ */
function CTASection({ agent, color }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  return (
    <section style={{ padding:"8rem 2rem 10rem", background:T.bg, overflow:"hidden" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 860,
          margin: "0 auto",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
          transition: "opacity 0.8s, transform 0.8s",
          position: "relative",
        }}
      >
        {/* Background card */}
        <div style={{ padding:"4rem 3rem", borderRadius:"2.5rem", background:`linear-gradient(135deg, ${color}14 0%, ${color}06 50%, transparent 100%)`, border:`1px solid ${color}30`, position:"relative", overflow:"hidden" }}>
          {/* Grid pattern */}
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${color}25 1px, transparent 1px)`, backgroundSize:"24px 24px", opacity:0.3, pointerEvents:"none" }} />
          {/* Top accent line */}
          <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:2, background:`linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          {/* Glow orb */}
          <div style={{ position:"absolute", top:"50%", left:"50%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, ${color}18, transparent 70%)`, filter:"blur(60px)", transform:"translate(-50%,-50%)", pointerEvents:"none", animation:"ag-glow-breathe 5s ease-in-out infinite" }} />

          <div style={{ position:"relative", zIndex:1 }}>
            {/* Icon */}
            <div style={{ width:80, height:80, borderRadius:22, background:`linear-gradient(135deg, ${color}30, ${color}12)`, border:`1.5px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.2rem", margin:"0 auto 2rem", boxShadow:`0 16px 48px ${color}40`, animation:"ag-float-icon 4s ease-in-out infinite" }}>
              {agent.icon}
            </div>

            <p style={{ fontFamily:"var(--f-body)", fontSize:"0.68rem", letterSpacing:"0.18em", textTransform:"uppercase", color, fontWeight:600, marginBottom:"1.25rem" }}>
              Ready to automate?
            </p>
            <h2 style={{ fontFamily:"var(--f-display)", fontWeight:900, fontSize:"clamp(2rem, 5vw, 3.5rem)", letterSpacing:"-0.04em", color:T.text, lineHeight:1, marginBottom:"1.25rem" }}>
              Start using{" "}
              <em style={{ fontFamily:"var(--f-serif)", fontWeight:400, fontStyle:"italic", color }}>{agent.title}</em>
            </h2>
            <p style={{ fontFamily:"var(--f-body)", fontSize:"1rem", color:T.textMuted, fontWeight:300, maxWidth:500, margin:"0 auto 2.5rem", lineHeight:1.7 }}>
              Get this AI agent running in your business within 48 hours. No dev resources, no long contracts, no setup fees.
            </p>

            {/* Buttons */}
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <Link
                href="/#contact"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--f-body)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  padding: "1rem 2.5rem",
                  borderRadius: "2rem",
                  background: hovered ? color : color,
                  color: "#08090d",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  boxShadow: hovered ? `0 16px 40px ${color}55` : `0 8px 28px ${color}40`,
                  transform: hovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
                  transition: "all 0.35s cubic-bezier(.16,1,.3,1)",
                }}
              >
                Get Started Now →
              </Link>
              <Link
                href="/ai-agents"
                onMouseEnter={() => setHovered2(true)}
                onMouseLeave={() => setHovered2(false)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--f-body)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  padding: "1rem 2.5rem",
                  borderRadius: "2rem",
                  background: "transparent",
                  color: hovered2 ? color : T.text,
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  border: `1.5px solid ${hovered2 ? color : T.border}`,
                  transition: "all 0.3s",
                  transform: hovered2 ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                ← Explore Other Agents
              </Link>
            </div>

            {/* Trust signals */}
            <div style={{ display:"flex", gap:"1.5rem", justifyContent:"center", flexWrap:"wrap", marginTop:"2.5rem" }}>
              {["✓ Setup in 48h", "✓ No code required", "✓ Cancel anytime"].map((s) => (
                <span key={s} style={{ fontFamily:"var(--f-body)", fontSize:"0.78rem", color:T.textDim, fontWeight:400, letterSpacing:"0.02em" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
