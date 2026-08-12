import { Pause, Play, RefreshCcw, SkipForward } from 'lucide-react'
import { formatDuration } from '../utils/formatDuration'

type TimerDisplayProps = {
  remainingSeconds: number
  timerState: 'idle' | 'running' | 'paused'
  modeLabel: string
  onStart: () => void
  onPause: () => void
  onReset: () => void
  onSkip: () => void
}

export default function TimerDisplay({
  remainingSeconds,
  timerState,
  modeLabel,
  onStart,
  onPause,
  onReset,
  onSkip
}: TimerDisplayProps) {
  const formattedTime = formatDuration(remainingSeconds)
  const primaryAction =
    timerState === 'running'
      ? { icon: Pause, label: 'Pause', handler: onPause }
      : { icon: Play, label: timerState === 'paused' ? 'Resume' : 'Start', handler: onStart }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{modeLabel}</p>
        <div className="relative flex items-center justify-center">
          <div className="absolute h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/30" />
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-950 text-center text-5xl font-semibold text-white shadow-2xl">
            {formattedTime}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={primaryAction.handler}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/80 to-cyan-400/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:shadow-[0_10px_30px_rgba(14,116,144,0.4)]"
        >
          <primaryAction.icon className="h-4 w-4" aria-hidden="true" />
          {primaryAction.label}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-accent/70"
        >
          <RefreshCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:border-accent/70"
        >
          <SkipForward className="h-4 w-4" aria-hidden="true" />
          Skip
        </button>
      </div>
    </div>
  )
}
