import React from 'react';
import { motion } from 'motion/react';
import {
  Microscope,
  AlertTriangle,
  ShieldCheck,
  Github,
  ExternalLink,
  Users,
  CreditCard,
  Search,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

// Real code, trimmed from the actual production view — not an illustrative
// stand-in. Source: matching_app/views.py, claim_shift(), in the live
// github.com/rd777rd/shiftfloor repo linked below.
const CODE_LINES: { text: string; tone: 'comment' | 'keyword' | 'call' | 'default' }[] = [
  { text: '@role_required(User.Role.WORKER)', tone: 'call' },
  { text: 'def claim_shift(request, slug):', tone: 'keyword' },
  { text: '    with transaction.atomic():', tone: 'keyword' },
  { text: '        shift = Shift.objects.select_for_update().get(slug=slug)', tone: 'default' },
  { text: '', tone: 'default' },
  { text: '        if shift.status != Shift.Status.OPEN or shift.spots_remaining <= 0:', tone: 'default' },
  { text: '            return redirect(..., "This shift is no longer available.")', tone: 'default' },
  { text: '', tone: 'default' },
  { text: '        # server-side re-check — the UI\'s "you qualify" is a', tone: 'comment' },
  { text: '        # convenience, never the enforcement point', tone: 'comment' },
  { text: '        if not profile.is_qualified_for(shift.required_cert):', tone: 'default' },
  { text: '            return redirect(..., "Certification required.")', tone: 'default' },
  { text: '', tone: 'default' },
  { text: '        application = ShiftApplication.objects.create(', tone: 'default' },
  { text: '            shift=shift, worker=profile, status=status', tone: 'default' },
  { text: '        )', tone: 'default' },
];

const TONE_COLOR: Record<string, string> = {
  comment: '#71717a',
  keyword: '#f472b6',
  call: '#60a5fa',
  default: '#e4e4e7',
};

export default function EngineeringDeepDive() {
  return (
    <section id="deepdive" className="py-24 relative bg-zinc-950/30 border-t border-zinc-900 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-blue-500 uppercase tracking-widest">
            <span className="w-6 h-[1px] bg-blue-500" />
            Engineering Deep Dive
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
            Shift Floor: Correctness Under Concurrency<span className="text-blue-500">_</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Most portfolio projects are CRUD apps wearing a fresh coat of paint. Shift Floor — a real
            two-sided shift-staffing marketplace — was built specifically to work through the problems
            those skip: a race condition that can lose real money if it's wrong.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-2"
            >
              <div className="flex items-center gap-2 text-red-400 font-heading font-bold text-sm">
                <AlertTriangle size={16} /> The Problem
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Two workers tap "Claim" on the last open spot in the same shift within milliseconds of
                each other. Get this wrong and a facility shows up expecting two workers and gets one —
                or the app silently overbooks and nobody finds out until someone's turned away.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl space-y-2"
            >
              <div className="flex items-center gap-2 text-blue-400 font-heading font-bold text-sm">
                <ShieldCheck size={16} /> The Fix
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The claim runs inside a database transaction that locks the shift row the instant it's
                read (<code className="text-zinc-300 font-mono text-xs">select_for_update()</code>). A
                second request racing for the same spot doesn't get a stale read — it blocks until the
                first request commits, then re-checks the now-current headcount before deciding. No
                spot can ever be claimed twice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                Beyond this one fix
              </span>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li className="flex items-start gap-2.5">
                  <Users size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Multi-tenant access control (Worker / Facility Admin) enforced server-side on every view, with a test suite asserting every cross-role access attempt is actually denied.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CreditCard size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Real Stripe Checkout + Connect (facility billing, worker payouts) and Cloudinary — wired through Django's own abstractions, not hardcoded API calls.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Search size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Sitemap, robots.txt, canonical tags, and JSON-LD structured data (JobPosting, Organization, FAQPage) — production SEO, not an afterthought.</span>
                </li>
              </ul>
              <p className="text-xs font-mono text-zinc-500 pt-1">
                Entire stack runs on $0/month hosting, end to end.
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://shiftfloor.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-500 text-zinc-100 font-semibold rounded-xl text-xs font-mono transition-all flex items-center gap-2"
              >
                View Live Demo <ExternalLink size={13} />
              </a>
              <a
                href="https://github.com/rd777rd/shiftfloor"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 font-semibold rounded-xl text-xs font-mono transition-all flex items-center gap-2"
              >
                <Github size={14} /> View Source
              </a>
            </div>
            <p className="text-[11px] font-mono text-zinc-600">
              Free-tier hosting spins down when idle — first load can take up to ~30s to wake up.
            </p>
          </div>

          {/* Code + Proof (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4 min-w-0"
          >
            {/* Terminal-chrome code panel — deliberate visual echo of the Hero's
                IDE panel, tying the site's opening "look how I code" statement
                to its strongest piece of actual proof. */}
            <div className="bg-zinc-950/90 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">matching_app/views.py</span>
                </div>
                <span className="text-xs font-mono text-blue-500 flex items-center gap-1.5 bg-blue-500/5 px-2.5 py-1 rounded border border-blue-500/10">
                  <Terminal size={12} /> real production code
                </span>
              </div>
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
                {CODE_LINES.map((line, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="text-zinc-600 text-right w-5 select-none flex-shrink-0">{idx + 1}</span>
                    <span style={{ color: TONE_COLOR[line.tone] }} className="whitespace-pre">
                      {line.text || ' '}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof block — the real concurrency test, presented like a
                terminal test-runner result. This is the "show, don't tell"
                payoff: not a claim, an actual passing assertion. */}
            <div className="bg-zinc-950 border border-emerald-900/40 rounded-2xl p-5 font-mono text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Microscope size={14} /> THE PROOF — test_claim_shift.py
              </div>
              <p className="text-zinc-400 leading-relaxed">
                <span className="text-zinc-300">test_concurrent_claims_never_overfill_headcount</span> —
                fires 5 real, simultaneous threads at the same single-spot shift, then asserts the
                outcome regardless of thread interleaving:
              </p>
              <div className="bg-zinc-900/60 rounded-lg p-3 space-y-1.5 border border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>assert confirmed_applications.count() == 1</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>assert shift.headcount_filled == 1</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span>assert shift.status == Shift.Status.FILLED</span>
                </div>
              </div>
              <p className="text-emerald-400/80 text-[11px]">
                ✓ Never zero, never more than one — regardless of exact timing. Passing, in the real
                test suite, not a hand-picked demo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
