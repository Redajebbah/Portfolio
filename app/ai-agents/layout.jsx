export const metadata = {
  title: "AI Agents — Nexagen Studio",
  description:
    "Powerful AI agents designed to automate real business workflows. Customer support, lead qualification, workflow automation, and more.",
};

export default function AgentsLayout({ children }) {
  return (
    <>
      {/* ── Keyframes exclusive to the AI-Agents section ── */}
      <style>{`
        @keyframes ag-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes ag-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ag-slide-right {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0);     }
        }
        @keyframes ag-scale-in {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1);    }
        }
        @keyframes ag-pulse-ring {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%,-50%) scale(1.9); opacity: 0;   }
        }
        @keyframes ag-orbit {
          from { transform: rotate(0deg)   translateX(48px) rotate(0deg);    }
          to   { transform: rotate(360deg) translateX(48px) rotate(-360deg); }
        }
        @keyframes ag-orbit-rev {
          from { transform: rotate(0deg)    translateX(64px) rotate(0deg);   }
          to   { transform: rotate(-360deg) translateX(64px) rotate(360deg); }
        }
        @keyframes ag-scan-line {
          0%   { top: -2%; opacity: 0.55; }
          100% { top: 102%; opacity: 0;   }
        }
        @keyframes ag-glow-breathe {
          0%,100% { opacity: 0.25; transform: scale(1);    }
          50%     { opacity: 0.55; transform: scale(1.12); }
        }
        @keyframes ag-char-rise {
          from { opacity:0; transform: translateY(60%) rotateX(-80deg); }
          to   { opacity:1; transform: translateY(0)   rotateX(0deg);   }
        }
        @keyframes ag-step-line {
          from { height: 0%; }
          to   { height: 100%; }
        }
        @keyframes ag-badge-pop {
          0%   { transform: scale(0.7) rotate(-4deg); opacity:0; }
          65%  { transform: scale(1.1) rotate(1deg);             }
          100% { transform: scale(1)   rotate(0deg);  opacity:1; }
        }
        @keyframes ag-indicator {
          0%,100% { opacity:1; }
          50%     { opacity:0.25; }
        }
        @keyframes ag-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center;  }
        }
        @keyframes ag-float-icon {
          0%,100% { transform: translateY(0)    rotate(0deg);   }
          30%     { transform: translateY(-14px) rotate(3deg);  }
          70%     { transform: translateY(-8px)  rotate(-2deg); }
        }
        @keyframes ag-hero-grid {
          0%,100% { opacity: 0.04; }
          50%     { opacity: 0.08; }
        }
      `}</style>
      {children}
    </>
  );
}
