import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="glass glass-hover transition-colors hover:text-foreground"
    >
      {theme === 'light' ? (
        <FontAwesomeIcon icon={faMoon} className="h-4 w-4 transition-colors" />
      ) : (
        <FontAwesomeIcon icon={faSun} className="h-4 w-4 transition-colors" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}