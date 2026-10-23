/**
 * KeyboardShortcutsModal.jsx
 * Overlay showing all keyboard shortcuts. Triggered by pressing "?" or a toolbar button.
 */
const SHORTCUTS = [
  { section: 'Editor',
    items: [
      { keys: ['Ctrl', 'B'],     desc: 'Bold' },
      { keys: ['Ctrl', 'I'],     desc: 'Italic' },
      { keys: ['Tab'],           desc: 'Indent (2 spaces)' },
      { keys: ['Shift', 'Tab'],  desc: 'Unindent' },
    ]
  },
  { section: 'App',
    items: [
      { keys: ['Ctrl', 'K'],     desc: 'Toggle dark / light mode' },
      { keys: ['?'],             desc: 'Open keyboard shortcuts' },
      { keys: ['Escape'],        desc: 'Close any modal' },
    ]
  },
  { section: 'Export',
    items: [
      { keys: ['Ctrl', 'Shift', 'C'], desc: 'Copy rendered HTML' },
      { keys: ['Ctrl', 'S'],          desc: 'Download .md file' },
    ]
  },
]

const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function KeyboardShortcutsModal({ open, onClose }) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

        {/* Modal */}
        <div role="dialog" aria-modal="true" aria-label="Keyboard shortcuts"
          className="
            relative z-10 w-full max-w-md rounded-2xl
            bg-white dark:bg-[#1a1d27]
            border border-slate-200 dark:border-slate-700/60
            shadow-2xl overflow-hidden
            animate-[scaleIn_0.2s_ease-out]
          ">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5">
              <span className="text-lg">⌨️</span>
              <h2 className="font-semibold text-slate-800 dark:text-slate-100">Keyboard Shortcuts</h2>
            </div>
            <button onClick={onClose} aria-label="Close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 space-y-5 max-h-[60vh] overflow-y-auto">
            {SHORTCUTS.map(section => (
              <div key={section.section}>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
                  {section.section}
                </p>
                <div className="space-y-2">
                  {section.items.map(item => (
                    <div key={item.desc} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-300">{item.desc}</span>
                      <div className="flex items-center gap-1">
                        {item.keys.map((k, i) => (
                          <span key={i}>
                            <kbd className="
                              inline-block px-2 py-0.5 rounded-md text-xs font-mono font-semibold
                              bg-slate-100 dark:bg-slate-800
                              border border-slate-300 dark:border-slate-600
                              text-slate-700 dark:text-slate-300
                              shadow-[0_1px_0_rgba(0,0,0,0.15)]
                            ">{k}</kbd>
                            {i < item.keys.length - 1 && <span className="text-slate-400 text-xs mx-0.5">+</span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-[#15171e]">
            <p className="text-xs text-center text-slate-400 dark:text-slate-500">
              Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-xs font-mono">Esc</kbd> to close
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
      `}</style>
    </>
  )
}
