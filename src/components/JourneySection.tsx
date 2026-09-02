import React, { useState } from 'react'

import { JOURNEY_LOGS } from '@/data/portfolio'

const MAX_VISIBLE = 3

export const JourneySection: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  return (
    <section id="journey" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            git log --oneline --graph
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">origin/main --decorate</span>
        <span className="ml-auto text-xs text-[#8B949E] font-mono">[5 RELEASES / MILESTONES]</span>
      </div>

      {/* Git Log Stream */}
      <div className="space-y-4 font-mono">
        {JOURNEY_LOGS.map((item) => {
          const isHead = item.tag === 'HEAD'
          const isInit = item.tag === 'INIT'
          const hasMore = item.highlights.length > MAX_VISIBLE
          const isOpen = !!expanded[item.hash]
          const shown = hasMore && !isOpen ? item.highlights.slice(0, MAX_VISIBLE) : item.highlights

          return (
            <div key={item.hash} className="relative pl-6 sm:pl-8 pb-4 group">
              {/* Vertical Git Line */}
              {!isInit && (
                <div className="absolute left-2.5 sm:left-3.5 top-4 bottom-0 w-0.5 bg-[#30363D] group-hover:bg-[#3FB950]/50 transition-colors" />
              )}

              {/* Commit Node */}
              <div
                className={`absolute left-1 sm:left-2 top-1.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                  isHead ? 'border-[#3FB950] bg-[#3FB950]/20' : 'border-[#8B949E] bg-[#161B22]'
                }`}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${isHead ? 'bg-[#3FB950]' : 'bg-[#8B949E]'}`}
                />
              </div>

              {/* Milestone Card */}
              <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-lg space-y-3 transition-all group-hover:border-[#3FB950]/40">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#30363D] pb-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#F0883E] font-bold">commit {item.hash}</span>
                    {item.tag && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-bold tracking-wider ${
                          isHead
                            ? 'text-[#3FB950] bg-[#3FB950]/15 border border-[#3FB950]/30'
                            : 'text-[#8B949E] bg-[#0D1117] border border-[#30363D]'
                        }`}
                      >
                        {item.tag === 'HEAD' ? 'HEAD -> main, origin/main' : `tag: ${item.tag}`}
                      </span>
                    )}
                    <span className="text-white font-bold text-sm tracking-tight">
                      {item.company}
                    </span>
                  </div>

                  <div className="text-xs text-[#8B949E] font-semibold">{item.date}</div>
                </div>

                {/* Role & Context */}
                <div className="text-xs space-y-1">
                  <div className="text-[#3FB950] font-bold">
                    Role: {item.role}{' '}
                    <span className="text-[#8B949E] font-normal">({item.location})</span>
                  </div>
                  <p className="text-[#E6EDF3] leading-relaxed">{item.description}</p>
                </div>

                {/* Key Deliverables */}
                <div className="space-y-1 pt-1.5 border-t border-[#30363D]">
                  <div className="text-[10px] text-[#8B949E] uppercase tracking-widest font-bold">
                    KEY COMMIT DELIVERABLES:
                  </div>
                  {shown.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#8B949E]">
                      <span className="text-[#3FB950] select-none font-bold">├─</span>
                      <span>{h}</span>
                    </div>
                  ))}
                  {hasMore && (
                    <button
                      onClick={() => {
                        setExpanded((e) => ({ ...e, [item.hash]: !isOpen }))
                      }}
                      aria-expanded={isOpen}
                      className="mt-1 text-[10px] font-bold tracking-wider text-[#3FB950] hover:underline focus-visible:underline"
                    >
                      {isOpen
                        ? '└─ less −'
                        : `└─ more +${item.highlights.length - MAX_VISIBLE} (man page)`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
