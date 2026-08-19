import React, { useState } from 'react';
import { SKILLS_DATA } from '../data';
import { ShieldCheck, Cpu, Code2, Database, Pocket } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'All' | 'Frontend' | 'Backend' | 'Database' | 'Tools'>('All');

  const filteredSkills = activeTab === 'All'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend':
        return <Code2 size={16} className="text-blue-400" />;
      case 'Backend':
        return <Cpu size={16} className="text-purple-400" />;
      case 'Database':
        return <Database size={16} className="text-green-400" />;
      default:
        return <Pocket size={16} className="text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-blue-500 uppercase tracking-widest">
              <span className="w-6 h-[1px] bg-blue-500" />
              Runtime Arsenal
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
              Ammunition & Stack<span className="text-blue-500">_</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              A comprehensive technical grid mapping my developer toolkit. Click filters to inspect specialized segments.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start font-mono text-xs text-zinc-500">
            {(['All', 'Frontend', 'Backend', 'Database', 'Tools'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic skills grid cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="p-5 bg-zinc-900/30 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-black text-sm text-zinc-200 group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </span>
                <span className="p-1 px-1.5 bg-zinc-950 rounded-md border border-zinc-800 flex items-center justify-center">
                  {getCategoryIcon(skill.category)}
                </span>
              </div>

              {/* Advanced custom tech indicators */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>EXP LEVEL</span>
                  <span className="text-zinc-300">{skill.level}%</span>
                </div>
                
                {/* Simulated slider line */}
                <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              {/* Cyber tag line */}
              <div className="text-[9px] font-mono text-zinc-400 mt-3 flex items-center gap-1">
                <ShieldCheck size={9} className="text-zinc-400" />
                <span>VERIFIED_SYSTEM_SKILL</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
