import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sparkles, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenHireMe: () => void;
}

export default function Navbar({ onOpenResume, onOpenHireMe }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Deep Dive', href: '#deepdive' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group text-zinc-100 hover:text-blue-400 transition-colors"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg text-zinc-950 font-bold flex items-center justify-center">
              <Terminal size={18} className="text-zinc-100" />
            </div>
            <span className="font-display font-black tracking-wide text-lg sm:text-xl">
              ROMAN<span className="text-blue-500">_DRAKE</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 relative py-1 transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Call to action buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenResume}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded-full transition-all cursor-pointer"
            >
              [View Resume]
            </button>
            <a
              href="/resume.pdf"
              download="Roman-Drake-Resume.pdf"
              aria-label="Download Resume PDF"
              title="Download Resume PDF"
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 rounded-full transition-all"
            >
              <Download size={16} />
            </a>
            <button
              onClick={onOpenHireMe}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-zinc-100 rounded-full group bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-800 cursor-pointer"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-zinc-950 rounded-full group-hover:bg-opacity-0">
                Hire Me
              </span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-zinc-100 p-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 border-b border-zinc-800 transition-all duration-300 backdrop-blur-lg ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-lg text-base font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenResume();
            }}
            className="w-full text-left block px-3 py-3 rounded-lg text-base font-medium text-blue-400 hover:text-blue-300 hover:bg-zinc-900/50 transition-all duration-200 font-mono"
          >
            [*] View Resume PDF
          </button>
          <a
            href="/resume.pdf"
            download="Roman-Drake-Resume.pdf"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-3 rounded-lg text-base font-medium text-emerald-400 hover:text-emerald-300 hover:bg-zinc-900/50 transition-all duration-200 font-mono"
          >
            <Download size={16} /> Download Resume PDF
          </a>
          <div className="px-3 pt-3">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenHireMe();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-zinc-100 font-semibold text-center text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer"
            >
              <Sparkles size={16} /> Hire Me
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
