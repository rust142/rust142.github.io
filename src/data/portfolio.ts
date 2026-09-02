import {
  JourneyMilestone,
  OpenSourceRepo,
  PhotoFrame,
  Project,
  StackCategory,
  SystemProfilerSection,
} from '@/types'

/**
 * SEMUA data di file ini bersumber dari:
 * - seed `supabase/schema.sql` project portfolio lama (README + menu bot)
 * - GitHub @rust142 (terverifikasi 2026-09-02)
 * - PRD: .drafts/RESEP/SOFTWARE_ENGINEER/BRIEF/PORTFOLIO/AGUNG_MAULANA/PRD.md
 * Aturan: TIDAK ada angka/metrik/klaim yang diarang. Yang tidak ada di sumber
 * ditulis eksplisit sebagai catatan "Data Not Available".
 */

export const PERSONAL_INFO = {
  name: 'Agung Maulana',
  handle: 'agung_maulana',
  sshHost: 'agung@jepara ~',
  title: 'Software Engineer',
  experience: '6+ yrs',
  focus: 'mobile/web → backend · Go · TypeScript · Jepara, ID',
  location: 'Jepara, Central Java, Indonesia',
  timezone: 'WIB (UTC+7)',
  status: 'Available for project collaboration',
  emailPlaceholder: 'Reach via GitHub / LinkedIn (public email not in source data)',
  githubUser: 'rust142',
  githubUrl: 'https://github.com/rust142',
  linkedinUrl: 'https://linkedin.com/in/agung-maulana-1b63a1237',
  xUrl: 'https://twitter.com/__rustdev',
  // contributions/publicRepos/followers diambil LIVE dari API GitHub (useGitHubStats).
  // Angka ini hanya fallback snapshot terverifikasi 2026-09-02 — jangan diutak-atik tanpa sumber.
  githubStats: {
    contributions: '809',
    badges: ['Pull Shark ×2', 'Arctic Code Vault Contributor'],
    repos: '10',
    followers: '28',
  },
  initials: 'AM',
}

export const ABOUT_TEXT = {
  mission:
    'I build future-proof backend architectures that scale. My mission is to create systems that are not just functional, but robust and impactful in the long term.',
  approach:
    'With over 6 years of experience in mobile and web development, I have a proven track record of delivering user-focused solutions for enterprise and operational systems that bring measurable business impact. Throughout my career, I have focused on improving system performance and enhancing development workflows — now leveraging that experience into backend engineering.',
  coreFocus:
    'Currently specializing in Golang and TypeScript, with a deep interest in system performance, efficient development workflows, and scalable design.',
  monogram: 'AM',
}

export const STACK_CATEGORIES: StackCategory[] = [
  {
    title: '1. Languages & Runtimes',
    level: 'PRODUCTION READY',
    items: [
      { name: 'Golang', description: 'Backend services, CLI tools, and daemons', tag: 'PRIMARY' },
      { name: 'TypeScript', description: 'Type-safe tooling and web apps' },
      {
        name: 'JavaScript / Node.js / Bun',
        description: 'Runtimes for developer tools and web pipelines',
      },
      { name: 'Python', description: 'Scripting and data glue' },
    ],
  },
  {
    title: '2. Frontend & Mobile',
    level: 'PRODUCTION READY',
    items: [
      { name: 'Next.js', description: 'Product web apps' },
      { name: 'React', description: 'Dashboards and admin surfaces' },
      { name: 'SvelteKit', description: 'Fast interactive products' },
      { name: 'Tailwind', description: 'Utility-first styling across web projects' },
      {
        name: 'Flutter',
        description: 'Mobile engineering background: production & fintech apps',
        tag: 'MOBILE',
      },
    ],
  },
  {
    title: '3. Databases & Tools',
    level: 'PRODUCTION READY',
    items: [
      { name: 'MySQL', description: 'Primary relational store in production systems' },
      { name: 'Redis', description: 'Caching and async work coordination' },
      { name: 'Git', description: 'Internals-aware: branching/commit workflow tooling' },
    ],
  },
  {
    title: '4. Infra & DevOps',
    level: 'PRODUCTION READY',
    items: [
      {
        name: 'Docker',
        description: 'Containerized builds & consistent dev/prod environments',
        tag: 'INFRA',
      },
      { name: 'Kubernetes', description: 'Deployment, service discovery, autoscaling' },
      { name: 'CI/CD — GitHub Actions', description: 'Automated build/test/release pipelines' },
      {
        name: 'Trello',
        description: 'Board-driven planning & partner handoff (geeto integration)',
      },
    ],
  },
  {
    title: '5. AI Agents & Pairing',
    level: 'DAILY DRIVERS',
    items: [
      {
        name: 'OpenAI Codex',
        description: 'Autonomous coding agent for repo-scale tasks',
        tag: 'AGENT',
      },
      { name: 'OpenCode Go', description: 'Open-source terminal coding agent, multi-provider' },
      {
        name: 'Claude Code',
        description: 'Agentic pair programming & architecture debates',
        tag: 'AGENT',
      },
      { name: 'GitHub Copilot', description: 'In-editor predictive coding with context awareness' },
    ],
  },
]

export const JOURNEY_LOGS: JourneyMilestone[] = [
  {
    hash: 'a1b0001',
    date: 'Nov 2025 – PRESENT',
    tag: 'HEAD',
    role: 'Software Engineer',
    company: 'Asta Bridger',
    location: 'Indonesia',
    description: 'Leading development of BookWae, a reservation platform for SMEs.',
    highlights: [
      'Leading development of BookWae, a reservation platform for SMEs',
      'Architected system flows for scalable SME service management',
      'Improved deployment efficiency by standardizing branching and commit workflows',
    ],
  },
  {
    hash: 'a2b0002',
    date: 'Oct 2023 – PRESENT',
    tag: 'active',
    role: 'Software Engineer',
    company: 'RS PKU Muhammadiyah Mayong',
    location: 'Mayong, Jepara',
    description: 'Digitized hospital administration and quality monitoring.',
    highlights: [
      'Maintained the SIMRS (Hospital Management System) application — issue triage, patches, and operational continuity',
      'Developed SIM Mutu for quality monitoring and data-driven reporting',
      'Built E-Office to digitize administrative processes and document tracking',
      'Integrated electronic signatures (TTE Sertisign) for medical record authentication',
    ],
  },
  {
    hash: 'a3b0003',
    date: 'Oct 2023 – Feb 2024',
    tag: 'v3',
    role: 'Software Engineer',
    company: 'Theme62',
    location: 'Indonesia',
    description: 'Commercial Blogger theme engineering.',
    highlights: [
      'Migrated the Theme62 landing-page stack to a new stack',
      'Integrated payment gateways: Xendit and PayPal',
      'Built a new blog design for the firm',
      'Generated professional Blogger templates emphasizing SEO and performance',
    ],
  },
  {
    hash: 'a4b0004',
    date: 'Mar 2023 – Aug 2023',
    tag: 'v2',
    role: 'Mobile Engineer',
    company: 'Platka Software Digital',
    location: 'Indonesia',
    description: 'Industrial production monitoring on mobile.',
    highlights: [
      'Developed WPN Production to monitor and record charcoal production workflows',
      'Tracked inventory of raw materials and outputs within a centralized platform',
      'Digitized operational activities to enhance production traceability',
    ],
  },
  {
    hash: 'a5b0005',
    date: 'Mar 2021 – Aug 2022',
    tag: 'v1',
    role: 'Mobile Developer',
    company: 'PT. Fintek Digital Nusantara',
    location: 'Indonesia',
    description: 'Fintech mobile engineering (PPOB).',
    highlights: [
      'Built the Payuni Mobile front-end theme',
      'Developed partner-requested features iteratively',
      'Built the Payuni Mobile web version — a responsive dashboard',
    ],
  },
]

export const INTERNAL_PROJECTS: Project[] = [
  {
    id: 'geeto',
    name: 'geeto',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'staff',
    size: '—',
    date: 'Jan 2026',
    tagline: 'AI Git workflow automation — branch names, commit messages, releases, PRs',
    synopsis: 'geeto [branch|commit|release|pr]',
    description:
      'Geeto CLI is a developer productivity tool designed to standardize branching and commit workflows through an interactive command-line interface. The tool analyzes code differences to generate structured branch names and commit messages, guiding developers from branch creation to merging into the development environment.',
    architecture: [
      'Interactive CLI: analyzes working-tree diff before generating names',
      'Structured branch naming + Conventional Commit message generation',
      'Workflow coverage: branch → commit → release → PR',
      'Trello integration for board handoff',
    ],
    stack: ['Bun', 'TypeScript', 'AI', 'Git CLI'],
    period: 'Jan 2026 – Present',
    role: 'Creator',
    status: 'ACTIVE',
    repoUrl: 'https://github.com/IDNCraft/geeto',
    notes:
      'Open source. Benchmarks/throughput claims: Data Not Available in source — do not invent.',
  },
  {
    id: 'agent-sync',
    name: 'agent-sync',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'idncraft',
    size: '—',
    date: 'Aug 2026',
    tagline: 'Local-first workspace to control your AI agent ecosystem',
    synopsis: 'agent-sync [detect|edit|export|import|backup]',
    description:
      'Agent Sync brings provider instructions, skills, prompts, commands, hooks, plugins, MCP servers, memories, and chat sessions into one provider-aware interface. It detects GitHub Copilot, Claude, Codex, OpenCode, and Antigravity, and makes agent setups portable across computers via export/import — no cloud sync required.',
    architecture: [
      'Provider-aware resource management: instructions, skills, prompts, commands, hooks, plugins',
      'MCP server inspection with provider-specific config paths',
      'Cross-computer portability: export/import + copy-ready Markdown for AI',
      'Local backups with restore + scope/trust controls (user, built-in, third-party)',
      'Installable PWA with offline-ready shell',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Bun'],
    period: '2026 – Present',
    role: 'Creator',
    status: 'ACTIVE',
    notes:
      'Local workspace ~/Workspace/contribute/agent-sync; repo IDNCraft/agent-sync belum public.',
  },
  {
    id: 'qmon',
    name: 'qmon',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'idncraft',
    size: '—',
    date: 'Sep 2026',
    tagline: 'Monitor AI provider quotas — terminal, mobile, and daemon',
    synopsis: 'qmon [dashboard|daemon|mobile]',
    description:
      'Monitor AI provider quotas across a terminal dashboard, mobile app, and background API daemon.',
    architecture: [
      'Terminal dashboard (cli) for live quota inspection',
      'Background API daemon in Go collecting provider usage',
      'Mobile companion app (Flutter)',
      'Multi-provider support with quota state tracking',
    ],
    stack: ['Go', 'Flutter', 'TypeScript'],
    period: '2026 – Present',
    role: 'Creator',
    status: 'ACTIVE',
    repoUrl: 'https://github.com/IDNCraft/qmon',
    notes: 'Active development.',
  },
  {
    id: 'sahamlens',
    name: 'sahamlens',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'idncraft',
    size: '—',
    date: 'Aug 2026',
    tagline: 'Ubah snapshot saham Stockbit menjadi data siap dibaca',
    synopsis: 'sahamlens --paste <snapshot.txt>',
    description:
      'Tool open-source untuk parsing snapshot saham Stockbit menjadi analisis fundamental terstruktur dan perbandingan historis. Pemrosesan berlangsung langsung di browser — tanpa koneksi akun Stockbit, riwayat analisis disimpan lokal.',
    architecture: [
      'Snapshot parser: identitas emiten, harga, metrik, bagian, tabel dari teks mentah',
      'Rule-based scoring disajikan dalam kartu metrik & tabel yang mudah dipindai',
      'Historical comparison antar waktu',
      'Client-side processing + local history storage',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Bun'],
    period: '2026 – Present',
    role: 'Creator',
    status: 'ACTIVE',
    repoUrl: 'https://github.com/IDNCraft/SahamLens',
    notes: undefined,
  },
  {
    id: 'bookwae',
    name: 'bookwae',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'asta',
    size: '—',
    date: 'Nov 2025',
    tagline: 'Booking & online queue management for SMEs',
    synopsis: 'bookwae — "just book it"',
    description:
      "BookWae is a booking and online queue management application for SMEs. The name combines 'Book' with the Javanese 'Wae' (just), meaning 'just book it.' The platform simplifies reservation processes, schedule organization, and service coordination for businesses like barbershops and clinics.",
    architecture: [
      'Reservation & queue flow for service SMEs',
      'Schedule organization and service coordination',
      'System flows architected for scalable SME service management',
    ],
    stack: ['Next.js', 'TypeScript', 'ShadCN UI'],
    period: 'Nov 2025 – Present',
    role: 'Lead Developer (Asta Bridger)',
    status: 'PRODUCTION',
    notes: 'Internal company project — repository not public. Usage metrics: Data Not Available.',
  },
  {
    id: 'sim-mutu',
    name: 'sim-mutu',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'rspkum',
    size: '—',
    date: 'May 2025',
    tagline: 'Quality-indicator monitoring for hospital accreditation',
    synopsis: 'sim-mutu — indicator input → dashboard → report',
    description:
      'SIM Mutu is an information system for structured management and monitoring of quality indicators at RS PKU Muhammadiyah Mayong. It allows users to input indicator data, visualize performance through dashboards, and generate analytical reports for quality improvement.',
    architecture: [
      'Indicator data entry workflow per hospital unit',
      'Performance dashboards for quality monitoring',
      'Analytical report generation for quality improvement',
    ],
    stack: ['AdonisJs', 'React.js', 'ShadCN UI'],
    period: 'May 2025 – Present',
    role: 'Software Engineer (RS PKU Muhammadiyah Mayong)',
    status: 'PRODUCTION',
    notes:
      'Internal hospital system — not public. Record counts/uptime claims: Data Not Available.',
  },
  {
    id: 'e-office',
    name: 'e-office',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'rspkum',
    size: '—',
    date: 'Feb 2024',
    tagline: 'Digital office & correspondence management',
    synopsis: 'e-office — surat masuk/keluar → arsip digital',
    description:
      'A digital office management system for RS PKU Muhammadiyah Mayong. It streamlines administrative processes like document tracking, organizational records, incoming/outgoing correspondence, and meeting minutes through a centralized digital hub.',
    architecture: [
      'Document & correspondence tracking (incoming/outgoing)',
      'Organizational records module',
      'Meeting-minutes workflow in one central hub',
    ],
    stack: ['SvelteKit', 'TypeScript', 'Flowbite UI'],
    period: 'Feb 2024 – Present',
    role: 'Software Engineer (RS PKU Muhammadiyah Mayong)',
    status: 'PRODUCTION',
    notes:
      'Internal hospital system — not public. Also includes ongoing maintenance of the SIMRS (Hospital Management System) application.',
  },
  {
    id: 'tte-sertisign',
    name: 'tte-sertisign',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'rspkum',
    size: '—',
    date: 'Jun 2025',
    tagline: 'Certified electronic signature for medical records',
    synopsis: 'tte --integrate rekam-medis --provider sertisign',
    description:
      'TTE Sertisign integrates electronic signature functionality into medical record systems using certified digital signing services. It automates authentication and document validation, supporting paperless claim submission workflows in healthcare.',
    architecture: [
      'Certified digital-signing provider integration (Sertisign)',
      'Automated authentication & document validation',
      'Supports paperless claim-submission workflow',
    ],
    stack: ['AdonisJs', 'API Integration'],
    period: 'Jun 2025 – Aug 2025',
    role: 'Software Engineer (RS PKU Muhammadiyah Mayong)',
    status: 'ARCHIVED',
    notes: 'Internal integration project — not public.',
  },
  {
    id: 'theme62',
    name: 'theme62',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'theme62',
    size: '—',
    date: 'Oct 2023',
    tagline: 'No-code premium Blogger template builder',
    synopsis: 'theme62 --configure layout|metadata|navigation',
    description:
      'Theme62 is a digital product for creating premium Blogger templates. Work covered migrating the landing-page stack to a new stack, integrating payment gateways (Xendit and PayPal), and building a new blog design for the firm — producing SEO-optimized, high-performance themes for commercial distribution.',
    architecture: [
      'Landing-page stack migration to a new frontend stack',
      'Payment gateway integration: Xendit & PayPal checkout',
      'New blog design for the firm',
      'SEO & performance-optimized theme output',
    ],
    stack: ['SvelteKit', 'Xendit'],
    period: 'Oct 2023 – Feb 2024',
    role: 'Software Engineer (Theme62)',
    status: 'ARCHIVED',
    notes: 'Sales figures: Data Not Available.',
  },
  {
    id: 'wpn-production',
    name: 'wpn-production',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'platka',
    size: '—',
    date: 'Sep 2022',
    tagline: 'Charcoal production workflow monitoring',
    synopsis: 'wpn --track staging|inventory|docs',
    description:
      'A specialized system for monitoring charcoal production workflows at Platka Software Digital. It tracks processing stages, inventory of raw materials, and manages operational documentation to enhance production traceability.',
    architecture: [
      'Production-stage tracking',
      'Raw-material & output inventory',
      'Operational documentation for traceability',
    ],
    stack: ['Flutter', 'Dart'],
    period: 'Sep 2022 – Aug 2023',
    role: 'Mobile Engineer (Platka Software Digital)',
    status: 'ARCHIVED',
    notes: 'Internal client system — not public.',
  },
  {
    id: 'payuni',
    name: 'payuni',
    permissions: 'drwxr-xr-x',
    owner: 'agung',
    group: 'fintek',
    size: '—',
    date: 'Mar 2021',
    tagline: 'PPOB — digital bill payments & top-ups',
    synopsis: 'payuni --pay pulsa|data|token-listrik|tagihan',
    description:
      'Payuni is a PPOB (Payment Point Online Bank) application for digital transactions — prepaid credit, data packages, electricity tokens, and postpaid utility billing. Work covered building the Payuni Mobile front-end theme, developing partner-requested features, and shipping a responsive web dashboard version of Payuni Mobile.',
    architecture: [
      'Front-end theme for Payuni Mobile',
      'Iterative partner-driven feature development',
      'Responsive web dashboard version of the mobile product',
    ],
    stack: ['Flutter', 'React.js'],
    period: 'Mar 2021 – Aug 2022',
    role: 'Mobile Developer (PT. Fintek Digital Nusantara)',
    status: 'ARCHIVED',
    notes: 'Internal company app — not public. Transaction volume: Data Not Available.',
  },
]

export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  {
    name: 'geeto',
    fullName: 'IDNCraft/geeto',
    stars: 11,
    forks: 2,
    language: 'TypeScript',
    description:
      'AI Git workflow automation — auto branch names, commit messages, releases, PRs, Trello integration.',
    url: 'https://github.com/IDNCraft/geeto',
    topics: ['git', 'cli', 'ai', 'automation', 'developer-tooling'],
    commitsBadge: 'snapshot Sep 2026',
  },
  {
    name: 'SahamLens',
    fullName: 'IDNCraft/SahamLens',
    stars: 9,
    forks: 2,
    language: 'TypeScript',
    description:
      'Tool open-source untuk parsing snapshot saham Stockbit menjadi analisis fundamental terstruktur dan perbandingan historis.',
    url: 'https://github.com/IDNCraft/SahamLens',
    topics: ['stockbit', 'fundamental-analysis', 'parser', 'finance'],
    commitsBadge: 'snapshot Sep 2026',
  },
  {
    name: 'qmon',
    fullName: 'IDNCraft/qmon',
    stars: 0,
    forks: 0,
    language: 'Go',
    description:
      'Monitor AI provider quotas across a terminal dashboard, mobile app, and background API daemon.',
    url: 'https://github.com/IDNCraft/qmon',
    topics: ['go', 'dashboard', 'ai', 'quota', 'daemon'],
    commitsBadge: 'snapshot Sep 2026',
  },
]

export const SYSTEM_PROFILER_DATA: SystemProfilerSection[] = [
  {
    category: 'Hardware Overview',
    items: [
      {
        label: 'Primary Machine',
        value: 'MacBook Air M4',
        detail: 'Powering my daily development with the latest M4 efficiency',
      },
      {
        label: 'Furniture',
        value: 'Electric Standing Desk',
        detail: 'Keeping focus sharp and ergonomics flexible',
      },
      {
        label: 'Display',
        value: 'Samsung 24" Monitor',
        detail: 'Extra real estate for deep-dive coding sessions',
      },
      {
        label: 'Peripherals',
        value: 'Keychron K2 V2',
        detail: 'Tactile feedback that makes every keystroke count',
      },
    ],
  },
  {
    category: 'Software & Environment',
    items: [
      {
        label: 'Editor',
        value: 'Visual Studio Code',
        detail: 'My main habitat, customized for minimal distraction',
      },
      { label: 'Browser', value: 'Comet Browser', detail: 'AI-native browser by Perplexity' },
      {
        label: 'AI Assistants',
        value: 'ChatGPT · Claude · GitHub Copilot · Codex · OpenCode Go',
        detail: 'Problem solving, architectural debates, predictive pairing, autonomous agents',
      },
      { label: 'Terminal', value: 'Warp Terminal', detail: 'AI-integrated terminal' },
      {
        label: 'DevOps & API',
        value: 'Docker · Postman',
        detail: 'Environment consistency & API testing',
      },
      {
        label: 'Project Management',
        value: 'Trello',
        detail: 'Board-driven planning & task handoff',
      },
      {
        label: 'Productivity (macOS)',
        value: 'Raycast · Maccy · RunCat · Flyenv',
        detail: 'Command center, clipboard, system monitor, env orchestration',
      },
      {
        label: 'Remote & Network',
        value: 'AnyDesk · ZeroTier',
        detail: 'Remote collaboration & secure virtual networks',
      },
    ],
  },
]

/**
 * Sumber truth: seed `/photography` = "7 foto · Nature, Urban · sync dari Supabase Storage".
 * Judul/lokasi/EXIF spesifik TIDAK ada di sumber → tidak diarang. Grid menampilkan
 * slot jujur; metadata diisi saat foto asli di-wire ke storage.
 */
export const PHOTOGRAPHY_FRAMES: PhotoFrame[] = [1, 2, 3, 4, 5, 6, 7].map((id) => ({
  id,
  title: `Frame ${id}`,
  category: id <= 4 ? 'Nature' : 'Urban',
  storageKey: `photo_${String(id).padStart(2, '0')}`,
}))

export const CV_MARKDOWN = `# AGUNG MAULANA
Software Engineer — Backend (Go, TypeScript) · formerly Mobile & Web
Jepara, Central Java, Indonesia
GitHub: https://github.com/rust142 · LinkedIn: https://linkedin.com/in/agung-maulana-1b63a1237 · X/IG: @__rustdev

================================================================================
PROFILE
================================================================================
With over 6 years of experience in mobile and web development, I have a proven
track record of delivering user-focused solutions for enterprise and operational
systems that bring measurable business impact. I have focused on improving system
performance and enhancing development workflows, and I am currently leveraging
that experience to transition into backend engineering, building high-performance
systems that last.

Focus: Golang & TypeScript · system performance · efficient developer workflows ·
scalable design.

================================================================================
EXPERIENCE
================================================================================
* SOFTWARE ENGINEER | Asta Bridger
  Nov 2025 – Present
  - Leading development of BookWae, a reservation platform for SMEs.
  - Architected system flows for scalable SME service management.
  - Improved deployment efficiency by standardizing branching and commit workflows.

* SOFTWARE ENGINEER | RS PKU Muhammadiyah Mayong
  Oct 2023 – Present
  - Developed SIM Mutu for quality monitoring and data-driven reporting.
  - Built E-Office to digitize administrative processes and document tracking.
  - Integrated electronic signatures (TTE Sertisign) for medical record
    authentication.

* SOFTWARE ENGINEER | Theme62
  Oct 2023 – Feb 2024
  - Generated professional Blogger templates emphasizing SEO and performance.
  - Built customization tools for layout elements and metadata navigation.
  - Optimized theme responsiveness and loading speeds for commercial distribution.

* MOBILE ENGINEER | Platka Software Digital
  Mar 2023 – Aug 2023
  - Developed WPN Production to monitor charcoal production workflows.
  - Tracked inventory of raw materials and outputs in a centralized platform.

* MOBILE DEVELOPER | PT. Fintek Digital Nusantara
  Mar 2021 – Aug 2022
  - Focused on Payuni PPOB application for digital payments and top-ups.
  - Optimized Flutter application performance for a reliable user experience.

================================================================================
PROJECTS & OPEN SOURCE
================================================================================
* Geeto CLI (Jan 2026 – Present) — AI Git workflow automation: analyzes diffs to
  generate structured branch names and commit messages, from branch to PR.
  https://github.com/IDNCraft/geeto
* BookWae — booking & queue platform for SMEs (Next.js, TypeScript, ShadCN).
* SIM Mutu — hospital quality-indicator monitoring (AdonisJs, React, ShadCN).
* E-Office — digital office & correspondence (SvelteKit, TypeScript, Flowbite).
* TTE Sertisign — certified e-signature for medical records (AdonisJs).
* SahamLens — Stockbit snapshot → fundamental analysis (TypeScript).
  https://github.com/IDNCraft/SahamLens
* qmon — AI provider quota monitor: terminal + mobile + daemon (Go).
  https://github.com/IDNCraft/qmon

================================================================================
TECHNICAL STACK (Production Ready)
================================================================================
• Languages & Runtimes: Golang, Python, TypeScript, JavaScript, Node.js, Bun
• Frontend & Mobile: Next.js, React, SvelteKit, Tailwind, Flutter
• Databases & Tools: MySQL, Redis, Git
• Infra & DevOps: Docker, Kubernetes, GitHub Actions, Trello
• AI Agents & Pairing: OpenAI Codex, OpenCode Go, Claude Code, GitHub Copilot

================================================================================
GitHub activity (live): see profile @rust142 — contributions, Pull Shark ×2,
Arctic Code Vault Contributor.
Note: education/certification details intentionally omitted — not in source data.
`
