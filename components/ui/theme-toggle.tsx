import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg transition-all duration-200 
        bg-slate-700/50 hover:bg-slate-600/50 dark:bg-slate-700/50 dark:hover:bg-slate-600/50
        light:bg-slate-200 light:hover:bg-slate-300
        border border-slate-600/50 dark:border-slate-600/50 light:border-slate-300
        group
      "
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600 group-hover:text-slate-700 transition-colors" />
      )}
    </button>
  )
}