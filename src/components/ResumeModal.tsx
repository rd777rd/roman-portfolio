import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, ShieldCheck } from 'lucide-react';
import { RESUME_DATA } from '../resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'resume-backdrop') {
      onClose();
    }
  };

  return (
    <div 
      id="resume-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto"
    >
      {/* Container */}
      <div 
        id="resume-modal-container"
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col print:border-0 print:bg-white print:text-zinc-900 print:max-h-none print:shadow-none"
      >
        {/* Top Header Controls (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">Roman Drake • Verified Professional Resume</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Roman-Drake-Resume.pdf"
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-zinc-100 font-mono text-xs font-semibold rounded-lg transition-all"
            >
              <Download size={14} /> Download PDF
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-zinc-100 font-mono text-xs font-semibold rounded-lg transition-all"
            >
              <Printer size={14} /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
              aria-label="Close Resume"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 p-6 sm:p-10 overflow-y-auto bg-zinc-900 print:bg-white print:text-black print:overflow-visible"
        >
          
          {/* Printable Sheet Wrapper */}
          <div className="max-w-3xl mx-auto space-y-8 print:text-zinc-900">
            
            {/* Header / Name Block */}
            <div className="text-center space-y-3 pb-6 border-b border-zinc-800 print:border-zinc-300">
              <h1 className="font-display font-black text-4xl text-zinc-100 tracking-tight print:text-zinc-900">
                {RESUME_DATA.name}
              </h1>
              <p className="font-mono text-sm text-blue-400 uppercase tracking-wider font-semibold print:text-blue-700">
                {RESUME_DATA.title}
              </p>

              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-zinc-400 print:text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-blue-500 print:text-zinc-600" /> {RESUME_DATA.location}
                </span>
                <span className="flex items-center gap-1.5" title="Phone number provided directly upon request">
                  <Phone size={13} className="text-blue-500 print:text-zinc-600" /> {RESUME_DATA.phoneNote}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-500 print:text-zinc-600" /> {RESUME_DATA.email}
                </span>
                <a
                  href={RESUME_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 print:text-zinc-600 print:no-underline"
                >
                  <Linkedin size={13} className="text-blue-500 print:text-zinc-600" /> {RESUME_DATA.linkedinDisplay}
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Professional Summary
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed text-justify print:text-zinc-800">
                {RESUME_DATA.summary}
              </p>
            </div>

            {/* Technical Skills Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-300 print:text-zinc-800">
                <div className="space-y-1.5">
                  {RESUME_DATA.technicalSkills.left.map((row) => (
                    <div key={row.label}>
                      <strong className="text-zinc-100 print:text-zinc-900">{row.label}:</strong> {row.value}
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {RESUME_DATA.technicalSkills.right.map((row) => (
                    <div key={row.label}>
                      <strong className="text-zinc-100 print:text-zinc-900">{row.label}:</strong> {row.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Software Engineering Projects
              </h2>

              <div className="space-y-4 divide-y divide-zinc-800/50 print:divide-zinc-200">
                {RESUME_DATA.projects.map((project, idx) => (
                  <div key={project.name} className={idx === 0 ? 'space-y-2 pt-1' : 'space-y-2 pt-3'}>
                    <div className="flex justify-between items-center text-sm font-sans font-bold">
                      <span className="text-zinc-100 print:text-zinc-900">{project.name}</span>
                      <span className="text-xs font-mono text-zinc-400">{project.stack}</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Work History
              </h2>
              {RESUME_DATA.workHistory.map((job) => (
                <div key={job.title} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-zinc-100 print:text-zinc-900">{job.title}</span>
                    <span className="text-xs font-mono text-zinc-400">{job.dateRange} | {job.location}</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                  Education
                </h2>
                <div className="text-xs space-y-1 print:text-zinc-800">
                  <div className="font-bold text-zinc-200 print:text-zinc-900">{RESUME_DATA.education.degree}</div>
                  <div className="text-zinc-400 print:text-zinc-600">{RESUME_DATA.education.school}</div>
                  <div className="font-mono text-[10px] text-zinc-400">{RESUME_DATA.education.date}</div>
                </div>
              </div>

              {/* Certifications list */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                  Credentials
                </h2>
                <ul className="text-xs font-mono text-zinc-300 space-y-1 list-none print:text-zinc-800">
                  {RESUME_DATA.credentials.map((credential) => (
                    <li key={credential} className="flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                      <span>{credential}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Footer controls (Hidden in Print) */}
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/40 text-center text-[10px] font-mono text-zinc-400 print:hidden flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>SYSTEM VERIFIED CREDENTIAL METRIC ID: US-RD-777</span>
          <button 
            onClick={onClose}
            className="text-xs hover:text-zinc-400 transition-colors cursor-pointer"
          >
            [Close Document Viewer]
          </button>
        </div>
      </div>
    </div>
  );
}
