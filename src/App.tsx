import Header from './components/Header'
import SessionTabs from './components/SessionTabs'
import TimerDisplay from './components/TimerDisplay'
import DashboardShell from './components/DashboardShell'

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

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950/40 py-8">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4">
        <Header />
        <SessionTabs />
        <DashboardShell>
          <div className="flex flex-col gap-8 lg:flex-row">
            <section className="flex flex-1 flex-col gap-6 rounded-[32px] border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.65)]">
              <TimerDisplay />
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <article
                    key={stat.label}
                    className="flex flex-col gap-1 rounded-2xl border border-white/5 bg-slate-950/30 p-4 text-center backdrop-blur"
                  >
                    <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="flex flex-1 flex-col gap-6 rounded-[32px] border border-white/5 bg-slate-900/70 p-6 shadow-xl">
              <article className="space-y-3 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/60 to-slate-900/80 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Task</p>
                  <span className="text-xs text-emerald-300">Active</span>
                </div>
                <h2 className="text-lg font-semibold text-white">Design review &amp; iteration</h2>
                <p className="text-sm text-slate-400">Lean into the highest impact deliverable with single-task focus.</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {focusPresets.map((preset) => (
                    <button
                      key={preset}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-sky-400/80"
                      type="button"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </article>
              <article className="space-y-4 rounded-3xl border border-white/5 bg-slate-950/40 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Cycle tracker</p>
                <div className="space-y-3">
                  {cycles.map((cycle) => (
                    <div
                      key={cycle.label}
                      className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/60 px-4 py-3"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{cycle.label}</span>
                        <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{cycle.status}</span>
                      </div>
                      <div className="h-8 w-8 rounded-full border-2 border-transparent bg-gradient-to-br from-emerald-400 to-sky-500" />
                    </div>
                  ))}
                </div>
              </article>
              <article className="space-y-3 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-slate-900/60 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">History</p>
                <div className="space-y-4">
                  {history.map((entry) => (
                    <div key={entry.time} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{entry.title}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{entry.time}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                        {entry.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}
