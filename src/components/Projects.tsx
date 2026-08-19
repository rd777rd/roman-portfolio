import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ShieldAlert, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Sections Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-500 uppercase tracking-widest">
            <span className="w-6 h-[1px] bg-blue-500" />
            System Architecture
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
            Case Studies & Software<span className="text-blue-500">_</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
            An inventory of production-ready, custom-built applications designed, coded, and deployed independently.
          </p>
        </div>

        {/* Projects Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {PROJECTS_DATA.map((project: Project, idx: number) => {
              const isExpanded = expandedProject === project.id;

              return (
                <motion.div
                  key={project.id}
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
                        [0{idx + 1}]
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
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="text-xs font-mono text-zinc-400 hover:text-zinc-300 transition-colors pointer-cursor text-left"
                    >
                      {isExpanded ? '[-] Hide Architecture' : '[+] Deep Inspect'}
                    </button>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-zinc-400 hover:text-zinc-200 transition-colors bg-zinc-900 hover:bg-zinc-800 rounded-lg border border-zinc-800"
                          aria-label={`View code repository for ${project.title}`}
                        >
                          <Github size={15} />
                        </a>
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
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
