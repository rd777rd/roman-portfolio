import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Lock, ShieldAlert, Layers, Loader2 } from 'lucide-react';
import { Project } from '../types';
import { useDemoWarmup } from '../hooks/useDemoWarmup';

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ProjectCard({ project, index, isExpanded, onToggle }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const demoStatus = useDemoWarmup(project.link, cardRef);
  const [showColdNotice, setShowColdNotice] = useState(false);

  useEffect(() => {
    if (!showColdNotice) return;
    const t = setTimeout(() => setShowColdNotice(false), 5000);
    return () => clearTimeout(t);
  }, [showColdNotice]);

  const handleLaunchClick = () => {
    // Never block or delay the actual navigation — the <a> tag's default
    // behavior fires regardless. This just sets expectations when the demo
    // is a Render free-tier instance that hasn't confirmed it's awake yet.
    if (demoStatus === 'checking' || demoStatus === 'cold') {
      setShowColdNotice(true);
    }
  };

  const showBadge = demoStatus !== 'warm' || project.link.includes('onrender.com');

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/80 transition-all duration-300 group overflow-hidden relative"
    >
      {/* Subtle accent border line on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

      <div className="space-y-4">
        {/* Category pill & index */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400 uppercase tracking-widest">
            {project.category}
          </span>
          <span className="text-blue-500 text-right">
            [0{index + 1}]
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-black text-xl text-zinc-100 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {/* Micro description */}
        <p className="text-zinc-400 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech tag list */}
        <div className="flex flex-wrap gap-2 pt-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable details area */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-3 border-t border-zinc-800/60 mt-3 space-y-2 text-xs text-zinc-400 leading-normal overflow-hidden"
            >
              <div className="flex items-start gap-1.5">
                <Layers size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
                <span>{project.longDescription}</span>
              </div>

              {project.id === 'invoiceapp' && (
                <div className="p-2.5 bg-blue-500/5 rounded-lg border border-blue-500/10 text-[11px] font-mono mt-2 space-y-1 text-blue-300/90 leading-tight">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldAlert size={12} /> Try the live demo — sandbox account
                  </span>
                  <span>Username: <strong className="text-zinc-100">testing</strong></span>
                  <span className="mx-2">|</span>
                  <span>Password: <strong className="text-zinc-100">testing123</strong></span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 mt-4 border-t border-zinc-900">
        <button
          onClick={onToggle}
          className="text-xs font-mono text-zinc-400 hover:text-zinc-300 transition-colors pointer-cursor text-left"
        >
          {isExpanded ? '[-] Hide Architecture' : '[+] Deep Inspect'}
        </button>

        <div className="flex items-center gap-3 self-end sm:self-auto relative">
          {/* Cold-start expectation-setting toast — appears only if the visitor
              clicks Launch before the background warm-up ping has confirmed
              the server responded. Navigation is never blocked or delayed. */}
          <AnimatePresence>
            {showColdNotice && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                role="status"
                className="absolute bottom-full right-0 mb-2 w-56 p-2.5 rounded-lg border border-amber-500/20 bg-zinc-950 text-[11px] font-mono text-amber-300/90 leading-tight shadow-lg z-10"
              >
                Free-tier server was asleep — opening now, first load can take up to ~30s.
              </motion.div>
            )}
          </AnimatePresence>

          {showBadge && (
            <DemoStatusBadge status={demoStatus} />
          )}

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800"
              aria-label={`View code repository for ${project.title}`}
            >
              <Github size={15} />
            </a>
          ) : (
            // No public repo for this project (private source, or a no-code/
            // managed-platform build with nothing to browse) — a lock icon
            // makes that a deliberate design statement instead of a link
            // that would otherwise just be silently missing.
            <span
              className="p-2 text-zinc-600 bg-zinc-900/40 rounded-lg border border-zinc-800/50 cursor-default select-none"
              title="Source is private"
              aria-label={`Source code for ${project.title} is private`}
            >
              <Lock size={15} />
            </span>
          )}

          {project.inDevelopment ? (
            <span
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg font-semibold cursor-default select-none"
              title="Live demo not yet available"
            >
              In Development
            </span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLaunchClick}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-100 bg-blue-600 hover:bg-blue-500 transition-colors rounded-lg font-semibold"
              aria-label={`Visit live deployment of ${project.title}`}
            >
              Launch <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DemoStatusBadge({ status }: { status: import('../hooks/useDemoWarmup').DemoStatus }) {
  if (status === 'warm') {
    return (
      <span
        className="flex items-center gap-1 text-[10px] font-mono text-emerald-400/90 select-none"
        title="Live server responded — demo is warm"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Live
      </span>
    );
  }

  if (status === 'checking') {
    return (
      <span
        className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 select-none"
        title="Checking demo server status"
      >
        <Loader2 size={10} className="animate-spin" />
        Checking
      </span>
    );
  }

  if (status === 'cold') {
    return (
      <span
        className="flex items-center gap-1 text-[10px] font-mono text-amber-400/90 select-none"
        title="Free-tier server was idle — Launch still works, first load just takes longer"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        Waking demo
      </span>
    );
  }

  // 'unknown' — warm-up check hasn't started yet (card not scrolled into view).
  return null;
}
