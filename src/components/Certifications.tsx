import React from 'react';
import { Award, CheckCircle, ExternalLink, Hourglass } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data';

export default function Certifications() {
  // Credentials that are actually issued get the full showcase grid; anything
  // still pending issuance is real and worth mentioning, but doesn't belong
  // at equal visual weight next to four verified ones — that reads as
  // unfinished rather than in-progress. It gets a small footnote instead.
  const issuedCerts = CERTIFICATIONS_DATA.filter((c) => c.link !== '#');
  const pendingCerts = CERTIFICATIONS_DATA.filter((c) => c.link === '#');

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
              Verified certifications issued by industry-leading academic institutions, focusing on full-stack architecture and interface design.
            </p>
          </div>

          <div className="self-start md:self-auto flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <CheckCircle size={13} /> All verified credentials active
          </div>
        </div>

        {/* Credentials Grid — issued certifications only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {issuedCerts.map((cert) => (
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
                  <span className="block uppercase text-zinc-400">Credential Hash</span>
                  <span className="text-zinc-400">{cert.verificationId || 'SYSTEM_INTERNAL'}</span>
                </div>

                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 font-mono text-xs border border-zinc-800 rounded-lg flex items-center justify-center gap-1.5 transition-all"
                  aria-label={`Verify my ${cert.name} credential`}
                >
                  Verify Share <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* In-progress credentials — deliberately a small footnote, not an
            equal-weight grid card, so an incomplete credential doesn't read
            as an unfinished one. */}
        {pendingCerts.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-500">
            <Hourglass size={13} className="text-zinc-600 flex-shrink-0" />
            <span>
              In progress: {pendingCerts.map((c) => c.name).join(', ')} — pending issuance.
            </span>
          </div>
        )}

      </div>
    </section>
  );
}
