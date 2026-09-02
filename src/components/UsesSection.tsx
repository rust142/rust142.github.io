import React from 'react'

import { SYSTEM_PROFILER_DATA } from '@/data/portfolio'

export const UsesSection: React.FC = () => {
  return (
    <section id="uses" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            system_profiler --env
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">
          hardware &amp; software profile
        </span>
        <span className="ml-auto text-xs text-[#8B949E] font-mono">[ENV_SPECS]</span>
      </div>

      {/* Uses 2-Column Profiler Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SYSTEM_PROFILER_DATA.map((section, idx) => (
          <div key={idx} className="p-4 bg-[#161B22] border border-[#30363D] rounded-lg space-y-3">
            <div className="flex items-center justify-between border-b border-[#30363D] pb-2">
              <h3 className="text-xs font-bold text-[#3FB950] tracking-wider uppercase">
                {section.category}
              </h3>
              <span className="text-[10px] text-[#8B949E] uppercase tracking-wider font-semibold">
                {idx === 0 ? 'DEV_STATION' : 'RUNTIME_ENV'}
              </span>
            </div>

            <div className="space-y-3">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="space-y-0.5 text-xs">
                  <div className="text-[#8B949E] font-mono text-[11px] uppercase tracking-wider">
                    {item.label}:
                  </div>
                  <div className="text-[#E6EDF3] font-bold pl-2">{item.value}</div>
                  {item.detail && (
                    <div className="text-[#8B949E] text-[11px] pl-2 font-mono">{item.detail}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
