// Single source of truth for Roman Drake's resume content.
//
// Both the on-page interactive/print resume (ResumeModal.tsx, rendered as
// real DOM/React) and the downloadable static PDF (scripts/generate-resume-pdf.ts,
// rendered server-side at build time with @react-pdf/renderer) import this
// same data. That's deliberate: a hiring manager who previews the resume
// on-page and then downloads the PDF should never see the two disagree, and
// a future content edit should only need to happen in one place.

export interface ResumeProject {
  name: string;
  stack: string;
  bullets: string[];
}

export interface ResumeJob {
  title: string;
  dateRange: string;
  location: string;
  bullets: string[];
}

export const RESUME_DATA = {
  name: 'ROMAN DRAKE',
  title: 'AI-Assisted Web Application Developer • Python & Django Specialist',
  location: 'Indianapolis, IN',
  phoneNote: 'Available upon request',
  email: 'roman.drake.7@gmail.com',
  linkedinDisplay: 'linkedin.com/in/roman-drake-618860186',
  linkedinUrl: 'https://www.linkedin.com/in/roman-drake-618860186',

  summary:
    "Full-stack web developer who designs, builds, and ships robust web applications end to end, from UI to database. " +
    "Independently delivered three live production sites, including a client-facing invoicing platform, using Python/Django, " +
    "React, and modern JavaScript. Backed by five completed credentials spanning front-end, back-end, and UX design, including " +
    "Meta's Front End and Back End Developer specializations. Works efficiently across the entire stack, brings a strong eye " +
    "for responsive, polished interfaces, and integrates AI-assisted tooling (like Claude, prompt engineering, and LLM API orchestrations) " +
    "to construct codebases rapidly with modular correctness. Authorized to work in the US for any employer.",

  technicalSkills: {
    left: [
      { label: 'Languages', value: 'JavaScript, Python, C#, HTML5, CSS3, SQL, JSON' },
      { label: 'Frontend', value: 'React, Bootstrap, Tailwind CSS, GSAP, Responsive Web Design' },
      { label: 'Backend & Frameworks', value: 'Django, ASP.NET, .NET, Node.js, REST APIs' },
    ],
    right: [
      { label: 'Databases', value: 'MySQL, Microsoft SQL Server, SQLite, PostgreSQL' },
      { label: 'Tools & Practices', value: 'Git, GitHub, Postman, Visual Studio, SDLC, Unit Testing, SEO, CMS' },
      { label: 'AI Collaboration', value: 'Claude & ChatGPT Prompt Engineering, AI Coding Assistants, LLM Integration' },
    ],
  },

  projects: [
    {
      name: 'Invoice Manager',
      stack: 'Python, Django, SQLite, Tailwind CSS',
      bullets: [
        'Built a custom billing web application for landscaping operations, enabling automated invoice generation and automated email delivery.',
        'Designed an elegant client dashboard with Tailwind CSS and established robust server-side data persistence with Django and SQLite.',
        'Deployed and actively maintained the application on Render, ensuring fast loading and constant uptime.',
      ],
    },
    {
      name: 'SmallScapes',
      stack: 'Python, Django, SQLite, Bootstrap',
      bullets: [
        'Built a full-stack website for a small-scale landscaping business to display active portfolios and gather high-quality residential customer leads.',
        'Programmed robust data models and view logic within Django, supporting smooth data entry and automated notification emails.',
        'Optimized application and images for enhanced search engine ranking and page load performance.',
      ],
    },
    {
      name: 'ROMSITES',
      stack: 'JavaScript, HTML5, CSS3, Bootstrap, GSAP',
      bullets: [
        'Designed and coded a full marketing platform from scratch to showcase developer capabilities and secure client freelance agreements.',
        'Integrated customized GSAP timelines and responsive CSS interactions to establish high-fidelity, polished, and memorable visuals.',
        'Set up analytics tracking and lead capture flows to turn visitors into active clients.',
      ],
    },
  ] as ResumeProject[],

  workHistory: [
    {
      title: 'Assembler IV • Allegion',
      dateRange: 'June 2021 – June 2022',
      location: 'Indianapolis, IN',
      bullets: [
        'Performed meticulous assembly and thorough quality audits on complex physical security hardware on a main packing line.',
        'Prepared and packaged finished devices for shipment under tight delivery deadlines, ensuring error-free accuracy.',
      ],
    },
  ] as ResumeJob[],

  education: {
    degree: 'High School Diploma',
    school: 'Arsenal Technical High School, Indianapolis, IN',
    date: 'Graduated June 2020',
  },

  credentials: [
    'Generative AI Software Engineering (July 2026)',
    '.NET Fullstack Developer (Jan 2025)',
    'Google UX Design Specialization (Jan 2025)',
    'Meta Back-End Developer Certification (Nov 2024)',
    'Meta Front-End Developer Certification (June 2024)',
  ],
};
