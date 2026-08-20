import { useEffect, useRef, useState, RefObject } from 'react';

export type RepoStatsStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface RepoStatsSummary {
  /** Total commit count on the repo's default branch. */
  commitCount: number;
  /** Language breakdown by bytes, sorted descending, top 3 only. */
  topLanguages: Array<{ name: string; pct: number }>;
  /** Repo size in KB, as reported by GitHub. */
  sizeKB: number;
  /** ISO timestamp of the most recent push to the default branch. */
  pushedAt: string;
  fetchedAt: number;
}

const CACHE_KEY_PREFIX = 'gh-repo-stats-cache-v1:';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour, matches useGithubActivity
const FETCH_TIMEOUT_MS = 6000;

function parseOwnerRepo(githubUrl: string): { owner: string; repo: string } | null {
  try {
    const url = new URL(githubUrl);
    const [, owner, repoRaw] = url.pathname.split('/');
    if (!owner || !repoRaw) return null;
    return { owner, repo: repoRaw.replace(/\.git$/, '') };
  } catch {
    return null;
  }
}

function readCache(key: string): RepoStatsSummary | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RepoStatsSummary;
    if (typeof parsed?.fetchedAt !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(key: string, summary: RepoStatsSummary) {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(summary));
  } catch {
    // Caching is a nice-to-have — ignore quota/private-mode failures.
  }
}

/** GitHub paginates commits at 1/page when `per_page=1`, so the `Link`
 *  header's `rel="last"` page number is the exact total commit count
 *  without walking every page. Falls back to counting the returned array
 *  (0 or 1) when there's no Link header, i.e. the repo has just one commit. */
function commitCountFromResponse(res: Response, body: unknown[]): number {
  const link = res.headers.get('Link');
  if (link) {
    const match = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (match) return parseInt(match[1], 10);
  }
  return Array.isArray(body) ? body.length : 0;
}

function topLanguagesFrom(languages: Record<string, number>): Array<{ name: string; pct: number }> {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  if (total === 0) return [];
  return Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, bytes]) => ({ name, pct: Math.round((bytes / total) * 100) }));
}

/**
 * Pulls real, live per-repo vitals straight from GitHub's public REST API —
 * commit count, language composition, and last-push time — the same
 * "real data, not fabricated" convention as useGithubActivity, just scoped
 * to one project's repo instead of the whole profile. Triggers lazily via
 * IntersectionObserver (mirrors useDemoWarmup) so a page with several
 * project cards doesn't fire a burst of requests before anything is even
 * visible. Fails closed: no cache and no successful fetch means the caller
 * gets 'error' and renders nothing extra.
 */
export function useRepoStats(
  githubUrl: string | undefined,
  elementRef: RefObject<Element>
): { status: RepoStatsStatus; data: RepoStatsSummary | null } {
  const parsed = githubUrl ? parseOwnerRepo(githubUrl) : null;
  const cacheKey = parsed ? `${parsed.owner}/${parsed.repo}` : null;

  const [status, setStatus] = useState<RepoStatsStatus>('idle');
  const [data, setData] = useState<RepoStatsSummary | null>(null);
  const triggered = useRef(false);

  useEffect(() => {
    if (!cacheKey || !parsed) return;

    const cached = readCache(cacheKey);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setData(cached);
      setStatus('ready');
      return;
    }
    if (cached) {
      // Stale cache is still honest data — show it immediately while a
      // fresh fetch runs in the background, same as useGithubActivity.
      setData(cached);
      setStatus('ready');
    }

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !triggered.current) {
          triggered.current = true;
          fetchStats(parsed.owner, parsed.repo, cacheKey, cached, setStatus, setData);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey]);

  return { status, data };
}

function fetchStats(
  owner: string,
  repo: string,
  cacheKey: string,
  cached: RepoStatsSummary | null,
  setStatus: (s: RepoStatsStatus) => void,
  setData: (d: RepoStatsSummary) => void
) {
  if (!cached) setStatus('loading');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  (async () => {
    try {
      const base = `https://api.github.com/repos/${owner}/${repo}`;
      const [repoRes, langRes, commitsRes] = await Promise.all([
        fetch(base, { signal: controller.signal }),
        fetch(`${base}/languages`, { signal: controller.signal }),
        fetch(`${base}/commits?per_page=1`, { signal: controller.signal })
      ]);

      if (!repoRes.ok || !langRes.ok || !commitsRes.ok) throw new Error('GitHub API request failed');

      const repoJson = await repoRes.json();
      const languages = await langRes.json();
      const commitsJson = await commitsRes.json();

      const summary: RepoStatsSummary = {
        commitCount: commitCountFromResponse(commitsRes, commitsJson),
        topLanguages: topLanguagesFrom(languages),
        sizeKB: repoJson.size ?? 0,
        pushedAt: repoJson.pushed_at ?? new Date().toISOString(),
        fetchedAt: Date.now()
      };

      writeCache(cacheKey, summary);
      setData(summary);
      setStatus('ready');
    } catch {
      // Network error, timeout, or rate-limit. If a stale cache was already
      // shown, leave it displayed — otherwise there's nothing honest to show.
      if (!cached) setStatus('error');
    } finally {
      clearTimeout(timer);
    }
  })();
}
