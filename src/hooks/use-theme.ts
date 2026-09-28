import { useKV } from '@github/spark/hooks'
import { useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useKV('portfolio-theme', 'light')

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
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}