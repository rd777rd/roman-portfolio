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
}
