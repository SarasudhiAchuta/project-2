/**
 * CopyButton.jsx
 * Reusable "Copy to clipboard" button with animated tick feedback.
 */
import { useState } from 'react'

const CopyIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export default function CopyButton({ text, label = 'Copy CSS', className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : label}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
        transition-all duration-200 select-none
        ${copied
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
          : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }
        ${className}
      `}
    >
      {copied
        ? <CheckIcon className="w-3.5 h-3.5" />
        : <CopyIcon className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}
