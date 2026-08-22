import { Project, Skill, Certification } from './types';

export const PERSONAL_INFO = {
  name: 'Roman Drake',
  title: 'AI-Assisted Web Application Developer',
  email: 'roman.drake.7@gmail.com',
  linkedin: 'https://www.linkedin.com/in/roman-drake-618860186',
  bio: "I'm a full-stack web developer who builds high-performance, production-ready web applications from the user interface down to the relational database. I specialize in using AI tools like Claude to streamline the web development process — pairing that with hands-on expertise in Python/Django backend systems, SQL databases, and React/Tailwind frontend structures. This gives me both traditional engineering discipline and a meaningfully faster development cycle. I'm open to full-time Individual Contributor roles and freelance/contract projects where I can build durable web systems.",
  tagline: 'I specialize in building web apps by using AI tools to streamline the web development process.',
  experience: "3+ years of production delivery"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'invoiceapp',
    title: 'Invoice App',
    description: 'Secure, full-stack invoicing portal built for a service-based business. Lets an authenticated admin itemize project costs (materials, labor, custom line items) and generate client-ready invoices.',
    longDescription: `This is a full-stack invoicing portal I built for a service-based business (a hardscaping/landscaping client), letting an admin log in, itemize a project — materials like stone or pavers, labor, custom line items — and generate a client-ready invoice. It's authentication-gated, so it's built around a single business managing its own billing, not a multi-tenant SaaS product.`,
    technologies: ['Django', 'SQLite', 'JavaScript', 'Render'],
    link: 'https://invoiceapp-9s29.onrender.com/',
    github: 'https://github.com/rd777rd/invoiceapp.git',
    category: 'Fullstack'
  },
  {
    id: 'smallscapes',
    title: 'Smallscapes',
    description: 'Marketing site for SmallScapes LLC, an Indiana-based premium hardscaping and landscape construction company. Built to showcase completed project work and drive direct call/email estimate requests.',
    longDescription: `SmallScapes is a marketing site I built for an Indiana-based hardscaping and landscape construction company. The goal was straightforward: make a small, locally owned business look and load like a premium operation, showcase real completed projects (patios, retaining walls, garden pathways), and make it dead simple for a homeowner to call or email for a free estimate.`,
    technologies: ['Django', 'SQLite', 'Render'],
    link: 'https://smallscapes.onrender.com',
    github: 'https://github.com/rd777rd/smallscapes.git',
    category: 'Fullstack'
  },
  {
    id: 'ai-orchestrator',
    title: 'Django AI Orchestrator',
    description: `A visual design studio for building, testing, and exporting production-ready LLM prompt integrations for Django applications.`,
    longDescription: `This one came out of the gap between "I can call an LLM API in 10 lines of Python" and "I actually know how to wire that into a real Django app correctly." It is a showcase/design tool for building AI prompts visually — using Jinja2-style {{ variable }} syntax — testing them live in a sandbox against Gemini, and then exporting clean, production-ready Python/Django code for four real integration patterns: a synchronous Django view, a post-save model signal, a Celery background task, and a RAG-style query router. It is meant to be the reference I wish I'd had when I first started integrating LLM calls into a Django backend — not just "here's an API call" but here's where that call actually belongs in a Django request/response cycle, and what can go wrong.`,
    technologies: ['Python', 'Django', 'PostgreSQL','Google Gemini', 'Anthropic Claude API', 'TailwindCSS', 'Jinja2','Netlify'],
    link: 'https://llm-prompt-orchestrator.netlify.app/',
    github: 'https://github.com/rd777rd/llm-prompt-orchestrator.git',
    category: 'Fullstack',
    inDevelopment: false
  },
  {
    id: 'sql-analyzer',
    title: 'SQL Query Plan Analyzer',
    description: 'Interactive tool that turns raw SQL DDL or Django models into a visual ERD, then lets you test queries against that schema and get AI-assisted feedback on performance (sequential scans, missing indexes, etc).',
    longDescription: 'I built SchemaIQ to solve a problem I kept running into myself: understanding a database schema fast, without tracing through a wall of CREATE TABLE statements by hand. You either paste raw SQL DDL or a Django models.py file, pick a pre-built blueprint (E-Commerce, SaaS Subscription, Social Network) or write your own from scratch, and the tool renders an ERD so you can actually see how the tables relate. From there you can jump into the Explain Plan Visualizer, run a query against the schema, and get a plain-English breakdown of whether it is doing a full table scan and what index would fix it. The goal was to make the kind of query-plan intuition a DBA builds over years accessible to someone earlier in their career — including me.',
    technologies: ['React', 'Django', 'Google Gemini', 'Netlify'],
    link: 'https://schema-analyzer-tool.netlify.app/',
    github: 'https://github.com/rd777rd/sq-plan-analyzer.git',
    category: 'Fullstack',
    inDevelopment: false
  },
  {
    id: 'romsites',
    title: 'ROMSITES Platform',
    description: 'Studio site for ROMSITES LLC — full-stack web design, development, SEO, and maintenance services. Doubles as a live portfolio, linking directly to real, working client deployments rather than static screenshots.',
    longDescription: `ROMSITES is my own studio site, built to represent ROMSITES LLC — the entity I operate for freelance and contract web development work. It's positioned as a full-stack web design, development, SEO, and maintenance shop, and it doubles as a live showcase of the kind of work I actually deliver: the portfolio section links directly to two real client-style builds (SmallScapes and the Invoice Manager) with performance numbers and testimonials attached, rather than static mockups.`,
    technologies: ['React','Django','Render'],
    link: 'https://romsites.onrender.com',
    // No github field — this repo is private. See ProjectCard.tsx: a
    // missing github link renders a lock icon instead of a dead 404 link.
    category: 'Agency'
  },
  {
    id: 'lucid',
    title: 'Lucid Study Lab',
    description: 'Paste an article, chapter, or your own notes. Lucid returns a tight summary, the key concepts, and a ~12-card flashcard deck in about ten seconds.',
    longDescription: `Lucid turns whatever you are trying to learn — an article, a textbook chapter, lecture notes — into a study deck in about ten seconds. Paste up to ~20k characters of source text, and it pulls out a summary, the key concepts you actually need to know, and roughly a dozen flashcards built around "why" and "how" questions instead of straight recall. There is a no-login live demo that keeps everything local to your browser, and a full account version where decks get saved permanently to your library. I built this with Lovable, using it as a chance to work hands-on with an AI app builder and Google's Gemini model via the Lovable AI Gateway, rather than wiring up my own model API from scratch.`,
    technologies: ['Lovable', 'Google Gemini'],
    link: 'https://study-lab-assistant.lovable.app/',
    category: 'Fullstack'
  },
  {
    id: 'shiftfloor',
    title: 'Shift Floor',
    description: 'Post a shift or browse ones nearby — ShiftFloor matches certified warehouse and distribution workers to open shifts by certification, distance, and pay, with claims processed in real time.',
    longDescription: `Shift Floor is a two-sided marketplace connecting Indianapolis-area warehouse and distribution facilities with certified workers for short-notice shift coverage. Facilities post a shift with pay, headcount, and required certification; workers browse and claim shifts ranked by their certs, distance, and pay, then get paid out through Stripe Connect once the shift closes. Under the hood, shift claiming uses row-level locking inside atomic transactions so a shift can never be overfilled by two workers claiming it at once — verified with a real multi-threaded concurrency test, not just a unit test that assumes serial execution. I built the whole stack by hand in Django rather than reaching for a low-code builder, specifically to work through problems most portfolio projects skip: concurrency correctness, server-side multi-tenant access control, and real Stripe/Cloudinary integrations, all running on free-tier hosting end to end.`,
    technologies: ['Django', 'PostgreSQL', 'Stripe', 'Render'],
    link: 'https://shiftfloor.onrender.com',
    github: 'https://github.com/rd777rd/shiftfloor.git',
    category: 'Fullstack'
  },
  
];

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'JavaScript', category: 'Frontend', level: 95 },
  { name: 'HTML5', category: 'Frontend', level: 99 },
  { name: 'CSS3 / Tailwind', category: 'Frontend', level: 95 },
  { name: 'Bootstrap', category: 'Frontend', level: 95 },
  // Backend
  { name: 'Python', category: 'Backend', level: 99 },
  { name: 'Django', category: 'Backend', level: 99 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'C#', category: 'Backend', level: 85 },
  { name: 'ASP.NET Core', category: 'Backend', level: 85 },
  // Database
  { name: 'SQL', category: 'Database', level: 95 },
  { name: 'MySQL', category: 'Database', level: 95 },
  { name: 'PostgreSQL', category: 'Database', level: 92 },
  { name: 'SQLite', category: 'Database', level: 95 },
  // Tools / AI
  { name: 'Claude & Prompt Engineering', category: 'Tools', level: 98 },
  { name: 'Gemini Ai', category: 'Tools', level: 98 },
  { name: 'AI Code Collaboration', category: 'Tools', level: 95 },
  { name: 'Postman / API Testing', category: 'Tools', level: 92 },
  { name: 'Git / GitHub', category: 'Tools', level: 95 }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    name: 'Meta Front-End Developer Specialization',
    issuer: 'Meta / Coursera',
    link: 'https://coursera.org/share/c267349b654f94eb8206cfb3ac6d82c4',
    verificationId: 'c267349b654f94eb8206cfb3ac6d82c4',
    tags: ['React', 'UX/UI', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    name: 'Meta Back-End Developer Specialization',
    issuer: 'Meta / Coursera',
    link: 'https://coursera.org/share/c03f5ff4a544c73f8bd4e4adef529600',
    verificationId: 'c03f5ff4a544c73f8bd4e4adef529600',
    tags: ['Python', 'Django', 'SQL', 'Databases', 'APIs']
  },
  {
    name: '.NET Fullstack Developer',
    issuer: 'Coursera',
    link: 'https://coursera.org/share/916082914fadc2c0eecd876cf1d1d380',
    verificationId: '916082914fadc2c0eecd876cf1d1d380',
    tags: ['C#', '.NET MVC', 'ASP.NET Web API', 'PostgreSQL']
  },
  {
    name: 'Google UX Design Specialization',
    issuer: 'Google / Coursera',
    link: 'https://coursera.org/share/57116c1ec88e2733dcf61820c6103d0c',
    verificationId: '57116c1ec88e2733dcf61820c6103d0c',
    tags: ['UX Core', 'Figma', 'Wireframing', 'User Research']
  },
  {
    name: 'Generative AI Software Engineering Specialization',
    issuer: 'Coursera',
    link: '#',
    verificationId: 'PENDING_ISSUANCE',
    tags: ['Generative AI', 'LLMs', 'Prompt Engineering', 'AI Orchestration', 'NodeJS/Python'],
    // Specialization is 100% complete — every course, quiz, and graded
    // assignment finished. Coursera does not disclose, anywhere during
    // enrollment or coursework, that the shareable /share/ verification
    // link requires a *separate* certificate purchase after finishing —
    // same paywall pattern as the .NET credential above, just without a
    // self-hosted certificateFile (that one was purchased; this one is a
    // deliberate choice not to pay twice for coursework already paid for
    // and completed). Shown at equal weight to the other cards
    // (Certifications.tsx) — completed is completed, whether or not the
    // issuer chooses to release a PDF for it.
    completionNote: 'Specialization coursework 100% completed on Coursera. The issuer requires a separate paid purchase to release the certificate PDF, undisclosed at enrollment — skills demonstrated through this portfolio\'s live projects instead.'
  }
];
