import React, { useState } from 'react';
import { Mail, Linkedin, Send, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface ContactProps {
  message: string;
  onMessageChange: (val: string) => void;
}

export default function Contact({ message, onMessageChange }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', honey: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !message) {
      setStatus('error');
      return;
    }

    // Honeypot: bots that auto-fill every field on the form will populate
    // this hidden input; humans never see or fill it. FormSubmit silently
    // discards submissions where this is non-empty.
    if (formData.honey) {
      setStatus('success');
      setFormData({ name: '', email: '', honey: '' });
      onMessageChange('');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/roman.drake.7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: message,
          _subject: `New Portfolio Lead from ${formData.name}`,
          _captcha: 'false',
          _honey: formData.honey
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', honey: '' });
        onMessageChange('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Contact Form error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950/20 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-blue-400">
            <Mail size={12} /> External Contacts
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
            Initiate Contact<span className="text-blue-500">_</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Ready to build something great together? Get in touch with me directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Methods (Left Column) */}
          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <span className="font-heading font-bold text-sm text-zinc-200 block border-b border-zinc-800 pb-3">
              Direct Channels
            </span>

            {/* Email copying widget */}
            <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800 flex items-center justify-between gap-3 text-xs font-mono text-zinc-300">
              <div className="space-y-1">
                <span className="text-zinc-400 text-[10px] uppercase block">Primary Mailbox</span>
                <span className="font-semibold text-zinc-200 truncate block">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors flex items-center justify-center border border-zinc-800"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Action buttons list */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 bg-blue-600 hover:bg-blue-500 text-center font-mono text-xs text-zinc-100 rounded-xl border border-blue-700 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Mail size={13} /> Mail Direct
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 hover:bg-zinc-800 text-center font-mono text-xs text-zinc-300 hover:text-zinc-100 rounded-xl border border-zinc-800 transition-all font-semibold flex items-center justify-center gap-2"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
            </div>

            {/* Availability details card */}
            <div className="p-4 bg-blue-950/10 rounded-xl border border-blue-900/20 text-xs font-mono space-y-2 text-zinc-400">
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <Sparkles size={13} className="animate-pulse" /> CURRENT STATUS: AVAILABLE
              </div>
              <p className="text-[11px] leading-relaxed">
                Accepting requests for freelance web deployment, fullstack software design contracts, and agency partnerships. Projects initiated within 3-5 business days.
              </p>
            </div>
          </div>

          {/* Clean contact form (Right Column) */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <span className="font-heading font-bold text-sm text-zinc-200 block border-b border-zinc-800 pb-3">
              Secure Dispatch Form
            </span>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot: hidden from real visitors via CSS, invisible to screen readers */}
              <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                <label htmlFor="contact-honey">Leave this field blank</label>
                <input
                  id="contact-honey"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honey}
                  onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-400">Your Full Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-400">Your Mailbox Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-blue-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-400">Your Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 focus:outline-none focus:border-blue-500 max-h-40"
                  placeholder="Draft project parameters, timeline, and stack requirements here..."
                />
              </div>

              {/* Status messages indicator */}
              {status === 'success' && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-400">
                  ✓ Message sent successfully! I'll reply shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-400 flex items-center gap-2">
                  <AlertCircle size={14} /> Full parameters are required. Fill out all input tabs first.
                </div>
              )}

              {/* Submit trigger button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all font-semibold rounded-xl text-xs font-mono text-zinc-100 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span>Dispatching Code...</span>
                  ) : (
                    <>
                      <Send size={13} /> Dispatch Secure Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
