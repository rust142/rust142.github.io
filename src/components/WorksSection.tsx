import React from 'react'

import { INTERNAL_PROJECTS } from '@/data/portfolio'
import { Project } from '@/types'

interface WorksSectionProps {
  onOpenManPage: (project: Project) => void
}

export const WorksSection: React.FC<WorksSectionProps> = ({ onOpenManPage }) => {
  return (
    <section id="works" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            ls -la /var/opt/projects
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">internal binaries</span>
        <span className="ml-auto text-xs text-[#3FB950] font-mono">
          [TOTAL {INTERNAL_PROJECTS.length} EXECUTABLES]
        </span>
      </div>

      {/* Directory listing table header */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-[#161B22] border-b border-[#30363D] flex items-center justify-between text-xs text-[#8B949E] font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#3FB950] font-bold">●</span>
            <span className="text-white font-bold tracking-wider uppercase">
              BINARIES DIRECTORY
            </span>
          </div>
          <span className="text-[11px] text-[#8B949E] font-semibold">
            Click row or execute `man &lt;name&gt;`
          </span>
        </div>

        {/* Project List */}
        <div className="divide-y divide-[#30363D] font-mono text-xs">
          {INTERNAL_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="p-3.5 sm:p-4 hover:bg-[#3FB950]/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              <div className="space-y-1 md:w-3/5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-[#3FB950] select-none font-bold">
                    {project.permissions}
                  </span>
                  <span className="text-[11px] text-[#8B949E] select-none hidden sm:inline">
                    {project.size}
                  </span>
                  <button
                    onClick={() => {
                      onOpenManPage(project)
                    }}
                    className="text-sm font-bold text-[#E6EDF3] hover:text-[#3FB950] group-hover:underline text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>{project.name}</span>
                    <span className="text-[11px] text-[#3FB950] font-normal">[man]</span>
                  </button>
                  <span className="text-[10px] text-[#8B949E] bg-[#0D1117] px-2 py-0.5 rounded border border-[#30363D] uppercase tracking-wider font-semibold">
                    {project.status}
                  </span>
                </div>
                <p className="text-[#8B949E] text-xs leading-normal">{project.tagline}</p>
              </div>

              {/* Stack & Action */}
              <div className="flex flex-col md:items-end gap-2 md:w-2/5">
                <div className="flex flex-wrap gap-1">
                  {project.stack.slice(0, 3).map((st) => (
                    <span
                      key={st}
                      className="px-2 py-0.5 text-[10px] bg-[#0D1117] text-[#E6EDF3] border border-[#30363D] rounded font-semibold"
                    >
                      {st}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    onOpenManPage(project)
                  }}
                  className="self-start md:self-end px-3 py-1.5 text-xs bg-[#21262D] hover:bg-[#3FB950] text-[#E6EDF3] hover:text-[#0D1117] border border-[#30363D] hover:border-[#3FB950] font-bold rounded transition-colors whitespace-nowrap cursor-pointer"
                >
                  $ man {project.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#0D1117] border-t border-[#30363D] flex items-center justify-between text-xs text-[#8B949E]">
          <span>{INTERNAL_PROJECTS.length} items · UTF-8 Posix System Manuals</span>
          <span className="text-[#3FB950] font-semibold">Hash route: `#/man/:id`</span>
        </div>
      </div>
    </section>
  )
}
