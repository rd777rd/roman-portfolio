import React, { useState } from 'react';
import { X, Mail, Clock, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honey: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'hireme-backdrop') {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    // Honeypot: bots that auto-fill every field will populate this hidden
    // input; real visitors never see or fill it.
    if (formData.honey) {
      setStatus('success');
      setFormData({ name: '', email: '', message: '', honey: '' });
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New "Hire Me" inquiry from ${formData.name}`,
          _captcha: 'false',
          _honey: formData.honey,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', honey: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Hire Me form error:', err);
      setStatus('error');
    }
  };

  return (
    <div
      id="hireme-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-zinc-950/90 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">Let's Connect</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl text-zinc-100">Hire Me_</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Email is the best way to reach me. I typically respond in{' '}
              <span className="text-blue-400 font-semibold">less than one business day</span>.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3.5 bg-blue-500/5 border border-blue-500/10 rounded-xl text-xs font-mono text-blue-300">
            <Clock size={16} className="flex-shrink-0" />
            <span>Estimated initial response time: &lt; 1 business day</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot: hidden from real visitors via CSS, invisible to screen readers */}
            <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="hireme-honey">Leave this field blank</label>
              <input
                id="hireme-honey"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honey}
                onChange={(e) => setFormData({ ...formData, honey: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="hireme-name" className="block text-xs font-mono text-zinc-400">
                  Your Name
                </label>
                <input
                  id="hireme-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="hireme-email" className="block text-xs font-mono text-zinc-400">
                  Your Email
                </label>
                <input
                  id="hireme-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-200 focus:outline-none focus:border-blue-500"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="hireme-message" className="block text-xs font-mono text-zinc-400">
                Message
              </label>
              <textarea
                id="hireme-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono text-zinc-300 focus:outline-none focus:border-blue-500 max-h-40"
                placeholder="Tell me a bit about the role or project..."
              />
            </div>

            {status === 'success' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={14} /> Sent! I'll reply within one business day.
              </div>
            )}
            {status === 'error' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-mono text-red-400 flex items-center gap-2">
                <AlertCircle size={14} /> Please fill out all fields before sending.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-500 transition-all font-semibold rounded-xl text-xs font-mono text-zinc-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending...' : (
                  <>
                    <Send size={13} /> Send Message
                  </>
                )}
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-center transition-all font-semibold rounded-xl text-xs font-mono text-zinc-200 flex items-center justify-center gap-2"
              >
                <Mail size={13} /> Open Email Instead
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
