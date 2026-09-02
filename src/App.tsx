import React, { useEffect, useState } from 'react'

// dinonaktifkan sampai foto di-wire ke Supabase Storage: PhotographySection
import {
  AboutSection,
  ContactSection,
  CvModal,
  Footer,
  JourneySection,
  ManPageModal,
  OpenSourceSection,
  StackSection,
  StickyMiniBar,
  TerminalWindow,
  UsesSection,
  WorksSection,
} from '@/components'
import { INTERNAL_PROJECTS, PERSONAL_INFO } from '@/data/portfolio'
import { Project } from '@/types'

export default function App() {
  const [activeManProject, setActiveManProject] = useState<Project | null>(null)
  const [isCvOpen, setIsCvOpen] = useState(false)

  // Sync hash routing #/man/<projectId>
  useEffect(() => {
    const handleHashChange = () => {
      const hash = globalThis.location.hash
      if (hash.startsWith('#/man/')) {
        const projectId = hash.replace('#/man/', '').trim().toLowerCase()
        const found = INTERNAL_PROJECTS.find(
          (p) => p.id.toLowerCase() === projectId || p.name.toLowerCase() === projectId
        )
        if (found) {
          setActiveManProject(found)
        }
      } else if (hash.startsWith('#/cv')) {
        setIsCvOpen(true)
      }
    }

    handleHashChange()
    globalThis.addEventListener('hashchange', handleHashChange)
    return () => {
      globalThis.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleOpenManPage = (project: Project) => {
    setActiveManProject(project)
    globalThis.location.hash = `#/man/${project.id}`
  }

  const handleCloseManPage = () => {
    setActiveManProject(null)
    if (globalThis.location.hash.startsWith('#/man/')) {
      history.replaceState(null, '', globalThis.location.pathname)
    }
  }

  const handleOpenCv = () => {
    setIsCvOpen(true)
  }

  const handleCloseCv = () => {
    setIsCvOpen(false)
    if (globalThis.location.hash === '#/cv') {
      history.replaceState(null, '', globalThis.location.pathname)
    }
  }

  const handleScrollToSection = (sectionId: string) => {
    const el = document.querySelector(`#${sectionId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-[#0D1117] text-[#E6EDF3] font-mono selection:bg-[#3FB950]/25 selection:text-[#3FB950] flex flex-col justify-between">
      {/* Subtle CRT Scanline overlay */}
      <div className="scanline-overlay fixed inset-0 pointer-events-none z-50" />

      {/* Main Single-Column Container (72–96ch width) */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-20 space-y-16 sm:space-y-20 flex-1">
        {/* Artistic Flair Minimalist Top System Bar */}
        <header className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8B949E] border-b border-[#30363D] pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#F85149]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F0883E]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#3FB950]"></div>
            </div>
            <span className="font-bold text-white tracking-tight uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[#8B949E] hidden sm:inline tracking-wider">
              ({PERSONAL_INFO.title})
            </span>
          </div>

          <nav className="flex items-center gap-3 text-[11px] font-semibold">
            <button
              onClick={() => {
                handleScrollToSection('about')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // about
            </button>
            <button
              onClick={() => {
                handleScrollToSection('stack')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // stack
            </button>
            <button
              onClick={() => {
                handleScrollToSection('journey')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // journey
            </button>
            <button
              onClick={() => {
                handleScrollToSection('works')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // works
            </button>
            <button
              onClick={() => {
                handleScrollToSection('oss')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // oss
            </button>
            <button
              onClick={() => {
                handleScrollToSection('uses')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // uses
            </button>
            <button
              onClick={() => {
                handleScrollToSection('photography')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer hidden md:inline"
            >
              // photo
            </button>
            <button
              onClick={() => {
                handleScrollToSection('contact')
              }}
              className="hover:text-[#3FB950] transition-colors cursor-pointer"
            >
              // contact
            </button>
          </nav>
        </header>

        {/* Hero Section with Grid Dots and Interactive Terminal */}
        <section className="relative pt-2 pb-2">
          {/* Subtle grid background accent strictly for hero */}
          <div className="absolute -inset-4 bg-grid-dots rounded-lg pointer-events-none opacity-40" />

          <div className="relative space-y-4">
            {/* Live Product Demo Hero Terminal */}
            <TerminalWindow
              onOpenManPage={handleOpenManPage}
              onOpenCvModal={handleOpenCv}
              onScrollToSection={handleScrollToSection}
            />
          </div>
        </section>

        {/* Section 01: About */}
        <AboutSection />

        {/* Section 02: Stack */}
        <StackSection />

        {/* Section 03: Journey */}
        <JourneySection />

        {/* Section 04: Works (Internal Binaries & ls -la) */}
        <WorksSection onOpenManPage={handleOpenManPage} />

        {/* Section 05: Open Source Repositories */}
        <OpenSourceSection />

        {/* Section 06: Uses & System Profiler */}
        <UsesSection />

        {/* Section 07: Photography (7 Frames & Supabase Pipeline Fallback) */}
        {/* <PhotographySection /> */}

        {/* Section 08: Contact & Inquiries */}
        <ContactSection onOpenCvModal={handleOpenCv} />

        {/* Footer */}
        <Footer />
      </div>

      {/* Artistic Flair Persistent Session Ticker */}
      <div className="flex-none h-10 bg-[#3FB950] text-[#0D1117] flex items-center px-4 sm:px-8 justify-between font-bold text-xs uppercase tracking-[0.15em] border-t border-[#3FB950] select-none z-30">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0D1117] animate-ping" />
            <span>● ACTIVE SESSION</span>
          </span>
          <span className="hidden sm:inline">// PORTFOLIO V2.0.26</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] sm:text-xs">
          <span className="hidden md:inline">$ COMMANDS: [help] [whoami] [works] [exit]</span>
          <span className="w-2 h-4 bg-[#0D1117] animate-pulse"></span>
        </div>
      </div>

      {/* Sticky Mini Bar on Scroll */}
      <StickyMiniBar
        onOpenCvModal={handleOpenCv}
        onScrollToSection={handleScrollToSection}
        onScrollToTop={handleScrollToTop}
      />

      {/* Case Study Manual Page Modal */}
      <ManPageModal
        project={activeManProject}
        onClose={handleCloseManPage}
        onSelectProject={handleOpenManPage}
      />

      {/* Plain-text / Markdown CV Modal */}
      <CvModal isOpen={isCvOpen} onClose={handleCloseCv} />
    </div>
  )
}
