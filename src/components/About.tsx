import React from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface AboutProps {
  onOpenResume: () => void;
}

export default function About({ onOpenResume }: AboutProps) {
  const stats = [
    { value: '5+', label: 'Production Deployments', desc: 'Active fullstack and responsive platforms' },
    { value: '5', label: 'Tech Specializations', desc: 'Meta, Google, and Coursera credentials' },
    { value: '16+', label: 'Core Tools', desc: 'Verified stack spanning Python/Django, React & SQL' },
    { value: '100%', label: 'Independent Delivery', desc: 'From UX design architecture to database schemas' },
  ];

  return (
    <section id="about" className="py-24 relative bg-zinc-950/40">
      {/* Decorative vertical divider line */}
      <div className="absolute top-0 left-12 w-[1px] h-full bg-zinc-900 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Section Heading & Core Bio */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-blue-500 uppercase tracking-widest">
              <span className="w-6 h-[1px] bg-blue-500" />
              Professional Dossier
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
              About Me<span className="text-blue-500">_</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              My approach to engineering software centers on modular correctness. I avoid cutting corners by establishing clean, indexed databases, choosing lightweight frameworks, and writing precise markup. I treat both design frameworks and backend routes as strict contracts.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-zinc-300 font-mono text-xs bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
                <span>Responsive layouts optimized for low bandwidth</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-300 font-mono text-xs bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
                <span>Dual proficiency in Django Python structures &amp; React</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-zinc-100 font-mono text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                <FileText size={14} /> Open Interactive Dossier / Resume
              </button>
            </div>
          </div>

          {/* Grid of Stats Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 hover:border-amber-800/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Micro corner highlight — amber marks "proof" content (stats,
                    credentials) as a distinct visual register from the blue
                    used for interactive/build content elsewhere on the site */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none group-hover:from-amber-500/25 transition-all duration-300" />

                <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                  {stat.value}
                </div>
                <div className="mt-2 font-heading font-bold text-sm text-zinc-200">
                  {stat.label}
                </div>
                <p className="mt-1 text-xs text-zinc-400 leading-normal">
                  {stat.desc}
                </p>
              </motion.div>
            ))}

            {/* Quick overview alert boxes */}
            <div className="sm:col-span-2 p-6 bg-gradient-to-r from-amber-950/20 to-orange-950/20 rounded-2xl border border-amber-900/30 flex flex-col sm:flex-row items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                <Award size={24} />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="font-heading font-semibold text-sm text-zinc-100">
                  Dual Meta Certified Web Developer
                </div>
                <p className="text-xs text-zinc-400">
                  I hold both the Meta Front-End Specialization (focused on React state systems) and the Meta Back-End Specialization (Django schemas).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
