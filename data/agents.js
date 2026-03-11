/** @type {import('./agents.types').Agent[]} */
export const agents = [
  {
    slug: "customer-support",
    title: "Customer Support AI",
    tagline: "24/7 intelligent support that never sleeps",
    description:
      "Resolve tickets instantly with context-aware AI that learns your brand voice and escalates only when needed.",
    icon: "🎧",
    color: "#00e5a0",
    stats: [
      { value: "92%", label: "Resolution Rate" },
      { value: "3s",  label: "Avg. Response"   },
      { value: "24/7",label: "Availability"    },
    ],
    problem:
      "Your support team is overwhelmed with repetitive tickets. Customers wait hours for simple answers while agents burn out handling the same questions daily. Every missed ticket is a lost customer and a damaged relationship.",
    solution:
      "Our Customer Support AI handles Tier-1 inquiries autonomously — reading context, checking your knowledge base, and delivering human-quality responses in seconds. Complex cases get routed to the right agent with full conversation context already attached.",
    features: [
      { icon: "⚡", label: "Instant Responses",   desc: "Sub-3-second answers to any query, 24 hours a day, 365 days a year" },
      { icon: "🧠", label: "Context Memory",       desc: "Remembers the full conversation history and customer profile across sessions" },
      { icon: "🔀", label: "Smart Escalation",     desc: "Detects frustration signals and routes to human agents seamlessly with context" },
      { icon: "📊", label: "Live Analytics",        desc: "Real-time dashboard tracking resolution rates, CSAT, and ticket volume trends" },
      { icon: "🌐", label: "Multilingual",          desc: "Responds in 40+ languages, automatically matching the customer's preference" },
      { icon: "🔗", label: "CRM Integration",       desc: "Native connectors for Zendesk, Salesforce, Intercom and 30+ platforms" },
    ],
    steps: [
      { number: "01", title: "Connect Your Knowledge Base",  description: "Upload docs, FAQs, or connect your CRM. The AI learns your products, policies and tone in under 30 minutes." },
      { number: "02", title: "Deploy on Any Channel",         description: "Embed on your website, WhatsApp, Messenger, or email — one setup, runs everywhere simultaneously." },
      { number: "03", title: "AI Handles Tickets",            description: "The AI reads incoming queries, retrieves the right context, and delivers accurate responses automatically." },
      { number: "04", title: "Escalate & Continuously Learn", description: "Complex cases escalate with full context attached. The AI learns from every resolution to improve over time." },
    ],
  },
  {
    slug: "lead-qualification",
    title: "Lead Qualification AI",
    tagline: "Turn cold traffic into sales-ready prospects",
    description:
      "Score, qualify, and prioritize leads automatically so your sales team focuses exclusively on high-intent buyers.",
    icon: "🎯",
    color: "#a78bfa",
    stats: [
      { value: "5×",  label: "Pipeline Growth"  },
      { value: "80%", label: "Time Saved"        },
      { value: "34%", label: "Close Rate Lift"   },
    ],
    problem:
      "Your sales team wastes 60% of their time chasing unqualified leads. Without a systematic qualification process, high-value prospects slip through the cracks while reps burn resources on dead ends that never convert.",
    solution:
      "Our Lead Qualification AI engages every inbound lead in real-time with intelligent discovery conversations, scores them dynamically against your ideal customer profile, and delivers fully-qualified opportunities directly to your CRM with recommended next actions.",
    features: [
      { icon: "💯", label: "Lead Scoring",               desc: "Dynamic scoring engine using firmographic + behavioral + intent signals" },
      { icon: "💬", label: "Conversational Qualification", desc: "Engages leads with natural dialogue to extract BANT criteria effortlessly" },
      { icon: "🔮", label: "Intent Detection",            desc: "Identifies buying signals and urgency from language patterns in real-time" },
      { icon: "📅", label: "Auto-Scheduling",             desc: "Books discovery calls directly into your sales reps' calendars automatically" },
      { icon: "🏷️", label: "CRM Auto-Fill",              desc: "Populates contact fields, tags, and pipeline stages without manual entry" },
      { icon: "📈", label: "Conversion Analytics",        desc: "Track lead quality trends, drop-off points, and revenue attribution clearly" },
    ],
    steps: [
      { number: "01", title: "Define Your ICP",           description: "Input your ideal customer profile — industry, size, budget range, pain points — and the AI calibrates its scoring model accordingly." },
      { number: "02", title: "Capture Inbound Leads",     description: "Deploy on landing pages, ads, or chatbots. Every form fill or visit triggers an intelligent qualification conversation automatically." },
      { number: "03", title: "AI Qualifies in Real-Time", description: "The agent asks the right discovery questions, scores the lead against your ICP, and determines sales-readiness within minutes." },
      { number: "04", title: "Deliver to Sales",          description: "Qualified leads land in your CRM with a full enriched profile, score, and recommended next action already populated." },
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation AI",
    tagline: "Eliminate manual work across your entire operation",
    description:
      "Design, deploy, and optimize multi-step intelligent workflows that run 24/7 without writing a single line of code.",
    icon: "⚙️",
    color: "#60a5fa",
    stats: [
      { value: "400+", label: "Hours Saved/mo" },
      { value: "99.9%",label: "Reliability"    },
      { value: "10×",  label: "Process Speed"  },
    ],
    problem:
      "Teams lose thousands of hours every month to manual, repetitive tasks — copy-pasting data, sending follow-up emails, updating spreadsheets. Every human error cascades into costly downstream mistakes that take days to untangle.",
    solution:
      "Our Workflow Automation AI maps your existing processes, identifies every automation opportunity, and deploys intelligent workflows that run 24/7 with zero errors — connecting all your tools in a seamless data pipeline that thinks and adapts.",
    features: [
      { icon: "🗺️", label: "Process Mapping",    desc: "Visual drag-and-drop workflow builder that maps your processes intelligently" },
      { icon: "🔌", label: "500+ Integrations",  desc: "Connects Slack, Gmail, Notion, Airtable, Stripe and hundreds more natively" },
      { icon: "🤖", label: "AI Decision Nodes",   desc: "Intelligent branching logic that adapts its path based on real-time data" },
      { icon: "⚠️", label: "Error Handling",      desc: "Automatic retries, fallback paths, and instant Slack alerts on any failure" },
      { icon: "📋", label: "Audit Logs",           desc: "Complete execution history with timestamps for compliance and debugging" },
      { icon: "📡", label: "Real-Time Triggers",  desc: "Webhooks, scheduled runs, and event-driven automation respond instantly" },
    ],
    steps: [
      { number: "01", title: "Map Your Process",    description: "Document your current workflow in our visual builder — no code required, just drag and connect the steps you know." },
      { number: "02", title: "Connect Your Tools",  description: "Authenticate your apps in one click. The AI identifies integration points and maps the data flows automatically." },
      { number: "03", title: "Deploy & Test",        description: "Run your workflow in sandbox mode. The AI validates logic, catches edge cases, and suggests optimizations before going live." },
      { number: "04", title: "Monitor & Improve",   description: "Track execution metrics in real-time. The AI learns from performance data and continuously optimizes your workflows." },
    ],
  },
  {
    slug: "sales-followup",
    title: "Sales Follow-Up AI",
    tagline: "Never let a hot prospect go cold again",
    description:
      "Automate hyper-personalized follow-up sequences that feel genuinely human — timed perfectly to buying signals.",
    icon: "📈",
    color: "#fbbf24",
    stats: [
      { value: "3×",  label: "Reply Rate"   },
      { value: "∞",   label: "Follow-Ups"   },
      { value: "27%", label: "Revenue Lift" },
    ],
    problem:
      "85% of sales happen after the 5th contact, but most reps give up after the 2nd. Inconsistent follow-up lets warm leads go cold while your competitors close the deal with persistence your team simply can't match at scale.",
    solution:
      "Our Sales Follow-Up AI crafts hyper-personalized multi-touch sequences based on each prospect's behavior, company, and role — then sends them at the precise moment each person is most likely to engage, adapting continuously based on response signals.",
    features: [
      { icon: "✍️", label: "Personalized Copy",     desc: "Unique messages tailored to each prospect's company, role, and pain points" },
      { icon: "⏱️", label: "Behavioral Timing",      desc: "Sends at optimal moment based on when each individual prospect is active" },
      { icon: "🔄", label: "Multi-Channel Sequences",desc: "Email, LinkedIn, SMS — coordinated across all touch points seamlessly" },
      { icon: "👁️", label: "Engagement Tracking",    desc: "Open, click, and reply tracking with behavioral heat-map visualizations" },
      { icon: "🎯", label: "A/B Testing",             desc: "Continuous message optimization based on real conversion performance data" },
      { icon: "🛑", label: "Auto-Pause on Reply",     desc: "Instantly stops all sequences the moment a prospect responds to you" },
    ],
    steps: [
      { number: "01", title: "Upload Prospect List", description: "Import from your CRM or CSV. The AI automatically enriches each contact with company data and buying intent signals." },
      { number: "02", title: "Generate Sequences",   description: "AI writes personalized 5-7 touch sequences for each prospect based on their profile, industry and company context." },
      { number: "03", title: "Launch Campaigns",     description: "Sequences launch automatically, sent from your own email address to maintain full authenticity and deliverability." },
      { number: "04", title: "Convert & Optimize",   description: "Monitor reply rates and revenue attribution in real-time. The AI continuously refines its approach based on what converts." },
    ],
  },
  {
    slug: "document-processing",
    title: "Document Processing AI",
    tagline: "Extract, classify, and act on documents instantly",
    description:
      "Transform unstructured documents — contracts, invoices, reports — into clean structured data that flows into your systems.",
    icon: "📄",
    color: "#f472b6",
    stats: [
      { value: "10k+", label: "Docs/Hour"       },
      { value: "99.7%",label: "Accuracy Rate"   },
      { value: "95%",  label: "Time Reduction"  },
    ],
    problem:
      "Teams spend hours manually reviewing contracts, extracting invoice data, and classifying inbound documents. Human errors cascade through finance and legal workflows, creating costly downstream mistakes that are expensive to detect and fix.",
    solution:
      "Our Document Processing AI reads any document format, extracts structured data with surgical precision, classifies document types automatically, flags anomalies, and routes information directly to the right system — entirely without human intervention.",
    features: [
      { icon: "👁️", label: "Multi-Format OCR",    desc: "Reads PDFs, Word docs, images, and scanned documents with 99.7% accuracy" },
      { icon: "🏷️", label: "Smart Classification", desc: "Automatically categorizes contracts, invoices, reports, and forms on arrival" },
      { icon: "⚗️", label: "Data Extraction",      desc: "Pulls key fields — dates, amounts, parties, terms — into clean structured JSON" },
      { icon: "🔍", label: "Anomaly Detection",    desc: "Flags missing required fields, potential duplicates, and suspicious data points" },
      { icon: "🔄", label: "ERP Integration",      desc: "Pushes extracted data directly to SAP, QuickBooks, Xero, and more with one click" },
      { icon: "🔒", label: "Compliance Ready",     desc: "GDPR and SOC2 compliant with full encryption and tamper-proof audit trails" },
    ],
    steps: [
      { number: "01", title: "Configure Document Types", description: "Define the types of documents you process and specify exactly which fields you need extracted from each type." },
      { number: "02", title: "Ingest Documents",         description: "Upload via email, API, or folder sync. The AI identifies document type automatically on arrival — no manual sorting." },
      { number: "03", title: "Extract & Validate",        description: "AI pulls structured data, validates it against your business rules, and flags anything that requires human review." },
      { number: "04", title: "Push to Systems",           description: "Clean, structured data flows directly into your ERP, database, or spreadsheet — zero manual entry required." },
    ],
  },
  {
    slug: "social-media-content",
    title: "Social Media Content AI",
    tagline: "Publish compelling content on every channel, every day",
    description:
      "Generate, schedule, and optimize an entire month of branded social content across all platforms in under 10 minutes.",
    icon: "✨",
    color: "#5eead4",
    stats: [
      { value: "30×",  label: "Content Output"   },
      { value: "10min",label: "Monthly Setup"    },
      { value: "4.2×", label: "Engagement Lift"  },
    ],
    problem:
      "Maintaining consistent, high-quality content across LinkedIn, X, Instagram, and TikTok is a full-time job. Brands either post inconsistently or sacrifice quality for volume — both damage audience trust and tank algorithm performance.",
    solution:
      "Our Social Media Content AI learns your brand voice, analyzes your top-performing posts, generates a full strategic content calendar, and publishes across all platforms automatically — always on-brand, always optimized for each channel's algorithm.",
    features: [
      { icon: "🎨", label: "Brand Voice Training",    desc: "Learns your exact tone, style, and messaging DNA from your existing content" },
      { icon: "📅", label: "Content Calendar",         desc: "Generates 30 days of posts across all platforms in a single click" },
      { icon: "🖼️", label: "Visual Generation",        desc: "Creates on-brand images and graphics using AI design generation tools" },
      { icon: "📊", label: "Performance Optimization", desc: "Analyzes engagement data to automatically improve future content quality" },
      { icon: "🔗", label: "Multi-Platform Publishing",desc: "Publishes simultaneously to LinkedIn, Instagram, X/Twitter, and TikTok" },
      { icon: "🔥", label: "Trend Detection",          desc: "Monitors industry trends in real-time and injects them into your calendar" },
    ],
    steps: [
      { number: "01", title: "Brand Onboarding",     description: "Share your existing content, brand guidelines, and target audience. The AI analyzes everything and learns your voice completely." },
      { number: "02", title: "Content Strategy",     description: "AI generates a strategic content mix — educational, promotional, and engagement posts — tailored for each platform's format." },
      { number: "03", title: "Review & Approve",     description: "Browse the generated content calendar, make edits where you want, or approve the entire month in a single bulk action." },
      { number: "04", title: "Publish & Optimize",   description: "Content publishes at optimal times automatically. The AI tracks performance and refines the entire strategy each month." },
    ],
  },
];

export function getAgentBySlug(slug) {
  return agents.find((a) => a.slug === slug) ?? null;
}
