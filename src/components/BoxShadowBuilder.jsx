/**
 * BoxShadowBuilder.jsx
 * Interactive box-shadow composer with multi-layer support,
 * live preview, and CSS output.
 */
import { useState, useMemo } from 'react'
import CopyButton from './CopyButton'

const DEFAULT_SHADOW = {
  inset: false,
  x: 0,
  y: 8,
  blur: 24,
  spread: -4,
  color: '#000000',
  opacity: 20,
}

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`
}

function shadowToCSS(s) {
  const rgba = hexToRgba(s.color, s.opacity)
  return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${rgba}`
}

const PRESETS = [
  {
    name: 'Soft',
    layers: [{ ...DEFAULT_SHADOW, y: 4, blur: 6, spread: -1, opacity: 10 },
             { ...DEFAULT_SHADOW, y: 10, blur: 15, spread: -3, opacity: 10 }],
  },
  {
    name: 'Elevated',
    layers: [{ ...DEFAULT_SHADOW, y: 10, blur: 30, spread: -5, opacity: 20 },
             { ...DEFAULT_SHADOW, y: 4, blur: 6, spread: -2, opacity: 15 }],
  },
  {
    name: 'Glow',
    layers: [{ ...DEFAULT_SHADOW, y: 0, blur: 20, spread: 2, color: '#6366f1', opacity: 40 }],
  },
  {
    name: 'Harsh',
    layers: [{ ...DEFAULT_SHADOW, x: 4, y: 4, blur: 0, spread: 0, opacity: 40 }],
  },
]

function SliderRow({ id, label, min, max, value, onChange, unit = 'px' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="control-label">{label}</label>
        <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{value}{unit}</span>
      </div>
      <input id={id} type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-slider" />
    </div>
  )
}

export default function BoxShadowBuilder() {
  const [layers, setLayers]         = useState([{ ...DEFAULT_SHADOW }])
  const [activeLayer, setActiveLayer] = useState(0)

  const layer = layers[activeLayer] ?? layers[0]

  const updateLayer = (key, val) =>
    setLayers((prev) => prev.map((l, i) => i === activeLayer ? { ...l, [key]: val } : l))

  const addLayer = () => {
    const next = [...layers, { ...DEFAULT_SHADOW }]
    setLayers(next)
    setActiveLayer(next.length - 1)
  }

  const removeLayer = (i) => {
    if (layers.length === 1) return
    const next = layers.filter((_, idx) => idx !== i)
    setLayers(next)
    setActiveLayer(Math.min(activeLayer, next.length - 1))
  }

  const fullCSS = useMemo(() => {
    const val = layers.map(shadowToCSS).join(',\n  ')
    return `box-shadow: ${val};`
  }, [layers])

  return (
    <div className="tool-card">
      {/* Header */}
      <div className="tool-card-header">
        <div className="tool-card-icon bg-gradient-to-br from-sky-500 to-cyan-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M3 9h18M9 21V9"/>
          </svg>
        </div>
        <div>
          <h2 className="tool-card-title">Box Shadow Builder</h2>
          <p className="tool-card-subtitle">Multi-layer shadows — live preview</p>
        </div>
      </div>

      {/* Live preview */}
      <div className="w-full h-28 rounded-xl mb-5 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
        <div
          className="w-20 h-20 rounded-xl bg-white dark:bg-slate-700 transition-all duration-300"
          style={{ boxShadow: layers.map(shadowToCSS).join(', ') }}
          aria-label="Box shadow live preview"
        />
      </div>

      {/* Presets */}
      <div className="mb-5">
        <p className="control-label mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.name}
              onClick={() => { setLayers(p.layers.map(l => ({ ...l }))); setActiveLayer(0) }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium
                bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
                hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layer tabs */}
      <div className="flex items-center gap-2 mb-4">
        {layers.map((_, i) => (
          <button key={i} onClick={() => setActiveLayer(i)}
            className={`relative px-3 py-1 rounded-lg text-xs font-medium transition-all
              ${activeLayer === i
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            Layer {i + 1}
            {layers.length > 1 && activeLayer === i && (
              <span
                onClick={(e) => { e.stopPropagation(); removeLayer(i) }}
                role="button" aria-label={`Remove layer ${i + 1}`}
                className="ml-1.5 text-white/70 hover:text-white">×</span>
            )}
          </button>
        ))}
        {layers.length < 4 && (
          <button onClick={addLayer}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-brand-600 dark:text-brand-400
              border border-dashed border-brand-400 dark:border-brand-600
              hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
            + Layer
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="space-y-3">
        <SliderRow id="shadow-x" label="X Offset"  min={-50} max={50}  value={layer.x}      onChange={(v) => updateLayer('x', v)} />
        <SliderRow id="shadow-y" label="Y Offset"  min={-50} max={50}  value={layer.y}      onChange={(v) => updateLayer('y', v)} />
        <SliderRow id="shadow-blur" label="Blur"   min={0}   max={100} value={layer.blur}   onChange={(v) => updateLayer('blur', v)} />
        <SliderRow id="shadow-spread" label="Spread" min={-50} max={50} value={layer.spread} onChange={(v) => updateLayer('spread', v)} />
        <SliderRow id="shadow-opacity" label="Opacity" min={0} max={100} value={layer.opacity} onChange={(v) => updateLayer('opacity', v)} unit="%" />

        {/* Color + Inset */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="shadow-color" className="control-label">Color</label>
            <label htmlFor="shadow-color"
              className="w-7 h-7 rounded-md cursor-pointer border-2 border-slate-200 dark:border-slate-600 overflow-hidden relative"
              style={{ background: layer.color }}>
              <input id="shadow-color" type="color" value={layer.color}
                onChange={(e) => updateLayer('color', e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer" />
            </label>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={layer.inset}
                onChange={(e) => updateLayer('inset', e.target.checked)}
                className="sr-only peer" id="shadow-inset" />
              <div className="w-9 h-5 rounded-full bg-slate-300 dark:bg-slate-700 peer-checked:bg-brand-600 transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all peer-checked:translate-x-4" />
            </div>
            <span className="control-label">Inset</span>
          </label>
        </div>
      </div>

      {/* Output */}
      <div className="code-output-block">
        <code className="text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-all">{fullCSS}</code>
        <CopyButton text={fullCSS} />
      </div>
    </div>
  )
}
