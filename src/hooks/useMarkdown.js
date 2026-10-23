/**
 * useMarkdown.js
 * Custom hook — parses Markdown → safe HTML using `marked` + `DOMPurify`.
 * Also computes editor stats (words, lines, chars, read time).
 */
import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'

// Configure marked with highlight.js code highlighting
marked.setOptions({
  gfm: true,        // GitHub-flavoured Markdown
  breaks: true,     // line breaks as <br>
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    }
    return hljs.highlightAuto(code).value
  },
})

export function useMarkdown(source) {
  const html = useMemo(() => {
    if (!source.trim()) return ''
    const raw = marked.parse(source)
    return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } })
  }, [source])

  const stats = useMemo(() => {
    const trimmed = source.trim()
    const words   = trimmed ? trimmed.split(/\s+/).length : 0
    const chars   = source.length
    const lines   = source.split('\n').length
    const readMin = Math.max(1, Math.ceil(words / 200))
    return { words, chars, lines, readMin }
  }, [source])

  return { html, stats }
}
