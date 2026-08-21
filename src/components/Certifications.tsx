import React from 'react';
import { Award, CheckCircle, ExternalLink, FileText, Hourglass } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data';

const DEFAULT_UNVERIFIED_NOTE =
  "No official verification link or certificate exists yet for this one — listed here as self-reported, not institution-verified.";

export default function Certifications() {
  // A credential counts as "proven" if it has either an official issuer
  // verification link OR a self-hosted certificate file — some issuers
  // (Coursera, notably) lock the shareable /share/ verify link behind a
  // separate certificate purchase even after the coursework is fully
  // completed, so an uploaded certificate is treated as equally valid proof
  // rather than as a lesser, "pending" state. Anything with neither is
  // genuinely unverified — still shown as a real card (not omitted, and not
  // quietly blended into the verified grid), just visually and textually
  // honest about not being institution-proven yet.
  const provenCerts = CERTIFICATIONS_DATA.filter((c) => c.link !== '#' || c.certificateFile);
  const unverifiedCerts = CERTIFICATIONS_DATA.filter((c) => c.link === '#' && !c.certificateFile);

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
            <CheckCircle size={13} /> {provenCerts.length} verified credential{provenCerts.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Credentials Grid — proven certifications only */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {provenCerts.map((cert) => (
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
                    {cert.link !== '#' ? 'Credential Hash' : 'Verification'}
                  </span>
                  <span className="text-zinc-400">
                    {cert.link !== '#' ? (cert.verificationId || 'SYSTEM_INTERNAL') : 'Self-hosted certificate'}
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
                ) : (
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
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Unverified / self-reported credentials — real cards, not a
            footnote, but deliberately styled distinctly (dashed border,
            zinc instead of amber, no Award badge, no verify button) so
            nobody skimming the section could mistake one for a proven
            credential. Omitting these entirely would be less honest than
            labeling them accurately. */}
        {unverifiedCerts.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
              <Hourglass size={13} className="text-zinc-600" />
              Currently Pursuing — Unverified
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {unverifiedCerts.map((cert) => (
                <div
                  key={cert.name}
                  className="p-6 bg-zinc-900/10 border border-dashed border-zinc-700 rounded-2xl flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          ISSUER: {cert.issuer}
                        </span>
                        <h3 className="font-heading font-black text-lg text-zinc-300">
                          {cert.name}
                        </h3>
                      </div>

                      <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-700 text-zinc-500 flex items-center justify-center flex-shrink-0">
                        <Hourglass size={20} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-zinc-800/80 space-y-2">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-zinc-400 bg-zinc-800/60 border border-zinc-700 rounded">
                      Unverified — self-reported
                    </span>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {cert.unverifiedNote || DEFAULT_UNVERIFIED_NOTE}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
