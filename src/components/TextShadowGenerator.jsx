/**
 * TextShadowGenerator.jsx
 * Multi-layer CSS text-shadow builder with live preview and presets.
 */
import { useState, useMemo } from 'react'
import CopyButton from './CopyButton'

const DEFAULT_LAYER = { x: 2, y: 2, blur: 4, color: '#000000', opacity: 30 }

const PRESETS = [
  { name: 'Subtle',  layers: [{ x: 1, y: 1, blur: 2,  color: '#000000', opacity: 20 }] },
  { name: 'Lifted',  layers: [{ x: 2, y: 4, blur: 6,  color: '#000000', opacity: 25 }] },
  { name: 'Neon',    layers: [{ x: 0, y: 0, blur: 8,  color: '#5c7cfa', opacity: 80 },
                               { x: 0, y: 0, blur: 20, color: '#5c7cfa', opacity: 50 }] },
  { name: 'Retro',   layers: [{ x: 3, y: 3, blur: 0,  color: '#e11d48', opacity: 80 },
                               { x: 6, y: 6, blur: 0,  color: '#f97316', opacity: 60 }] },
  { name: 'Emboss',  layers: [{ x: -1, y: -1, blur: 0, color: '#ffffff', opacity: 60 },
                               { x:  1, y:  1, blur: 0, color: '#000000', opacity: 30 }] },
  { name: 'Fire',    layers: [{ x: 0, y: -2, blur: 4,  color: '#f59e0b', opacity: 80 },
                               { x: 0, y: -4, blur: 8,  color: '#ef4444', opacity: 60 },
                               { x: 0, y: -8, blur: 16, color: '#8b5cf6', opacity: 40 }] },
]

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${(opacity/100).toFixed(2)})`
}

function layerToCSS(l) {
  return `${l.x}px ${l.y}px ${l.blur}px ${hexToRgba(l.color, l.opacity)}`
}

function SliderRow({ id, label, min, max, value, onChange, unit = 'px' }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="control-label">{label}</label>
        <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{value}{unit}</span>
      </div>
      <input id={id} type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="range-slider" />
    </div>
  )
}

export default function TextShadowGenerator() {
  const [layers, setLayers]     = useState([{ ...DEFAULT_LAYER }])
  const [activeIdx, setActive]  = useState(0)
  const [previewText, setPreviewText] = useState('DevStudio')
  const [fontSize, setFontSize] = useState(48)

  const layer = layers[activeIdx] ?? layers[0]
  const update = (k, v) => setLayers(p => p.map((l, i) => i === activeIdx ? { ...l, [k]: v } : l))

  const shadowCSS = useMemo(() => layers.map(layerToCSS).join(', '), [layers])
  const fullCSS   = `text-shadow: ${shadowCSS};`

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-icon bg-gradient-to-br from-fuchsia-500 to-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/>
            <line x1="12" y1="4" x2="12" y2="20"/>
          </svg>
        </div>
        <div>
          <h2 className="tool-card-title">Text Shadow</h2>
          <p className="tool-card-subtitle">Multi-layer — live preview</p>
        </div>
      </div>

      {/* Live preview */}
      <div className="w-full h-28 rounded-xl mb-5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <span
          className="font-bold select-none text-slate-800 dark:text-slate-100 transition-all duration-300 px-2"
          style={{ textShadow: shadowCSS, fontSize: `${fontSize}px`, lineHeight: 1 }}
          aria-label="Text shadow live preview"
        >
          {previewText || 'Text'}
        </span>
      </div>

      {/* Preview text input */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="ts-preview-text" className="control-label mb-1 block">Preview text</label>
            <input id="ts-preview-text" type="text" value={previewText}
              onChange={e => setPreviewText(e.target.value)} maxLength={20}
              className="w-full px-3 py-1.5 rounded-lg text-sm font-bold
                bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          </div>
          <div className="w-24">
            <label htmlFor="ts-font-size" className="control-label mb-1 block">Size</label>
            <input id="ts-font-size" type="range" min={20} max={80} value={fontSize}
              onChange={e => setFontSize(Number(e.target.value))} className="range-slider" />
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="mb-4">
        <p className="control-label mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button key={p.name} onClick={() => { setLayers(p.layers.map(l=>({...l}))); setActive(0) }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800
                text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700
                transition-colors border border-slate-200 dark:border-slate-700">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Layer tabs */}
      <div className="flex items-center gap-2 mb-4">
        {layers.map((_,i) => (
          <button key={i} onClick={() => setActive(i)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
              ${activeIdx===i ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            Layer {i+1}
            {layers.length > 1 && activeIdx===i && (
              <span onClick={e=>{e.stopPropagation();const n=layers.filter((_,idx)=>idx!==i);setLayers(n);setActive(Math.min(i,n.length-1))}}
                role="button" aria-label="Remove layer" className="ml-1.5 text-white/70 hover:text-white">×</span>
            )}
          </button>
        ))}
        {layers.length < 4 && (
          <button onClick={() => { setLayers(p=>[...p,{...DEFAULT_LAYER}]); setActive(layers.length) }}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-brand-600 dark:text-brand-400
              border border-dashed border-brand-400 dark:border-brand-600
              hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors">
            + Layer
          </button>
        )}
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <SliderRow id="ts-x" label="X Offset" min={-30} max={30} value={layer.x} onChange={v=>update('x',v)} />
        <SliderRow id="ts-y" label="Y Offset" min={-30} max={30} value={layer.y} onChange={v=>update('y',v)} />
        <SliderRow id="ts-blur" label="Blur" min={0} max={40} value={layer.blur} onChange={v=>update('blur',v)} />
        <SliderRow id="ts-opacity" label="Opacity" min={0} max={100} value={layer.opacity} onChange={v=>update('opacity',v)} unit="%" />
        <div className="flex items-center gap-2">
          <label htmlFor="ts-color" className="control-label">Color</label>
          <label htmlFor="ts-color" className="w-7 h-7 rounded-md cursor-pointer border-2 border-slate-200 dark:border-slate-600 overflow-hidden relative" style={{background:layer.color}}>
            <input id="ts-color" type="color" value={layer.color} onChange={e=>update('color',e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
          </label>
          <span className="text-xs font-mono text-slate-500">{layer.color}</span>
        </div>
      </div>

      <div className="code-output-block">
        <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all">{fullCSS}</code>
        <CopyButton text={fullCSS} />
      </div>
    </div>
  )
}
