/**
 * MarkdownWorkspace.jsx
 * Milestone 3 — Full split-pane Markdown workspace.
 *
 * Layout modes:
 *  "split"   — editor left | preview right (default)
 *  "editor"  — editor only (full width)
 *  "preview" — preview only (full width)
 *
 * Features:
 *  - Formatting toolbar (bold, italic, headings, lists, links, tables…)
 *  - Live stats bar (words, chars, lines, read time)
 *  - Font size control
 *  - Export: copy HTML | download .md | clear
 *  - Keyboard shortcuts: Ctrl+B, Ctrl+I, Tab
 */
import { useState, useCallback } from 'react'
import MarkdownEditor   from './MarkdownEditor'
import MarkdownPreview  from './MarkdownPreview'
import CopyButton       from './CopyButton'
import { useMarkdown }  from '../hooks/useMarkdown'
import { DEFAULT_MARKDOWN } from '../data/defaultMarkdown'

/* ─── View mode icons ─── */
const SplitIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <line x1="12" y1="4" x2="12" y2="20"/>
  </svg>
)
const EditorIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/>
  </svg>
)
const PreviewIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)
const DownloadIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const TrashIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6 18 20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>
)

const VIEW_MODES = [
  { key: 'split',   Icon: SplitIcon,   title: 'Split view'    },
  { key: 'editor',  Icon: EditorIcon,  title: 'Editor only'   },
  { key: 'preview', Icon: PreviewIcon, title: 'Preview only'  },
]

/* ─── Stats bar ─── */
function StatsBar({ stats, viewMode, setViewMode, fontSize, setFontSize, onDownload, onClear, html }) {
  return (
    <div className="
      flex items-center justify-between gap-3 px-4 py-2
      border-t border-slate-200 dark:border-slate-700/60
      bg-slate-50 dark:bg-[#15171e]
      text-xs text-slate-500 dark:text-slate-400
      flex-wrap gap-y-2
    ">
      {/* Stats */}
      <div className="flex items-center gap-4">
        <span><span className="font-semibold text-slate-700 dark:text-slate-300">{stats.words}</span> words</span>
        <span><span className="font-semibold text-slate-700 dark:text-slate-300">{stats.chars}</span> chars</span>
        <span><span className="font-semibold text-slate-700 dark:text-slate-300">{stats.lines}</span> lines</span>
        <span className="hidden sm:inline">
          ~<span className="font-semibold text-slate-700 dark:text-slate-300">{stats.readMin}</span> min read
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Font size */}
        <div className="flex items-center gap-1.5">
          <button onClick={() => setFontSize(s => Math.max(11, s - 1))}
            aria-label="Decrease font size"
            className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors">−</button>
          <span className="font-mono w-6 text-center">{fontSize}</span>
          <button onClick={() => setFontSize(s => Math.min(22, s + 1))}
            aria-label="Increase font size"
            className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-colors">+</button>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" aria-hidden="true"/>

        {/* View mode */}
        <div className="flex items-center gap-0.5" role="group" aria-label="View mode">
          {VIEW_MODES.map(({ key, Icon, title }) => (
            <button key={key} onClick={() => setViewMode(key)} title={title} aria-label={title}
              aria-pressed={viewMode === key}
              className={`p-1.5 rounded transition-colors ${
                viewMode === key
                  ? 'bg-brand-600 text-white'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400'
              }`}>
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700" aria-hidden="true"/>

        {/* Export HTML */}
        <CopyButton text={html} label="Copy HTML" />

        {/* Download .md */}
        <button onClick={onDownload} title="Download as .md"
          aria-label="Download Markdown file"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
            bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <DownloadIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">.md</span>
        </button>

        {/* Clear */}
        <button onClick={onClear} title="Clear editor"
          aria-label="Clear editor content"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium
            bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400
            hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400
            transition-colors">
          <TrashIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ─── Main workspace component ─── */
export default function MarkdownWorkspace() {
  const [source, setSource]     = useState(DEFAULT_MARKDOWN)
  const [viewMode, setViewMode] = useState('split')
  const [fontSize, setFontSize] = useState(14)

  const { html, stats } = useMarkdown(source)

  const handleDownload = useCallback(() => {
    const blob = new Blob([source], { type: 'text/markdown;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }, [source])

  const handleClear = useCallback(() => {
    if (window.confirm('Clear all content? This cannot be undone.')) {
      setSource('')
    }
  }, [])

  return (
    <section
      id="panel-markdown-workspace"
      role="tabpanel"
      aria-labelledby="tab-markdown-workspace"
      className="flex flex-col py-8 gap-0"
    >
      {/* Panel header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
          Markdown Workspace
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Write Markdown on the left — see the live rendered preview on the right.
        </p>
      </div>

      {/* Split pane container */}
      <div
        className="
          rounded-2xl overflow-hidden
          border border-slate-200 dark:border-slate-700/60
          bg-white dark:bg-[#1a1d27]
          shadow-sm
        "
        style={{ height: 'calc(100vh - 260px)', minHeight: '480px' }}
      >
        {/* Pane body */}
        <div className="flex h-[calc(100%-2.75rem)] min-h-0">
          {/* Editor pane */}
          {(viewMode === 'split' || viewMode === 'editor') && (
            <div
              className={`
                flex flex-col min-h-0 overflow-hidden
                ${viewMode === 'split' ? 'w-1/2 border-r border-slate-200 dark:border-slate-700/60' : 'w-full'}
              `}
            >
              {/* Pane label */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#15171e]">
                <span className="w-2 h-2 rounded-full bg-brand-500" aria-hidden="true"/>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">editor</span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <MarkdownEditor
                  value={source}
                  onChange={setSource}
                  fontSize={fontSize}
                />
              </div>
            </div>
          )}

          {/* Preview pane */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className={`flex flex-col min-h-0 overflow-hidden ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
              {/* Pane label */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#15171e]">
                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"/>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-mono">preview</span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <MarkdownPreview html={html} isEmpty={!source.trim()} />
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <StatsBar
          stats={stats}
          viewMode={viewMode}
          setViewMode={setViewMode}
          fontSize={fontSize}
          setFontSize={setFontSize}
          onDownload={handleDownload}
          onClear={handleClear}
          html={html}
        />
      </div>
    </section>
  )
}
