import React from 'react'

import { ABOUT_TEXT, PERSONAL_INFO } from '@/data/portfolio'

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            cat /etc/profile/about
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">/src/core/bio.rs</span>
        <span className="ml-auto text-xs text-[#3FB950] font-mono">[VERIFIED SEED]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Monogram Box Portrait Fallback */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#161B22] border border-[#30363D] rounded-lg text-center space-y-4">
          <div className="w-24 h-24 border-2 border-[#3FB950] flex items-center justify-center text-3xl font-black tracking-tighter text-white bg-[#0D1117] shadow-lg">
            {PERSONAL_INFO.initials}
          </div>
          <div className="space-y-1 text-xs">
            <div className="font-bold text-base text-[#E6EDF3] uppercase tracking-wider">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-[#3FB950] font-semibold text-xs">{PERSONAL_INFO.title}</div>
            <div className="text-[#8B949E] text-[11px] uppercase tracking-widest">
              {PERSONAL_INFO.location}
            </div>
          </div>
          <div className="text-[10px] text-[#8B949E] border-t border-[#30363D] pt-3 w-full uppercase tracking-wider">
            // honest avatar monogram
          </div>
        </div>

        {/* Verbatim Mission & Philosophy */}
        <div className="md:col-span-8 space-y-4 text-xs sm:text-sm leading-relaxed text-[#8B949E]">
          <p className="text-[#E6EDF3] font-semibold leading-relaxed text-sm sm:text-base">
            {ABOUT_TEXT.mission}
          </p>

          <p className="leading-relaxed">{ABOUT_TEXT.approach}</p>

          <div className="p-3.5 bg-[#161B22] border-l-2 border-[#3FB950] border-y border-r border-[#30363D] rounded-r text-xs space-y-1.5">
            <div className="text-[#3FB950] font-bold uppercase tracking-widest text-[11px]">
              // ENGINEERING PILLARS
            </div>
            <div className="text-[#E6EDF3] font-medium leading-relaxed">{ABOUT_TEXT.coreFocus}</div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#161B22] border border-[#30363D] rounded">
              <div className="text-[#8B949E] text-[10px] uppercase tracking-wider">Experience</div>
              <div className="text-white font-bold text-sm mt-0.5">{PERSONAL_INFO.experience}</div>
            </div>
            <div className="p-3 bg-[#161B22] border border-[#30363D] rounded">
              <div className="text-[#8B949E] text-[10px] uppercase tracking-wider">
                Primary Stacks
              </div>
              <div className="text-[#3FB950] font-bold text-sm mt-0.5">Go · TypeScript</div>
            </div>
            <div className="p-3 bg-[#161B22] border border-[#30363D] rounded">
              <div className="text-[#8B949E] text-[10px] uppercase tracking-wider">
                Architecture
              </div>
              <div className="text-white font-bold text-sm mt-0.5">Distributed</div>
            </div>
            <div className="p-3 bg-[#161B22] border border-[#30363D] rounded">
              <div className="text-[#8B949E] text-[10px] uppercase tracking-wider">Location</div>
              <div className="text-white font-bold text-sm mt-0.5">Jepara, ID</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
