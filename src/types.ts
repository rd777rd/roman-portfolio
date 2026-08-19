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
  link: string;
  verificationId?: string;
  tags: string[];
}
