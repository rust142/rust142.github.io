import React from 'react'

import { useOpenSourceRepos } from '@/hooks/useOpenSourceRepos'

export const OpenSourceSection: React.FC = () => {
  const { repos, isLive, loading } = useOpenSourceRepos('rust142')
  return (
    <section id="oss" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            gh repo list --public
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">github.com/rust142</span>
        <span className="ml-auto text-xs text-[#F0883E] font-mono">
          {loading ? '[… syncing]' : isLive ? '[★ LIVE FROM API]' : '[★ SNAPSHOT SEP 2026]'}
        </span>
      </div>

      {/* Repo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {repos.map((repo, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#161B22] border border-[#30363D] rounded-lg space-y-3 flex flex-col justify-between hover:border-[#3FB950]/60 transition-all group"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-[#3FB950] hover:underline break-all group-hover:text-[#3FB950]"
                >
                  {repo.fullName}
                </a>
                <span className="flex items-center gap-1 text-xs text-[#F0883E] font-bold bg-[#0D1117] px-2 py-0.5 rounded border border-[#30363D] shrink-0">
                  <span>★</span>
                  <span>{repo.stars}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#8B949E] leading-relaxed">{repo.description}</p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1 pt-1">
                {repo.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 bg-[#0D1117] text-[#8B949E] rounded border border-[#30363D] font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Metadata */}
            <div className="pt-3 border-t border-[#30363D] flex items-center justify-between text-[11px] text-[#8B949E]">
              <span className="flex items-center gap-1.5 font-semibold text-[#E6EDF3]">
                <span className="w-2 h-2 rounded-full bg-[#3FB950] inline-block" />
                <span>{repo.language}</span>
              </span>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3FB950] hover:underline font-bold transition-colors"
              >
                view repo &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
