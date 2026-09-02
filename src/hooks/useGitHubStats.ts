import { useEffect, useState } from 'react'

export interface GitHubStats {
  contributions: number | null
  publicRepos: number | null
  followers: number | null
  login: string
  fetchedAt: number | null
  loading: boolean
  error: string | null
}

const CONTRIB_API = 'https://github-contributions-api.jogruber.de/v4/'
const CACHE_KEY = 'gh-stats-v1'
const CACHE_TTL = 10 * 60 * 1000 // 10 menit — hemat rate limit saat HMR/reload

interface ContribResponse {
  total?: Record<string, number>
}

interface UserResponse {
  login?: string
  public_repos?: number
  followers?: number
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  return (await res.json()) as T
}

/**
 * Live GitHub stats untuk user `rust142`.
 * - contributions/tahun: github-contributions-api.jogruber.de (proxy GraphQL
 *   GitHub, tanpa token — angka sama dengan yang tampil di profil GitHub).
 * - public repos & followers: api.github.com REST (CORS ok, unauthenticated).
 * Gagal total -> null (konsumen fallback ke snapshot statis).
 */
export function useGitHubStats(username = 'rust142'): GitHubStats {
  const [state, setState] = useState<GitHubStats>(() => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (raw) {
        const c = JSON.parse(raw) as GitHubStats
        if (c.fetchedAt && Date.now() - c.fetchedAt < CACHE_TTL) {
          return { ...c, loading: false, error: null }
        }
      }
    } catch {
      /* cache korup -> fetch ulang */
    }
    return {
      contributions: null,
      publicRepos: null,
      followers: null,
      login: username,
      fetchedAt: null,
      loading: true,
      error: null,
    }
  })

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const [contrib, user] = await Promise.all([
          fetchJson<ContribResponse>(`${CONTRIB_API}${username}?yesterday=true`).catch(() => null),
          fetchJson<UserResponse>(`https://api.github.com/users/${username}`).catch(() => null),
        ])
        if (!alive) return
        if (!contrib && !user) {
          setState((s) => ({ ...s, loading: false, error: 'github unreachable' }))
          return
        }
        const next: GitHubStats = {
          contributions: contrib?.total?.[String(new Date().getFullYear())] ?? null,
          publicRepos: user?.public_repos ?? null,
          followers: user?.followers ?? null,
          login: user?.login ?? username,
          fetchedAt: Date.now(),
          loading: false,
          error: null,
        }
        setState(next)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(next))
        } catch {
          /* storage penuh/policy -> abaikan */
        }
      } catch (error) {
        if (alive) setState((s) => ({ ...s, loading: false, error: String(error) }))
      }
    })()
    return () => {
      alive = false
    }
  }, [username])

  return state
}
