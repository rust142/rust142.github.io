import React from 'react'

import { PERSONAL_INFO } from '@/data/portfolio'

interface ContactSectionProps {
  onOpenCvModal: () => void
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCvModal }) => {
  return (
    <section id="contact" className="space-y-6 pt-12 pb-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            contact --channels
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">direct TCP / verified links</span>
        <span className="ml-auto text-xs text-[#3FB950] font-mono">[OPEN CHANNELS]</span>
      </div>

      <div className="p-6 bg-[#161B22] border border-[#30363D] rounded-lg space-y-6">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-white tracking-tight">
            Initiate Direct Engineering Dialogue
          </h3>
          <p className="text-xs sm:text-sm text-[#8B949E] leading-relaxed">
            Interested in discussing backend architecture, high-performance Go services, or
            consulting opportunities? Connect through verified professional channels.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#0D1117] border border-[#30363D] hover:border-[#3FB950] rounded-lg space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3FB950]">GitHub</span>
              <span className="text-[10px] text-[#8B949E] group-hover:text-white">&rarr;</span>
            </div>
            <div className="text-xs font-bold text-[#E6EDF3]">@{PERSONAL_INFO.githubUser}</div>
            <div className="text-[10px] text-[#8B949E]">Public repos, PRs, code reviews</div>
          </a>

          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#0D1117] border border-[#30363D] hover:border-[#3FB950] rounded-lg space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3FB950]">LinkedIn</span>
              <span className="text-[10px] text-[#8B949E] group-hover:text-white">&rarr;</span>
            </div>
            <div className="text-xs font-bold text-[#E6EDF3]">/in/agung-maulana-1b63a1237</div>
            <div className="text-[10px] text-[#8B949E]">Professional history &amp; network</div>
          </a>

          <a
            href={PERSONAL_INFO.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#0D1117] border border-[#30363D] hover:border-[#3FB950] rounded-lg space-y-1 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3FB950]">X (Twitter)</span>
              <span className="text-[10px] text-[#8B949E] group-hover:text-white">&rarr;</span>
            </div>
            <div className="text-xs font-bold text-[#E6EDF3]">@__rustdev</div>
            <div className="text-[10px] text-[#8B949E]">Systems notes &amp; tech thoughts</div>
          </a>
        </div>

        {/* Action Callout Bar */}
        <div className="p-4 bg-[#0D1117] border border-[#30363D] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-bold text-[#E6EDF3]">
              Full Engineering Resume (Markdown / UTF-8)
            </div>
            <div className="text-[#8B949E] text-[11px] font-mono">
              {PERSONAL_INFO.emailPlaceholder}
            </div>
          </div>
          <button
            id="contact-download-cv-btn"
            onClick={onOpenCvModal}
            className="px-4 py-2 bg-[#3FB950] hover:bg-[#3FB950]/90 text-[#0D1117] font-bold text-xs rounded transition-all active:translate-y-px whitespace-nowrap cursor-pointer shadow-md"
          >
            $ download cv --to inbox
          </button>
        </div>
      </div>
    </section>
  )
}
