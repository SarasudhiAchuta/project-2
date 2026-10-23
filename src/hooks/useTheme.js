/**
 * useTheme.js
 * Custom hook — manages dark/light mode with localStorage persistence.
 * Applies the "dark" class to <html> for Tailwind's dark: variant support.
 */
import { useState, useEffect } from 'react'

export function useTheme() {
  // Initialize from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('devstudio-theme')
    if (stored !== null) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('devstudio-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return { isDark, toggleTheme }
}
