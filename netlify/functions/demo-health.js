// Server-side health check for the Render free-tier project demos linked
// from the portfolio (Projects section + the Shift Floor deep-dive).
//
// Why this needs to exist at all: a browser can't tell a *slow* demo apart
// from a *broken* one on its own. The client-side warm-up ping in
// useDemoWarmup.ts uses `fetch(url, { mode: 'no-cors' })` because these are
// cross-origin third-party Render apps with no CORS headers — but `no-cors`
// mode makes every HTTP response (200, 404, 500, whatever) look identical
// to the calling page ("opaque", status 0). The promise only *rejects* on a
// true network-level failure (DNS, connection refused, timeout). That means
// a demo that's actually crashing with a 500 on every request reads as
// "warm"/Live to a visitor — a false-positive that's worse than no badge at
// all, since it actively tells a hiring manager a broken link is fine to
// click. Running the same check server-side (no CORS restrictions apply to
// server-to-server fetches) lets us read the real status code and report
// the truth.
//
// Locked to an explicit allowlist of this portfolio's own project URLs —
// this endpoint is publicly reachable once deployed, and without the
// allowlist it would be a generic "fetch any URL and hide my IP" open
// proxy. Every entry here must match a real `link` in src/data.ts or the
// literal Shift Floor URL used in EngineeringDeepDive.tsx.
const ALLOWED_HOSTS = new Set([
  'invoiceapp-9s29.onrender.com',
  'smallscapes.onrender.com',
  'romsites.onrender.com',
  'shiftfloor.onrender.com',
]);

const TIMEOUT_MS = 9000;

exports.handler = async (event) => {
  const target = event.queryStringParameters && event.queryStringParameters.url;

  let parsed;
  try {
    parsed = new URL(target);
  } catch {
    return json(400, { ok: false, error: 'invalid url' });
  }

  if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return json(403, { ok: false, error: 'host not allowed' });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(parsed.toString(), {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      // Identify the ping so it's distinguishable from real visitor traffic
      // in the target app's own logs.
      headers: { 'User-Agent': 'romanportfolio-demo-health-check/1.0' },
    });
    clearTimeout(timer);
    // Treat any response under 500 as "the app answered" — a 200-399 is
    // obviously fine, and even a 401/403/404 still proves the server is up
    // and routing requests (could just be hitting a path that needs auth).
    // 500+ means the app itself is erroring out, which is the one case the
    // old no-cors check could never see.
    return json(200, { ok: res.status < 500, status: res.status });
  } catch (err) {
    clearTimeout(timer);
    // Aborted (still spinning up / genuinely unreachable) or a real network
    // error (DNS, connection refused). Can't tell those apart from here —
    // the client keeps treating this as "cold", exactly like before.
    return json(200, { ok: false, status: 0, unreachable: true });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}
