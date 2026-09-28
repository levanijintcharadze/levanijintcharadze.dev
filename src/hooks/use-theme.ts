import { useEffect, useState } from 'react'

const THEME_KEY = 'portfolio-theme'

type Theme = 'light' | 'dark'

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_KEY)
  if (isTheme(storedTheme)) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = window.document.documentElement
    // keep both class-based and data-attribute-based theme markers in sync
    root.classList.remove('light', 'dark')
    if (theme) {
      root.classList.add(theme)
    }

    // Tailwind in this project sometimes uses [data-appearance="dark"] selector,
    // and Spark's stylesheet uses #spark-app.dark-theme. Keep those in sync as well.
    if (theme === 'dark') {
      root.setAttribute('data-appearance', 'dark')
    } else {
      root.removeAttribute('data-appearance')
    }

    const sparkApp = document.getElementById('spark-app')
    if (sparkApp) {
      if (theme === 'dark') {
        sparkApp.classList.add('dark-theme')
      } else {
        sparkApp.classList.remove('dark-theme')
      }
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light'
      window.localStorage.setItem(THEME_KEY, nextTheme)
      return nextTheme
    })
  }

  return { theme, toggleTheme }
}