import { Pause, Play, RefreshCcw, SkipForward } from 'lucide-react'
import { formatDuration } from '../utils/formatDuration'

const controls = [
  { label: 'Start', icon: Play },
  { label: 'Pause', icon: Pause },
  { label: 'Reset', icon: RefreshCcw },
  { label: 'Skip', icon: SkipForward }
]

export default function TimerDisplay() {
  const remaining = formatDuration(25 * 60)

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-48 w-48 rounded-full border border-white/10" />
        <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/30" />
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-950 text-center text-5xl font-semibold text-white shadow-2xl">
          {remaining}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {controls.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-accent/70"
              type="button"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
