import { useEffect, useState } from 'react';

export type GithubActivityStatus = 'loading' | 'ready' | 'error';

export interface GithubActivitySummary {
  publicRepos: number;
  followers: number;
  /** Count of distinct pushed commits seen in the public events feed
   *  (GitHub's events API only returns roughly the last 90 days / 300
   *  events, so this is "recent" activity, not lifetime). */
  pushesLastWindow: number;
  /** Push-event commit counts bucketed into whole weeks, oldest first,
   *  ending with the current (possibly partial) week. Used to render a
   *  contribution-style sparkline. */
  weeklyBuckets: number[];
  mostRecentPush: { repo: string; when: string } | null;
  fetchedAt: number;
}

const CACHE_KEY_PREFIX = 'gh-activity-cache-v1:';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const FETCH_TIMEOUT_MS = 6000;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const WEEK_BUCKETS = 12;

function readCache(username: string): GithubActivitySummary | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + username);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GithubActivitySummary;
    if (typeof parsed?.fetchedAt !== 'number') return null;
    return parsed;
  } catch {
    // Private/incognito storage, quota exceeded, or corrupt JSON — treat as
    // "no cache" rather than throwing.
    return null;
  }
}

function writeCache(username: string, summary: GithubActivitySummary) {
  try {
    localStorage.setItem(CACHE_KEY_PREFIX + username, JSON.stringify(summary));
  } catch {
    // Ignore — caching is a nice-to-have, not required for correctness.
  }
}

function bucketPushEvents(
  events: Array<{ type: string; created_at: string; repo: { name: string }; payload?: { distinct_size?: number; commits?: unknown[] } }>
): { weeklyBuckets: number[]; pushesLastWindow: number; mostRecentPush: { repo: string; when: string } | null } {
  const now = Date.now();
  const windowStart = now - WEEK_BUCKETS * WEEK_MS;
  const buckets = new Array(WEEK_BUCKETS).fill(0);
  let pushesLastWindow = 0;
  let mostRecentPush: { repo: string; when: string } | null = null;

  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue;

    if (!mostRecentPush) {
      mostRecentPush = { repo: ev.repo.name, when: ev.created_at };
    }

    const commitCount = ev.payload?.distinct_size ?? ev.payload?.commits?.length ?? 1;
    const ts = new Date(ev.created_at).getTime();
    if (Number.isNaN(ts) || ts < windowStart) continue;

    pushesLastWindow += commitCount;
    const bucketIndex = WEEK_BUCKETS - 1 - Math.floor((now - ts) / WEEK_MS);
    if (bucketIndex >= 0 && bucketIndex < WEEK_BUCKETS) {
      buckets[bucketIndex] += commitCount;
    }
  }

  return { weeklyBuckets: buckets, pushesLastWindow, mostRecentPush };
}

/**
 * Pulls real, live activity straight from GitHub's public REST API — no
 * fabricated or hand-maintained numbers. Unauthenticated requests are capped
 * at 60/hr per client IP, which is per-visitor here (each browser calls
 * GitHub directly), so normal traffic is nowhere near the limit; the
 * localStorage cache mostly exists to skip a redundant refetch on repeat
 * visits within the same hour and to have something to fall back to if a
 * given visitor's IP happens to be rate-limited.
 *
 * Fails closed: any error with no usable cache leaves status 'error' and the
 * component renders nothing, rather than showing a broken or fabricated
 * stat.
 */
export function useGithubActivity(username: string): {
  status: GithubActivityStatus;
  data: GithubActivitySummary | null;
} {
  const [status, setStatus] = useState<GithubActivityStatus>('loading');
  const [data, setData] = useState<GithubActivitySummary | null>(null);

  useEffect(() => {
    let cancelled = false;

    const cached = readCache(username);
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
      setData(cached);
      setStatus('ready');
      return;
    }
    // Show stale cache immediately (if any) while a fresh fetch runs in the
    // background, so a repeat visitor never sees a loading flash for data we
    // already have.
    if (cached) {
      setData(cached);
      setStatus('ready');
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    async function run() {
      try {
        const [profileRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
            signal: controller.signal
          })
        ]);

        if (!profileRes.ok || !eventsRes.ok) throw new Error('GitHub API request failed');

        const profile = await profileRes.json();
        const events = await eventsRes.json();
        if (!Array.isArray(events)) throw new Error('Unexpected events payload');

        const { weeklyBuckets, pushesLastWindow, mostRecentPush } = bucketPushEvents(events);

        const summary: GithubActivitySummary = {
          publicRepos: profile.public_repos ?? 0,
          followers: profile.followers ?? 0,
          pushesLastWindow,
          weeklyBuckets,
          mostRecentPush,
          fetchedAt: Date.now()
        };

        if (cancelled) return;
        writeCache(username, summary);
        setData(summary);
        setStatus('ready');
      } catch {
        // Network error, timeout, or rate-limit (403). If we already showed
        // a stale cache above, leave it displayed as-is. Otherwise there's
        // genuinely nothing honest to show.
        if (cancelled) return;
        if (!cached) setStatus('error');
      } finally {
        clearTimeout(timer);
      }
    }

    run();
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [username]);

  return { status, data };
}
