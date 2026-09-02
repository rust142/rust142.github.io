import React, { useState } from 'react'

import { PHOTOGRAPHY_FRAMES } from '@/data/portfolio'
import { PhotoFrame } from '@/types'

export const PhotographySection: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<PhotoFrame | null>(null)

  return (
    <section id="photography" className="space-y-6 pt-12">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-[#30363D] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[#3FB950] font-bold">$</span>
          <span className="text-[#E6EDF3] font-bold text-sm tracking-wider uppercase">
            gallery --source supabase
          </span>
        </div>
        <span className="text-[#8B949E] text-xs hidden sm:inline">7 frames · Central Java, ID</span>
        <span className="ml-auto text-xs text-[#3FB950] font-mono">[4:3 SENSOR PIPELINE]</span>
      </div>

      {/* Narrative Header */}
      <div className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-lg text-xs space-y-1">
        <div className="text-[#E6EDF3] font-bold uppercase tracking-wider">
          Visual Notes: 7 Frames across Central Java, Indonesia
        </div>
        <p className="text-[#8B949E] leading-relaxed">
          Analog-inspired frames captured on Fujifilm digital sensors. Asset pipeline configured to
          stream from Supabase Cloud Object Storage. Authentic metadata and technical camera
          parameters documented below.
        </p>
      </div>

      {/* 4:3 Aspect Photography Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PHOTOGRAPHY_FRAMES.map((frame) => (
          <div
            key={frame.id}
            onClick={() => {
              setSelectedFrame(frame)
            }}
            className="p-3 bg-[#161B22] border border-[#30363D] rounded-lg space-y-2.5 hover:border-[#3FB950]/50 transition-all cursor-pointer group"
          >
            {/* 4:3 Aspect Frame with Honest Fallback */}
            <div className="relative aspect-4/3 w-full bg-[#0D1117] border border-[#30363D] rounded overflow-hidden flex flex-col justify-between p-3 select-none">
              <div className="flex items-center justify-between text-[10px] text-[#8B949E]">
                <span className="font-bold">FRAME #{frame.id.toString().padStart(2, '0')}</span>
                <span className="text-[#3FB950] font-bold uppercase">[{frame.category}]</span>
              </div>

              {/* Center Wireframe / Graphic Glyph */}
              <div className="text-center space-y-1">
                <div className="text-[#8B949E] text-xs font-mono group-hover:text-[#3FB950] transition-colors font-bold">
                  [ 4:3 STORAGE FRAME ]
                </div>
                <div className="text-[11px] text-[#E6EDF3] font-bold">{frame.title}</div>
                <div className="text-[10px] text-[#8B949E]">// photo syncs from storage</div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#8B949E] border-t border-[#30363D] pt-1.5 font-mono">
                <span>
                  {frame.location ? frame.location.split(',')[0] : `// frame ${frame.id}`}
                </span>
                <span>
                  {frame.exif
                    ? `${frame.exif.iso} · ${frame.exif.aperture}`
                    : 'awaiting storage sync'}
                </span>
              </div>
            </div>

            {/* Frame Metadata Details */}
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#E6EDF3]">{frame.title}</span>
                <span className="text-[10px] text-[#8B949E] font-semibold">{frame.date}</span>
              </div>
              <div className="text-[11px] text-[#8B949E] truncate font-mono">
                Loc: {frame.location ?? 'syncs from Supabase Storage'}
              </div>
              {frame.exif ? (
                <div className="pt-1 text-[10px] font-mono text-[#8B949E] bg-[#0D1117] p-2 rounded border border-[#30363D] flex flex-wrap gap-x-2">
                  <span>{frame.exif.camera}</span>
                  <span>·</span>
                  <span>{frame.exif.lens}</span>
                  <span>·</span>
                  <span>{frame.exif.shutter}</span>
                </div>
              ) : (
                <div className="pt-1 text-[10px] font-mono text-[#8B949E] bg-[#0D1117] p-2 rounded border border-[#30363D]">
                  // EXIF menunggu foto asli di-wire ke storage — tidak diarang
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Frame Detail Modal if selected */}
      {selectedFrame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0D1117]/85 backdrop-blur-xs"
          onClick={() => {
            setSelectedFrame(null)
          }}
        >
          <div
            className="w-full max-w-lg bg-[#161B22] border border-[#30363D] rounded-lg p-5 space-y-4 font-mono text-xs shadow-2xl"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex items-center justify-between border-b border-[#30363D] pb-2.5">
              <span className="text-[#3FB950] font-bold">
                FRAME INSPECTION — #{selectedFrame.id.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => {
                  setSelectedFrame(null)
                }}
                className="text-[#8B949E] hover:text-white font-bold cursor-pointer"
              >
                [ESC / CLOSE]
              </button>
            </div>

            <div className="aspect-4/3 w-full bg-[#0D1117] border border-[#30363D] rounded flex flex-col items-center justify-center p-6 text-center space-y-2">
              <div className="text-base font-bold text-white uppercase">{selectedFrame.title}</div>
              <div className="text-xs text-[#3FB950] font-bold">
                Category: {selectedFrame.category}
              </div>
              <div className="text-[11px] text-[#8B949E] max-w-xs">
                Remote Key:{' '}
                <code className="text-[#E6EDF3]">photos/{selectedFrame.storageKey}.raw</code>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-[#8B949E] bg-[#0D1117] border border-[#30363D] p-3 rounded">
              <div>
                <strong className="text-[#E6EDF3]">Location:</strong>{' '}
                {selectedFrame.location ?? 'syncs from Supabase Storage'}
              </div>
              <div>
                <strong className="text-[#E6EDF3]">Captured:</strong> {selectedFrame.date ?? '—'}
              </div>
              {selectedFrame.exif ? (
                <>
                  <div>
                    <strong className="text-[#E6EDF3]">Camera:</strong> {selectedFrame.exif.camera}
                  </div>
                  <div>
                    <strong className="text-[#E6EDF3]">Optics:</strong> {selectedFrame.exif.lens}
                  </div>
                  <div>
                    <strong className="text-[#E6EDF3]">Exposure:</strong> ISO{' '}
                    {selectedFrame.exif.iso}, {selectedFrame.exif.aperture},{' '}
                    {selectedFrame.exif.shutter}
                  </div>
                </>
              ) : (
                <div className="text-[#F0883E]">
                  // EXIF tidak tersedia di source data — menunggu foto asli di-wire ke storage
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
