export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  link: string;
  github?: string;
  category: 'Fullstack' | 'Frontend' | 'Agency';
  /** When true, the project is not yet live — UI shows an "In Development" badge instead of a dead Launch link. */
  inDevelopment?: boolean;
  /** Optional scannable Problem → Approach → Result breakdown, shown inside
   *  the card's "Deep Inspect" expansion alongside `longDescription`. Exists
   *  so a hiring manager skimming a project in ~10 seconds gets a concrete
   *  read on what the real engineering problem was and how it was actually
   *  solved, not just prose describing what the app does. Keep every claim
   *  factual and specific to what's true of the real build — no invented
   *  metrics (% faster, $ saved, user counts) that can't be backed up.
   *  Shift Floor intentionally omits this — it already gets its own full
   *  EngineeringDeepDive section further down the page. */
  caseStudy?: {
    problem: string;
    approach: string;
    result: string;
  };
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  level: number; // 0 to 100
}

export interface Certification {
  name: string;
  issuer: string;
  /** Official issuer verification URL (e.g. a Coursera /share/ link). Use '#'
   *  when there isn't one — pair with `certificateFile` below rather than
   *  leaving a credential totally unproven. */
  link: string;
  verificationId?: string;
  tags: string[];
  /** Path (under /public) to a self-hosted certificate image/PDF, for
   *  credentials where the issuer's own verification page sits behind a
   *  paywall (e.g. Coursera won't issue a shareable /share/ verify link
   *  without a separate certificate purchase, even after the coursework
   *  itself is fully completed). This keeps proof on the site under our
   *  own control instead of depending on the issuer ever unlocking it. */
  certificateFile?: string;
  /** Short, honest explanation shown on a credential's card when it has
   *  neither `link` nor `certificateFile` set — i.e. coursework is fully
   *  completed but the issuer hasn't released a verifiable document (e.g.
   *  a paywalled certificate purchase not disclosed at enrollment).
   *  Displayed instead of a verify button. Keep it factual: the *skill*
   *  and *completion* are real and should read that way — never worded to
   *  imply the credential itself is unfinished, pending, or in-progress
   *  when the coursework is actually done. */
  completionNote?: string;
}
