/**
 * GradientGenerator.jsx
 * Live CSS gradient builder — supports linear & radial gradients
 * with up to 5 color stops, angle control, and live preview.
 */
import { useState, useMemo } from 'react'
import CopyButton from './CopyButton'

const PRESETS = [
  { name: 'Ocean',    stops: ['#0ea5e9', '#6366f1'], angle: 135 },
  { name: 'Sunset',  stops: ['#f97316', '#ec4899', '#8b5cf6'], angle: 135 },
  { name: 'Mint',    stops: ['#10b981', '#06b6d4'], angle: 90 },
  { name: 'Cherry',  stops: ['#f43f5e', '#fb923c'], angle: 45 },
  { name: 'Midnight',stops: ['#1e1b4b', '#4338ca', '#0ea5e9'], angle: 160 },
  { name: 'Gold',    stops: ['#f59e0b', '#fbbf24', '#fde68a'], angle: 90 },
]

function ColorStop({ stop, index, onColorChange, onRemove, canRemove }) {
  return (
    <div className="flex items-center gap-2">
      {/* Swatch picker */}
      <label
        htmlFor={`stop-color-${index}`}
        className="relative w-8 h-8 rounded-lg overflow-hidden cursor-pointer border-2 border-slate-200 dark:border-slate-600 shadow-sm hover:scale-105 transition-transform"
        style={{ background: stop }}
        title={`Color stop ${index + 1}`}
      >
        <input
          id={`stop-color-${index}`}
          type="color"
          value={stop}
          onChange={(e) => onColorChange(index, e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>

      {/* Hex value */}
      <input
        type="text"
        value={stop}
        onChange={(e) => {
          const val = e.target.value
          if (/^#[0-9a-fA-F]{0,6}$/.test(val)) onColorChange(index, val)
        }}
        maxLength={7}
        className="
          w-24 px-2 py-1 rounded-md text-xs font-mono
          bg-slate-100 dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          text-slate-700 dark:text-slate-300
          focus:outline-none focus:ring-2 focus:ring-brand-500
        "
        aria-label={`Hex color for stop ${index + 1}`}
      />

      {/* Remove stop */}
      {canRemove && (
        <button
          onClick={() => onRemove(index)}
          aria-label={`Remove color stop ${index + 1}`}
          className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default function GradientGenerator() {
  const [type, setType]   = useState('linear')   // "linear" | "radial"
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState(['#6366f1', '#0ea5e9'])

  /* ── Derived CSS ── */
  const gradientCSS = useMemo(() => {
    const stopsStr = stops.join(', ')
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`
    return `linear-gradient(${angle}deg, ${stopsStr})`
  }, [type, angle, stops])

  const fullCSS = `background: ${gradientCSS};`

  /* ── Handlers ── */
  const updateStop   = (i, v) => setStops((s) => s.map((c, idx) => (idx === i ? v : c)))
  const removeStop   = (i)    => setStops((s) => s.filter((_, idx) => idx !== i))
  const addStop      = ()     => setStops((s) => [...s, '#ffffff'])
  const applyPreset  = (p)    => { setStops(p.stops); setAngle(p.angle) }

  return (
    <div className="tool-card">
      {/* Header */}
      <div className="tool-card-header">
        <div className="tool-card-icon bg-gradient-to-br from-violet-500 to-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/>
          </svg>
        </div>
        <div>
          <h2 className="tool-card-title">Gradient Generator</h2>
          <p className="tool-card-subtitle">Linear &amp; radial — live preview</p>
        </div>
      </div>

      {/* Live preview */}
      <div
        className="w-full h-28 rounded-xl mb-5 shadow-inner transition-all duration-300"
        style={{ background: gradientCSS }}
        aria-label="Gradient live preview"
      />

      {/* Presets */}
      <div className="mb-5">
        <p className="control-label mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium
                bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ background: `linear-gradient(90deg,${p.stops.join(',')})` }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Type */}
        <div>
          <p className="control-label mb-2">Type</p>
          <div className="flex gap-2">
            {['linear', 'radial'].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize
                  ${type === t
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Angle (linear only) */}
        {type === 'linear' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="gradient-angle" className="control-label">Angle</label>
              <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{angle}°</span>
            </div>
            <input
              id="gradient-angle"
              type="range" min="0" max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="range-slider"
            />
          </div>
        )}

        {/* Color stops */}
        <div>
          <p className="control-label mb-2">Color Stops</p>
          <div className="space-y-2">
            {stops.map((stop, i) => (
              <ColorStop
                key={i}
                stop={stop}
                index={i}
                onColorChange={updateStop}
                onRemove={removeStop}
                canRemove={stops.length > 2}
              />
            ))}
          </div>
          {stops.length < 5 && (
            <button
              onClick={addStop}
              className="mt-2 text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="w-3.5 h-3.5" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add stop
            </button>
          )}
        </div>
      </div>

      {/* Output */}
      <div className="code-output-block">
        <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all">{fullCSS}</code>
        <CopyButton text={fullCSS} />
      </div>
    </div>
  )
}
