import React from 'react';
import { Award, CheckCircle, ExternalLink, FileText, BadgeCheck } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data';

const DEFAULT_COMPLETION_NOTE =
  'Coursework completed in full. The issuer has not released a verification document for this credential.';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative bg-zinc-950 border-t border-zinc-900">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-blue-500 uppercase tracking-widest">
              <span className="w-6 h-[1px] bg-blue-500" />
              Academic Credentials
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
              Professional Licensure<span className="text-blue-500">_</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl">
              Certifications completed through industry-leading academic institutions, spanning full-stack architecture, interface design, and applied AI engineering.
            </p>
          </div>

          <div className="self-start md:self-auto flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <CheckCircle size={13} /> {CERTIFICATIONS_DATA.length} professional credentials
          </div>
        </div>

        {/* Credentials Grid — every completed credential at equal visual
            weight. The verification area at the bottom of each card reflects
            whatever proof actually exists for it (an issuer verify link, a
            self-hosted certificate file, or — when an issuer locks the
            shareable verify link behind a separate paid certificate purchase
            even after coursework is fully finished, which Coursera does —
            a plain status note instead of a dead/fake button). */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATIONS_DATA.map((cert) => (
            <div
              key={cert.name}
              className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl flex flex-col justify-between hover:border-amber-800/50 hover:bg-zinc-900/50 transition-all duration-300 relative group overflow-hidden"
            >
              <div className="space-y-4">
                {/* Visual head */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                      ISSUER: {cert.issuer}
                    </span>
                    <h3 className="font-heading font-black text-lg text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {cert.name}
                    </h3>
                  </div>

                  {/* Digital Badge icon */}
                  <div className="p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Award size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>

                {/* Tags covered */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[9px] font-mono text-zinc-400 bg-zinc-950 border border-zinc-800 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ID info and verification button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-5 mt-5 border-t border-zinc-900/80">
                <div className="font-mono text-[10px] text-zinc-400 space-y-0.5">
                  <span className="block uppercase text-zinc-400">
                    {cert.link !== '#' ? 'Credential Hash' : cert.certificateFile ? 'Verification' : 'Completion'}
                  </span>
                  <span className="text-zinc-400">
                    {cert.link !== '#'
                      ? cert.verificationId || 'SYSTEM_INTERNAL'
                      : cert.certificateFile
                        ? 'Self-hosted certificate'
                        : cert.completionNote || DEFAULT_COMPLETION_NOTE}
                  </span>
                </div>

                {cert.link !== '#' ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded-lg flex items-center justify-center gap-1.5 transition-all"
                    aria-label={`Verify my ${cert.name} credential`}
                  >
                    Verify Share <ExternalLink size={12} />
                  </a>
                ) : cert.certificateFile ? (
                  // Issuer's own verify link is unavailable (e.g. locked
                  // behind a certificate-purchase paywall even though the
                  // coursework itself is complete) — proof lives on our own
                  // site instead of depending on the issuer ever unlocking it.
                  <a
                    href={cert.certificateFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded-lg flex items-center justify-center gap-1.5 transition-all"
                    aria-label={`View my ${cert.name} certificate`}
                  >
                    View Certificate <FileText size={12} />
                  </a>
                ) : (
                  // Neither an issuer verify link nor a self-hosted
                  // certificate exists for this one — but the coursework
                  // itself is 100% complete, so the chip reads as
                  // "completed" (not "pending"/"in progress"). There's no
                  // honest link to send anyone to, so no button — just a
                  // status indicator that doesn't undersell finished work.
                  <span className="px-4 py-2 bg-zinc-950 text-zinc-300 font-mono text-xs border border-zinc-800 rounded-lg flex items-center justify-center gap-1.5">
                    <BadgeCheck size={12} className="text-amber-400" /> Coursework Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
