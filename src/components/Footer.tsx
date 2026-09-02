import React, { useEffect, useState } from 'react'

import { PERSONAL_INFO } from '@/data/portfolio'

export const Footer: React.FC = () => {
  const [sessionUptime, setSessionUptime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionUptime((prev) => prev + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatUptime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins}m ${secs.toString().padStart(2, '0')}s`
  }

  return (
    <footer className="pt-16 pb-20 border-t border-[#30363D] text-xs text-[#8B949E] font-mono space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[#3FB950] font-bold">$ exit --keep-alive</div>
          <div className="text-[11px] text-[#8B949E]">
            Process 4102 exited with status 0. Session retained on{' '}
            <span className="text-[#E6EDF3] font-bold">pku-mayong</span>.
          </div>
        </div>

        <div className="text-[11px] text-right space-y-0.5">
          <div>
            SESSION UPTIME:{' '}
            <span className="text-[#3FB950] font-bold">{formatUptime(sessionUptime)}</span>
          </div>
          <div>
            LOC: <span className="text-[#E6EDF3] font-bold">{PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#30363D] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8B949E]">
        <div>
          &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All systems engineered with
          verified provenance.
        </div>
        <div className="flex items-center gap-3">
          <span>Go · Linux · TypeScript</span>
        </div>
      </div>
    </footer>
  )
}
