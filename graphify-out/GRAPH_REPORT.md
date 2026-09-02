# Graph Report - .  (2026-09-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 173 nodes · 255 edges · 11 communities (10 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- devDependencies
- App.tsx
- portfolio.ts
- dependencies
- compilerOptions
- ManPageModal.tsx
- scripts
- TerminalWindow.tsx
- eslint.config.js

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 10 edges
3. `Project` - 9 edges
4. `PERSONAL_INFO` - 8 edges
5. `INTERNAL_PROJECTS` - 8 edges
6. `TerminalWindow()` - 5 edges
7. `useOpenSourceRepos()` - 5 edges
8. `useGitHubStats()` - 4 edges
9. `useRepoMeta()` - 4 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `App()` --references--> `INTERNAL_PROJECTS`  [EXTRACTED]
  src/App.tsx → src/data/portfolio.ts
- `ManPageModalProps` --references--> `Project`  [EXTRACTED]
  src/components/ManPageModal.tsx → src/types.ts
- `TerminalWindowProps` --references--> `Project`  [EXTRACTED]
  src/components/TerminalWindow.tsx → src/types.ts
- `TerminalWindow()` --references--> `INTERNAL_PROJECTS`  [EXTRACTED]
  src/components/TerminalWindow.tsx → src/data/portfolio.ts
- `WorksSectionProps` --references--> `Project`  [EXTRACTED]
  src/components/WorksSection.tsx → src/types.ts

## Import Cycles
- None detected.

## Communities (11 total, 1 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.05
Nodes (39): autoprefixer, esbuild, eslint, eslint-config-prettier, eslint-plugin-prettier, eslint-plugin-promise, eslint-plugin-security, eslint-plugin-unicorn (+31 more)

### Community 1 - "App.tsx"
Cohesion: 0.12
Nodes (17): App(), AboutSection(), ContactSection(), ContactSectionProps, CvModal(), CvModalProps, Footer(), StackSection() (+9 more)

### Community 2 - "portfolio.ts"
Cohesion: 0.17
Nodes (14): JourneySection(), OpenSourceSection(), JOURNEY_LOGS, OPEN_SOURCE_REPOS, PHOTOGRAPHY_FRAMES, RawRepo, toCard(), useOpenSourceRepos() (+6 more)

### Community 3 - "dependencies"
Cohesion: 0.10
Nodes (20): dotenv, express, lucide-react, motion, dependencies, dotenv, express, lucide-react (+12 more)

### Community 4 - "compilerOptions"
Cohesion: 0.10
Nodes (19): DOM, DOM.Iterable, ES2023, compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules (+11 more)

### Community 5 - "ManPageModal.tsx"
Cohesion: 0.18
Nodes (14): LiveRepoLine(), ManPageModal(), ManPageModalProps, TerminalWindowProps, WorksSection(), WorksSectionProps, INTERNAL_PROJECTS, cache (+6 more)

### Community 6 - "scripts"
Cohesion: 0.13
Nodes (14): name, private, scripts, build, clean, dev, format, format:check (+6 more)

### Community 7 - "TerminalWindow.tsx"
Cohesion: 0.27
Nodes (9): AVAILABLE_COMMANDS, CommandHistoryItem, TerminalWindow(), useLiveGh(), ContribResponse, fetchJson(), GitHubStats, useGitHubStats() (+1 more)

## Knowledge Gaps
- **70 isolated node(s):** `unicornRecommendedRules`, `name`, `private`, `version`, `type` (+65 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `dependencies`, `scripts`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `scripts`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **What connects `unicornRecommendedRules`, `name`, `private` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._