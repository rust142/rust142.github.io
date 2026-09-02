import { useEffect, useState } from 'react'

import { OPEN_SOURCE_REPOS } from '@/data/portfolio'
import { OpenSourceRepo } from '@/types'

const API = 'https://api.github.com'
const CACHE_KEY = 'gh-repos-v1'
const CACHE_TTL = 10 * 60 * 1000

interface RawRepo {
  name: string
  full_name: string
  stargazers_count: number
  forks_count: number
  language: string | null
  description: string | null
  html_url: string
  topics?: string[]
  pushed_at?: string
}

function toCard(r: RawRepo): OpenSourceRepo {
  return {
    name: r.name,
    fullName: r.full_name,
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language ?? '—',
    description: r.description ?? '',
    url: r.html_url,
    topics: r.topics ?? [],
    commitsBadge: r.pushed_at ? `pushed ${r.pushed_at.slice(0, 10)}` : undefined,
  }
}

/**
 * Daftar OSS @rust142 + org IDNCraft, live dari GitHub REST (tanpa token).
 * Prioritas: repo pinned (geeto/SahamLens/qmon) lalu urut stars.
 * Gagal -> fallback snapshot statis (portfolio.ts), berlabel.
 */
export function useOpenSourceRepos(username = 'rust142', max = 6) {
  const [state, setState] = useState<{
    repos: OpenSourceRepo[]
    isLive: boolean
    loading: boolean
  }>(() => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const c = JSON.parse(raw) as { repos: OpenSourceRepo[]; fetchedAt: number }
        if (c.fetchedAt && Date.now() - c.fetchedAt < CACHE_TTL && c.repos?.length) {
          return { repos: c.repos, isLive: true, loading: false }
        }
      }
    } catch {
      /* cache korup -> fetch ulang */
    }
    return { repos: OPEN_SOURCE_REPOS, isLive: false, loading: true }
  })

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [userRepos, orgRepos] = await Promise.all([
          fetch(`${API}/users/${username}/repos?per_page=100&sort=updated`).then(async (r) =>
            r.ok ? ((await r.json()) as RawRepo[]) : []
          ),
          fetch(`${API}/orgs/IDNCraft/repos?per_page=100&sort=updated`).then(async (r) =>
            r.ok ? ((await r.json()) as RawRepo[]) : []
          ),
        ])
        if (!alive) return
        const all: RawRepo[] = [...userRepos, ...orgRepos]
        // filter: punya deskripsi = proyek serius; skip fork; skip readme/profile/homebrew/scoop repo
        const owned = all.filter(
          (r) =>
            r.description &&
            !/^(\.|rust142$|portofolio|awesome-|homebrew-|scoop-)/.test(r.name) &&
            !(r as unknown as { fork?: boolean }).fork
        )
        const byName = new Map(owned.map((r) => [r.name.toLowerCase(), r]))
        const pick = (n: string) => byName.get(n)
        const pinned = [pick('geeto'), pick('sahamlens'), pick('qmon')].filter(Boolean) as RawRepo[]
        const rest = owned
          .filter((r) => !pinned.some((p) => p.full_name === r.full_name))
          .toSorted((a, b) => b.stargazers_count - a.stargazers_count)
        const final = [...pinned, ...rest].slice(0, max).map((r) => toCard(r))
        if (final.length === 0) throw new Error('empty repo list')
        setState({ repos: final, isLive: true, loading: false })
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ repos: final, fetchedAt: Date.now() }))
        } catch {
          /* abaikan */
        }
      } catch {
        if (alive) setState({ repos: OPEN_SOURCE_REPOS, isLive: false, loading: false })
      }
    })()
    return () => {
      alive = false
    }
  }, [username, max])

  return state
}
