import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code, Terminal, Server, Shield, Sparkles, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

const CODE_TEMPLATES = [
  {
    mode: 'Python / Django API',
    lines: [
      'from django.http import JsonResponse',
      'from .models import Invoice, LandscapingJob',
      '',
      '@login_required',
      'def generate_invoice(request, job_id):',
      '    job = LandscapingJob.objects.get(id=job_id)',
      '    invoice = Invoice.objects.create(',
      '        client=job.client,',
      '        amount=job.calculate_total(),',
      '        is_sent=True',
      '    )',
      '    invoice.send_notification_email()',
      '    return JsonResponse({"status": "SUCCESS", "id": invoice.id})'
    ]
  },
  {
    mode: 'React Custom Core',
    lines: [
      'import React, { useState } from "react";',
      'import { motion } from "motion/react";',
      '',
      'export default function InvoiceWidget() {',
      '  const [tax, setTax] = useState(0.08);',
      '  return (',
      '    <motion.div animate={{ opacity: 1 }}>',
      '      <h3>Tax multiplier: {tax}</h3>',
      '      <button onClick={() => setTax(0.10)}>',
      '        Increase Yield',
      '      </button>',
      '    </motion.div>',
      '  );',
      '}'
    ]
  },
  {
    mode: 'SQL Schema Engine',
    lines: [
      'CREATE TABLE IF NOT EXISTS certifications (',
      '  id INT AUTO_INCREMENT PRIMARY KEY,',
      '  name VARCHAR(255) NOT NULL,',
      '  issuer VARCHAR(255) NOT NULL,',
      '  verified_link TEXT,',
      '  skills_covered VARCHAR(500)',
      ');',
      '',
      'SELECT c.name, COUNT(p.id) AS project_count',
      'FROM certifications c',
      'LEFT JOIN projects p ON p.cert_id = c.id',
      'GROUP BY c.name ORDER BY project_count DESC;'
    ]
  }
];

interface HeroProps {
  onOpenResume: () => void;
}

export default function Hero({ onOpenResume }: HeroProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeTemplateIdx, setActiveTemplateIdx] = useState(0);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const currentTemplate = CODE_TEMPLATES[activeTemplateIdx];
  const MAX_CYCLES = 2; // stop after 2 full passes instead of running forever

  // Don't start the typing animation until after the initial load/preloader
  // window has passed. Starting it immediately on mount meant its timers were
  // competing with page hydration for the main thread at the busiest possible
  // moment — harmless on a fast desktop CPU, but a major cost once Lighthouse
  // applies mobile's 4x CPU throttling (this was the main driver of the
  // mobile-only performance score gap).
  useEffect(() => {
    const startTimer = setTimeout(() => setHasStarted(true), 1500);
    return () => clearTimeout(startTimer);
  }, []);

  // Typing effect simulation
  useEffect(() => {
    setTypedLines([]);
    setCurrentLineIdx(0);
    setCurrentCharIdx(0);
  }, [activeTemplateIdx]);

  const CHARS_PER_TICK = 3;

  useEffect(() => {
    if (!hasStarted || cycleCount >= MAX_CYCLES) return;

    // Guards against index out-of-bounds during templates swap transitions
    if (currentLineIdx >= currentTemplate.lines.length) {
      if (currentLineIdx > currentTemplate.lines.length) {
        return;
      }
      const timer = setTimeout(() => {
        const isLastTemplate = activeTemplateIdx === CODE_TEMPLATES.length - 1;
        if (isLastTemplate) {
          setCycleCount((prev) => prev + 1);
        }
        // Stop entirely once we've completed the final pass — this was
        // previously an infinite loop that kept re-rendering every ~100ms
        // for as long as the tab stayed open, which is what was driving
        // the 15s+ of "main-thread work" Lighthouse flagged on mobile.
        if (isLastTemplate && cycleCount + 1 >= MAX_CYCLES) {
          return;
        }
        setActiveTemplateIdx((prev) => (prev + 1) % CODE_TEMPLATES.length);
      }, 3500);
      return () => clearTimeout(timer);
    }

    const line = currentTemplate.lines[currentLineIdx];
    if (line === undefined) return;

    if (currentCharIdx < line.length) {
      // Type several characters per tick instead of one-char-per-12ms — this
      // cuts the number of state updates (and therefore main-thread render
      // work) by roughly 3x while keeping a similar visual typing speed.
      const timer = setTimeout(() => {
        setTypedLines((prev) => {
          const next = [...prev];
          const nextChunk = line.slice(currentCharIdx, currentCharIdx + CHARS_PER_TICK);
          next[currentLineIdx] = (next[currentLineIdx] ?? '') + nextChunk;
          return next;
        });
        setCurrentCharIdx((prev) => prev + CHARS_PER_TICK);
      }, 28);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, cycleCount, currentCharIdx, currentLineIdx, activeTemplateIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Absolute high-tech background graphics */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider uppercase"
          >
            <Sparkles size={12} className="animate-pulse" />
            Meta & Google Certified Developer
          </motion.div>

          {/* Heading.
              Note: <h1>/<h2> below are swapped relative to visual size on
              purpose — "Roman Drake" is the string people actually search
              for, so it belongs in the page's one real <h1> for on-page SEO
              relevance, even though "Crafting Advanced Digital Workspaces"
              is the larger, more prominent visual element. Styling
              (className) is untouched, so nothing changes on screen. */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-zinc-100 leading-tight"
            >
              Crafting Advanced <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
                Digital Workspaces
              </span>
            </motion.h2>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 font-heading font-semibold text-lg text-zinc-400"
            >
              Hi, I'm <span className="text-zinc-100 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.title}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {PERSONAL_INFO.tagline} {PERSONAL_INFO.bio.slice(0, 160)}...
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a
              href="#projects"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-zinc-100 font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Code size={16} /> Explore Systems
            </a>
            <button
              onClick={onOpenResume}
              className="px-6 py-3.5 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 font-semibold rounded-xl text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <FileText size={16} /> View &amp; Print Resume
            </button>
            <a
              href="#sandbox"
              className="px-6 py-3.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 font-semibold rounded-xl text-sm transition-all duration-300 hover:text-zinc-100 flex items-center gap-2"
            >
              <Terminal size={16} /> Scope Calculator
            </a>
          </motion.div>

          {/* Micro badges under CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 mt-4 text-xs font-mono text-zinc-400 border-t border-zinc-900 pt-6"
          >
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-blue-500" />
              <span>Fullstack Python & C#</span>
            </div>
            <div className="flex items-center gap-2">
              <Server size={14} className="text-purple-500" />
              <span>Durable SQL Schemas</span>
            </div>
            <div className="flex items-center gap-2">
              <Code size={14} className="text-pink-500" />
              <span>Advanced React Components</span>
            </div>
          </motion.div>
        </div>

        {/* Right IDE Terminal Column */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 h-[340px] sm:h-[400px] bg-zinc-950/90 border border-zinc-800 rounded-2xl flex flex-col shadow-2xl relative"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-zinc-400">roman-drake-workspace</span>
            </div>
            <span className="text-xs font-mono text-blue-500 flex items-center gap-1.5 bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10">
              <Code size={12} /> {currentTemplate.mode}
            </span>
          </div>

          {/* IDE Content Area */}
          <div id="hero-ide" className="flex-1 p-5 font-mono text-xs sm:text-sm overflow-y-auto leading-relaxed text-zinc-300">
            {typedLines.map((line, idx) => {
              if (typeof line !== 'string') return null;
              return (
                <div key={idx} className="flex gap-4">
                  <span className="text-zinc-400 text-right w-6 select-none">{idx + 1}</span>
                  <span
                    style={{
                      color: line.startsWith('import') || line.startsWith('from')
                        ? '#60a5fa' // Blue
                        : line.startsWith('def') || line.startsWith('class') || line.startsWith('export')
                        ? '#f472b6' // Pink
                        : line.includes('return')
                        ? '#a78bfa' // Purple
                        : '#e4e4e7' // White
                    }}
                    className="whitespace-pre"
                  >
                    {line}
                    {idx === currentLineIdx ? (
                      <span className="inline-block w-2 h-4 bg-zinc-400 ml-0.5 animate-pulse select-none vertical-middle" />
                    ) : null}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Code Tabs Controller */}
          <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-900 rounded-b-2xl flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Autotyping...</span>
            <div className="flex gap-2">
              {CODE_TEMPLATES.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCycleCount(0);
                    setActiveTemplateIdx(idx);
                  }}
                  className={`px-2 py-1 rounded transition-all ${
                    activeTemplateIdx === idx
                      ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-300'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-300 transition-colors animate-bounce invisible sm:visible">
        <a href="#about" aria-label="Scroll Down">
          <ArrowDown size={24} />
        </a>
      </div>
    </section>
  );
}
