import { useEffect, useState } from 'react'

const API = 'https://api.github.com'

export interface RepoMeta {
  stars: number | null
  forks: number | null
  pushedAt: string | null
  isLive: boolean
  loading: boolean
}

const cache = new Map<string, RepoMeta & { fetchedAt: number }>()

/** Live stars/forks/last-push satu repo GitHub. Null saat offline -> konsumen sembunyi. */
interface RepoApiResponse {
  stargazers_count?: number
  forks_count?: number
  pushed_at?: string
}

async function fetchRepo(fullName: string): Promise<RepoApiResponse | null> {
  const res = await fetch(`${API}/repos/${fullName}`)
  if (!res.ok) return null
  return (await res.json()) as RepoApiResponse
}

export function useRepoMeta(fullName: string | undefined): RepoMeta {
  const [meta, setMeta] = useState<RepoMeta>({
    stars: null,
    forks: null,
    pushedAt: null,
    isLive: false,
    loading: !!fullName,
  })

  useEffect(() => {
    if (!fullName) return
    const hit = cache.get(fullName)
    if (hit && Date.now() - hit.fetchedAt < 10 * 60 * 1000) {
      setMeta({
        stars: hit.stars,
        forks: hit.forks,
        pushedAt: hit.pushedAt,
        isLive: true,
        loading: false,
      })
      return
    }
    let alive = true
    setMeta((m) => ({ ...m, loading: true }))
    fetchRepo(fullName)
      .then((d) => {
        if (!alive) return
        const next = d
          ? {
              stars: d.stargazers_count ?? null,
              forks: d.forks_count ?? null,
              pushedAt: d.pushed_at ?? null,
            }
          : { stars: null, forks: null, pushedAt: null }
        cache.set(fullName, { ...next, isLive: !!d, loading: false, fetchedAt: Date.now() })
        setMeta({ ...next, isLive: !!d, loading: false })
      })
      .catch(() => {
        if (alive)
          setMeta({ stars: null, forks: null, pushedAt: null, isLive: false, loading: false })
      })
    return () => {
      alive = false
    }
  }, [fullName])

  return meta
}

export function repoFullName(url: string | undefined): string | undefined {
  if (!url) return undefined
  const m = url.replace(/\/$/, '').match(/github\.com\/([^/]+\/[^/]+)/)
  return m ? m[1] : undefined
}
