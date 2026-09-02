import React, { useEffect, useState } from 'react'

import { PERSONAL_INFO } from '@/data/portfolio'

interface StickyMiniBarProps {
  onOpenCvModal: () => void
  onScrollToSection: (sectionId: string) => void
  onScrollToTop: () => void
}

export const StickyMiniBar: React.FC<StickyMiniBarProps> = ({
  onOpenCvModal,
  onScrollToSection,
  onScrollToTop,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 320px
      if (window.scrollY > 320) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      id="sticky-terminal-mini-bar"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-[#161B22]/95 backdrop-blur-md border border-[#30363D] rounded-lg px-3 sm:px-4 py-2 text-xs font-mono shadow-2xl flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3FB950] animate-pulse shrink-0" />
        <button
          onClick={onScrollToTop}
          className="text-white font-bold hover:text-[#3FB950] transition-colors truncate text-xs cursor-pointer"
        >
          {PERSONAL_INFO.handle}{' '}
          <span className="text-[#8B949E] font-normal hidden sm:inline">~ tty1</span>
        </button>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <nav className="hidden md:flex items-center gap-2.5 text-[11px] text-[#8B949E]">
          <button
            onClick={() => {
              onScrollToSection('about')
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            about
          </button>
          <span>·</span>
          <button
            onClick={() => {
              onScrollToSection('stack')
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            stack
          </button>
          <span>·</span>
          <button
            onClick={() => {
              onScrollToSection('works')
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            works
          </button>
          <span>·</span>
          <button
            onClick={() => {
              onScrollToSection('oss')
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            oss
          </button>
          <span>·</span>
          <button
            onClick={() => {
              onScrollToSection('contact')
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            contact
          </button>
        </nav>

        <button
          id="sticky-download-cv-btn"
          onClick={onOpenCvModal}
          className="px-3 py-1 bg-[#3FB950] hover:bg-[#3FB950]/90 text-[#0D1117] font-bold rounded text-xs transition-all active:translate-y-px whitespace-nowrap cursor-pointer shadow"
        >
          $ download cv
        </button>

        <button
          onClick={onScrollToTop}
          className="p-1 text-[#8B949E] hover:text-white hover:bg-[#21262D] rounded transition-colors text-xs cursor-pointer"
          title="Scroll to Top"
        >
          [TOP ↑]
        </button>
      </div>
    </div>
  )
}
