import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Linkedin, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

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
                ROMAN DRAKE
              </h1>
              <p className="font-mono text-sm text-blue-400 uppercase tracking-wider font-semibold print:text-blue-700">
                AI-Assisted Web Application Developer • Python &amp; Django Specialist
              </p>
              
              {/* Contact Icons Row */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs font-mono text-zinc-400 print:text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-blue-500 print:text-zinc-600" /> Indianapolis, IN
                </span>
                <span className="flex items-center gap-1.5" title="Phone number provided directly upon request">
                  <Phone size={13} className="text-blue-500 print:text-zinc-600" /> Available upon request
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-500 print:text-zinc-600" /> roman.drake.7@gmail.com
                </span>
                <a 
                  href="https://www.linkedin.com/in/roman-drake-618860186" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-1.5 text-zinc-300 hover:text-blue-400 print:text-zinc-600 print:no-underline"
                >
                  <Linkedin size={13} className="text-blue-500 print:text-zinc-600" /> linkedin.com/in/roman-drake-618860186
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Professional Summary
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed text-justify print:text-zinc-800">
                Full-stack web developer who designs, builds, and ships robust web applications end to end, from UI to database. 
                Independently delivered three live production sites, including a client-facing invoicing platform, using Python/Django, 
                React, and modern JavaScript. Backed by five completed credentials spanning front-end, back-end, and UX design, including 
                Meta's Front End and Back End Developer specializations. Works efficiently across the entire stack, brings a strong eye 
                for responsive, polished interfaces, and integrates AI-assisted tooling (like Claude, prompt engineering, and LLM API orchestrations) 
                to construct codebases rapidly with modular correctness. Authorized to work in the US for any employer.
              </p>
            </div>

            {/* Technical Skills Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-300 print:text-zinc-800">
                <div className="space-y-1.5">
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">Languages:</strong> JavaScript, Python, C#, HTML5, CSS3, SQL, JSON
                  </div>
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">Frontend:</strong> React, Bootstrap, Tailwind CSS, GSAP, Responsive Web Design
                  </div>
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">Backend &amp; Frameworks:</strong> Django, ASP.NET, .NET, Node.js, REST APIs
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">Databases:</strong> MySQL, Microsoft SQL Server, SQLite, PostgreSQL
                  </div>
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">Tools &amp; Practices:</strong> Git, GitHub, Postman, Visual Studio, SDLC, Unit Testing, SEO, CMS
                  </div>
                  <div>
                    <strong className="text-zinc-100 print:text-zinc-900">AI Collaboration:</strong> Claude &amp; ChatGPT Prompt Engineering, AI Coding Assistants, LLM Integration
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-4">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Software Engineering Projects
              </h2>
              
              <div className="space-y-4 divide-y divide-zinc-800/50 print:divide-zinc-200">
                {/* Project 1 */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-zinc-100 print:text-zinc-900">Invoice Manager</span>
                    <span className="text-xs font-mono text-zinc-400">Python, Django, SQLite, Tailwind CSS</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                    <li>Built a custom billing web application for landscaping operations, enabling automated invoice generation and automated email delivery.</li>
                    <li>Designed an elegant client dashboard with Tailwind CSS and established robust server-side data persistence with Django and SQLite.</li>
                    <li>Deployed and actively maintained the application on Render, ensuring fast loading and constant uptime.</li>
                  </ul>
                </div>

                {/* Project 2 */}
                <div className="space-y-2 pt-3">
                  <div className="flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-zinc-100 print:text-zinc-900">SmallScapes</span>
                    <span className="text-xs font-mono text-zinc-400">Python, Django, SQLite, Bootstrap</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                    <li>Built a full-stack website for a small-scale landscaping business to display active portfolios and gather high-quality residential customer leads.</li>
                    <li>Programmed robust data models and view logic within Django, supporting smooth data entry and automated notification emails.</li>
                    <li>Optimized application and images for enhanced search engine ranking and page load performance.</li>
                  </ul>
                </div>

                {/* Project 3 */}
                <div className="space-y-2 pt-3">
                  <div className="flex justify-between items-center text-sm font-sans font-bold">
                    <span className="text-zinc-100 print:text-zinc-900">ROMSITES</span>
                    <span className="text-xs font-mono text-zinc-400">JavaScript, HTML5, CSS3, Bootstrap, GSAP</span>
                  </div>
                  <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                    <li>Designed and coded a full marketing platform from scratch to showcase developer capabilities and secure client freelance agreements.</li>
                    <li>Integrated customized GSAP timelines and responsive CSS interactions to establish high-fidelity, polished, and memorable visuals.</li>
                    <li>Set up analytics tracking and lead capture flows to turn visitors into active clients.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                Work History
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-sans font-bold">
                  <span className="text-zinc-100 print:text-zinc-900">Assembler IV • Allegion</span>
                  <span className="text-xs font-mono text-zinc-400">June 2021 – June 2022 | Indianapolis, IN</span>
                </div>
                <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1 leading-relaxed print:text-zinc-800">
                  <li>Performed meticulous assembly and thorough quality audits on complex physical security hardware on a main packing line.</li>
                  <li>Prepared and packaged finished devices for shipment under tight delivery deadlines, ensuring error-free accuracy.</li>
                </ul>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Education */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                  Education
                </h2>
                <div className="text-xs space-y-1 print:text-zinc-800">
                  <div className="font-bold text-zinc-200 print:text-zinc-900">High School Diploma</div>
                  <div className="text-zinc-400 print:text-zinc-600">Arsenal Technical High School, Indianapolis, IN</div>
                  <div className="font-mono text-[10px] text-zinc-400">Graduated June 2020</div>
                </div>
              </div>

              {/* Certifications list */}
              <div className="space-y-3">
                <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold border-l-2 border-blue-500 pl-3 print:text-blue-700 print:border-blue-700">
                  Credentials
                </h2>
                <ul className="text-xs font-mono text-zinc-300 space-y-1 list-none print:text-zinc-800">
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                    <span>Generative AI Software Engineering (July 2026)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                    <span>.NET Full-Stack Developer Academy (Jan 2025)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                    <span>Google UX Design Specialization (Jan 2025)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                    <span>Meta Back-End Developer Certification (Nov 2024)</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 flex-shrink-0" />
                    <span>Meta Front-End Developer Certification (June 2024)</span>
                  </li>
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
