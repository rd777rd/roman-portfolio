import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data';
import { Project } from '../types';
import ProjectCard from './ProjectCard';

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {PROJECTS_DATA.map((project: Project, idx: number) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                isExpanded={expandedProject === project.id}
                onToggle={() =>
                  setExpandedProject(expandedProject === project.id ? null : project.id)
                }
              />
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
