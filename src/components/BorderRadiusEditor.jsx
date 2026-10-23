/**
 * BorderRadiusEditor.jsx
 * Visual border-radius editor with per-corner control
 * and shape presets. Shows a live preview box.
 */
import { useState, useMemo } from 'react'
import CopyButton from './CopyButton'

const CORNERS = [
  { key: 'tl', label: 'Top Left',     pos: 'top-0 left-0' },
  { key: 'tr', label: 'Top Right',    pos: 'top-0 right-0' },
  { key: 'bl', label: 'Bottom Left',  pos: 'bottom-0 left-0' },
  { key: 'br', label: 'Bottom Right', pos: 'bottom-0 right-0' },
]

const PRESETS = [
  { name: 'Square',  values: { tl: 0,  tr: 0,  bl: 0,  br: 0 } },
  { name: 'Rounded', values: { tl: 8,  tr: 8,  bl: 8,  br: 8 } },
  { name: 'Pill',    values: { tl: 50, tr: 50, bl: 50, br: 50 } },
  { name: 'Leaf',    values: { tl: 0,  tr: 48, bl: 48, br: 0 } },
  { name: 'Blob',    values: { tl: 30, tr: 70, bl: 70, br: 30 } },
  { name: 'Ticket',  values: { tl: 16, tr: 0,  bl: 0,  br: 16 } },
]

export default function BorderRadiusEditor() {
  const [linked, setLinked]   = useState(true)  // lock all corners together
  const [corners, setCorners] = useState({ tl: 12, tr: 12, bl: 12, br: 12 })
  const [unit, setUnit]       = useState('px')  // 'px' | '%'

  const updateCorner = (key, val) => {
    if (linked) {
      setCorners({ tl: val, tr: val, bl: val, br: val })
    } else {
      setCorners((prev) => ({ ...prev, [key]: val }))
    }
  }

  const applyPreset = (p) => {
    setLinked(false)
    setCorners(p.values)
  }

  const borderRadius = useMemo(() => {
    const u = unit
    const { tl, tr, bl, br } = corners
    if (tl === tr && tr === bl && bl === br) return `${tl}${u}`
    return `${tl}${u} ${tr}${u} ${br}${u} ${bl}${u}`
  }, [corners, unit])

  const fullCSS = `border-radius: ${borderRadius};`

  return (
    <div className="tool-card">
      {/* Header */}
      <div className="tool-card-header">
        <div className="tool-card-icon bg-gradient-to-br from-rose-500 to-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <path d="M3 7c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v10c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V7z"/>
          </svg>
        </div>
        <div>
          <h2 className="tool-card-title">Border Radius Editor</h2>
          <p className="tool-card-subtitle">Per-corner control — live preview</p>
        </div>
      </div>

      {/* Live preview */}
      <div className="w-full h-32 mb-5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-xl">
        <div
          className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg transition-all duration-200"
          style={{ borderRadius }}
          aria-label="Border radius live preview"
        />
      </div>

      {/* Presets */}
      <div className="mb-5">
        <p className="control-label mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium
                bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Unit + Link toggle */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {['px', '%'].map((u) => (
              <button key={u} onClick={() => setUnit(u)}
                className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all
                  ${unit === u
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                {u}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="control-label">Link corners</span>
            <div className="relative">
              <input type="checkbox" checked={linked}
                onChange={(e) => setLinked(e.target.checked)}
                className="sr-only peer" id="radius-link" />
              <div className="w-9 h-5 rounded-full bg-slate-300 dark:bg-slate-700 peer-checked:bg-brand-600 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all peer-checked:translate-x-4" />
            </div>
          </label>
        </div>

        {/* Sliders for each corner */}
        {CORNERS.map(({ key, label }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor={`radius-${key}`} className="control-label">{label}</label>
              <span className="text-xs font-mono text-brand-600 dark:text-brand-400">
                {corners[key]}{unit}
              </span>
            </div>
            <input
              id={`radius-${key}`}
              type="range"
              min={0}
              max={unit === 'px' ? 100 : 50}
              value={corners[key]}
              onChange={(e) => updateCorner(key, Number(e.target.value))}
              className="range-slider"
            />
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="code-output-block">
        <code className="text-xs font-mono text-slate-700 dark:text-slate-300">{fullCSS}</code>
        <CopyButton text={fullCSS} />
      </div>
    </div>
  )
}
