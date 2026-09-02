import React, { useState } from 'react'

import { CV_MARKDOWN, PERSONAL_INFO } from '@/data/portfolio'

interface CvModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(CV_MARKDOWN)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleDownloadTxt = () => {
    setDownloading(true)
    const blob = new Blob([CV_MARKDOWN], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `agung_maulana_resume.md`)
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    setTimeout(() => {
      setDownloading(false)
    }, 600)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Resume - ${PERSONAL_INFO.name}</title>
            <style>
              body {
                font-family: 'JetBrains Mono', 'Courier New', monospace;
                font-size: 12px;
                line-height: 1.4;
                color: #111;
                padding: 30px;
                white-space: pre-wrap;
              }
            </style>
          </head>
          <body>${CV_MARKDOWN.replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  }

  return (
    <div
      id="cv-export-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0D1117]/85 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl my-auto text-[#E6EDF3] font-mono text-xs leading-relaxed overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D1117] border-b border-[#30363D]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#F85149]" />
            <span className="inline-block w-3 h-3 rounded-full bg-[#E3B341]" />
            <span className="inline-block w-3 h-3 rounded-full bg-[#3FB950]" />
            <span
              id="cv-modal-title"
              className="ml-2 text-xs text-[#8B949E] tracking-wider uppercase font-semibold"
            >
              $ cat /etc/agung_maulana_resume.txt
            </span>
          </div>
          <button
            id="close-cv-modal-btn"
            onClick={onClose}
            className="px-2 py-0.5 text-xs text-[#8B949E] hover:text-[#3FB950] hover:bg-[#21262D] rounded transition-colors cursor-pointer"
          >
            [X] CLOSE
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0D1117]/60 border-b border-[#30363D] text-xs">
          <div className="text-[#8B949E]">
            Size: <span className="text-[#E6EDF3] font-bold">3.4 KB</span> · Format:{' '}
            <span className="text-[#3FB950] font-semibold">POSIX UTF-8 PlainText / Markdown</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="copy-cv-btn"
              onClick={handleCopy}
              className="px-2.5 py-1 bg-[#21262D] hover:bg-[#30363D] text-[#E6EDF3] border border-[#30363D] rounded font-semibold transition-all active:translate-y-px cursor-pointer"
            >
              {copied ? '✓ COPIED TO CLIPBOARD' : '[COPY TEXT]'}
            </button>
            <button
              id="download-cv-file-btn"
              onClick={handleDownloadTxt}
              disabled={downloading}
              className="px-3 py-1 bg-[#3FB950] hover:bg-[#3FB950]/90 text-[#0D1117] font-bold rounded transition-all active:translate-y-px cursor-pointer"
            >
              {downloading ? 'DOWNLOADING...' : '$ DOWNLOAD .MD'}
            </button>
            <button
              id="print-cv-btn"
              onClick={handlePrint}
              className="px-2.5 py-1 bg-[#21262D] hover:bg-[#30363D] text-[#8B949E] hover:text-[#E6EDF3] border border-[#30363D] rounded transition-all cursor-pointer"
            >
              [PRINT]
            </button>
          </div>
        </div>

        {/* CV Content */}
        <div className="p-4 sm:p-6 max-h-[65vh] overflow-y-auto bg-[#0D1117] text-[#E6EDF3] select-text">
          <pre className="whitespace-pre-wrap font-mono text-[11px] sm:text-xs text-[#E6EDF3] leading-relaxed">
            {CV_MARKDOWN}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0D1117] border-t border-[#30363D] text-[11px] text-[#8B949E]">
          <span>EOF — Verified Data (§3–4 PRD Seed)</span>
          <span className="text-[#3FB950] font-semibold">Status: READY</span>
        </div>
      </div>
    </div>
  )
}
