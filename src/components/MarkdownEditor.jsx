/**
 * MarkdownEditor.jsx
 * The left pane: a styled textarea with line numbers, toolbar, and keyboard shortcuts.
 */
import { useRef, useCallback } from 'react'
import EditorToolbar from './EditorToolbar'

export default function MarkdownEditor({ value, onChange, fontSize }) {
  const textareaRef = useRef(null)
  const lineNumRef  = useRef(null)

  /* ── Sync line numbers scroll with textarea ── */
  const syncScroll = useCallback(() => {
    if (lineNumRef.current && textareaRef.current) {
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  /* ── Keyboard shortcuts ── */
  const handleKeyDown = useCallback((e) => {
    const ta = textareaRef.current
    if (!ta) return

    // Tab → insert 2 spaces (don't lose focus)
    if (e.key === 'Tab') {
      e.preventDefault()
      const { selectionStart: s, selectionEnd: end, value: v } = ta
      const next = v.slice(0, s) + '  ' + v.slice(end)
      onChange(next)
      requestAnimationFrame(() => ta.setSelectionRange(s + 2, s + 2))
      return
    }

    // Ctrl/Cmd + B → bold
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault()
      applyWrap(ta, '**', '**', 'bold text', onChange)
    }

    // Ctrl/Cmd + I → italic
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault()
      applyWrap(ta, '*', '*', 'italic text', onChange)
    }
  }, [onChange])

  /* ── Auto-continue lists on Enter ── */
  const handleKeyUp = useCallback((e) => {
    if (e.key !== 'Enter') return
    // handled by textarea natural behaviour — no-op for now
  }, [])

  const lines = value.split('\n')

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-[#1a1d27]">
      {/* Toolbar */}
      <EditorToolbar textareaRef={textareaRef} onContentChange={onChange} />

      {/* Editor body */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Line numbers */}
        <div
          ref={lineNumRef}
          aria-hidden="true"
          className="
            select-none overflow-hidden flex-shrink-0
            w-10 py-4 text-right pr-3
            text-xs font-mono leading-[1.7]
            text-slate-300 dark:text-slate-600
            bg-slate-50 dark:bg-[#15171e]
            border-r border-slate-100 dark:border-slate-800
          "
          style={{ fontSize: `${fontSize}px` }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="markdown-editor-textarea"
          aria-label="Markdown source editor"
          spellCheck={false}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onScroll={syncScroll}
          className="
            flex-1 resize-none outline-none border-none
            py-4 px-4
            font-mono leading-[1.7]
            bg-white dark:bg-[#1a1d27]
            text-slate-800 dark:text-slate-200
            placeholder-slate-400 dark:placeholder-slate-600
            caret-brand-500
          "
          style={{ fontSize: `${fontSize}px` }}
          placeholder="Start typing Markdown here…"
        />
      </div>
    </div>
  )
}

/* ── Helper: wrap selected text ── */
function applyWrap(ta, open, close, placeholder, onChange) {
  const { selectionStart: s, selectionEnd: e, value: v } = ta
  const sel    = v.slice(s, e) || placeholder
  const result = v.slice(0, s) + open + sel + close + v.slice(e)
  onChange(result)
  requestAnimationFrame(() => {
    ta.focus()
    ta.setSelectionRange(s + open.length, s + open.length + sel.length)
  })
}
