import { useCallback, useEffect, useState } from 'react'
import DashboardShell from './components/DashboardShell'
import Header from './components/Header'
import SessionTabs from './components/SessionTabs'
import TimerDisplay from './components/TimerDisplay'
import { usePersistedState } from './hooks/usePersistedState'
import type { SessionType } from './types'

type ThemeMode = 'light' | 'dark'
type TimerState = 'idle' | 'running' | 'paused'

const focusPresets = ['Deep Work', 'Write', 'Plan']

const stats = [
  { label: 'Today Focused', value: '2h 15m' },
  { label: 'Streak', value: '4 days' },
  { label: 'Pomodoros', value: '6 cycles' }
]

const cycles = [
  { label: 'Cycle 01', status: 'Complete' },
  { label: 'Cycle 02', status: 'In progress' },
  { label: 'Cycle 03', status: 'Ready' }
]

const history = [
  { time: '9:00 AM', title: 'Design sprint sync', duration: '25m' },
  { time: '9:30 AM', title: 'Code review', duration: '25m' },
  { time: '10:15 AM', title: 'Planning & notes', duration: '15m' }
]

const themeStorageKey = 'pomodoro-theme'

const sessionDurations: Record<SessionType, number> = {
  focus: 25 * 60,
  'short-break': 5 * 60,
  'long-break': 15 * 60
}

const sessionLabels: Record<SessionType, string> = {
  focus: 'Focus',
  'short-break': 'Short Break',
  'long-break': 'Long Break'
}

const sessionOrder: SessionType[] = ['focus', 'short-break', 'long-break']

export default function App() {
  const [theme, setTheme] = usePersistedState<ThemeMode>(themeStorageKey, 'dark')
  const [mode, setMode] = useState<SessionType>('focus')
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const [phaseStart, setPhaseStart] = useState<number | null>(null)
  const [accumulated, setAccumulated] = useState(0)
  const [now, setNow] = useState(Date.now())

  const isDark = theme === 'dark'

  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    if (timerState !== 'running') {
      return
    }

    const interval = setInterval(() => {
      setNow(Date.now())
    }, 250)

    return () => clearInterval(interval)
  }, [timerState])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const resetTimer = useCallback(() => {
    setTimerState('idle')
    setAccumulated(0)
    setPhaseStart(null)
    setNow(Date.now())
  }, [])

  const handleSessionChange = useCallback(
    (newSession: SessionType) => {
      setMode(newSession)
      resetTimer()
    },
    [resetTimer]
  )

  const handleStartOrResume = useCallback(() => {
    if (timerState === 'running') {
      return
    }

    const startTime = Date.now()
    setPhaseStart(startTime)
    setTimerState('running')
    setNow(startTime)
  }, [timerState])

  const handlePause = useCallback(() => {
    if (timerState !== 'running' || phaseStart === null) {
      return
    }

    const pauseTime = Date.now()
    setAccumulated((prev) => prev + (pauseTime - phaseStart))
    setPhaseStart(null)
    setTimerState('paused')
    setNow(pauseTime)
  }, [phaseStart, timerState])

  const handleReset = useCallback(() => {
    resetTimer()
  }, [resetTimer])

  const handleSkip = useCallback(() => {
    const currentIndex = sessionOrder.indexOf(mode)
    const nextIndex = (currentIndex + 1) % sessionOrder.length
    setMode(sessionOrder[nextIndex])
    resetTimer()
  }, [mode, resetTimer])

  const durationSeconds = sessionDurations[mode]
  const elapsedMilliseconds =
    accumulated + (timerState === 'running' && phaseStart !== null ? now - phaseStart : 0)
  const remainingSeconds = Math.max(0, Math.ceil((durationSeconds * 1000 - elapsedMilliseconds) / 1000))

  useEffect(() => {
    if (timerState === 'running' && remainingSeconds <= 0) {
      setTimerState('idle')
      setAccumulated(0)
      setPhaseStart(null)
      setNow(Date.now())
    }
  }, [remainingSeconds, timerState])

  const pageClass = isDark
    ? 'min-h-screen bg-slate-950/40 py-8 text-white'
    : 'min-h-screen bg-slate-50/80 py-8 text-slate-900'

  const sectionClass = isDark
    ? 'rounded-[28px] border border-white/10 bg-slate-950/70 shadow-[0_25px_60px_rgba(15,23,42,0.65)]'
    : 'rounded-[28px] border border-slate-200/70 bg-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.15)]'

  const accentBorder = isDark ? 'border-emerald-400/40' : 'border-sky-300/50'

  return (
    <div className={`${pageClass} transition-colors duration-300`}>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <DashboardShell>
          <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            <section
              className={`${sectionClass} p-6 space-y-4 order-1 lg:order-1 lg:col-start-1 lg:row-start-1`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Task</p>
                <span className="text-xs font-semibold text-emerald-300">Active</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Design review & iteration</h2>
                <p className="text-sm text-slate-400">
                  Lean into the highest impact deliverable with a single-task focus ritual.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {focusPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`rounded-2xl border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                      isDark
                        ? 'border-white/10 bg-white/5 text-white'
                        : 'border-slate-200/60 bg-slate-50 text-slate-900'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </section>

            <section
              className={`order-2 lg:order-2 lg:col-start-1 ${sectionClass} p-5 lg:p-6`}
            >
              <SessionTabs activeSession={mode} onSessionChange={handleSessionChange} />
            </section>

            <section
              className={`order-3 lg:order-3 lg:col-start-2 ${sectionClass} p-6 flex flex-col justify-center lg:min-h-[520px]`}
            >
              <TimerDisplay
                remainingSeconds={remainingSeconds}
                timerState={timerState}
                modeLabel={sessionLabels[mode]}
                onStart={handleStartOrResume}
                onPause={handlePause}
                onReset={handleReset}
                onSkip={handleSkip}
              />
            </section>

            <section
              className={`${sectionClass} space-y-4 p-5 order-4 lg:order-4 lg:col-start-1`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Cycle tracker</p>
                <span className={`text-xs font-semibold ${isDark ? 'text-emerald-300' : 'text-sky-500'}`}>
                  3/4 today
                </span>
              </div>
              <div className="space-y-3">
                {cycles.map((cycle) => (
                  <div
                    key={cycle.label}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 border ${accentBorder} bg-white/5 backdrop-blur ${
                      isDark ? 'bg-slate-900/60 text-white' : 'bg-white/90 text-slate-900'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{cycle.label}</span>
                      <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{cycle.status}</span>
                    </div>
                    <div className="h-8 w-8 rounded-full border-2 border-transparent bg-gradient-to-br from-emerald-400 to-sky-500" />
                  </div>
                ))}
              </div>
            </section>

            <section
              className={`${sectionClass} space-y-4 p-5 order-5 lg:order-5 lg:col-start-1`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Daily statistics</p>
                <span className="text-xs font-semibold text-slate-400">Updated live</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className={`flex flex-col gap-1 rounded-2xl border border-white/5 p-4 text-center backdrop-blur ${
                      isDark ? 'bg-slate-900/30 text-white' : 'bg-white/70 text-slate-900 border-slate-200/40'
                    }`}
                  >
                    <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={`${sectionClass} space-y-4 p-5 order-6 lg:order-6 lg:col-start-1`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">History</p>
                <span className="text-xs font-semibold text-slate-400">Session log</span>
              </div>
              <div className="space-y-4">
                {history.map((entry) => (
                  <div key={entry.time} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{entry.title}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{entry.time}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${
                        isDark ? 'bg-white/10 text-white' : 'bg-slate-900/10 text-slate-900'
                      }`}
                    >
                      {entry.duration}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}
