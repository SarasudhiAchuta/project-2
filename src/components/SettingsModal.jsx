/**
 * SettingsModal.jsx
 * Slide-in settings drawer — appearance, editor, and preview preferences.
 */
import { useSettings, EDITOR_FONTS, PREVIEW_FONTS, ACCENT_PRESETS } from '../hooks/useSettings'

const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

function SectionHead({ children }) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 mt-1">
      {children}
    </h3>
  )
}

function Toggle({ id, checked, onChange, label }) {
  return (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer gap-3">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <div className="relative flex-shrink-0">
        <input id={id} type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="sr-only peer" />
        <div className="w-10 h-5 rounded-full bg-slate-300 dark:bg-slate-700 peer-checked:bg-brand-600 transition-colors" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all peer-checked:translate-x-5" />
      </div>
    </label>
  )
}

export default function SettingsModal({ open, onClose }) {
  const { settings, update, reset } = useSettings()

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Settings"
        className="
          fixed right-0 top-0 z-50 h-full w-80 overflow-y-auto
          bg-white dark:bg-[#1a1d27]
          border-l border-slate-200 dark:border-slate-700/60
          shadow-2xl
          flex flex-col
          animate-[slideInRight_0.25s_ease-out]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/60 sticky top-0 bg-white dark:bg-[#1a1d27] z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h2 className="font-semibold text-slate-800 dark:text-slate-100">Settings</h2>
          </div>
          <button onClick={onClose} aria-label="Close settings"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 py-5 space-y-6">

          {/* ── Appearance ── */}
          <section aria-labelledby="settings-appearance">
            <SectionHead id="settings-appearance">Appearance</SectionHead>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Accent colour</p>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_PRESETS.map(p => (
                    <button key={p.value} onClick={() => update('accentColor', p.value)}
                      title={p.label}
                      aria-label={`Set accent to ${p.label}`}
                      className={`w-7 h-7 rounded-full transition-all ${settings.accentColor===p.value ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900 scale-110' : 'hover:scale-110'}`}
                      style={{ background: p.value }} />
                  ))}
                  <label title="Custom colour" className="w-7 h-7 rounded-full overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-600 cursor-pointer flex items-center justify-center relative hover:scale-110 transition-transform">
                    <span className="text-[10px] text-slate-400">+</span>
                    <input type="color" value={settings.accentColor}
                      onChange={e => update('accentColor', e.target.value)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* ── Editor ── */}
          <section aria-labelledby="settings-editor">
            <SectionHead id="settings-editor">Editor</SectionHead>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Font family</p>
                <div className="space-y-1.5">
                  {EDITOR_FONTS.map(f => (
                    <label key={f.key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input type="radio" name="editor-font" value={f.key}
                        checked={settings.editorFontFamily===f.key}
                        onChange={() => update('editorFontFamily', f.key)}
                        className="accent-brand-600" />
                      <span className="text-sm text-slate-700 dark:text-slate-300" style={{ fontFamily: f.css }}>{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="settings-tabsize" className="text-sm text-slate-700 dark:text-slate-300">Tab size</label>
                  <span className="text-xs font-mono text-brand-600 dark:text-brand-400">{settings.editorTabSize} spaces</span>
                </div>
                <input id="settings-tabsize" type="range" min={2} max={8} step={2}
                  value={settings.editorTabSize} onChange={e => update('editorTabSize', Number(e.target.value))}
                  className="range-slider" />
              </div>

              <Toggle id="settings-wordwrap" checked={settings.editorWordWrap}
                onChange={v => update('editorWordWrap', v)} label="Word wrap" />
              <Toggle id="settings-linenumbers" checked={settings.showLineNumbers}
                onChange={v => update('showLineNumbers', v)} label="Show line numbers" />
            </div>
          </section>

          {/* ── Preview ── */}
          <section aria-labelledby="settings-preview">
            <SectionHead id="settings-preview">Preview</SectionHead>
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">Body font</p>
              <div className="space-y-1.5">
                {PREVIEW_FONTS.map(f => (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input type="radio" name="preview-font" value={f.key}
                      checked={settings.previewFontFamily===f.key}
                      onChange={() => update('previewFontFamily', f.key)}
                      className="accent-brand-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-300" style={{ fontFamily: f.css }}>{f.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700/60 sticky bottom-0 bg-white dark:bg-[#1a1d27]">
          <button onClick={() => { reset(); }}
            className="w-full py-2 rounded-xl text-sm font-medium
              bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300
              hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400
              transition-colors">
            Reset to defaults
          </button>
        </div>
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}
