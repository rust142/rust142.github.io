# AGENTS

Agent-facing guide for the Terminal Portfolio repo. Read this before touching code.

## Project Overview

Single-page terminal-aesthetic portfolio for @rust142 (Agung Maulana), deployed as a
static Vite build. No backend: all "live" data comes from public GitHub APIs on the
client.

| Area           | Path                                | Stack                         | Role                                                                                                                                     |
| -------------- | ----------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| App shell      | `src/App.tsx`                       | React 19 + Vite + Tailwind v4 | Hash router (`#/man/:id`, `#/cv`), section composition, sticky bar                                                                       |
| Terminal UI    | `src/components/TerminalWindow.tsx` | React                         | Auto-typing intro, command parser (`whoami`, `stack`, `work`, `oss`, `journey`, `uses`, `cv`, `gh --stats`, `man <x>`), social-proof bar |
| Sections       | `src/components/*Section.tsx`       | React                         | About, Stack, Journey, Works, OpenSource, Uses, Photography (disabled), Contact                                                          |
| Man page       | `src/components/ManPageModal.tsx`   | React                         | `man <project>` modal + live repo meta line                                                                                              |
| Static content | `src/data/portfolio.ts`             | TS                            | Single source of truth for all copy/data — PRD-backed only                                                                               |
| Live data      | `src/hooks/use*.ts`                 | TS + fetch                    | GitHub stats, repo list, per-repo meta (client-side, no token)                                                                           |

Key invariants:

- **No-invent rule (hard):** every statement in `src/data/portfolio.ts` must trace to
  a real source (seed `supabase/schema.sql` of the old portfolio app, GitHub @rust142,
  or facts confirmed by Mas Agung). Missing data → an explicit
  `Data Not Available`-style note, never a fabricated metric/star/claim.
- **Dynamic beats static:** anything the GitHub API exposes (stars, forks, last push,
  contributions, public repos, followers) is fetched live via `src/hooks/` — never
  hardcoded in `notes`. Static `githubStats` values are offline fallbacks only.
- Live hooks degrade silently: on API failure the UI falls back to labeled snapshots
  (`[★ SNAPSHOT SEP 2026]`), never stale unlabeled numbers.
- Photography section is intentionally disabled in `App.tsx` until real photos are
  wired to Supabase Storage; frame slots must stay honest (no fake EXIF/titles).
- CV download currently renders `CV_MARKDOWN` client-side; a real PDF endpoint from
  the old portfolio's Supabase Storage replaces it when wired.

## Do

- Use Bun for everything JS/TS: `bun install`, `bun run <script>`, `bunx <tool>`.
- Keep content changes in `src/data/portfolio.ts` only — components render, never embed copy.
- Co-locate new live data in `src/hooks/` with a 10-minute `sessionStorage` cache
  (pattern: `useGitHubStats.ts`) to respect GitHub rate limits.
- Type every `fetch().json()` result with a narrow interface (`strict` is ON —
  `strictNullChecks` in `tsconfig.json` must stay on; typed lint rules degrade without it).
- Run the narrowest check that covers your change; rerun after fixing:
  `bun run lint`, `bun run typecheck`, `bun run format:check`, `bun run build`.
- Check `graphify-out/graph.json` for code topology instead of re-scanning the repo.

## Don't

- Don't use `npm`, `npx`, `yarn`, or `pnpm` anywhere in this project.
- Don't invent features, metrics, stars, testimonials, employers, or flows absent from
  the PRD sources — this repo was explicitly cleaned of template-fiction; keep it that way.
- Don't hardcode numbers that an API can provide (stars/forks/commits/contributions).
- Don't add GitHub tokens or secrets to this repo — it is a static site; all API use
  is unauthenticated client-side. Never proxy tokens through the client.
- Don't re-enable `PhotographySection` without real storage-backed frames.
- Don't make clone, setup, or CI checks depend on Graphify — it is optional.
- Don't commit without user running the git commands himself (agent proposes only).

## Build & Run

```bash
bun install
bun run dev        # vite on :3000, host 0.0.0.0
bun run build      # static output -> dist/
bun run preview
```

## Testing & Checks

```bash
bun run lint          # eslint (flat config, mirrors qmon/cli ruleset)
bun run lint:fix
bun run typecheck     # tsc --noEmit
bun run format        # prettier --write
bun run format:check  # prettier --check
```

ESLint/Prettier config intentionally mirrors `qmon/cli` (eslint 9 flat config,
unicorn+promise+security plugins, prettier with `@ianvs/prettier-plugin-sort-imports`,
`semi: false`, `singleQuote`, `printWidth: 100`). Keep them in sync with qmon/cli
when either changes.

## Git

After vibecode:

- Commit title → Conventional Commit: `<type>(<scope>): <imperative summary>`.
- Commit body → what changed, why, main impact; blank line after title.
- Branch → `dev#<lowercase-kebab-context>`, max 3 hyphens after `#`. Example: `dev#live-github-stats`.
- Final result → report title + body + branch. Mas who executes.

## Graphify Team Sync

- Graphify is optional; nothing in clone/setup/dev/checks may depend on it.
- On a fresh clone, check `graphify-out/graph.json` and `graphify-out/manifest.json`.
  Both exist → reuse the shared graph, skip extraction.
- Either missing and Graphify needed → run `graphify . --update --code-only` from the repo root.
- Keep shared graph outputs in Git; keep machine-local Graphify metadata ignored.
