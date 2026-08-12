import { Bell, HelpCircle, Moon, Sun } from 'lucide-react'

type ThemeMode = 'light' | 'dark'

type HeaderProps = {
  theme: ThemeMode
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  const isDark = theme === 'dark'

  const headerThemeClass = isDark
    ? 'border-white/5 bg-slate-900/70 text-white'
    : 'border border-slate-200/60 bg-white/90 text-slate-900 shadow-sm'

  const secondaryButtonClass = isDark
    ? 'border border-white/10 bg-white/5 text-white hover:border-accent/70'
    : 'border border-slate-200/70 bg-slate-100 text-slate-900 hover:border-slate-400'

  const themeButtonClass = isDark
    ? 'border border-white/10 bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950'
    : 'border border-slate-300/70 bg-gradient-to-r from-sky-400/80 to-cyan-400/70 text-slate-950'

  return (
    <header
      className={`flex items-center justify-between rounded-3xl px-6 py-4 backdrop-blur transition ${headerThemeClass}`}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Pomodoro Workspace</p>
        <h1 className="text-2xl font-semibold">Premium focus session</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          className={`rounded-2xl px-3 py-2 text-sm font-medium transition ${secondaryButtonClass}`}
          type="button"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Shortcuts
        </button>
        <button
          className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition ${secondaryButtonClass}`}
          type="button"
        >
          <Bell className="h-4 w-4" />
          Notify
        </button>
        <button
          className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition ${themeButtonClass}`}
          type="button"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={onToggleTheme}
        >
          {isDark ? (
            <Sun className="h-4 w-4 text-amber-300" />
          ) : (
            <Moon className="h-4 w-4 text-slate-700" />
          )}
          <span aria-hidden className="text-base">
            {isDark ? '☀' : '☾'}
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em]
            text-slate-900/80 dark:text-white/80 hidden text-xs uppercase tracking-[0.3em] sm:inline-flex"
          >
            {isDark ? 'Light' : 'Dark'}
          </span>
        </button>
      </div>
    </header>
  )
}
