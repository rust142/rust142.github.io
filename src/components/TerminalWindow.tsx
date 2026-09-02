import React, { useEffect, useRef, useState } from 'react'

import {
  ABOUT_TEXT,
  INTERNAL_PROJECTS,
  JOURNEY_LOGS,
  OPEN_SOURCE_REPOS,
  PERSONAL_INFO,
  STACK_CATEGORIES,
  SYSTEM_PROFILER_DATA,
} from '@/data/portfolio'
import { useGitHubStats } from '@/hooks/useGitHubStats'
import { Project } from '@/types'

interface TerminalWindowProps {
  onOpenManPage: (project: Project) => void
  onOpenCvModal: () => void
  onScrollToSection: (sectionId: string) => void
}

/** Live GitHub stats dengan fallback snapshot statis dari PRD (data lama, berlabel). */
export function useLiveGh() {
  const live = useGitHubStats('rust142')
  const snapshot = PERSONAL_INFO.githubStats
  return {
    contributions: live.contributions ?? Number(snapshot.contributions),
    isLive: live.contributions != null,
    publicRepos: live.publicRepos,
    followers: live.followers,
    loading: live.loading,
  }
}

interface CommandHistoryItem {
  id: string
  command: string
  output: React.ReactNode
  time: string
}

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'stack',
  'work',
  'works',
  'oss',
  'journey',
  'uses',
  'photography',
  'photo',
  'cv',
  'download cv',
  'contact',
  'gh --stats',
  'man geeto',
  'man asta-bridger',
  'man mayong-db',
  'man pku-core',
  'man zenith-mesh',
  'man flow-telemetry',
  'man kartu-satelit',
  'man cronos-scheduler',
  'cat about',
  'ls',
  'ls -la',
  'uptime',
  'date',
  'clear',
  'exit',
]

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  onOpenManPage,
  onOpenCvModal,
  onScrollToSection,
}) => {
  const [history, setHistory] = useState<CommandHistoryItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [commandLog, setCommandLog] = useState<string[]>([])
  const [isTypingIntro, setIsTypingIntro] = useState(true)
  const [typedText, setTypedText] = useState('')
  const [uptimeSeconds, setUptimeSeconds] = useState(148)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const gh = useLiveGh()

  const terminalBodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handler)
    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  // Live uptime counter
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  // Initial Auto-Typing Session Log Demo
  useEffect(() => {
    if (isReducedMotion) {
      setIsTypingIntro(false)
      return
    }

    const demoCommand = 'whoami && gh --stats'
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < demoCommand.length) {
        setTypedText(demoCommand.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTimeout(() => {
          setIsTypingIntro(false)
          setTypedText('')
        }, 500)
      }
    }, 40)

    return () => {
      clearInterval(typingInterval)
    }
  }, [isReducedMotion])

  // Auto scroll to bottom of terminal when history changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history, isTypingIntro, typedText])

  const executeCommand = (cmdText: string) => {
    const cleanCmd = cmdText.trim()
    if (!cleanCmd) return

    // Add to raw command log for Up/Down arrow history
    setCommandLog((prev) => [...prev, cleanCmd])
    setHistoryIndex(-1)

    const parts = cleanCmd.split(' ')
    const mainCmd = parts[0].toLowerCase()
    const arg = parts.slice(1).join(' ').trim()

    let outputNode: React.ReactNode = null

    if (cleanCmd === 'clear' || cleanCmd === 'cls') {
      setHistory([])
      setInputValue('')
      return
    }

    switch (mainCmd) {
      case 'help': {
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#3FB950] font-bold">AG-TERMINAL COMMAND INTERPRETER</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[#8B949E]">
              <div>
                <span className="text-[#E6EDF3] font-semibold">whoami</span> — Display bio &amp;
                engineering identity
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">stack</span> — Production technical
                proficiencies
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">work / works</span> — Internal
                engineering systems (8)
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">oss</span> — Open-source repositories
                &amp; stars
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">journey</span> — Git commit milestone
                log
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">uses</span> — Hardware &amp;
                development toolchain
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">photography</span> — 7 frames strip
                &amp; EXIF data
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">cv / download cv</span> — View &amp;
                export plain-text resume
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">contact</span> — Reach out via GitHub
                / LinkedIn / X
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">man &lt;project&gt;</span> — Read
                manual page (e.g. `man geeto`)
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">gh --stats</span> — GitHub
                contributions &amp; achievements
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">ls / ls -la</span> — List workspace
                artifacts &amp; files
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">cat about</span> — Mission &amp;
                engineering approach
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">uptime</span> — Terminal session
                status
              </div>
              <div>
                <span className="text-[#E6EDF3] font-semibold">clear</span> — Reset terminal
                viewport
              </div>
            </div>
            <div className="text-[11px] text-[#8B949E] pt-1">
              Tip: Press <kbd className="px-1 py-0.5 bg-[#21262D] rounded text-[#E6EDF3]">Tab</kbd>{' '}
              for auto-completion,{' '}
              <kbd className="px-1 py-0.5 bg-[#21262D] rounded text-[#E6EDF3]">↑</kbd>/
              <kbd className="px-1 py-0.5 bg-[#21262D] rounded text-[#E6EDF3]">↓</kbd> for command
              history.
            </div>
          </div>
        )
        break
      }

      case 'whoami': {
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-[#3FB950] font-bold">
              {PERSONAL_INFO.name} ({PERSONAL_INFO.handle})
            </div>
            <div className="text-[#E6EDF3]">
              Role: <span className="text-white font-semibold">{PERSONAL_INFO.title}</span> (
              {PERSONAL_INFO.experience})
            </div>
            <div className="text-[#8B949E]">
              Focus: <span className="text-[#E6EDF3]">{PERSONAL_INFO.focus}</span>
            </div>
            <div className="text-[#8B949E]">
              Location: <span className="text-[#E6EDF3]">{PERSONAL_INFO.location}</span> [
              {PERSONAL_INFO.timezone}]
            </div>
            <div className="text-[#8B949E]">
              Status: <span className="text-[#3FB950] font-semibold">{PERSONAL_INFO.status}</span>
            </div>
          </div>
        )
        break
      }

      case 'gh':
      case 'gh-stats': {
        if (cleanCmd.includes('--stats') || mainCmd === 'gh-stats') {
          outputNode = (
            <div className="space-y-1.5 text-xs bg-[#0D1117] p-2.5 rounded border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2 text-[#3FB950] font-bold">
                <span>◆ GITHUB {gh.isLive ? 'LIVE' : 'SNAPSHOT'} STATS</span>
                <span className="text-[11px] text-[#8B949E]">(@rust142)</span>
              </div>
              <div className="text-[#E6EDF3]">
                <span className="font-semibold text-white">
                  {gh.contributions.toLocaleString('en-US')}
                </span>{' '}
                public contributions in the last year{gh.isLive ? '' : ' · snapshot Sep 2026'}
              </div>
              {(gh.publicRepos != null || gh.followers != null) && (
                <div className="text-[11px] text-[#8B949E]">
                  {gh.publicRepos ?? '—'} public repos · {gh.followers ?? '—'} followers
                </div>
              )}
              <div className="flex flex-wrap gap-2 text-[11px] text-[#8B949E] pt-1">
                {PERSONAL_INFO.githubStats.badges.map((b, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#161B22] border border-[rgba(255,255,255,0.08)] rounded text-[#3FB950]"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          )
        } else {
          outputNode = (
            <div className="text-xs text-[#8B949E]">
              Try running <code className="text-[#3FB950]">gh --stats</code>
            </div>
          )
        }
        break
      }

      case 'stack': {
        outputNode = (
          <div className="space-y-3 text-xs">
            <div className="text-[#3FB950] font-bold">PRODUCTION READY STACK SPECIFICATION</div>
            {STACK_CATEGORIES.map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-white font-semibold flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-1">
                  <span>{cat.title}</span>
                  <span className="text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-1.5 py-0.5 rounded">
                    {cat.level}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 pl-2">
                  {cat.items.map((it, idx) => (
                    <div key={idx} className="text-[#8B949E]">
                      <span className="text-[#E6EDF3] font-medium">{it.name}:</span>{' '}
                      {it.description}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
        break
      }

      case 'work':
      case 'works':
      case 'projects': {
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#3FB950] font-bold">INTERNAL PRODUCTION SYSTEMS (8)</div>
            <div className="space-y-1 text-[#8B949E]">
              {INTERNAL_PROJECTS.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-baseline gap-x-2 py-0.5 hover:bg-[#21262D]/50 px-1 rounded transition-colors"
                >
                  <span className="text-[11px] text-[#8B949E]/70 font-mono">{p.permissions}</span>
                  <button
                    onClick={() => {
                      onOpenManPage(p)
                    }}
                    className="text-[#3FB950] hover:underline font-bold text-left cursor-pointer"
                  >
                    {p.name}
                  </button>
                  <span className="text-[#E6EDF3]">— {p.tagline}</span>
                  <span className="text-[10px] text-[#8B949E] bg-[#161B22] px-1 border border-[rgba(255,255,255,0.06)] rounded">
                    [{p.stack.slice(0, 2).join(', ')}]
                  </span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#8B949E] pt-1">
              Type <code className="text-[#3FB950]">man &lt;project&gt;</code> or click any name to
              view complete manual specification.
            </div>
          </div>
        )
        break
      }

      case 'man': {
        if (arg) {
          const targetProject = INTERNAL_PROJECTS.find(
            (p) =>
              p.id.toLowerCase() === arg.toLowerCase() || p.name.toLowerCase() === arg.toLowerCase()
          )
          if (targetProject) {
            onOpenManPage(targetProject)
            outputNode = (
              <div className="text-xs text-[#3FB950]">
                Opening manual page for{' '}
                <strong className="text-white">{targetProject.name}(1)</strong>...
              </div>
            )
          } else {
            outputNode = (
              <div className="text-xs text-[#F85149]">
                No manual entry for {arg}. Available pages:{' '}
                {INTERNAL_PROJECTS.map((p) => p.name).join(', ')}
              </div>
            )
          }
        } else {
          outputNode = (
            <div className="text-xs text-[#F85149]">
              What manual page do you want? Try <code className="text-[#3FB950]">man geeto</code> or{' '}
              <code className="text-[#3FB950]">man asta-bridger</code>.
            </div>
          )
        }
        break
      }

      case 'oss':
      case 'open-source': {
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#3FB950] font-bold">FEATURED OPEN SOURCE REPOSITORIES</div>
            <div className="space-y-2 pl-2">
              {OPEN_SOURCE_REPOS.map((r, idx) => (
                <div key={idx} className="border-l-2 border-[#3FB950]/40 pl-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3FB950] font-bold hover:underline"
                    >
                      {r.fullName}
                    </a>
                    <span className="text-[#E3B341] text-[11px]">★ {r.stars}</span>
                    <span className="text-[#8B949E] text-[11px]">({r.language})</span>
                  </div>
                  <div className="text-[#8B949E] text-[11px]">{r.description}</div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'journey':
      case 'log':
      case 'history-work': {
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#3FB950] font-bold">GIT-LOG MILESTONES (REVERSED CHRONOLOGY)</div>
            <div className="space-y-2 font-mono">
              {JOURNEY_LOGS.map((j) => (
                <div key={j.hash} className="text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[#E3B341] font-bold">* {j.hash}</span>
                    <span className="text-[#3FB950] font-semibold">({j.tag ?? 'tag'})</span>
                    <span className="text-[#E6EDF3] font-bold">{j.company}</span>
                    <span className="text-[#8B949E] text-[11px]">— {j.date}</span>
                  </div>
                  <div className="pl-4 text-[#8B949E] text-[11px]">
                    Role: <span className="text-[#E6EDF3]">{j.role}</span> | {j.location}
                  </div>
                  <div className="pl-4 text-[#8B949E] text-[11px]">{j.description}</div>
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'uses':
      case 'specs':
      case 'system_profiler': {
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-[#3FB950] font-bold">
              SYSTEM_PROFILER: HARDWARE &amp; SOFTWARE STACK
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SYSTEM_PROFILER_DATA.map((sec, i) => (
                <div
                  key={i}
                  className="space-y-1.5 bg-[#0D1117] p-2.5 rounded border border-[rgba(255,255,255,0.06)]"
                >
                  <div className="text-white font-semibold text-[11px] uppercase tracking-wider">
                    {sec.category}
                  </div>
                  {sec.items.map((it, idx) => (
                    <div key={idx} className="text-[11px] text-[#8B949E]">
                      <span className="text-[#E6EDF3]">{it.label}:</span> {it.value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
        break
      }

      case 'photography':
      case 'photo':
      case 'photos': {
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <div className="text-[#3FB950] font-bold">
              PHOTOGRAPHY: 7 FRAMES (NATURE &amp; URBAN)
            </div>
            <p className="text-[#8B949E]">
              Storage: Supabase Storage pipeline. Frame titles/EXIF sync from storage — not
              hardcoded in this bundle.
            </p>
            <button
              onClick={() => {
                onScrollToSection('photography')
              }}
              className="text-[#3FB950] hover:underline text-xs"
            >
              &gt; Jump to Photography Gallery section
            </button>
          </div>
        )
        break
      }

      case 'cv':
      case 'resume':
      case 'download': {
        onOpenCvModal()
        outputNode = (
          <div className="text-xs text-[#3FB950]">
            Rendering resume plain-text exporter (
            <code className="text-white">$ cat /etc/agung_maulana_resume.txt</code>)...
          </div>
        )
        break
      }

      case 'contact': {
        outputNode = (
          <div className="space-y-2 text-xs bg-[#0D1117] p-2.5 rounded border border-[rgba(255,255,255,0.06)]">
            <div className="text-[#3FB950] font-bold">$ contact --channels</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#161B22] border border-[rgba(255,255,255,0.08)] rounded hover:border-[#3FB950] text-[#E6EDF3] transition-colors"
              >
                <div className="text-[#3FB950] font-bold">GitHub</div>
                <div className="text-[11px] text-[#8B949E]">@{PERSONAL_INFO.githubUser}</div>
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#161B22] border border-[rgba(255,255,255,0.08)] rounded hover:border-[#3FB950] text-[#E6EDF3] transition-colors"
              >
                <div className="text-[#3FB950] font-bold">LinkedIn</div>
                <div className="text-[11px] text-[#8B949E]">/in/agung-maulana-1b63a1237</div>
              </a>
              <a
                href={PERSONAL_INFO.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#161B22] border border-[rgba(255,255,255,0.08)] rounded hover:border-[#3FB950] text-[#E6EDF3] transition-colors"
              >
                <div className="text-[#3FB950] font-bold">X (Twitter)</div>
                <div className="text-[11px] text-[#8B949E]">@__rustdev</div>
              </a>
            </div>
            <div className="text-[11px] text-[#8B949E] pt-1">
              Email Note: {PERSONAL_INFO.emailPlaceholder}
            </div>
          </div>
        )
        break
      }

      case 'cat': {
        if (arg === 'about' || arg === 'about.txt' || arg === 'mission') {
          outputNode = (
            <div className="space-y-2 text-xs">
              <div className="text-[#3FB950] font-bold">MISSION &amp; CORE FOCUS</div>
              <p className="text-[#E6EDF3] leading-relaxed">{ABOUT_TEXT.mission}</p>
              <p className="text-[#8B949E] leading-relaxed">{ABOUT_TEXT.approach}</p>
            </div>
          )
        } else {
          outputNode = (
            <div className="text-xs text-[#F85149]">
              cat: {arg || 'file'}: No such file. Try{' '}
              <code className="text-[#3FB950]">cat about</code> or{' '}
              <code className="text-[#3FB950]">ls -la</code>
            </div>
          )
        }
        break
      }

      case 'ls': {
        outputNode = (
          <div className="text-xs space-y-1 font-mono">
            <div className="text-[#8B949E]">total 84</div>
            <div className="text-[#8B949E]">
              drwxr-xr-x 6 agung staff 192 Nov 2025 <span className="text-[#3FB950]">.</span>
            </div>
            <div className="text-[#8B949E]">
              drwxr-xr-x 12 agung staff 384 Nov 2025 <span className="text-[#3FB950]">..</span>
            </div>
            <div className="text-[#8B949E]">
              -rw-r--r-- 1 agung staff 620 Nov 2025{' '}
              <span className="text-[#E6EDF3]">about.txt</span>
            </div>
            <div className="text-[#8B949E]">
              -rw-r--r-- 1 agung staff 3480 Nov 2025{' '}
              <span className="text-[#E6EDF3]">resume.md</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 14.2M Nov 2025{' '}
              <span className="text-[#3FB950] font-bold">geeto</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 22.8M Oct 2025{' '}
              <span className="text-[#3FB950] font-bold">asta-bridger</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 8.4M Aug 2025{' '}
              <span className="text-[#3FB950] font-bold">mayong-db</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 18.1M Jun 2025{' '}
              <span className="text-[#3FB950] font-bold">pku-core</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 11.6M Apr 2025{' '}
              <span className="text-[#3FB950] font-bold">zenith-mesh</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 16.4M Jan 2025{' '}
              <span className="text-[#3FB950] font-bold">flow-telemetry</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 9.2M 2023{' '}
              <span className="text-[#3FB950] font-bold">kartu-satelit</span>
            </div>
            <div className="text-[#8B949E]">
              -rwxr-xr-x 1 agung staff 13.5M 2022{' '}
              <span className="text-[#3FB950] font-bold">cronos-scheduler</span>
            </div>
          </div>
        )
        break
      }

      case 'uptime': {
        outputNode = (
          <div className="text-xs text-[#E6EDF3]">
            05:30:54 up {Math.floor(uptimeSeconds / 60)} min, 1 user, load average: 0.18, 0.22, 0.19
            (host: pku-mayong)
          </div>
        )
        break
      }

      case 'date': {
        outputNode = <div className="text-xs text-[#E6EDF3]">{new Date().toUTCString()}</div>
        break
      }

      case 'echo': {
        outputNode = <div className="text-xs text-[#E6EDF3]">{arg}</div>
        break
      }

      case 'exit': {
        outputNode = (
          <div className="text-xs text-[#8B949E]">
            Session logging active. Terminal connection to{' '}
            <code className="text-[#3FB950]">pku-mayong</code> sustained. Type{' '}
            <code className="text-[#3FB950]">help</code> to reboot command prompt.
          </div>
        )
        break
      }

      default: {
        outputNode = (
          <div className="text-xs text-[#F85149]">
            command not found: <span className="text-white font-semibold">{cleanCmd}</span> — try{' '}
            <code className="text-[#3FB950] font-bold">'help'</code> or{' '}
            <code className="text-[#3FB950]">'whoami'</code>
          </div>
        )
      }
    }

    const newItem: CommandHistoryItem = {
      id: Math.random().toString(36).slice(2, 9),
      command: cleanCmd,
      output: outputNode,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }

    setHistory((prev) => [...prev, newItem])
    setInputValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter': {
        e.preventDefault()
        executeCommand(inputValue)

        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        if (commandLog.length === 0) return
        const nextIdx = historyIndex === -1 ? commandLog.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(nextIdx)
        setInputValue(commandLog[nextIdx])

        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        if (historyIndex === -1) return
        const nextIdx = historyIndex + 1
        if (nextIdx < commandLog.length) {
          setHistoryIndex(nextIdx)
          setInputValue(commandLog[nextIdx])
        } else {
          setHistoryIndex(-1)
          setInputValue('')
        }

        break
      }
      case 'Tab': {
        e.preventDefault()
        const current = inputValue.trim().toLowerCase()
        if (!current) return
        const matched = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(current))
        if (matched) {
          setInputValue(matched)
        }

        break
      }
      // No default
    }
  }

  const handleRunChip = (cmd: string) => {
    executeCommand(cmd)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div
      id="hero-terminal"
      className="w-full bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl overflow-hidden font-mono"
    >
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-[#30363D] select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F85149] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#F0883E] inline-block" />
          <span className="w-3 h-3 rounded-full bg-[#3FB950] inline-block" />
          <span className="ml-2 text-xs text-[#8B949E] tracking-widest font-semibold truncate">
            {PERSONAL_INFO.sshHost} — zsh — live
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8B949E]">
          <span className="hidden sm:inline text-[11px] text-[#3FB950] bg-[#3FB950]/10 px-2 py-0.5 rounded border border-[#3FB950]/30 font-bold tracking-wider">
            ● LIVE SESSION
          </span>
          <span className="text-[11px] hidden md:inline tracking-wider">tty1 · 80x24</span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div
        ref={terminalBodyRef}
        role="log"
        aria-live="polite"
        className="p-4 sm:p-6 space-y-4 max-h-[64vh] sm:max-h-[540px] min-h-[380px] overflow-y-auto text-[#E6EDF3] text-xs sm:text-sm leading-relaxed"
      >
        {/* Terminal Header & Session Banner */}
        <div className="space-y-3 border-b border-[#30363D] pb-5">
          <div className="flex items-center gap-2 text-xs text-[#8B949E]">
            <span className="text-[#3FB950] font-bold">$</span>
            <span className="text-[#E6EDF3] font-bold">whoami</span>
            <span className="text-[#8B949E]/70 ml-auto hidden sm:inline">
              pts/0 · 103.144.12.82
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none text-[#E6EDF3] uppercase">
              AGUNG_MAULANA
            </h1>
            <p className="text-[#8B949E] text-xs sm:text-sm uppercase tracking-widest">
              Software Engineer · Mobile/Web → Backend · Go · TypeScript
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <div className="px-3 py-1 border border-[#3FB950]/30 bg-[#3FB950]/10 text-[#3FB950] text-xs font-bold tracking-wider">
              {PERSONAL_INFO.experience.toUpperCase()} EXP
            </div>
            <div className="px-3 py-1 border border-[#8B949E]/30 text-[#8B949E] text-xs uppercase tracking-wider font-semibold">
              {PERSONAL_INFO.location.toUpperCase()}
            </div>
            <div className="px-3 py-1 border border-[#30363D] bg-[#0D1117] text-[#E6EDF3] text-xs uppercase tracking-wider">
              DISTRIBUTED SYSTEMS
            </div>
          </div>

          {/* Social Proof / Verified GitHub Bar */}
          <div className="bg-[#0D1117] border border-[#30363D] p-3 sm:p-4 rounded flex flex-wrap sm:flex-nowrap justify-between items-center gap-3">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#3FB950]">
                {gh.contributions.toLocaleString('en-US')}
              </div>
              <div className="text-[10px] text-[#8B949E] uppercase tracking-widest">
                Contributions{gh.isLive ? ' · live' : ''}
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[#30363D]"></div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white">Pull Shark ×2</div>
              <div className="text-[10px] text-[#8B949E] uppercase tracking-widest">
                Achievements
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-[#30363D]"></div>
            <div className="text-left sm:text-right">
              <div className="text-xs sm:text-sm font-semibold text-[#E3B341]">
                Arctic Code Vault
              </div>
              <div className="text-[10px] text-[#8B949E] uppercase tracking-widest">
                Verified Contributor
              </div>
            </div>
          </div>

          {/* Hero Action Callouts */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              id="hero-download-cv-btn"
              onClick={onOpenCvModal}
              className="px-4 py-2 border-2 border-[#3FB950] text-[#3FB950] font-bold text-xs uppercase tracking-wider hover:bg-[#3FB950] hover:text-[#0D1117] transition-colors rounded cursor-pointer flex items-center gap-2"
            >
              <span>$ download_cv --to_inbox</span>
            </button>
            <button
              id="hero-explore-works-btn"
              onClick={() => {
                onScrollToSection('works')
              }}
              className="px-4 py-2 bg-[#21262D] hover:bg-[#30363D] text-[#E6EDF3] border border-[#30363D] hover:border-[#3FB950]/50 text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              <span>&gt; explore_works [ENTER]</span>
            </button>
          </div>
        </div>

        {/* Initial Auto Typing Output Demo */}
        {isTypingIntro && (
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#3FB950] font-bold">$</span>
              <span>{typedText}</span>
              <span className="inline-block w-2 h-4 bg-[#3FB950] animate-cursor-blink" />
            </div>
          </div>
        )}

        {/* Command History Output Stream */}
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#3FB950] font-bold select-none">$</span>
              <span className="font-semibold text-white">{item.command}</span>
              <span className="text-[10px] text-[#8B949E]/60 ml-auto select-none">{item.time}</span>
            </div>
            <div className="pl-3 border-l-2 border-[#30363D] py-0.5">{item.output}</div>
          </div>
        ))}

        {/* Live Active Input Prompt */}
        {!isTypingIntro && (
          <div className="flex items-center gap-2 text-xs sm:text-sm pt-1">
            <span className="text-[#3FB950] font-bold text-prompt-glow select-none">$</span>
            <input
              ref={inputRef}
              id="terminal-command-input"
              type="text"
              aria-label="Terminal command input"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. whoami, stack, work, oss, man geeto, help)..."
              autoFocus
              className="w-full bg-transparent border-none outline-none text-[#E6EDF3] placeholder-[#8B949E]/50 font-mono text-xs sm:text-sm focus:ring-0"
            />
            <span className="inline-block w-2 h-4 bg-[#3FB950] animate-cursor-blink select-none shrink-0" />
          </div>
        )}
      </div>

      {/* Quick Action Shortcut Command Bar & Touch Chips */}
      <div className="px-4 py-3 bg-[#0D1117] border-t border-[#30363D] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] text-[#8B949E] uppercase tracking-widest hidden sm:inline mr-1 font-bold">
            QUICK:
          </span>
          {['whoami', 'stack', 'work', 'oss', 'journey', 'uses', 'cv', 'man geeto', 'help'].map(
            (cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  handleRunChip(cmd)
                }}
                className="min-h-[32px] px-2.5 py-1 bg-[#161B22] hover:bg-[#21262D] active:bg-[#30363D] text-[#8B949E] hover:text-[#3FB950] border border-[#30363D] hover:border-[#3FB950]/50 rounded text-xs transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => {
            executeCommand('clear')
          }}
          className="text-[#8B949E] hover:text-[#E6EDF3] text-xs px-2 py-1 font-bold cursor-pointer"
        >
          [clear]
        </button>
      </div>
    </div>
  )
}
