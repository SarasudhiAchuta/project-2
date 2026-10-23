/**
 * Navbar.jsx
 * Milestone 1 — Responsive navigation bar for DevStudio.
 *
 * Contains:
 *  - Brand logo + title
 *  - Tab navigation: CSS Tools | Markdown Workspace
 *  - Dark / Light mode toggle with animated icon swap
 */
/* ─── Icons (inline SVG, no external icon lib needed) ─── */

/** Palette icon for CSS Tools tab */
const PaletteIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
)

/** Markdown "M↓" icon for Markdown Workspace tab */
const MarkdownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="M7 15V9l3 3 3-3v6" />
    <path d="M17 15l-2-3" />
    <path d="M15 15l2-3" />
  </svg>
)

/** Sun icon — shown in dark mode (click to go light) */
const SunIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

/** Moon icon — shown in light mode (click to go dark) */
const MoonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

/* ─── DevStudio wordmark logo ─── */
const BrandLogo = () => (
  <div className="flex items-center gap-2.5 select-none" aria-label="DevStudio home">
    {/* Icon mark */}
    <div
      className="
        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
        bg-gradient-to-br from-brand-500 to-brand-700
        shadow-[0_2px_8px_rgba(92,124,250,0.35)]
      "
    >
      <span className="text-white font-mono font-bold text-sm leading-none">&lt;/&gt;</span>
    </div>

    {/* Wordmark */}
    <span className="font-bold text-[1.05rem] tracking-[-0.01em] leading-none">
      <span className="text-brand-600 dark:text-brand-400">Dev</span>
      <span className="text-slate-800 dark:text-slate-100">Studio</span>
    </span>
  </div>
)

/* ─── Tab button component ─── */
const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
  <button
    id={id}
    role="tab"
    aria-selected={isActive}
    onClick={onClick}
    className={`
      relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
      transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-500
      ${
        isActive
          ? `
            bg-brand-50 dark:bg-brand-700/20
            text-brand-600 dark:text-brand-400
            shadow-[inset_0_0_0_1px_rgba(92,124,250,0.25)]
          `
          : `
            text-slate-500 dark:text-slate-400
            hover:text-slate-800 dark:hover:text-slate-200
            hover:bg-slate-100 dark:hover:bg-slate-700/40
          `
      }
    `}
  >
    <Icon className="w-4 h-4 flex-shrink-0" />
    <span className="hidden sm:inline">{label}</span>

    {/* Active indicator dot */}
    {isActive && (
      <span
        className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500"
        aria-hidden="true"
      />
    )}
  </button>
)

/* ─── Theme toggle button ─── */
const ThemeToggle = ({ isDark, onToggle }) => (
  <button
    id="theme-toggle"
    onClick={onToggle}
    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    className="
      relative w-9 h-9 flex items-center justify-center rounded-lg
      text-slate-500 dark:text-slate-400
      hover:text-slate-800 dark:hover:text-slate-100
      hover:bg-slate-100 dark:hover:bg-slate-700/40
      transition-all duration-200
      outline-none focus-visible:ring-2 focus-visible:ring-brand-500
    "
  >
    {/* Animate icon swap */}
    <span
      className={`absolute transition-all duration-300 ${
        isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
      }`}
    >
      <SunIcon className="w-4.5 h-4.5" />
    </span>
    <span
      className={`absolute transition-all duration-300 ${
        !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
      }`}
    >
      <MoonIcon className="w-4.5 h-4.5" />
    </span>
  </button>
)

/* ─── Settings gear icon ─── */
const GearIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
    className={className} aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

/* ─── Icon button helper ─── */
const IconBtn = ({ id, onClick, title, children }) => (
  <button id={id} onClick={onClick} title={title} aria-label={title}
    className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700/40 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
    {children}
  </button>
)

/* ─── Main Navbar component ─── */
export default function Navbar({ activeTab, onTabChange, isDark, onThemeToggle, onSettingsOpen, onShortcutsOpen }) {
  const tabs = [
    { id: 'tab-css-tools',          key: 'css',      label: 'CSS Tools',           icon: PaletteIcon },
    { id: 'tab-markdown-workspace', key: 'markdown', label: 'Markdown Workspace',  icon: MarkdownIcon },
  ]

  return (
    <header
      role="banner"
      className="
        sticky top-0 z-50 w-full
        bg-white/90 dark:bg-[#1a1d27]/90
        backdrop-blur-md
        border-b border-slate-200 dark:border-slate-700/60
        shadow-[0_1px_0_0_rgba(0,0,0,0.04)] dark:shadow-[0_1px_0_0_rgba(0,0,0,0.3)]
        transition-colors duration-300
      "
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4"
      >
        {/* Left: Brand */}
        <BrandLogo />

        {/* Center: Tab navigation */}
        <div
          role="tablist"
          aria-label="Workspace tabs"
          className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.key}
              onClick={() => onTabChange(tab.key)}
            />
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />

          {/* Keyboard shortcuts */}
          <IconBtn id="btn-shortcuts" onClick={onShortcutsOpen} title="Keyboard shortcuts (?)">
            <span className="text-sm font-bold">?</span>
          </IconBtn>

          {/* Settings */}
          <IconBtn id="btn-settings" onClick={onSettingsOpen} title="Settings">
            <GearIcon className="w-4 h-4" />
          </IconBtn>

          {/* Divider */}
          <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-1" aria-hidden="true" />

          {/* Status badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span>v1.0.0</span>
          </div>
        </div>
      </nav>
    </header>
  )
}
