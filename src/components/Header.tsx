import { Bell, HelpCircle, SunMoon } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-900/70 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Pomodoro Workspace</p>
        <h1 className="text-2xl font-semibold text-white">Premium focus session</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:border-accent/70"
          type="button"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          Shortcuts
        </button>
        <button
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white transition hover:border-accent/70"
          type="button"
        >
          <Bell className="h-4 w-4" />
          Notify
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500 to-cyan-400 p-2 text-slate-950"
          type="button"
          aria-label="Toggle color theme"
        >
          <SunMoon className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
