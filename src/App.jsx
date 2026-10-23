/**
 * App.jsx — Final (Milestones 1–6)
 * Root shell: theme, settings, tab routing, global keyboard shortcuts.
 */
import { useState, useEffect, useCallback } from 'react'
import Navbar                   from './components/Navbar'
import CssToolsPanel            from './components/CssToolsPanel'
import MarkdownWorkspace        from './components/MarkdownWorkspace'
import SettingsModal            from './components/SettingsModal'
import KeyboardShortcutsModal   from './components/KeyboardShortcutsModal'
import { useTheme }             from './hooks/useTheme'
import { SettingsProvider }     from './hooks/useSettings'

function AppInner() {
  const { isDark, toggleTheme }     = useTheme()
  const [activeTab, setActiveTab]   = useState('css')
  const [settingsOpen, setSettings] = useState(false)
  const [shortcutsOpen, setShorts]  = useState(false)

  /* ── Global keyboard shortcuts ── */
  const handleGlobalKey = useCallback((e) => {
    // Ignore when typing in an input/textarea
    if (['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) return

    if (e.key === '?') { e.preventDefault(); setShorts(true) }
    if (e.key === 'Escape') { setSettings(false); setShorts(false) }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); toggleTheme() }
  }, [toggleTheme])

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [handleGlobalKey])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onSettingsOpen={() => setSettings(true)}
        onShortcutsOpen={() => setShorts(true)}
      />

      <main id="main-content" className="w-full max-w-screen-xl mx-auto px-4 sm:px-6">
        {activeTab === 'css'      && <CssToolsPanel />}
        {activeTab === 'markdown' && <MarkdownWorkspace />}
      </main>

      {/* Modals */}
      <SettingsModal          open={settingsOpen}  onClose={() => setSettings(false)} />
      <KeyboardShortcutsModal open={shortcutsOpen} onClose={() => setShorts(false)} />
    </div>
  )
}

export default function App() {
  return (
    <SettingsProvider>
      <AppInner />
    </SettingsProvider>
  )
}
