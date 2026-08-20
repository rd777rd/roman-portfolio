import React from 'react';
import { motion } from 'motion/react';
import { Github, GitCommitHorizontal, FolderGit2, ArrowUpRight } from 'lucide-react';
import { useGithubActivity } from '../hooks/useGithubActivity';
import { PERSONAL_INFO } from '../data';
import { timeAgo } from '../lib/timeAgo';

const GITHUB_USERNAME = 'rd777rd';

export default function GithubActivity() {
  const { status, data } = useGithubActivity(GITHUB_USERNAME);

  // Fail closed: no honest data to show yet (or ever, if the API is
  // unreachable and there's no cache) means no section at all — never a
  // skeleton pretending to be real numbers, and never a hardcoded fallback.
  if (status !== 'ready' || !data) return null;

  const maxBucket = Math.max(1, ...data.weeklyBuckets);

  return (
    <section id="activity" className="py-24 relative bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 sm:p-8 bg-zinc-950/60 rounded-2xl border border-zinc-800/80 relative overflow-hidden group"
        >
          {/* Amber corner accent — matches the "verified proof" register used
              on About's stat cards and Certifications, distinct from the
              blue/indigo used for interactive build content elsewhere. */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none group-hover:from-amber-500/25 transition-all duration-300" />

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Left: heading + live stats */}
            <div className="lg:w-5/12 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-amber-400">
                <Github size={12} /> Live from GitHub
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-zinc-100 tracking-tight">
                Engineering Activity<span className="text-amber-500">_</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Pulled directly from the GitHub API on every page load — not a
                claim, a live read of {PERSONAL_INFO.name.split(' ')[0]}'s public commit history.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 text-zinc-300 font-mono text-xs bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                  <FolderGit2 size={16} className="text-amber-500 flex-shrink-0" />
                  <span>{data.publicRepos} public repos</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-300 font-mono text-xs bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                  <GitCommitHorizontal size={16} className="text-amber-500 flex-shrink-0" />
                  <span>{data.pushesLastWindow} commits / 12wk</span>
                </div>
              </div>

              {data.mostRecentPush && (
                <p className="text-xs font-mono text-zinc-500">
                  Last push: <span className="text-zinc-300">{data.mostRecentPush.repo.split('/')[1] ?? data.mostRecentPush.repo}</span>
                  {' — '}
                  {timeAgo(data.mostRecentPush.when)}
                </p>
              )}

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
              >
                View full GitHub profile <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Right: 12-week commit sparkline */}
            <div className="lg:w-7/12">
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-32 px-2">
                {data.weeklyBuckets.map((count, i) => {
                  const heightPct = Math.max(6, Math.round((count / maxBucket) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5" title={`${count} commit${count === 1 ? '' : 's'}`}>
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${heightPct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.03 }}
                        className={`w-full rounded-sm ${
                          count > 0
                            ? 'bg-gradient-to-t from-amber-600 to-orange-400'
                            : 'bg-zinc-800/60'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-2 px-2 text-[10px] font-mono text-zinc-600">
                <span>12 weeks ago</span>
                <span>This week</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
