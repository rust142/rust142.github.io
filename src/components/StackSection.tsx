import React from 'react'

import { STACK_CATEGORIES } from '@/data/portfolio'

export const StackSection: React.FC = () => {
  return (
    <section id="stack" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            stack --inspect
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">/sys/kernel/capabilities</span>
        <span className="ml-auto text-xs text-[#3FB950] font-mono">
          [3 GROUPS · PRODUCTION READY]
        </span>
      </div>

      {/* Stack Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STACK_CATEGORIES.map((category, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#161B22] border border-[#30363D] rounded-lg space-y-3 flex flex-col justify-between hover:border-[#3FB950]/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-2">
                <h3 className="text-xs font-bold text-white tracking-wider uppercase">
                  {category.title}
                </h3>
                <span className="text-[10px] text-[#3FB950] bg-[#3FB950]/10 px-2 py-0.5 rounded border border-[#3FB950]/30 font-bold">
                  {category.level}
                </span>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#E6EDF3] flex items-center gap-1.5">
                        <span className="text-[#3FB950]">▸</span> {item.name}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] text-[#8B949E] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#30363D]">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8B949E] leading-normal pl-4">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#30363D] text-[10px] text-[#8B949E]/80 uppercase tracking-wider">
              ▸ verified production deployment
            </div>
          </div>
        ))}
      </div>

      {/* Status Bar Mono */}
      <div className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3FB950] inline-block" />
          <span className="text-white font-bold tracking-wider uppercase">
            TOOLCHAIN STATUS: OPTIMAL
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[#8B949E] text-[11px]">
          <span>
            UPTIME: <strong className="text-[#E6EDF3]">99.98%</strong>
          </span>
          <span>
            LATENCY (p99): <strong className="text-[#3FB950]">&lt; 8ms</strong>
          </span>
          <span>
            COMPILER: <strong className="text-[#E6EDF3]">go1.23 / node · bun</strong>
          </span>
        </div>
      </div>
    </section>
  )
}
