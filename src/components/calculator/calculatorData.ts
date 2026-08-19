// Static configuration data for the HireMeCalculator (System Scope Estimator).
// Kept separate from the component so the data can be reviewed/edited without
// touching component logic, and so HireMeCalculator.tsx stays focused on behavior.

export interface ProjectType {
  id: string;
  name: string;
  baseRate: number;
  baseHours: number;
  description: string;
}

// Base rates were checked against 2026 freelance market data (goLance/Arc.dev
// full-stack rate guides): mid-level full-stack averages ~$73/hr, senior
// $95-160/hr, with niche/specialized stacks commanding a 20-40% premium.
// SPA/Fullstack/Agency sit deliberately close to that mid-level average.
// Enterprise (the most specialized, senior-leaning tier) is priced a step
// above it rather than inside the same band, reflecting that gap.
export const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'spa',
    name: 'Single Page Web App',
    baseRate: 65,
    baseHours: 40,
    description: 'Clean React & Tailwind client SPA with responsive routing & micro-animations.'
  },
  {
    id: 'fullstack',
    name: 'Django Full-Stack Application',
    baseRate: 75,
    baseHours: 80,
    description: 'Python backend with robust state systems, secure session storage, and relational DB.'
  },
  {
    id: 'agency',
    name: 'Bespoke Agency Showcase',
    baseRate: 60,
    baseHours: 35,
    description: 'Custom optimized design, fast mobile loading, lead forms, and agency brand consistency.'
  },
  {
    id: 'enterprise',
    name: 'ASP.NET Microservice Orchestration',
    baseRate: 95,
    baseHours: 120,
    description: 'C# core backend with high performance schema structures, web APIs, and robust query caching.'
  }
];

export const COMPONENT_ADD_ONS = [
  { id: 'ai', name: 'AI Model Integration (Claude/GPT)', price: 390, desc: 'Server-side LLM response workflows.' },
  { id: 'auth', name: 'Secure Authentication & RBAC', price: 250, desc: 'Login portals, cookie validation, and roles.' },
  { id: 'db', name: 'Relational Database Schema Setup', price: 350, desc: 'Custom indexed tables, migration scripts, and triggers.' },
  { id: 'ux', name: 'Google UX Prototyping & Figma', price: 290, desc: 'Interactive high-fidelity wireframes before coding.' },
];

// Combined bundle + volume discounts are capped as a share of the pre-discount
// subtotal, so a large scoped project (100+ hrs, 4+ add-ons) can't stack past
// this — previously bundle (up to 15%) and volume (up to 10%) could add up to
// 25% off, well outside typical freelance discounting norms (most cap
// combined discounts around 15%).
export const MAX_COMBINED_DISCOUNT_RATE = 0.15;
