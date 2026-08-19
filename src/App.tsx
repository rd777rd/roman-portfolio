/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Preloader from './components/Preloader';
import { PERSONAL_INFO } from './data';
import { Terminal } from 'lucide-react';

// Lazy-loaded: below-the-fold and not needed for first paint, so keeping them
// out of the initial bundle reduces unused JS and main-thread work on load.
const Projects = lazy(() => import('./components/Projects'));
const HireMeCalculator = lazy(() => import('./components/HireMeCalculator'));
const Skills = lazy(() => import('./components/Skills'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

// Modals are gated behind an explicit user action (not needed for first
// paint or scroll), so they're both lazy AND kept out of the tree entirely
// until first opened — this defers the network request itself, not just the
// bundle placement, since most visitors never click either trigger.
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const HireMeModal = lazy(() => import('./components/HireMeModal'));

// Lightweight placeholder that reserves space to avoid layout shift while a
// lazy section loads in.
function SectionFallback() {
  return <div className="py-24 min-h-[200px]" aria-hidden="true" />;
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [estimateText, setEstimateText] = useState('');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);
  // Track whether each modal has ever been opened, so we only mount (and
  // therefore only fetch) its lazy chunk the first time it's actually needed.
  const [hasOpenedResume, setHasOpenedResume] = useState(false);
  const [hasOpenedHireMe, setHasOpenedHireMe] = useState(false);

  const openResume = () => {
    setHasOpenedResume(true);
    setIsResumeOpen(true);
  };
  const openHireMe = () => {
    setHasOpenedHireMe(true);
    setIsHireMeOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* High-tech preloader overlay */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* Premium background gradient layout */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] opacity-40" />
      </div>

      <div className={`relative z-10 flex flex-col min-h-screen transition-all duration-[400ms] ${isLoading ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'}`}>
        {/* Navigation Bar */}
        <Navbar onOpenResume={openResume} onOpenHireMe={openHireMe} />

        {/* Global Layout sections */}
        <main className="flex-grow">
          {/* Hero segment */}
          <Hero onOpenResume={openResume} />

          {/* About segment */}
          <About onOpenResume={openResume} />

          {/* Portfolio Projects segment */}
          <Suspense fallback={<SectionFallback />}>
            <Projects />
          </Suspense>

          {/* Core interactive billing sandbox simulator */}
          <Suspense fallback={<SectionFallback />}>
            <HireMeCalculator onApplyEstimate={(text) => setEstimateText(text)} />
          </Suspense>

          {/* Tech skills segment */}
          <Suspense fallback={<SectionFallback />}>
            <Skills />
          </Suspense>

          {/* Certifications showcase */}
          <Suspense fallback={<SectionFallback />}>
            <Certifications />
          </Suspense>

          {/* External contact points */}
          <Suspense fallback={<SectionFallback />}>
            <Contact message={estimateText} onMessageChange={(text) => setEstimateText(text)} />
          </Suspense>
        </main>

        {/* Professional Digital Footer */}
        <footer className="bg-zinc-950 border-t border-zinc-900 py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Terminal size={16} className="text-blue-500" />
                <span className="font-display font-black tracking-wider text-base text-zinc-200">
                  {PERSONAL_INFO.name.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                ENGINEERED SOLITARY // ALL VERIFIED DIGITAL PORTFOLIO RIGHTS RESERVED 2026
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <a href="#about" className="hover:text-zinc-100 transition-colors">Dossier</a>
              <span>/</span>
              <a href="#projects" className="hover:text-zinc-100 transition-colors">Systems</a>
              <span>/</span>
              <a href="#sandbox" className="hover:text-zinc-100 transition-colors">Calculator</a>
              <span>/</span>
              <a href="#contact" className="hover:text-zinc-100 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Interactive Resume View Overlay Modal - positioned in root viewport layer.
          Not mounted until first opened, so the chunk is only fetched on demand. */}
      {hasOpenedResume && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        </Suspense>
      )}
      {hasOpenedHireMe && (
        <Suspense fallback={null}>
          <HireMeModal isOpen={isHireMeOpen} onClose={() => setIsHireMeOpen(false)} />
        </Suspense>
      )}

    </div>
  );
}
