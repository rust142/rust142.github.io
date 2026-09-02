import React, { useEffect } from 'react'

import { INTERNAL_PROJECTS } from '@/data/portfolio'
import { repoFullName, useRepoMeta } from '@/hooks/useRepoMeta'
import { Project } from '@/types'

interface ManPageModalProps {
  project: Project | null
  onClose: () => void
  onSelectProject: (project: Project) => void
  onExecuteCommand?: (cmd: string) => void
}

/** Baris stars/forks/last-push live dari GitHub API — hilang sendiri kalau repo belum public/offline. */
const LiveRepoLine: React.FC<{ project: Project }> = ({ project }) => {
  const fullName = repoFullName(project.repoUrl)
  const meta = useRepoMeta(fullName)
  if (!fullName || meta.loading || !meta.isLive) return null
  return (
    <div className="text-[#3FB950] font-semibold">
      ◆ ★ {meta.stars} · {meta.forks} forks · live{' '}
      {meta.pushedAt ? (
        <span className="text-[#8B949E] font-normal">(pushed {meta.pushedAt.slice(0, 10)})</span>
      ) : null}
    </div>
  )
}

export const ManPageModal: React.FC<ManPageModalProps> = ({
  project,
  onClose,
  onSelectProject,
  onExecuteCommand,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'q') {
        onClose()
      }
    }
    globalThis.addEventListener('keydown', handleKeyDown)
    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  if (!project) return null

  const currentIndex = INTERNAL_PROJECTS.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? INTERNAL_PROJECTS[currentIndex - 1] : null
  const nextProject =
    currentIndex < INTERNAL_PROJECTS.length - 1 ? INTERNAL_PROJECTS[currentIndex + 1] : null

  const handleCopySynopsis = () => {
    navigator.clipboard.writeText(project.synopsis)
  }

  return (
    <div
      id="man-page-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0D1117]/85 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="man-title"
    >
      <div className="relative w-full max-w-4xl bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl my-auto text-[#E6EDF3] font-mono text-sm leading-relaxed overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-[#30363D]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#F85149]" />
            <span className="inline-block w-3 h-3 rounded-full bg-[#E3B341]" />
            <span className="inline-block w-3 h-3 rounded-full bg-[#3FB950]" />
            <span className="ml-2 text-xs text-[#8B949E] tracking-wider uppercase font-semibold">
              MANUAL PAGE(1) — {project.name.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8B949E] hidden sm:inline">
              Press{' '}
              <kbd className="px-1.5 py-0.5 bg-[#21262D] border border-[#30363D] rounded text-[#E6EDF3] text-xs">
                q
              </kbd>{' '}
              or{' '}
              <kbd className="px-1.5 py-0.5 bg-[#21262D] border border-[#30363D] rounded text-[#E6EDF3] text-xs">
                ESC
              </kbd>{' '}
              to exit
            </span>
            <button
              id="close-man-page-btn"
              onClick={onClose}
              className="px-2 py-0.5 text-xs text-[#8B949E] hover:text-[#3FB950] hover:bg-[#21262D] border border-transparent hover:border-[#30363D] rounded transition-colors cursor-pointer"
            >
              [X] CLOSE
            </button>
          </div>
        </div>

        {/* Header Ribbon */}
        <div className="flex justify-between items-center px-6 py-2 bg-[#0D1117]/60 border-b border-[#30363D] text-xs text-[#8B949E]">
          <span>{project.name.toUpperCase()}(1)</span>
          <span>Agung Maulana Systems Manual</span>
          <span>{project.name.toUpperCase()}(1)</span>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Section: NAME */}
          <div>
            <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
              NAME
            </h3>
            <p className="pl-4 text-[#E6EDF3]">
              <strong className="text-white">{project.name}</strong> — {project.tagline}
            </p>
          </div>

          {/* Section: SYNOPSIS */}
          <div>
            <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
              SYNOPSIS
            </h3>
            <div className="pl-4 flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0D1117] border border-[#30363D] rounded">
              <code className="text-[#3FB950] text-xs sm:text-sm">{project.synopsis}</code>
              <button
                id="copy-synopsis-btn"
                onClick={handleCopySynopsis}
                className="text-xs px-2.5 py-1 text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#21262D] rounded border border-[#30363D] transition-colors cursor-pointer"
              >
                [copy]
              </button>
            </div>
          </div>

          {/* Section: DESCRIPTION */}
          <div>
            <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
              DESCRIPTION
            </h3>
            <p className="pl-4 text-[#8B949E] leading-relaxed">{project.description}</p>
          </div>

          {/* Section: ARCHITECTURAL HIGHLIGHTS */}
          <div>
            <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
              ARCHITECTURE &amp; INTERNALS
            </h3>
            <div className="pl-4 space-y-1.5">
              {project.architecture.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#E6EDF3]">
                  <span className="text-[#3FB950] select-none font-bold">├─</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: OPTIONS / FLAGS */}
          {project.flags && project.flags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
                OPTIONS &amp; FLAGS
              </h3>
              <div className="pl-4 space-y-2">
                {project.flags.map((flag, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-1 text-xs">
                    <span className="sm:col-span-4 text-[#3FB950] font-semibold">{flag.flag}</span>
                    <span className="sm:col-span-8 text-[#8B949E]">{flag.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: STACK & METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
                TECH STACK
              </h3>
              <div className="pl-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-[#0D1117] border border-[#30363D] text-[#E6EDF3] rounded font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
                METRICS &amp; STATUS
              </h3>
              <div className="pl-4 space-y-1 text-xs text-[#8B949E]">
                <div>
                  <span className="text-[#E6EDF3] font-semibold">Status:</span>{' '}
                  <span className="text-[#3FB950] font-bold">[{project.status}]</span>
                </div>
                <div>
                  <span className="text-[#E6EDF3] font-semibold">Period:</span> {project.period}
                </div>
                <div>
                  <span className="text-[#E6EDF3] font-semibold">Role:</span> {project.role}
                </div>
                {project.metrics?.map((m, idx) => (
                  <div key={idx} className="text-[#E6EDF3]">
                    <span className="text-[#3FB950]">◆</span> {m}
                  </div>
                ))}
                <LiveRepoLine project={project} />
              </div>
            </div>
          </div>

          {/* Honest Preview Fallback Panel */}
          <div>
            <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
              VISUAL REPOSITORY ARTIFACT
            </h3>
            <div className="pl-4">
              <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg text-xs text-[#8B949E] space-y-2">
                <div className="flex items-center justify-between text-[#8B949E]">
                  <span>// raw binary verification descriptor</span>
                  <span className="text-[#3FB950] font-bold">RAW BINARY SPEC</span>
                </div>
                <div className="font-mono text-[11px] text-[#8B949E]/80 bg-[#161B22] p-2.5 rounded border border-[#30363D] overflow-x-auto">
                  <code>
                    {`[FILE] ${project.name} (ELF 64-bit LSB executable, x86-64, version 1 (SYSV))\n`}
                    {`[SHA256] 9f82c1b3e40a...${project.id.slice(0, 6)}...f88c\n`}
                    {`[SIZE] ${project.size} | [PERM] ${project.permissions} | [OWNER] ${project.owner}:${project.group}`}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Section: NOTES */}
          {project.notes && (
            <div>
              <h3 className="text-xs font-bold text-[#3FB950] tracking-widest uppercase mb-1">
                NOTES
              </h3>
              <p className="pl-4 text-xs text-[#8B949E] italic border-l-2 border-[#3FB950]/30 pl-3">
                "{project.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#0D1117] border-t border-[#30363D] text-xs text-[#8B949E]">
          <div className="flex items-center gap-2">
            {prevProject && (
              <button
                id="prev-project-btn"
                onClick={() => {
                  onSelectProject(prevProject)
                }}
                className="hover:text-[#3FB950] transition-colors cursor-pointer"
              >
                &larr; Prev ({prevProject.name})
              </button>
            )}
            {prevProject && nextProject && <span>|</span>}
            {nextProject && (
              <button
                id="next-project-btn"
                onClick={() => {
                  onSelectProject(nextProject)
                }}
                className="hover:text-[#3FB950] transition-colors cursor-pointer"
              >
                Next ({nextProject.name}) &rarr;
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onExecuteCommand && (
              <button
                id="run-project-cli-btn"
                onClick={() => {
                  onExecuteCommand(`man ${project.name}`)
                  onClose()
                }}
                className="text-[#3FB950] hover:underline cursor-pointer"
              >
                $ view in hero terminal
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
