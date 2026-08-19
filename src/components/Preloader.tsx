import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Sparkles } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

// Sessions replay this boot animation on every mount otherwise, which
// re-delays real content (and LCP) on every refresh/repeat visit — so it's
// shown once per browser session and skipped after that.
const BOOT_SEEN_KEY = 'rd_portfolio_boot_seen';

function hasSeenBootSequence(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SEEN_KEY) === '1';
  } catch {
    // Storage blocked (e.g. locked-down privacy mode) — animation just
    // replays every time, which is harmless.
    return false;
  }
}

function markBootSequenceSeen(): void {
  try {
    sessionStorage.setItem(BOOT_SEEN_KEY, '1');
  } catch {
    /* no-op — see hasSeenBootSequence */
  }
}

const BOOT_LOGS = [
  { text: 'SYSTEM// BOOT SEQUENCE INITIATED...', delay: 40 },
  { text: 'RESOLVING_DOM_NODES... COMPLETE [0.01s]', delay: 150 },
  { text: 'MOUNTING: React 19 Core App Engine...', delay: 290 },
  { text: 'ESTABLISHING_ROUTER: [Space Grotesk, Exo 2, Orbitron]', delay: 440 },
  { text: 'PREPARING: Engineering Deep Dive...', delay: 590 },
  { text: 'ALL SYSTEM MATRIX STATUS: ONLINE [OK]', delay: 720 }
];
const EXIT_DELAY = 850;
const COMPLETE_DELAY = 150;

export default function Preloader({ onComplete }: PreloaderProps) {
  // Computed once on first mount — later toggles of sessionStorage shouldn't
  // yank the animation away mid-run.
  const [alreadySeen] = useState(hasSeenBootSequence);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [barActive, setBarActive] = useState(false);
  const [isVisible, setIsVisible] = useState(!alreadySeen);

  // System diagnostic lines typing simulator
  useEffect(() => {
    // Repeat visit this session: skip straight to content, no replay.
    if (alreadySeen) {
      onComplete();
      return;
    }

    BOOT_LOGS.forEach((log) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.delay);
      return () => clearTimeout(timer);
    });

    // Trigger the CSS transition on the next frame so the browser animates
    // 0% -> 100% smoothly via the GPU-friendly `transition` below, instead of
    // writing `style.width` on every tick (which forces a synchronous layout
    // recalculation each time and was flagged as a forced-reflow issue).
    const startBar = requestAnimationFrame(() => setBarActive(true));

    // Low-frequency numeric readout only (a handful of updates, not 45ms ticks)
    const progressSteps = [15, 35, 55, 75, 90, 100];
    const progressTimers = progressSteps.map((value, i) =>
      setTimeout(() => setProgress(value), (i + 1) * (EXIT_DELAY / progressSteps.length))
    );

    // Fade out and dispatch onComplete callback
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      markBootSequenceSeen();
      // Give time for fade exit animation to finish
      const completeTimer = setTimeout(() => {
        onComplete();
      }, COMPLETE_DELAY);
      return () => clearTimeout(completeTimer);
    }, EXIT_DELAY);

    return () => {
      cancelAnimationFrame(startBar);
      progressTimers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onComplete, alreadySeen]);

  // Allow impatient visitors to skip the boot animation entirely
  const handleSkip = () => {
    setIsVisible(false);
    markBootSequenceSeen();
    setTimeout(() => onComplete(), 150);
  };

  if (alreadySeen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-6 select-none cursor-pointer"
          onClick={handleSkip}
        >
          {/* Neon grid backing */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
          
          {/* Outer futuristic panel border */}
          <div className="max-w-lg w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
            
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded">
                  <Activity size={15} className="animate-pulse" />
                </div>
                <span className="font-display font-black tracking-widest text-[#f4f4f5] text-xs">
                  ROMAN_DRAKE_MAIN_V3.5
                </span>
              </div>
              <span className="font-mono text-[9px] text-zinc-400">
                PORTFOLIO CORE SYS
              </span>
            </div>

            {/* Diagnostic system log console */}
            <div className="h-32 font-mono text-[10px] text-zinc-400 space-y-1.5 overflow-y-auto pr-2 flex flex-col justify-end">
              {logs.map((text, idx) => (
                <div key={idx} className="flex gap-2.5 items-center font-mono select-none">
                  <span className="text-blue-500/60 font-bold select-none">&gt;&gt;</span>
                  <span className={text.includes('[OK]') ? 'text-emerald-400 font-semibold' : ''}>
                    {text}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-zinc-400 h-3">
                <span className="inline-block w-1.5 h-3 bg-zinc-500 animate-pulse" />
              </div>
            </div>

            {/* Simulated progress indicator */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                <span>SYSTEM_REWRITING_READY</span>
                <span className="text-zinc-300 font-bold">{Math.floor(progress)}%</span>
              </div>
              
              {/* Outer bar path */}
              <div className="w-full h-1 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/60">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-full transition-[width] duration-[1200ms] ease-out"
                  style={{ width: barActive ? '100%' : '0%' }}
                />
              </div>
            </div>

            {/* Footer skip hint */}
            <div className="flex items-center justify-center gap-1.5 font-mono text-[9px] text-zinc-400">
              <Sparkles size={10} className="text-zinc-400 animate-spin" />
              <span>Click anywhere to skip</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
