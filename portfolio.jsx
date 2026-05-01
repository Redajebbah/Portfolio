"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   REDA JEBBAH — AI & Automation Engineer
   Premium Portfolio Experience
═══════════════════════════════════════════════════════════════ */

// ─── PROFILE ─────────────────────────────────────────────────
const PROFILE = {
  name: "Reda Jebbah",
  title: "QA Engineer & AI Automation Specialist",
  roles: [
    "QA Engineer & Automation Specialist",
    "AI-Powered Test Engineer",
    "Cypress · Selenium · LLM",
    "Building Quality at Scale",
  ],
  bio: "QA Engineer specializing in AI-powered test automation — I build intelligent systems that generate, execute, and maintain test suites at scale, helping engineering teams ship faster with zero regressions.",
  email: "redajebbah1@gmail.com",
  phone: "+212 695 15 13 13",
  linkedin: "https://www.linkedin.com/in/reda-jebbah-010392276/",
  github: "https://github.com/Redajebbah",
  school: "EMSI — Ingénieur MIAGE 2022–2025",
  available: true,
};

const STATS = [
  { value: 120, suffix: "+", label: "Test Cases Authored" },
  { value: 60, suffix: "%", label: "Regression Time Eliminated" },
  { value: 3,  suffix: "×", label: "Faster via AI Generation" },
  { value: 6,  suffix: "+", label: "Certifications Earned" },
];

const EXPERIENCES = [
  {
    company: "OCP Groupe",
    role: "QA & Software Engineer",
    type: "End-of-Studies Internship",
    period: "Mar 2025 – Sep 2025",
    color: "#00d4ff",
    description: "Delivered a mission-critical industrial supervision platform for the world's #1 phosphate producer — with comprehensive multi-layer QA coverage across API, E2E, and performance, in an Agile/Scrum environment.",
    highlights: [
      "Architected real-time TRS/OEE monitoring system — Spring Boot + Angular integrated with OSIsoft PI System",
      "Executed 80+ structured test scenarios (Cypress E2E, JMeter performance, Postman API) with full Xray BDD traceability",
      "Caught and resolved 15+ critical defects pre-production — zero post-deploy incidents across 6 months",
      "Led 2-week sprint QA cycles with structured defect reporting, Jira tracking, and stakeholder test summaries",
    ],
    tags: ["Cypress", "JMeter", "Postman", "Xray", "Spring Boot", "Angular", "PI System", "Scrum"],
  },
  {
    company: "Atlanta Sanad Assurance",
    role: "AI Chatbot Developer",
    type: "Freelance Project",
    period: "Oct 2025 – Mar 2026",
    color: "#7c3aed",
    description: "Designed and shipped a production-grade NLP chatbot for a leading Moroccan insurance group — automating client intake and lead qualification 24/7, handling Arabic and French conversations.",
    highlights: [
      "Built bilingual (Arabic/French) intent-detection pipeline in Python + spaCy — cut advisor response time by 40%",
      "Increased lead conversion rate by +25% through AI-optimized conversation flow design",
      "Containerized and deployed to production via Docker — 99% uptime over 5 months of live operation",
      "Integrated seamless advisor handoff logic for edge cases, maintaining high client satisfaction",
    ],
    tags: ["Python", "spaCy", "NLP", "Django", "Docker", "Arabic NLP", "REST API"],
  },
  {
    company: "Active Digital",
    role: "Test Automation Engineer",
    type: "Internship",
    period: "Jul – Sep 2024",
    color: "#f72585",
    description: "Replaced a fully manual QA workflow with a structured Selenium automation framework — slashing testing time by 60% and introducing the team's first CI-ready test infrastructure.",
    highlights: [
      "Designed 50+ functional and regression test cases across 3 core application modules",
      "Built Selenium + Python framework reducing manual testing effort by ~60% per release cycle",
      "Introduced Allure reporting for team-wide QA visibility — first structured test documentation in the company",
    ],
    tags: ["Selenium", "Python", "Pytest", "Allure Reports", "Regression Testing"],
  },
  {
    company: "Cires Technologies",
    role: "Full-Stack Developer",
    type: "Internship",
    period: "Jul 2024",
    color: "#00b87a",
    description: "Delivered a complete meeting room reservation and scheduling system from scratch using PHP MVC architecture — on time and fully tested.",
    highlights: [
      "Built end-to-end reservation, planning, and space-optimization system from the ground up",
      "Applied SQL query optimization for real-time room availability — sub-100ms response times",
    ],
    tags: ["PHP", "MySQL", "MVC", "Full-Stack"],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "AI Test Generation Engine",
    subtitle: "Groq LLM · RAG · Cypress · Django",
    category: "AI · QA · Automation",
    featured: true,
    problem: "Writing Cypress test suites manually is a bottleneck — engineers waste hours on boilerplate instead of shipping features.",
    solution: "A Django backend system that takes user stories or API specs as input, retrieves context via RAG from existing test patterns, then auto-generates production-ready Cypress test suites using Groq LLM — integrated into GitHub Actions CI.",
    description: "End-to-end AI system that auto-generates production-ready Cypress E2E test suites from user stories using RAG + LLM. Django backend orchestrates prompt engineering, context retrieval, and test file export — integrated directly into CI pipelines.",
    metrics: ["3× faster test suite creation", "90%+ validity on generated tests", "GitHub Actions CI integration", "Supports 10+ auto-detected page types"],
    tech: ["Django", "Groq API", "LLM", "RAG", "Cypress", "PostgreSQL", "GitHub Actions"],
    color: "#00d4ff",
    link: "https://github.com/Redajebbah",
  },
  {
    id: "02",
    title: "Industrial Supervision Platform",
    subtitle: "OCP Groupe · World's #1 Phosphate Producer",
    category: "Industrial · QA · Full-Stack",
    featured: false,
    description: "Mission-critical real-time monitoring system for OCP Groupe. Integrates with OSIsoft PI System to track machine states and surface live OEE/TRS metrics — with 80+ test scenarios ensuring bulletproof reliability.",
    metrics: ["80+ test scenarios (E2E, API, Perf)", "Real-time TRS/OEE computation", "PI System live data integration", "Zero production incidents post-launch"],
    tech: ["Spring Boot", "Angular", "PI System", "PostgreSQL", "Cypress", "JMeter", "Xray"],
    color: "#7c3aed",
    link: "https://github.com/Redajebbah",
  },
  {
    id: "03",
    title: "Enterprise E2E Automation Suite",
    subtitle: "Selenium · Pytest · GitHub Actions",
    category: "Test Automation · DevOps",
    featured: false,
    description: "Transformed a fully manual QA process into a zero-touch regression pipeline — 60 automated test cases, Allure HTML reports, and a GitHub Actions workflow that gates every PR before merge.",
    metrics: ["−60% regression testing time", "60+ automated test cases", "Allure HTML reports auto-generated", "PR-gated CI — zero manual runs"],
    tech: ["Selenium", "Python", "Pytest", "GitHub Actions", "Docker", "Allure Reports"],
    color: "#f72585",
    link: "https://github.com/Redajebbah",
  },
  {
    id: "04",
    title: "Conversational AI — Insurance",
    subtitle: "Atlanta Sanad · NLP in Production",
    category: "AI · NLP · Production",
    featured: false,
    description: "Production-grade bilingual (Arabic/French) chatbot handling client intake 24/7 for Atlanta Sanad. Reduced advisor load by 40%, boosted lead conversion by 25% — deployed on Docker with 99% uptime.",
    metrics: ["−40% advisor processing time", "+25% lead conversion rate", "24/7 live — 5 months uptime", "Arabic + French NLP pipeline"],
    tech: ["Python", "Django", "spaCy", "NLP", "Docker", "REST API"],
    color: "#00b87a",
    link: "https://github.com/Redajebbah",
  },
  {
    id: "05",
    title: "Enterprise Stock Management",
    subtitle: "Salsabil · Mineral Water Distribution",
    category: "Enterprise · AI · Full-Stack",
    featured: false,
    description: "Full-stack distribution management platform with AI demand forecasting (exponential smoothing), Z-score anomaly detection, real-time WebSocket KPIs, and a 5-tier stock recommendation engine.",
    metrics: ["AI demand forecasting engine", "Z-score anomaly detection", "Real-time WebSocket dashboard", "Multi-city distribution network"],
    tech: ["Django", "Angular 18", "PostgreSQL", "Redis", "Celery", "WebSockets"],
    color: "#f59e0b",
    link: "https://github.com/Redajebbah/salsabil-project",
  },
  {
    id: "06",
    title: "AI Assessment Platform",
    subtitle: "Accounting Level Up · SaaS",
    category: "SaaS · AI",
    featured: false,
    description: "AI-powered candidate proficiency SaaS auto-classifying skill level into 3 tiers. Features WhatsApp integration, admin analytics, and email verification — deployed and live.",
    metrics: ["3-tier AI skill classification", "WhatsApp + email automation", "Admin analytics dashboard", "Live SaaS — real traffic"],
    tech: ["React 18", "TypeScript", "Supabase", "TanStack Query", "Tailwind CSS"],
    color: "#e879f9",
    link: "https://github.com/Redajebbah/accounting-level-up",
  },
];

const SKILLS = {
  "QA & Testing": {
    color: "#00d4ff",
    items: ["Cypress", "Selenium", "JMeter", "Postman", "Xray", "BDD / Gherkin", "API Testing", "Performance Testing", "TDD"],
  },
  "AI & Automation": {
    color: "#7c3aed",
    items: ["LLM APIs (Groq)", "RAG Systems", "Prompt Engineering", "spaCy / NLP", "Test Generation AI", "scikit-learn", "Chatbot Dev"],
  },
  "Backend": {
    color: "#f72585",
    items: ["Django", "Spring Boot", "REST APIs", "WebSockets", "Celery", "PHP MVC"],
  },
  "Frontend": {
    color: "#00b87a",
    items: ["Angular 18", "React", "Next.js 14", "TypeScript", "Three.js", "Tailwind CSS"],
  },
  "Databases": {
    color: "#f59e0b",
    items: ["PostgreSQL", "MongoDB", "Redis", "Oracle", "Neo4j", "SQL / PL-SQL"],
  },
  "DevOps & Tools": {
    color: "#e879f9",
    items: ["Docker", "GitHub Actions", "Jenkins", "Kubernetes", "Git", "OpenShift"],
  },
};

const CERTIFICATIONS = [
  {
    title: "Introduction to Java & Object-Oriented Programming",
    issuer: "University of Pennsylvania",
    platform: "Coursera",
    date: "Jan 2024",
    color: "#3178C6",
    avatar: "UPenn",
    avatarBg: "#011F5B",
    url: "https://coursera.org/verify/XMJYLXKWTN5X",
    credId: "XMJYLXKWTN5X",
    img: "/certs/cert-upenn-java.jpg",
  },
  {
    title: "Programming for Everybody — Getting Started with Python",
    issuer: "University of Michigan",
    platform: "Coursera",
    date: "Jun 2023",
    color: "#FFCB05",
    avatar: "UMich",
    avatarBg: "#00274C",
    url: "https://coursera.org/verify/TKNUPR2SPULN",
    credId: "TKNUPR2SPULN",
    img: "/certs/cert-umich-python.jpg",
  },
  {
    title: "Software Engineering: Modeling Systems using UML",
    issuer: "HKUST",
    platform: "Coursera",
    date: "May 2023",
    color: "#00b4d8",
    avatar: "HKUST",
    avatarBg: "#003566",
    url: "https://coursera.org/verify/89LZGWJZYM3Z",
    credId: "89LZGWJZYM3Z",
    img: "/certs/cert-hkust-uml.jpg",
  },
  {
    title: "React Native",
    issuer: "Meta",
    platform: "Coursera",
    date: "May 2024",
    color: "#0081FB",
    avatar: "Meta",
    avatarBg: "#0A0A2E",
    url: "https://coursera.org/verify/P82EZUGYJH43",
    credId: "P82EZUGYJH43",
    img: "/certs/cert-meta-react-native.jpg",
  },
  {
    title: "Getting Started with GitHub Copilot",
    issuer: "Great Learning",
    platform: "Hands-on",
    date: "2024",
    color: "#3FB950",
    avatar: "GL",
    avatarBg: "#0D1117",
    url: null,
    credId: "Z9KJPV31Y5",
    img: "/certs/cert-gl-copilot.jpg",
  },
  {
    title: "React Basics",
    issuer: "Meta",
    platform: "Coursera",
    date: "Jan 2024",
    color: "#61DAFB",
    avatar: "Meta",
    avatarBg: "#0A0A2E",
    url: "https://coursera.org/verify/Z3V98LATD5EB",
    credId: "Z3V98LATD5EB",
    img: "/certs/cert-meta-react-basics.jpg",
  },
];

// ─── 3D KEYBOARD KEYS ─────────────────────────────────────────
const TECH_KEYS = [
  // Row 0 — Languages
  { label:"Py",  name:"Python",       color:"#3776AB", text:"#FFD43B", icon:"python",       desc:"Reads like English. Runs like magic." },
  { label:"Jv",  name:"Java",         color:"#ED8B00", text:"#FFFFFF", icon:"openjdk",      desc:"Write once, debug everywhere." },
  { label:"JS",  name:"JavaScript",   color:"#F7DF1E", text:"#323330", icon:"javascript",   desc:"The language of the web — whether you like it or not." },
  { label:"TS",  name:"TypeScript",   color:"#3178C6", text:"#FFFFFF", icon:"typescript",   desc:"JavaScript's overachieving cousin who's always flexing." },
  { label:"Ph",  name:"PHP",          color:"#8892BF", text:"#FFFFFF", icon:"php",          desc:"Still powering 80% of the web. Quietly." },
  // Row 1 — Frameworks
  { label:"Dj",  name:"Django",       color:"#0C4B33", text:"#44B78B", icon:"django",       desc:"The web framework for perfectionists with deadlines." },
  { label:"Ng",  name:"Angular",      color:"#E23237", text:"#FFFFFF", icon:"angular",      desc:"Google's opinion on how apps should be built." },
  { label:"SB",  name:"Spring Boot",  color:"#6DB33F", text:"#FFFFFF", icon:"springboot",   desc:"Java, but make it less painful." },
  { label:"Re",  name:"React",        color:"#20232A", text:"#61DAFB", icon:"react",        desc:"A library for UIs, not a framework. (They insist.)" },
  { label:"Nx",  name:"Next.js",      color:"#000000", text:"#FFFFFF", icon:"nextdotjs",    desc:"React, but with a server and strong opinions." },
  // Row 2 — AI / ML
  { label:"NLP", name:"NLP",          color:"#5A4FCF", text:"#FFFFFF", icon:"huggingface",  desc:"Teaching machines to understand human language." },
  { label:"Sp",  name:"spaCy",        color:"#09A3D5", text:"#FFFFFF", icon:null,           desc:"Industrial-strength NLP. Batteries included." },
  { label:"Sk",  name:"scikit-learn", color:"#F7931E", text:"#FFFFFF", icon:"scikitlearn",  desc:"Machine learning for the rest of us." },
  { label:"Tf",  name:"TensorFlow",   color:"#FF6F00", text:"#FFFFFF", icon:"tensorflow",   desc:"Google's way of turning math into magic." },
  { label:"RA",  name:"RAG / LLM",   color:"#7C3AED", text:"#FFFFFF", icon:"openai",       desc:"Giving LLMs a memory and a search engine." },
  // Row 3 — Testing
  { label:"Cy",  name:"Cypress",      color:"#1B1E2E", text:"#69D3A7", icon:"cypress",      desc:"End-to-end testing that actually feels good." },
  { label:"Se",  name:"Selenium",     color:"#43B02A", text:"#FFFFFF", icon:"selenium",     desc:"The OG browser automation. Still going strong." },
  { label:"JM",  name:"JMeter",       color:"#D22128", text:"#FFFFFF", icon:null,           desc:"Hammering your APIs so your users don't have to." },
  { label:"Pm",  name:"Postman",      color:"#FF6C37", text:"#FFFFFF", icon:"postman",      desc:"API testing, but make it visual." },
  { label:"Xr",  name:"Xray / BDD",  color:"#0052CC", text:"#FFFFFF", icon:"cucumber",     desc:"Tests as documentation. Documentation as tests." },
  // Row 4 — Databases & DevOps
  { label:"Pg",  name:"PostgreSQL",   color:"#336791", text:"#FFFFFF", icon:"postgresql",   desc:"The elephant that never forgets your data." },
  { label:"Mg",  name:"MongoDB",      color:"#00684A", text:"#FFFFFF", icon:"mongodb",      desc:"JSON all the way down." },
  { label:"Dk",  name:"Docker",       color:"#2496ED", text:"#FFFFFF", icon:"docker",       desc:"It works on my machine. Ship the machine." },
  { label:"K8",  name:"Kubernetes",   color:"#326CE5", text:"#FFFFFF", icon:"kubernetes",   desc:"Orchestrating containers at scale. With YAML." },
  { label:"Gt",  name:"Git",          color:"#F05033", text:"#FFFFFF", icon:"git",          desc:"Version control. Blame history included." },
];

// ─── PORTFOLIO CSS ─────────────────────────────────────────────
const CSS = `
  .pf{background:#03030a;color:#e2e0ea;font-family:'Inter',sans-serif;overflow-x:hidden;min-height:100vh}
  .pf *{box-sizing:border-box;margin:0;padding:0}

  /* PROGRESS BAR */
  .pf-progress{position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#00d4ff,#7c3aed,#f72585);z-index:200;transition:width 0.1s linear;pointer-events:none}

  /* CURSOR */
  .pf-dot{position:fixed;width:7px;height:7px;background:#00d4ff;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:background 0.2s,transform 0.15s}
  .pf-ring{position:fixed;width:34px;height:34px;border:1.5px solid rgba(0,212,255,0.45);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s,border-color 0.3s,opacity 0.3s}
  .pf-ring.active{width:52px;height:52px;border-color:rgba(0,212,255,0.8)}

  /* NAV */
  .pf-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1.4rem 5rem;display:flex;align-items:center;justify-content:space-between;transition:background 0.4s,backdrop-filter 0.4s,border-bottom 0.4s}
  .pf-nav.pf-scrolled{background:rgba(3,3,10,0.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,0.05)}
  .pf-logo{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;font-weight:700;color:#e2e0ea;text-decoration:none;letter-spacing:-0.02em}
  .pf-logo span{color:#00d4ff}
  .pf-nav-links{display:flex;gap:2.25rem;list-style:none}
  .pf-nav-links a{color:#8888a0;font-size:0.82rem;text-decoration:none;letter-spacing:0.05em;transition:color 0.2s;text-transform:uppercase}
  .pf-nav-links a:hover{color:#e2e0ea}
  .pf-nav-cta{background:transparent;border:1px solid rgba(0,212,255,0.35);color:#00d4ff;padding:0.45rem 1.2rem;border-radius:6px;font-size:0.82rem;cursor:pointer;font-family:inherit;text-decoration:none;transition:all 0.2s}
  .pf-nav-cta:hover{background:rgba(0,212,255,0.08);border-color:#00d4ff}

  /* HERO */
  .pf-hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;padding:6rem 2rem 4rem}
  .pf-hero-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
  .pf-hero-vignette{position:absolute;inset:0;background:radial-gradient(ellipse 90% 70% at 50% 30%,rgba(0,212,255,0.055) 0%,transparent 65%),radial-gradient(ellipse 60% 50% at 80% 70%,rgba(124,58,237,0.045) 0%,transparent 65%);pointer-events:none}
  .pf-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:55px 55px;pointer-events:none;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)}
  .pf-hero-inner{position:relative;z-index:2;text-align:center;max-width:860px}
  .pf-badge{display:inline-flex;align-items:center;gap:0.5rem;background:rgba(0,184,122,0.07);border:1px solid rgba(0,184,122,0.22);border-radius:100px;padding:0.38rem 1rem;font-size:0.75rem;color:#00b87a;letter-spacing:0.07em;margin-bottom:2.25rem;text-transform:uppercase}
  .pf-badge-dot{width:6px;height:6px;background:#00b87a;border-radius:50%;animation:pfPulse 2.2s ease-in-out infinite;flex-shrink:0}
  .pf-hero-name{font-family:'Space Grotesk',sans-serif;font-size:clamp(3.8rem,8.5vw,7.5rem);font-weight:700;line-height:0.95;letter-spacing:-0.04em;margin-bottom:1.1rem;background:linear-gradient(135deg,#ffffff 0%,#c4e0ff 35%,#00d4ff 65%,#9b59f0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .pf-hero-role{font-family:'Space Grotesk',sans-serif;font-size:clamp(1rem,2.2vw,1.5rem);color:#8888a0;margin-bottom:1.75rem;min-height:2.2rem;display:flex;align-items:center;justify-content:center;gap:0.5rem}
  .pf-role-text{color:#00d4ff;font-weight:500}
  .pf-caret{display:inline-block;width:2px;height:1.1em;background:#00d4ff;margin-left:2px;animation:pfBlink 1.05s step-end infinite;vertical-align:middle}
  .pf-hero-bio{font-size:1rem;color:#7070a0;max-width:560px;margin:0 auto 2.75rem;line-height:1.75}
  .pf-hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.75rem}
  .pf-btn-p{background:linear-gradient(135deg,#00d4ff,#7c3aed);color:#fff;border:none;padding:0.82rem 2rem;border-radius:8px;font-size:0.92rem;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s;display:inline-block}
  .pf-btn-p:hover{transform:translateY(-2px);box-shadow:0 10px 35px rgba(0,212,255,0.28)}
  .pf-btn-o{background:transparent;color:#c0c0d8;border:1px solid rgba(255,255,255,0.11);padding:0.82rem 2rem;border-radius:8px;font-size:0.92rem;cursor:pointer;font-family:inherit;text-decoration:none;transition:all 0.2s;display:inline-block}
  .pf-btn-o:hover{border-color:rgba(0,212,255,0.4);color:#00d4ff}
  .pf-stack{display:flex;gap:0.55rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem}
  .pf-pill{background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.07);padding:0.28rem 0.72rem;border-radius:100px;font-size:0.75rem;color:#6868a0;font-family:'Fira Code',monospace}
  .pf-hero-soc{display:flex;gap:1.75rem;justify-content:center}
  .pf-soc-a{color:#44445a;font-size:0.82rem;text-decoration:none;display:flex;align-items:center;gap:0.35rem;transition:color 0.2s;letter-spacing:0.04em}
  .pf-soc-a:hover{color:#00d4ff}
  .pf-scroll-ind{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.45rem;color:#44445a;font-size:0.7rem;letter-spacing:0.1em}
  .pf-scroll-line{width:1px;height:38px;background:linear-gradient(to bottom,rgba(0,212,255,0.5),transparent);animation:pfScrollHint 2s ease-in-out infinite}

  /* STATS */
  .pf-stats-wrap{border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.013)}
  .pf-stats{display:grid;grid-template-columns:repeat(4,1fr);max-width:1100px;margin:0 auto}
  .pf-stat{padding:2.5rem 2rem;text-align:center;border-right:1px solid rgba(255,255,255,0.04)}
  .pf-stat:last-child{border-right:none}
  .pf-stat-num{font-family:'Space Grotesk',sans-serif;font-size:2.8rem;font-weight:700;line-height:1;background:linear-gradient(135deg,#00d4ff,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .pf-stat-lbl{font-size:0.78rem;color:#8888a0;margin-top:0.4rem;letter-spacing:0.06em}

  /* SECTION BASE */
  .pf-sec{padding:8rem 5rem;max-width:1200px;margin:0 auto;position:relative}
  .pf-sec-lbl{font-size:0.72rem;letter-spacing:0.18em;color:#00d4ff;text-transform:uppercase;font-family:'Fira Code',monospace;margin-bottom:0.7rem}
  .pf-sec-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;letter-spacing:-0.025em;color:#e2e0ea;line-height:1.1;margin-bottom:0.8rem}
  .pf-sec-h em{font-style:normal;background:linear-gradient(135deg,#00d4ff,#7c3aed);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .pf-sec-sub{color:#8888a0;font-size:0.97rem;line-height:1.7;max-width:500px}
  .pf-sec-num{position:absolute;right:5rem;top:6rem;font-family:'Space Grotesk',sans-serif;font-size:9rem;font-weight:800;color:rgba(255,255,255,0.018);line-height:1;pointer-events:none;user-select:none;letter-spacing:-0.05em}

  /* REVEAL */
  .pf-r{opacity:0;transform:translateY(28px);transition:opacity 0.65s ease,transform 0.65s ease}
  .pf-r.on{opacity:1;transform:translateY(0)}
  .pf-r.d1{transition-delay:0.08s}.pf-r.d2{transition-delay:0.16s}.pf-r.d3{transition-delay:0.24s}.pf-r.d4{transition-delay:0.32s}.pf-r.d5{transition-delay:0.4s}.pf-r.d6{transition-delay:0.48s}

  /* ABOUT */
  .pf-about{display:grid;grid-template-columns:1.1fr 0.9fr;gap:5rem;align-items:start;margin-top:3.5rem}
  .pf-about-p{color:#9090b0;font-size:0.97rem;line-height:1.8;margin-bottom:1.25rem}
  .pf-about-tags{display:flex;flex-wrap:wrap;gap:0.45rem;margin-top:1.75rem}
  .pf-about-tag{background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.14);color:#00d4ff;padding:0.28rem 0.7rem;border-radius:5px;font-size:0.78rem;font-family:'Fira Code',monospace}
  .pf-about-r{display:flex;flex-direction:column;gap:1.25rem}
  .pf-info-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:1.5rem}
  .pf-info-card-h{font-family:'Space Grotesk',sans-serif;font-size:0.75rem;letter-spacing:0.12em;color:#8888a0;text-transform:uppercase;margin-bottom:0.75rem}
  .pf-info-row{display:flex;align-items:flex-start;gap:0.6rem;padding:0.35rem 0;border-bottom:1px solid rgba(255,255,255,0.04)}
  .pf-info-row:last-child{border-bottom:none;padding-bottom:0}
  .pf-info-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:0.45rem}
  .pf-info-val{font-size:0.88rem;color:#c0c0d8;line-height:1.45}
  .pf-info-sub{font-size:0.75rem;color:#8888a0;display:block;font-family:'Fira Code',monospace}
  .pf-lang-row{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem}
  .pf-lang{text-align:center;padding:0.75rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:8px}
  .pf-lang-name{font-family:'Space Grotesk',sans-serif;font-size:0.88rem;font-weight:600;color:#e2e0ea}
  .pf-lang-level{font-size:0.7rem;color:#8888a0;margin-top:0.15rem}

  /* TIMELINE */
  .pf-tl{position:relative;margin-top:3.5rem}
  .pf-tl::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(to bottom,transparent,rgba(0,212,255,0.25) 15%,rgba(124,58,237,0.25) 85%,transparent)}
  .pf-tl-item{position:relative;padding-left:2.75rem;margin-bottom:3.75rem}
  .pf-tl-item:last-child{margin-bottom:0}
  .pf-tl-dot{position:absolute;left:-5px;top:6px;width:10px;height:10px;border-radius:50%;border:2px solid;background:#03030a}
  .pf-tl-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-bottom:0.6rem}
  .pf-tl-co{font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700;color:#e2e0ea}
  .pf-tl-period{font-family:'Fira Code',monospace;font-size:0.72rem;color:#8888a0;white-space:nowrap;padding-top:0.2rem}
  .pf-tl-role{font-size:0.88rem;color:#00d4ff;margin-bottom:0.3rem}
  .pf-tl-type{display:inline-block;font-size:0.68rem;padding:0.12rem 0.55rem;border-radius:100px;background:rgba(255,255,255,0.04);color:#8888a0;border:1px solid rgba(255,255,255,0.07);margin-bottom:0.9rem;font-family:'Fira Code',monospace}
  .pf-tl-desc{color:#8888a0;font-size:0.88rem;line-height:1.7;margin-bottom:0.9rem}
  .pf-tl-li{list-style:none;margin-bottom:0.9rem}
  .pf-tl-li li{color:#a0a0b8;font-size:0.855rem;padding:0.28rem 0;padding-left:1.25rem;position:relative;line-height:1.55}
  .pf-tl-li li::before{content:'→';position:absolute;left:0;color:#00d4ff;opacity:0.65;font-size:0.8rem}
  .pf-tags{display:flex;flex-wrap:wrap;gap:0.38rem}
  .pf-tag{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:#6060a0;padding:0.18rem 0.55rem;border-radius:4px;font-size:0.72rem;font-family:'Fira Code',monospace}

  /* PROJECTS */
  .pf-proj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin-top:3.5rem}
  .pf-proj{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.055);border-radius:16px;padding:2rem;position:relative;overflow:hidden;transition:border-color 0.3s,transform 0.3s;cursor:default}
  .pf-proj::after{content:'';position:absolute;inset:0;opacity:0;transition:opacity 0.4s;border-radius:16px;pointer-events:none}
  .pf-proj:hover{border-color:rgba(255,255,255,0.1);transform:translateY(-4px)}
  .pf-proj:hover::after{opacity:1}
  /* Featured project — full width, elevated */
  .pf-proj.featured{grid-column:1/-1;border-color:rgba(0,212,255,0.18);background:linear-gradient(135deg,rgba(0,212,255,0.04) 0%,rgba(255,255,255,0.01) 60%)}
  .pf-proj.featured:hover{border-color:rgba(0,212,255,0.35);transform:translateY(-5px)}
  .pf-feat-badge{display:inline-flex;align-items:center;gap:0.35rem;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.22);border-radius:100px;padding:0.25rem 0.75rem;font-size:0.68rem;color:#00d4ff;letter-spacing:0.08em;text-transform:uppercase;font-family:'Fira Code',monospace;margin-bottom:1rem}
  .pf-feat-badge::before{content:'★';font-size:0.6rem}
  .pf-feat-body{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start;margin:1.2rem 0}
  .pf-feat-block-label{font-size:0.65rem;letter-spacing:0.14em;color:#00d4ff;text-transform:uppercase;font-family:'Fira Code',monospace;margin-bottom:0.45rem}
  .pf-feat-block-text{color:#a0a0c0;font-size:0.88rem;line-height:1.65}
  .pf-proj-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.9rem}
  .pf-proj-num{font-family:'Space Grotesk',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.12em}
  .pf-proj-cat{font-family:'Fira Code',monospace;font-size:0.68rem;color:#8888a0;letter-spacing:0.1em;text-transform:uppercase}
  .pf-proj-title{font-family:'Space Grotesk',sans-serif;font-size:1.22rem;font-weight:700;color:#e2e0ea;line-height:1.2;margin-bottom:0.2rem}
  .pf-proj-title.featured{font-size:1.7rem}
  .pf-proj-sub{font-size:0.78rem;color:#8888a0;margin-bottom:0.9rem}
  .pf-proj-desc{color:#6868a0;font-size:0.85rem;line-height:1.68;margin-bottom:1.1rem}
  .pf-proj-metrics{display:flex;flex-direction:column;gap:0.28rem;margin-bottom:1.1rem}
  .pf-proj-metric{font-size:0.78rem;color:#a0a0b8;display:flex;align-items:center;gap:0.4rem}
  .pf-proj-metric::before{content:'✓';color:#00b87a;font-size:0.68rem;flex-shrink:0}
  .pf-proj-foot{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem}
  .pf-proj-tech{display:flex;flex-wrap:wrap;gap:0.3rem}
  .pf-tech-chip{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:#5858a0;padding:0.15rem 0.5rem;border-radius:3px;font-size:0.68rem;font-family:'Fira Code',monospace}
  .pf-proj-link{color:#8888a0;font-size:0.78rem;text-decoration:none;display:flex;align-items:center;gap:0.3rem;transition:color 0.2s;white-space:nowrap;margin-top:0.25rem}
  .pf-proj-link:hover{color:#00d4ff}

  /* SKILLS */
  .pf-skills-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-top:3.5rem}
  .pf-sk-cat{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.055);border-radius:12px;padding:1.5rem;transition:border-color 0.3s,transform 0.25s}
  .pf-sk-cat:hover{transform:translateY(-2px)}
  .pf-sk-head{display:flex;align-items:center;gap:0.55rem;margin-bottom:1rem}
  .pf-sk-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .pf-sk-name{font-family:'Space Grotesk',sans-serif;font-size:0.88rem;font-weight:600;color:#e2e0ea}
  .pf-sk-items{display:flex;flex-wrap:wrap;gap:0.38rem}
  .pf-sk-item{font-family:'Fira Code',monospace;font-size:0.7rem;padding:0.22rem 0.5rem;border-radius:4px;border:1px solid;background:rgba(0,0,0,0.25)}

  /* CERTS */
  .pf-certs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-top:3.5rem}
  .pf-cert-card{background:rgba(255,255,255,0.023);border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;opacity:0;transform:translateY(30px);transition:opacity 0.55s ease,transform 0.55s ease,border-color 0.3s ease,box-shadow 0.3s ease}
  .pf-cert-card.on{opacity:1;transform:translateY(0)}
  .pf-cert-card:hover{border-color:rgba(255,255,255,0.16);box-shadow:0 20px 56px rgba(0,0,0,0.55);transform:translateY(-7px)!important}
  .pf-cert-card:hover .pf-cert-img-wrap img{transform:scale(1.04)}
  .pf-cert-card:hover .pf-cert-eye{opacity:1;transform:translate(-50%,-50%) scale(1)}
  /* Image area */
  .pf-cert-img-wrap{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;background:#0a0a14}
  .pf-cert-img-wrap img{width:100%;height:100%;object-fit:cover;object-position:top;display:block;transition:transform 0.5s ease}
  .pf-cert-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 55%,rgba(3,3,10,0.85) 100%);pointer-events:none}
  .pf-cert-eye{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);width:48px;height:48px;border-radius:50%;background:rgba(0,0,0,0.72);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.25s ease,transform 0.25s ease;color:#fff;font-size:1.1rem}
  /* Card body */
  .pf-cert-body{padding:1.2rem 1.35rem 1.35rem;display:flex;flex-direction:column;flex:1}
  .pf-cert-platform{display:inline-flex;align-items:center;gap:0.35rem;font-family:'Fira Code',monospace;font-size:0.62rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--cc);margin-bottom:0.75rem}
  .pf-cert-platform-dot{width:5px;height:5px;border-radius:50%;background:var(--cc);flex-shrink:0;animation:pfPulse 2.5s ease-in-out infinite}
  .pf-cert-issuer{font-size:0.68rem;color:rgba(255,255,255,0.3);margin-bottom:0.25rem;font-family:'Fira Code',monospace}
  .pf-cert-title-text{font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;color:#e2e0ea;line-height:1.35;margin-bottom:0.9rem;flex:1}
  .pf-cert-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.4rem;margin-top:auto;padding-top:0.75rem;border-top:1px solid rgba(255,255,255,0.04)}
  .pf-cert-date{font-family:'Fira Code',monospace;font-size:0.64rem;color:#44445a}
  .pf-cert-verify{display:inline-flex;align-items:center;gap:0.3rem;font-size:0.64rem;font-family:'Fira Code',monospace;color:var(--cc);text-decoration:none;border:1px solid;border-color:color-mix(in srgb,var(--cc) 28%,transparent);border-radius:100px;padding:0.2rem 0.6rem;transition:all 0.2s;cursor:pointer}
  .pf-cert-verify:hover{background:color-mix(in srgb,var(--cc) 12%,transparent)}
  .pf-cert-credid{font-size:0.59rem;color:#2d2d42;font-family:'Fira Code',monospace;margin-top:0.35rem}
  /* LIGHTBOX */
  .pf-lb{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:1.5rem;opacity:0;pointer-events:none;transition:opacity 0.28s ease}
  .pf-lb.open{opacity:1;pointer-events:all}
  .pf-lb-bg{position:absolute;inset:0;background:rgba(0,0,0,0.88);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);cursor:zoom-out}
  .pf-lb-panel{position:relative;max-width:900px;width:100%;max-height:90vh;background:#0d0d1a;border:1px solid rgba(255,255,255,0.1);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transform:scale(0.93) translateY(18px);transition:transform 0.3s ease;box-shadow:0 40px 100px rgba(0,0,0,0.8)}
  .pf-lb.open .pf-lb-panel{transform:scale(1) translateY(0)}
  .pf-lb-img{width:100%;max-height:68vh;object-fit:contain;object-position:top;background:#07071a;display:block}
  .pf-lb-foot{padding:1.1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.75rem;border-top:1px solid rgba(255,255,255,0.07)}
  .pf-lb-info{flex:1}
  .pf-lb-issuer{font-size:0.7rem;color:rgba(255,255,255,0.35);font-family:'Fira Code',monospace;margin-bottom:0.2rem}
  .pf-lb-title{font-family:'Space Grotesk',sans-serif;font-size:1rem;font-weight:700;color:#e2e0ea}
  .pf-lb-actions{display:flex;gap:0.6rem;flex-shrink:0}
  .pf-lb-btn{display:inline-flex;align-items:center;gap:0.4rem;font-size:0.78rem;font-family:'Fira Code',monospace;padding:0.45rem 1rem;border-radius:8px;cursor:pointer;transition:all 0.2s;text-decoration:none;border:1px solid}
  .pf-lb-btn-v{background:rgba(0,212,255,0.1);border-color:rgba(0,212,255,0.3);color:#00d4ff}
  .pf-lb-btn-v:hover{background:rgba(0,212,255,0.18)}
  .pf-lb-btn-x{background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.1);color:#8888a0}
  .pf-lb-btn-x:hover{background:rgba(255,255,255,0.08);color:#e2e0ea}
  .pf-lb-nav{position:absolute;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,0.65);border:1px solid rgba(255,255,255,0.12);color:#e2e0ea;cursor:pointer;font-size:1rem;transition:all 0.2s;user-select:none;z-index:2}
  .pf-lb-nav:hover{background:rgba(255,255,255,0.1)}
  .pf-lb-nav.prev{left:1rem}
  .pf-lb-nav.next{right:1rem}
  /* Marquee */
  .pf-cert-marquee-wrap{overflow:hidden;margin-top:3rem;-webkit-mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent);mask-image:linear-gradient(90deg,transparent,black 12%,black 88%,transparent)}
  .pf-cert-marquee{display:flex;width:max-content;animation:pfMarquee 22s linear infinite}
  .pf-cert-marquee:hover{animation-play-state:paused}
  .pf-cert-marquee-item{display:flex;align-items:center;gap:0.6rem;padding:0 1.5rem;white-space:nowrap;font-family:'Space Grotesk',sans-serif;font-size:0.8rem;font-weight:600;color:rgba(255,255,255,0.18);letter-spacing:0.06em}
  .pf-cert-marquee-dot{width:4px;height:4px;border-radius:50%;background:rgba(0,212,255,0.35);flex-shrink:0}
  @keyframes pfMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

  /* CONTACT */
  .pf-contact{padding:7rem 5rem;text-align:center;border-top:1px solid rgba(255,255,255,0.04);position:relative;overflow:hidden}
  .pf-contact::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(0,212,255,0.04) 0%,transparent 65%);pointer-events:none}
  .pf-contact-inner{position:relative;z-index:1}
  .pf-contact-email{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,4.5vw,3.2rem);font-weight:700;color:#e2e0ea;text-decoration:none;display:inline-block;margin:1.5rem 0;transition:color 0.25s;letter-spacing:-0.02em}
  .pf-contact-email:hover{color:#00d4ff}
  .pf-contact-desc{color:#8888a0;font-size:0.95rem;line-height:1.7;max-width:420px;margin:0 auto}
  .pf-contact-soc{display:flex;gap:1rem;justify-content:center;margin-top:2.5rem;flex-wrap:wrap}
  .pf-c-soc{display:flex;align-items:center;gap:0.5rem;color:#8888a0;text-decoration:none;font-size:0.85rem;transition:all 0.2s;border:1px solid rgba(255,255,255,0.07);padding:0.65rem 1.3rem;border-radius:8px}
  .pf-c-soc:hover{color:#00d4ff;border-color:rgba(0,212,255,0.3);background:rgba(0,212,255,0.04)}
  .pf-phone-row{display:flex;align-items:center;justify-content:center;gap:0.4rem;color:#8888a0;font-size:0.85rem;margin-bottom:0.5rem}

  /* FOOTER */
  .pf-footer{border-top:1px solid rgba(255,255,255,0.04);padding:1.75rem 5rem;display:flex;justify-content:space-between;align-items:center;color:#44445a;font-size:0.78rem}
  .pf-footer a{color:#44445a;text-decoration:none;transition:color 0.2s}
  .pf-footer a:hover{color:#8888a0}

  /* DIVIDER */
  .pf-div{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.06) 30%,rgba(255,255,255,0.06) 70%,transparent)}

  /* 3D KEYBOARD */
  .pf-kb-wrap{position:relative;width:100%;height:560px;margin-top:2.5rem;cursor:crosshair;overflow:hidden;border-radius:16px;background:#00000000}
  .pf-kb-wrap>canvas{position:absolute;top:0;left:0;width:100%!important;height:100%!important;display:block}
  .pf-kb-hint{position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);text-align:center;font-family:'Fira Code',monospace;font-size:0.72rem;color:#44445a;letter-spacing:0.1em;text-transform:uppercase;z-index:1;white-space:nowrap}
  /* Side hover description */
  .pf-kb-desc{position:absolute;left:0;top:0;bottom:0;width:46%;display:flex;flex-direction:column;justify-content:center;padding:2.5rem 2rem 2.5rem 2.5rem;z-index:5;pointer-events:none;opacity:0;transition:opacity 0.3s ease}
  .pf-kb-desc.on{opacity:1}
  .pf-kb-desc-name{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.6rem,3vw,2.8rem);font-weight:800;font-style:italic;color:#ffffff;line-height:1.0;margin-bottom:0.6rem;text-shadow:0 2px 30px rgba(0,0,0,1),0 0 60px rgba(0,0,0,0.9)}
  .pf-kb-desc-text{font-size:0.86rem;color:rgba(255,255,255,0.58);line-height:1.6;max-width:240px;text-shadow:0 1px 10px rgba(0,0,0,0.9)}
  @keyframes pfFadeIn{from{opacity:0;transform:translateX(-50%) translateY(4px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  /* ANIMATIONS */
  @keyframes pfPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:0.65}}
  @keyframes pfBlink{0%,100%{opacity:1}50%{opacity:0}}
  @keyframes pfScrollHint{0%,100%{opacity:0.6;transform:scaleY(1) translateY(0)}50%{opacity:1;transform:scaleY(1.15) translateY(-3px)}}
  @keyframes pfFloatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pfGlow{0%,100%{box-shadow:0 0 8px rgba(0,212,255,0.2)}50%{box-shadow:0 0 18px rgba(0,212,255,0.5)}}

  /* RESPONSIVE */
  @media(max-width:1100px){
    .pf-sec{padding:7rem 3rem}
    .pf-sec-num{right:3rem}
    .pf-proj-grid{grid-template-columns:repeat(2,1fr)}
    .pf-skills-grid{grid-template-columns:repeat(2,1fr)}
    .pf-certs-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:900px){
    .pf-nav{padding:1.1rem 1.5rem}
    .pf-nav-links{display:none}
    .pf-nav-cta{display:none}
    .pf-sec{padding:5.5rem 1.5rem}
    .pf-sec-num{display:none}
    .pf-hero{padding:5rem 1.25rem 3rem}
    .pf-hero-bio{font-size:0.93rem;max-width:100%}
    .pf-hero-btns{gap:0.75rem}
    .pf-stats{grid-template-columns:repeat(2,1fr)}
    .pf-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,0.04)}
    .pf-stat:last-child,.pf-stat:nth-child(2){border-bottom:none}
    .pf-about{grid-template-columns:1fr;gap:2.5rem}
    .pf-proj-grid{grid-template-columns:1fr}
    .pf-skills-grid{grid-template-columns:repeat(2,1fr)}
    .pf-kb-wrap{height:420px}
    .pf-certs-grid{grid-template-columns:repeat(2,1fr)}
    .pf-cert-card{padding:1.4rem}
    .pf-contact{padding:4rem 1.5rem}
    .pf-footer{flex-direction:column;gap:0.75rem;text-align:center;padding:1.5rem}
    .pf-exp-item{padding-left:1.5rem}
    .pf-exp-dot{left:-1.5rem}
  }
  @media(max-width:600px){
    .pf-hero-name{font-size:clamp(2.6rem,11vw,3.8rem)}
    .pf-hero-role{font-size:0.95rem}
    .pf-badge{font-size:0.68rem;padding:0.3rem 0.75rem}
    .pf-btn-p,.pf-btn-s{padding:0.7rem 1.4rem;font-size:0.85rem}
    .pf-stats{grid-template-columns:repeat(2,1fr)}
    .pf-stat-val{font-size:2.8rem}
    .pf-skills-grid{grid-template-columns:1fr}
    .pf-kb-wrap{height:340px}
    .pf-sec-h{font-size:1.85rem}
    .pf-proj-grid{grid-template-columns:1fr}
    .pf-proj{padding:1.5rem}
    .pf-certs-grid{grid-template-columns:1fr}
    .pf-cert-card{padding:1.25rem}
    .pf-hero-pills{flex-wrap:wrap;gap:0.4rem}
    .pf-about-tags{flex-wrap:wrap}
  }
  @media(max-width:400px){
    .pf-hero-name{font-size:2.4rem}
    .pf-sec{padding:4.5rem 1rem}
    .pf-hero-btns{flex-direction:column;align-items:center}
  }
`;

// ─── HOOKS ────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, on];
}

function useTypewriter(words, tSpeed = 85, dSpeed = 42, pause = 2200) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const word = words[wi % words.length];
    let t;
    if (phase === "typing") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), tSpeed);
      } else {
        t = setTimeout(() => setPhase("deleting"), pause);
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), dSpeed);
      } else {
        setWi((i) => i + 1);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, wi, phase, words, tSpeed, dSpeed, pause]);

  return text;
}

function useCounter(target, duration = 2000, active = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return n;
}

// ─── THREE.JS NEURAL NETWORK ─────────────────────────────────
function NeuralBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.offsetWidth || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 58;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const COUNT = 65;
    const pts = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 115,
      y: (Math.random() - 0.5) * 78,
      z: (Math.random() - 0.5) * 18,
      vx: (Math.random() - 0.5) * 0.038,
      vy: (Math.random() - 0.5) * 0.038,
    }));

    const pPos = new Float32Array(COUNT * 3);
    pts.forEach((p, i) => { pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y; pPos[i * 3 + 2] = p.z; });
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.55, transparent: true, opacity: 0.75 });
    scene.add(new THREE.Points(pGeo, pMat));

    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const MAX_D = 20;

    function buildLines() {
      while (lineGroup.children.length) {
        const c = lineGroup.children[0];
        c.geometry.dispose(); c.material.dispose(); lineGroup.remove(c);
      }
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_D) {
            const alpha = (1 - d / MAX_D) * 0.32;
            const col = d < MAX_D * 0.45 ? 0x7c3aed : 0x00d4ff;
            const geo = new THREE.BufferGeometry().setFromPoints([
              new THREE.Vector3(pts[i].x, pts[i].y, pts[i].z),
              new THREE.Vector3(pts[j].x, pts[j].y, pts[j].z),
            ]);
            const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: alpha });
            lineGroup.add(new THREE.Line(geo, mat));
          }
        }
      }
    }

    let mx = 0, my = 0;
    const onMouse = (e) => { mx = (e.clientX / window.innerWidth - 0.5) * 2; my = -(e.clientY / window.innerHeight - 0.5) * 2; };
    window.addEventListener("mousemove", onMouse);

    let frame = 0, raf;
    function animate() {
      raf = requestAnimationFrame(animate);
      frame++;
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.x) > 60) p.vx *= -1;
        if (Math.abs(p.y) > 41) p.vy *= -1;
        pPos[i * 3] = p.x; pPos[i * 3 + 1] = p.y;
      });
      pGeo.attributes.position.needsUpdate = true;
      if (frame % 2 === 0) buildLines();
      camera.position.x += (mx * 3.5 - camera.position.x) * 0.022;
      camera.position.y += (my * 2.2 - camera.position.y) * 0.022;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const nw = canvas.offsetWidth, nh = canvas.offsetHeight;
      camera.aspect = nw / nh; camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose(); pGeo.dispose(); pMat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="pf-hero-canvas" />;
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  // Start false on server AND client (no mismatch); update after mount
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show cursor on non-touch desktop
    if (window.innerWidth > 900 && !('ontouchstart' in window)) {
      setShow(true);
    }

    const onMove = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    let raf;
    function loop() {
      raf = requestAnimationFrame(loop);
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + "px";
        dotRef.current.style.top = pos.current.y + "px";
      }
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top = ring.current.y + "px";
      }
    }
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (!show) return null;

  return (
    <>
      <div ref={dotRef} className="pf-dot" />
      <div ref={ringRef} className={`pf-ring${hovered ? " active" : ""}`} />
    </>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="pf-progress" style={{ width: `${pct}%` }} />;
}

// ─── NAVBAR ───────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`pf-nav${scrolled ? " pf-scrolled" : ""}`}>
      <a href="#" className="pf-logo">RJ<span>.</span></a>
      <ul className="pf-nav-links">
        {["about", "experience", "projects", "skills", "certifications", "contact"].map((id) => (
          <li key={id}>
            <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id); }}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────
function Hero() {
  const role = useTypewriter(PROFILE.roles);

  return (
    <section className="pf-hero" id="hero">
      <div className="pf-grid" />
      <div className="pf-hero-vignette" />
      <NeuralBg />

      <div className="pf-hero-inner">
        <div className="pf-badge">
          <span className="pf-badge-dot" />
          Available for opportunities
        </div>

        <h1 className="pf-hero-name">{PROFILE.name}</h1>

        <div className="pf-hero-role">
          <span className="pf-role-text">{role}</span>
          <span className="pf-caret" />
        </div>

        <p className="pf-hero-bio">{PROFILE.bio}</p>

        <div className="pf-hero-btns">
          <a
            href="#projects"
            className="pf-btn-p"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="pf-btn-o"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Let's Connect
          </a>
        </div>

        <div className="pf-stack">
          {["Cypress", "Selenium", "LLM / RAG", "Django", "Angular", "Docker", "GitHub Actions", "Xray"].map((s) => (
            <span key={s} className="pf-pill">{s}</span>
          ))}
        </div>

        <div className="pf-hero-soc">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="pf-soc-a">
            <GithubIcon /> GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="pf-soc-a">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`} className="pf-soc-a">
            <MailIcon /> {PROFILE.email}
          </a>
        </div>
      </div>

      <div className="pf-scroll-ind">
        <span>SCROLL</span>
        <div className="pf-scroll-line" />
      </div>
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────
function StatItem({ value, suffix, label, active }) {
  const n = useCounter(value, 2200, active);
  return (
    <div className="pf-stat">
      <div className="pf-stat-num">{n}{suffix}</div>
      <div className="pf-stat-lbl">{label}</div>
    </div>
  );
}

function Stats() {
  const [ref, on] = useReveal(0.2);
  return (
    <div className="pf-stats-wrap">
      <div className="pf-stats" ref={ref}>
        {STATS.map((s, i) => (
          <div key={i} className={`pf-r d${i + 1}${on ? " on" : ""}`}>
            <StatItem {...s} active={on} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────
function About() {
  const [hRef, hOn] = useReveal();
  const [bRef, bOn] = useReveal();

  return (
    <section id="about" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="pf-sec">
        <div className="pf-sec-num">01</div>
        <div ref={hRef}>
          <div className={`pf-r${hOn ? " on" : ""}`}>
            <p className="pf-sec-lbl">// About</p>
            <h2 className="pf-sec-h">
              Quality is Not a Feature —<br />
              <em>It's the Foundation.</em>
            </h2>
          </div>
        </div>

        <div className="pf-about" ref={bRef}>
          <div>
            <p className={`pf-about-p pf-r d1${bOn ? " on" : ""}`}>
              I didn't start in QA by accident. At <strong style={{ color: "#e2e0ea" }}>EMSI Tangier</strong>, studying the MIAGE track, I realized early that the most valuable engineer in any team isn't the one who writes the most code — it's the one who ensures that code <em>actually works in production</em>. That realization shaped everything.
            </p>
            <p className={`pf-about-p pf-r d2${bOn ? " on" : ""}`}>
              At <strong style={{ color: "#00d4ff" }}>OCP Groupe</strong> — the world's largest phosphate producer — I executed 80+ test scenarios across API, E2E, and performance layers for a mission-critical industrial platform. Zero post-deployment incidents. That's the standard I hold myself to.
            </p>
            <p className={`pf-about-p pf-r d3${bOn ? " on" : ""}`}>
              My edge: I bring <strong style={{ color: "#7c3aed" }}>AI into testing</strong>. I've built systems that use LLMs and RAG to auto-generate Cypress test suites — turning hours of manual test writing into minutes. Quality at the speed of development. That's what modern QA engineering looks like.
            </p>
            <div className={`pf-about-tags pf-r d4${bOn ? " on" : ""}`}>
              {["#QAEngineering", "#AITestAutomation", "#Cypress", "#LLM", "#ZeroBugsInProd", "#MIAGE"].map((t) => (
                <span key={t} className="pf-about-tag">{t}</span>
              ))}
            </div>
          </div>

          <div className={`pf-about-r pf-r d2${bOn ? " on" : ""}`}>
            <div className="pf-info-card">
              <div className="pf-info-card-h">Education</div>
              <div className="pf-info-row">
                <div className="pf-info-dot" style={{ background: "#00d4ff" }} />
                <div className="pf-info-val">
                  École Marocaine des Sciences de l'Ingénieur
                  <span className="pf-info-sub">Diplôme d'Ingénieur — Option MIAGE · 2022–2025</span>
                </div>
              </div>
              <div className="pf-info-row">
                <div className="pf-info-dot" style={{ background: "#7c3aed" }} />
                <div className="pf-info-val">
                  EMSI — Cycle Préparatoire Intégré
                  <span className="pf-info-sub">Math, Algorithmics, Physics · 2020–2022</span>
                </div>
              </div>
              <div className="pf-info-row">
                <div className="pf-info-dot" style={{ background: "#00b87a" }} />
                <div className="pf-info-val">
                  Lycée Mansour Eddahbi
                  <span className="pf-info-sub">Baccalauréat Sciences Mathématiques A · 2020</span>
                </div>
              </div>
            </div>

            <div className="pf-info-card">
              <div className="pf-info-card-h">Leadership</div>
              <div className="pf-info-row">
                <div className="pf-info-dot" style={{ background: "#f59e0b" }} />
                <div className="pf-info-val">
                  Chef d'Organisation — JLM
                  <span className="pf-info-sub">Junior Leadership Morocco · 3 years · Inter-team coordination</span>
                </div>
              </div>
            </div>

            <div className="pf-info-card">
              <div className="pf-info-card-h">Languages</div>
              <div className="pf-lang-row">
                {[["Arabic", "Native"], ["French", "Fluent"], ["English", "Fluent"]].map(([l, v]) => (
                  <div key={l} className="pf-lang">
                    <div className="pf-lang-name">{l}</div>
                    <div className="pf-lang-level">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────
function ExperienceItem({ exp }) {
  const [ref, on] = useReveal();
  return (
    <div className={`pf-tl-item pf-r d1${on ? " on" : ""}`} ref={ref}>
      <div className="pf-tl-dot" style={{ borderColor: exp.color }} />
      <div className="pf-tl-head">
        <div>
          <div className="pf-tl-co">{exp.company}</div>
          <div className="pf-tl-role">{exp.role}</div>
          <span className="pf-tl-type">{exp.type}</span>
        </div>
        <div className="pf-tl-period">{exp.period}</div>
      </div>
      <p className="pf-tl-desc">{exp.description}</p>
      <ul className="pf-tl-li">
        {exp.highlights.map((h, j) => <li key={j}>{h}</li>)}
      </ul>
      <div className="pf-tags">
        {exp.tags.map((t) => <span key={t} className="pf-tag">{t}</span>)}
      </div>
    </div>
  );
}

function Experience() {
  const [hRef, hOn] = useReveal();

  return (
    <section id="experience" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="pf-sec">
        <div className="pf-sec-num">02</div>
        <div ref={hRef}>
          <div className={`pf-r${hOn ? " on" : ""}`}>
            <p className="pf-sec-lbl">// Experience</p>
            <h2 className="pf-sec-h">Where I've <em>Delivered</em></h2>
            <p className="pf-sec-sub">From enterprise QA at OCP Groupe to AI systems in production — real clients, real stakes, measurable results.</p>
          </div>
        </div>

        <div className="pf-tl">
          {EXPERIENCES.map((exp, i) => <ExperienceItem key={i} exp={exp} />)}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────
function ProjectCard({ p, delay }) {
  const [ref, on] = useReveal();

  if (p.featured) {
    return (
      <div ref={ref} className={`pf-proj featured pf-r d1${on ? " on" : ""}`}>
        <div className="pf-feat-badge">Flagship Project</div>
        <div className="pf-proj-top">
          <span className="pf-proj-num" style={{ color: p.color }}>{p.id}</span>
          <span className="pf-proj-cat">{p.category}</span>
        </div>
        <div className="pf-proj-title featured">{p.title}</div>
        <div className="pf-proj-sub">{p.subtitle}</div>

        <div className="pf-feat-body">
          <div>
            <div className="pf-feat-block-label">// The Problem</div>
            <p className="pf-feat-block-text">{p.problem}</p>
          </div>
          <div>
            <div className="pf-feat-block-label">// The Solution</div>
            <p className="pf-feat-block-text">{p.solution}</p>
          </div>
        </div>

        <div className="pf-proj-metrics" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.35rem" }}>
          {p.metrics.map((m) => <div key={m} className="pf-proj-metric">{m}</div>)}
        </div>
        <div className="pf-proj-foot" style={{ marginTop: "1.25rem" }}>
          <div className="pf-proj-tech">
            {p.tech.map((t) => <span key={t} className="pf-tech-chip">{t}</span>)}
          </div>
          <a href={p.link} target="_blank" rel="noopener noreferrer" className="pf-proj-link">
            GitHub →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`pf-proj pf-r d${delay}${on ? " on" : ""}`}>
      <div className="pf-proj-top">
        <span className="pf-proj-num" style={{ color: p.color }}>{p.id}</span>
        <span className="pf-proj-cat">{p.category}</span>
      </div>
      <div className="pf-proj-title">{p.title}</div>
      <div className="pf-proj-sub">{p.subtitle}</div>
      <p className="pf-proj-desc">{p.description}</p>
      <div className="pf-proj-metrics">
        {p.metrics.map((m) => <div key={m} className="pf-proj-metric">{m}</div>)}
      </div>
      <div className="pf-proj-foot">
        <div className="pf-proj-tech">
          {p.tech.map((t) => <span key={t} className="pf-tech-chip">{t}</span>)}
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" className="pf-proj-link">
          GitHub →
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const [hRef, hOn] = useReveal();

  return (
    <section id="projects" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="pf-sec">
        <div className="pf-sec-num">03</div>
        <div ref={hRef}>
          <div className={`pf-r${hOn ? " on" : ""}`}>
            <p className="pf-sec-lbl">// Projects</p>
            <h2 className="pf-sec-h">Systems I've <em>Shipped</em></h2>
            <p className="pf-sec-sub">From AI-powered test generation to mission-critical industrial platforms — every project is defined by real impact and measurable results.</p>
          </div>
        </div>

        <div className="pf-proj-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} delay={(i % 2) + 1} />)}
        </div>
      </div>
    </section>
  );
}

// ─── 3D KEYBOARD COMPONENT ────────────────────────────────────
function SkillsKeyboard() {
  const mountRef = useRef(null);
  const [hoverTech, setHoverTech] = useState(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let cancelled = false;
    let cleanupFn = null;

    // ── Load SVG icons from simple-icons CDN (colored via inject) ──
    async function fetchIcon(slug, fillColor) {
      if (!slug) return null;
      try {
        const resp = await fetch(
          `https://cdn.jsdelivr.net/npm/simple-icons@v12/icons/${slug}.svg`
        );
        if (!resp.ok) return null;
        let svg = await resp.text();
        // Inject fill color directly into the SVG root element
        svg = svg.replace(/<svg /, `<svg fill="${fillColor}" `);
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const blobUrl = URL.createObjectURL(blob);
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => { URL.revokeObjectURL(blobUrl); resolve(img); };
          img.onerror = () => { URL.revokeObjectURL(blobUrl); resolve(null); };
          img.src = blobUrl;
        });
      } catch { return null; }
    }

    async function init() {
      // Load all 25 logos in parallel — fallback to text if any fail
      const logoImgs = await Promise.all(
        TECH_KEYS.map((t) => fetchIcon(t.icon, t.text))
      );
      if (cancelled) return;

      const W = el.offsetWidth || 800;
      const H = el.offsetHeight || 560;
      const aspect = W / H;

      // ── Scene ────────────────────────────────────────────────
      const scene = new THREE.Scene();

      let FS = 2.2;
      let targetFS = 2.2;
      const camera = new THREE.OrthographicCamera(
        -FS * aspect, FS * aspect, FS, -FS, 0.1, 100
      );
      camera.position.set(3, 14, 7);
      camera.lookAt(0, 0.1, 0);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      el.appendChild(renderer.domElement);

      // ── Lighting ─────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 0.50));
      const sun = new THREE.DirectionalLight(0xffffff, 1.15);
      sun.position.set(4, 14, 7);
      sun.castShadow = true;
      sun.shadow.mapSize.setScalar(1024);
      sun.shadow.camera.near = 0.5;
      sun.shadow.camera.far = 30;
      sun.shadow.camera.left = sun.shadow.camera.bottom = -6;
      sun.shadow.camera.right = sun.shadow.camera.top = 6;
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x4488ff, 0.22);
      fill.position.set(-3, 5, -2);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0x00d4ff, 0.10);
      rim.position.set(0, -3, -6);
      scene.add(rim);

      // ── Texture factory ───────────────────────────────────────
      function makeKeyTex(tech, logoImg) {
        const S = 256;
        const c = document.createElement("canvas");
        c.width = c.height = S;
        const ctx = c.getContext("2d");

        // Solid base color
        ctx.fillStyle = tech.color;
        ctx.fillRect(0, 0, S, S);

        // Keycap gloss — radial highlight from top-left
        const gloss = ctx.createRadialGradient(S * 0.35, S * 0.28, 0, S * 0.5, S * 0.5, S * 0.76);
        gloss.addColorStop(0,    "rgba(255,255,255,0.42)");
        gloss.addColorStop(0.44, "rgba(255,255,255,0.07)");
        gloss.addColorStop(1,    "rgba(0,0,0,0.26)");
        ctx.fillStyle = gloss;
        ctx.fillRect(0, 0, S, S);

        // Logo or fallback text
        const pad = Math.round(S * 0.17);
        const iconS = S - pad * 2;
        if (logoImg) {
          ctx.drawImage(logoImg, pad, pad, iconS, iconS);
        } else {
          // Fallback: bold label text
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = tech.text;
          ctx.shadowColor = "rgba(0,0,0,0.65)";
          ctx.shadowBlur = 10;
          const fs = tech.label.length <= 2 ? 96 : tech.label.length === 3 ? 70 : 52;
          ctx.font = `900 ${fs}px "Space Grotesk","Arial Black",sans-serif`;
          ctx.fillText(tech.label, S / 2, S / 2);
        }

        return new THREE.CanvasTexture(c);
      }

      // ── Build keyboard ────────────────────────────────────────
      const COLS = 5, ROWS = 5;
      const KW = 0.82, KH = 0.70, GAP = 0.96;
      const group = new THREE.Group();
      const meshes = [];

      TECH_KEYS.forEach((tech, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = (col - (COLS - 1) / 2) * GAP;
        const z = (row - (ROWS - 1) / 2) * GAP;

        const topTex = makeKeyTex(tech, logoImgs[i]);
        const topCol = new THREE.Color(tech.color);
        const sideCol = topCol.clone().multiplyScalar(0.62);
        const botCol  = topCol.clone().multiplyScalar(0.35);

        const geo = new THREE.BoxGeometry(KW, KH, KW);
        const mats = [
          new THREE.MeshPhongMaterial({ color: sideCol, shininess: 30 }),
          new THREE.MeshPhongMaterial({ color: sideCol, shininess: 30 }),
          new THREE.MeshPhongMaterial({ map: topTex, shininess: 120, specular: new THREE.Color(0x444444) }),
          new THREE.MeshPhongMaterial({ color: botCol, shininess: 5 }),
          new THREE.MeshPhongMaterial({ color: sideCol, shininess: 30 }),
          new THREE.MeshPhongMaterial({ color: sideCol, shininess: 30 }),
        ];

        const mesh = new THREE.Mesh(geo, mats);
        mesh.position.set(x, 0, z);
        mesh.castShadow = true;
        mesh.userData = { tech, baseY: 0, pressed: false, waveOff: row * 0.65 + col * 0.38 };
        group.add(mesh);
        meshes.push(mesh);
      });

      // Base plate
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(COLS * GAP + 0.35, 0.09, ROWS * GAP + 0.35),
        new THREE.MeshPhongMaterial({ color: 0x07070e, shininess: 90, specular: new THREE.Color(0x111133) })
      );
      base.position.y = -KH / 2 - 0.045;
      base.receiveShadow = true;
      group.add(base);

      const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(12, 12),
        new THREE.ShadowMaterial({ opacity: 0.38 })
      );
      shadowPlane.rotation.x = -Math.PI / 2;
      shadowPlane.position.y = -KH / 2 - 0.055;
      shadowPlane.receiveShadow = true;
      group.add(shadowPlane);

      const FINAL_ROT_X = -Math.PI * 0.055;
      const FINAL_ROT_Y = Math.PI * 0.22;
      group.rotation.x = -Math.PI * 0.55;
      group.rotation.y = FINAL_ROT_Y;
      group.scale.setScalar(0.5);
      scene.add(group);

      // ── Raycasting ────────────────────────────────────────────
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(-999, -999);
      let currentHover = null;
      const cv = renderer.domElement;

      const onMove = (e) => {
        const rect = cv.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const onClick = () => {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(meshes);
        if (hits.length > 0) {
          const m = hits[0].object;
          if (!m.userData.pressed) {
            m.userData.pressed = true;
            m.position.y = -0.15;
            setTimeout(() => { m.position.y = m.userData.baseY; m.userData.pressed = false; }, 200);
          }
        }
      };

      cv.addEventListener("mousemove", onMove);
      cv.addEventListener("click", onClick);

      // ── Entry animation ───────────────────────────────────────
      let entryProgress = 0, entryStarted = false;
      function easeOutBack(tt) {
        const c1 = 1.70158, c3 = c1 + 1;
        return 1 + c3 * Math.pow(tt - 1, 3) + c1 * Math.pow(tt - 1, 2);
      }
      function easeOutCubic(tt) { return 1 - Math.pow(1 - tt, 3); }

      const observer = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !entryStarted) entryStarted = true;
      }, { threshold: 0.25 });
      observer.observe(el);

      const onEnter = () => { targetFS = 1.8; };
      const onLeave = () => { targetFS = 2.2; mouse.set(-999, -999); };
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      // ── Animation loop ────────────────────────────────────────
      let raf, t = 0;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        t += 0.008;

        // ① Entry roll-up
        if (entryStarted && entryProgress < 1) {
          entryProgress = Math.min(1, entryProgress + 0.016);
          group.rotation.x = -Math.PI * 0.55 + (FINAL_ROT_X + Math.PI * 0.55) * easeOutBack(entryProgress);
          group.scale.setScalar(0.5 + 0.5 * easeOutCubic(entryProgress));
        }

        // ② Idle living motion
        if (entryProgress > 0.85) {
          const f = Math.min(1, (entryProgress - 0.85) / 0.15);
          group.rotation.y = FINAL_ROT_Y + Math.sin(t * 0.45) * 0.10 * f;
          group.position.y = Math.sin(t * 0.7) * 0.05 * f;
          meshes.forEach((m) => {
            if (!m.userData.pressed)
              m.userData.baseY = Math.sin(t * 1.4 + m.userData.waveOff) * 0.025 * f;
          });
        }

        // ③ Smooth zoom
        if (Math.abs(FS - targetFS) > 0.0005) {
          FS += (targetFS - FS) * 0.06;
          const asp = el.offsetWidth / el.offsetHeight;
          camera.left = -FS * asp; camera.right = FS * asp;
          camera.top = FS; camera.bottom = -FS;
          camera.updateProjectionMatrix();
        }

        // ④ Hover + lift
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(meshes);
        const hovered = hits.length > 0 ? hits[0].object : null;

        if (hovered !== currentHover) {
          currentHover = hovered;
          setHoverTech(hovered ? hovered.userData.tech : null);
        }

        meshes.forEach((m) => {
          if (!m.userData.pressed) {
            const target = m === hovered ? m.userData.baseY + 0.14 : m.userData.baseY;
            m.position.y += (target - m.position.y) * 0.14;
          }
        });

        renderer.render(scene, camera);
      };
      animate();

      // ── Resize ────────────────────────────────────────────────
      const onResize = () => {
        const nw = el.offsetWidth, nh = el.offsetHeight;
        const asp = nw / nh;
        camera.left = -FS * asp; camera.right = FS * asp;
        camera.top = FS; camera.bottom = -FS;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      };
      window.addEventListener("resize", onResize);

      cleanupFn = () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        cv.removeEventListener("mousemove", onMove);
        cv.removeEventListener("click", onClick);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        window.removeEventListener("resize", onResize);
        meshes.forEach((m) => {
          m.geometry.dispose();
          (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => {
            if (mt.map) mt.map.dispose();
            mt.dispose();
          });
        });
        renderer.dispose();
        if (el.contains(cv)) el.removeChild(cv);
      };
    }

    init();

    return () => {
      cancelled = true;
      if (cleanupFn) cleanupFn();
    };
  }, []);

  return (
    <div ref={mountRef} className="pf-kb-wrap">
      {/* Side hover description — appears to the left like reference */}
      <div className={`pf-kb-desc${hoverTech ? " on" : ""}`}>
        {hoverTech && (
          <>
            <div className="pf-kb-desc-name">{hoverTech.name}</div>
            <div className="pf-kb-desc-text">{hoverTech.desc}</div>
          </>
        )}
      </div>
      <p className="pf-kb-hint">// hover any key · click to press it</p>
    </div>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────
function SkillCategory({ cat, data, delay }) {
  const [ref, on] = useReveal();
  return (
    <div
      ref={ref}
      className={`pf-sk-cat pf-r d${delay}${on ? " on" : ""}`}
      style={{ borderColor: on ? `${data.color}22` : undefined }}
    >
      <div className="pf-sk-head">
        <div className="pf-sk-dot" style={{ background: data.color }} />
        <div className="pf-sk-name">{cat}</div>
      </div>
      <div className="pf-sk-items">
        {data.items.map((item) => (
          <span
            key={item}
            className="pf-sk-item"
            style={{ borderColor: `${data.color}28`, color: `${data.color}cc` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [hRef, hOn] = useReveal();

  return (
    <section id="skills" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="pf-sec">
        <div className="pf-sec-num">04</div>
        <div ref={hRef}>
          <div className={`pf-r${hOn ? " on" : ""}`}>
            <p className="pf-sec-lbl">// Skills</p>
            <h2 className="pf-sec-h">Technical <em>Arsenal</em></h2>
            <p className="pf-sec-sub">25 technologies — click any key to press it. Spanning AI, automation, full-stack, and DevOps.</p>
          </div>
        </div>
        <SkillsKeyboard />
      </div>
    </section>
  );
}

// ─── CERTIFICATIONS ───────────────────────────────────────────
function Certifications() {
  const [hRef, hOn] = useReveal(0.1);
  const [gridRef, gridOn] = useReveal(0.05);
  const [lbIndex, setLbIndex] = useState(null); // null = closed

  const MARQUEE_ITEMS = [
    "University of Pennsylvania",
    "University of Michigan",
    "Hong Kong UST",
    "Meta",
    "Great Learning",
    "GitHub Copilot",
    "Coursera",
  ];

  const openLb = useCallback((i) => setLbIndex(i), []);
  const closeLb = useCallback(() => setLbIndex(null), []);
  const prevLb = useCallback(() => setLbIndex(i => (i - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length), []);
  const nextLb = useCallback(() => setLbIndex(i => (i + 1) % CERTIFICATIONS.length), []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lbIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") prevLb();
      if (e.key === "ArrowRight") nextLb();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lbIndex, closeLb, prevLb, nextLb]);

  const activeCert = lbIndex !== null ? CERTIFICATIONS[lbIndex] : null;

  return (
    <section id="certifications" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="pf-sec">
        <div className="pf-sec-num">05</div>

        <div ref={hRef}>
          <div className={`pf-r${hOn ? " on" : ""}`}>
            <p className="pf-sec-lbl">// Credentials</p>
            <h2 className="pf-sec-h">Certified by <em>the Best.</em></h2>
            <p className="pf-sec-sub">
              6 verified credentials from top universities and industry leaders — click any to view the full certificate.
            </p>
          </div>
        </div>

        {/* Certificate cards grid */}
        <div ref={gridRef} className="pf-certs-grid">
          {CERTIFICATIONS.map((c, i) => (
            <div
              key={i}
              className={`pf-cert-card${gridOn ? " on" : ""}`}
              style={{ "--cc": c.color, transitionDelay: gridOn ? `${i * 0.08}s` : "0s" }}
              onClick={() => openLb(i)}
              role="button"
              aria-label={`View certificate: ${c.title}`}
            >
              {/* Certificate image thumbnail */}
              <div className="pf-cert-img-wrap">
                <img src={c.img} alt={c.title} loading="lazy" />
                <div className="pf-cert-img-overlay" />
                <div className="pf-cert-eye">👁</div>
              </div>

              {/* Card body */}
              <div className="pf-cert-body">
                <div className="pf-cert-platform">
                  <span className="pf-cert-platform-dot" />
                  {c.platform}
                </div>
                <div className="pf-cert-issuer">{c.issuer}</div>
                <div className="pf-cert-title-text">{c.title}</div>
                <div className="pf-cert-bottom">
                  <span className="pf-cert-date">{c.date}</span>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-cert-verify"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Verify ↗
                    </a>
                  ) : (
                    <span className="pf-cert-verify" style={{ opacity: 0.5, cursor: "default" }}>
                      {c.credId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated marquee */}
        <div className="pf-cert-marquee-wrap">
          <div className="pf-cert-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="pf-cert-marquee-item">
                {item}
                <span className="pf-cert-marquee-dot" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <div className={`pf-lb${lbIndex !== null ? " open" : ""}`} role="dialog" aria-modal="true">
        <div className="pf-lb-bg" onClick={closeLb} />
        {activeCert && (
          <div className="pf-lb-panel">
            {/* Prev / Next */}
            <button className="pf-lb-nav prev" onClick={prevLb} aria-label="Previous">‹</button>
            <button className="pf-lb-nav next" onClick={nextLb} aria-label="Next">›</button>

            {/* Full certificate image */}
            <img
              key={lbIndex}
              src={activeCert.img}
              alt={activeCert.title}
              className="pf-lb-img"
            />

            {/* Footer */}
            <div className="pf-lb-foot">
              <div className="pf-lb-info">
                <div className="pf-lb-issuer">{activeCert.issuer} · {activeCert.date}</div>
                <div className="pf-lb-title">{activeCert.title}</div>
              </div>
              <div className="pf-lb-actions">
                {activeCert.url && (
                  <a
                    href={activeCert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-lb-btn pf-lb-btn-v"
                  >
                    ✓ Verify on Coursera ↗
                  </a>
                )}
                <button className="pf-lb-btn pf-lb-btn-x" onClick={closeLb}>✕ Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────
function Contact() {
  const [ref, on] = useReveal();

  return (
    <section id="contact">
      <div className="pf-contact" ref={ref}>
        <div className="pf-contact-inner">
          <div className={`pf-r${on ? " on" : ""}`}>
            <p className="pf-sec-lbl" style={{ textAlign: "center" }}>// Open to Opportunities</p>
            <h2 className="pf-sec-h" style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 1rem" }}>
              Your Next QA Engineer<br /><em>Is Right Here.</em>
            </h2>
          </div>
          <p className={`pf-contact-desc pf-r d1${on ? " on" : ""}`}>
            I'm actively looking for <strong style={{ color: "#e2e0ea" }}>QA Engineer, Test Automation, or AI Engineering roles</strong> — remote or on-site, anywhere in the world. If you're building a product that needs to ship with confidence, let's talk.
          </p>
          <div className={`pf-r d2${on ? " on" : ""}`}>
            <div className="pf-phone-row">
              <PhoneIcon />
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
                onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
                {PROFILE.phone}
              </a>
            </div>
            <a href={`mailto:${PROFILE.email}`} className="pf-contact-email">
              {PROFILE.email}
            </a>
          </div>
          <div className={`pf-contact-soc pf-r d3${on ? " on" : ""}`}>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="pf-c-soc">
              <GithubIcon /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="pf-c-soc">
              <LinkedinIcon /> LinkedIn
            </a>
            <a href={`mailto:${PROFILE.email}`} className="pf-c-soc">
              <MailIcon /> Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="pf-footer">
      <span>© 2026 Reda Jebbah · All rights reserved</span>
      <span>Engineered with precision in <span style={{ color: "#f72585" }}>Morocco</span></span>
      <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
    </footer>
  );
}

// ─── SVG ICONS ────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// ─── MAIN EXPORT ──────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style suppressHydrationWarning>{CSS}</style>
      <div className="pf">
        <Cursor />
        <ProgressBar />
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
