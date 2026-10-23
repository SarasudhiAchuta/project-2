/**
 * TransitionGenerator.jsx
 * Visual CSS transition / animation builder with live demo button.
 */
import { useState, useRef, useMemo } from 'react'
import CopyButton from './CopyButton'

const PROPERTIES = ['all','opacity','transform','background-color','color','border-radius','box-shadow','width','height','margin','padding']
const EASINGS = [
  { label: 'ease',        value: 'ease' },
  { label: 'ease-in',     value: 'ease-in' },
  { label: 'ease-out',    value: 'ease-out' },
  { label: 'ease-in-out', value: 'ease-in-out' },
  { label: 'linear',      value: 'linear' },
  { label: 'spring',      value: 'cubic-bezier(0.34,1.56,0.64,1)' },
  { label: 'snappy',      value: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
  { label: 'bounce',      value: 'cubic-bezier(0.68,-0.55,0.27,1.55)' },
]

const PRESETS = [
  { name: 'Fade',    property: 'opacity',           duration: 300, delay: 0, easing: 'ease' },
  { name: 'Scale',   property: 'transform',         duration: 400, delay: 0, easing: 'cubic-bezier(0.34,1.56,0.64,1)' },
  { name: 'Slide',   property: 'transform',         duration: 350, delay: 0, easing: 'ease-out' },
  { name: 'Color',   property: 'background-color',  duration: 500, delay: 0, easing: 'ease-in-out' },
  { name: 'Snappy',  property: 'all',               duration: 200, delay: 0, easing: 'cubic-bezier(0.25,0.46,0.45,0.94)' },
  { name: 'Delayed', property: 'opacity',           duration: 600, delay: 300, easing: 'ease' },
]

export default function TransitionGenerator() {
  const [property, setProperty] = useState('all')
  const [duration, setDuration] = useState(300)
  const [delay, setDelay]       = useState(0)
  const [easing, setEasing]     = useState('ease')
  const [previewing, setPreviewing] = useState(false)
  const previewRef = useRef(null)

  const transitionCSS = useMemo(() =>
    `transition: ${property} ${duration}ms ${easing}${delay ? ` ${delay}ms` : ''};`,
    [property, duration, delay, easing]
  )

  const runPreview = () => {
    setPreviewing(true)
    setTimeout(() => setPreviewing(false), duration + delay + 200)
  }

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-card-icon bg-gradient-to-br from-amber-500 to-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4" aria-hidden="true">
            <path d="m5 12 7-7 7 7"/><path d="m5 19 7-7 7 7"/>
          </svg>
        </div>
        <div>
          <h2 className="tool-card-title">Transition Builder</h2>
          <p className="tool-card-subtitle">Easing & timing — live demo</p>
        </div>
      </div>

      {/* Live demo box */}
      <div className="w-full h-28 rounded-xl mb-5 flex items-center justify-center bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          ref={previewRef}
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-mono font-semibold cursor-pointer select-none"
          style={{
            background: previewing ? '#10b981' : '#5c7cfa',
            transform:  previewing ? 'scale(1.35) rotate(12deg)' : 'scale(1) rotate(0deg)',
            opacity:    property === 'opacity' && previewing ? 0.3 : 1,
            transition: `${property} ${duration}ms ${easing} ${delay}ms`,
          }}
          onClick={runPreview}
          role="button"
          aria-label="Click to preview transition"
          title="Click to preview"
        >
          click
        </div>
      </div>

      {/* Presets */}
      <div className="mb-4">
        <p className="control-label mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button key={p.name}
              onClick={() => { setProperty(p.property); setDuration(p.duration); setDelay(p.delay); setEasing(p.easing) }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800
                text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700
                transition-colors border border-slate-200 dark:border-slate-700">
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Property */}
        <div>
          <label htmlFor="trans-property" className="control-label mb-1.5 block">Property</label>
          <select id="trans-property" value={property} onChange={e => setProperty(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm font-mono
              bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700
              text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500">
            {PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Duration */}
        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="trans-duration" className="control-label">Duration</label>
            <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{duration}ms</span>
          </div>
          <input id="trans-duration" type="range" min={50} max={2000} step={50}
            value={duration} onChange={e => setDuration(Number(e.target.value))} className="range-slider" />
        </div>

        {/* Delay */}
        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="trans-delay" className="control-label">Delay</label>
            <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{delay}ms</span>
          </div>
          <input id="trans-delay" type="range" min={0} max={1000} step={50}
            value={delay} onChange={e => setDelay(Number(e.target.value))} className="range-slider" />
        </div>

        {/* Easing */}
        <div>
          <p className="control-label mb-2">Easing</p>
          <div className="grid grid-cols-2 gap-1.5">
            {EASINGS.map(e => (
              <button key={e.label} onClick={() => setEasing(e.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all
                  ${easing===e.value
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                {e.label}
              </button>
            ))}
          </div>
        </div>

        {/* Run preview button */}
        <button onClick={runPreview}
          className="w-full py-2 rounded-xl text-sm font-semibold
            bg-gradient-to-r from-brand-600 to-brand-500 text-white
            hover:from-brand-700 hover:to-brand-600
            transition-all duration-200 shadow-sm hover:shadow">
          ▶ Run Preview
        </button>
      </div>

      <div className="code-output-block">
        <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all">{transitionCSS}</code>
        <CopyButton text={transitionCSS} />
      </div>
    </div>
  )
}
