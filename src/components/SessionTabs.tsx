import { useMemo } from 'react'

const sessions = [
  { label: 'Focus', description: '25m', active: true },
  { label: 'Short break', description: '5m', active: false },
  { label: 'Long break', description: '15m', active: false }
]

export default function SessionTabs() {
  const memoizedSessions = useMemo(() => sessions, [])

  return (
    <div className="flex items-center justify-center gap-4 rounded-3xl border border-white/5 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
      {memoizedSessions.map((session) => (
        <button
          key={session.label}
          className={`rounded-2xl px-4 py-2 transition ${
            session.active
              ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950'
              : 'border border-white/10 bg-white/5 text-white'
          }`}
          type="button"
        >
          <span className="font-semibold">{session.label}</span>
          <span className="ml-2 text-xs text-slate-400">{session.description}</span>
        </button>
      ))}
    </div>
  )
}
