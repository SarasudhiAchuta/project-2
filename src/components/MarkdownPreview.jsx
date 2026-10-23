/**
 * MarkdownPreview.jsx
 * Right pane — renders safe HTML from the Markdown hook.
 * Applies GitHub-style prose typography via scoped CSS classes.
 */
import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'

export default function MarkdownPreview({ html, isEmpty }) {
  const containerRef = useRef(null)

  /* Re-highlight any code blocks whenever html changes */
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block)
    })
  }, [html])

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400 dark:text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="w-10 h-10 opacity-40" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
          <line x1="8" y1="9" x2="10" y2="9"/>
        </svg>
        <p className="text-sm font-medium">Start typing to see the preview</p>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div
        ref={containerRef}
        id="markdown-preview-output"
        aria-label="Rendered Markdown preview"
        className="md-prose px-6 py-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
