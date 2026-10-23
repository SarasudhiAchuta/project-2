/**
 * useSettings.js
 * Global settings hook — persists preferences to localStorage.
 * Settings: accentColor, editorFontFamily, editorTabSize, editorWordWrap.
 */
import { useState, useEffect, createContext, useContext, useCallback, createElement } from 'react'

const DEFAULTS = {
  accentColor:       '#5c7cfa',   // brand colour
  editorFontFamily:  'jetbrains', // 'jetbrains' | 'fira' | 'mono'
  editorTabSize:     2,
  editorWordWrap:    false,
  previewFontFamily: 'inter',     // 'inter' | 'system' | 'serif'
  showLineNumbers:   true,
}

const STORAGE_KEY = 'devstudio-settings'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS }
  } catch {
    return { ...DEFAULTS }
  }
}

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(load)

  useEffect(() => {
    // Apply accent colour as CSS variable
    document.documentElement.style.setProperty('--accent', settings.accentColor)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const update = useCallback((key, value) =>
    setSettings(prev => ({ ...prev, [key]: value })),
  [])

  const reset = useCallback(() => setSettings({ ...DEFAULTS }), [])

  return createElement(
    SettingsContext.Provider,
    { value: { settings, update, reset } },
    children
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>')
  return ctx
}

// Font family maps
export const EDITOR_FONTS = [
  { key: 'jetbrains', label: 'JetBrains Mono', css: "'JetBrains Mono', monospace" },
  { key: 'fira',      label: 'Fira Code',      css: "'Fira Code', monospace" },
  { key: 'mono',      label: 'System Mono',    css: 'ui-monospace, monospace' },
]

export const PREVIEW_FONTS = [
  { key: 'inter',  label: 'Inter',       css: "'Inter', sans-serif" },
  { key: 'system', label: 'System UI',   css: 'system-ui, sans-serif' },
  { key: 'serif',  label: 'Georgia',     css: 'Georgia, serif' },
]

export const ACCENT_PRESETS = [
  { label: 'Indigo',   value: '#5c7cfa' },
  { label: 'Violet',   value: '#7c3aed' },
  { label: 'Sky',      value: '#0ea5e9' },
  { label: 'Emerald',  value: '#10b981' },
  { label: 'Rose',     value: '#f43f5e' },
  { label: 'Amber',    value: '#f59e0b' },
]
