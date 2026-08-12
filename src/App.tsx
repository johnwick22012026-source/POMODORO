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

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-10">
        <Header />
        <SessionTabs />
        <DashboardShell>
          <div className="flex flex-col gap-8 lg:flex-row">
            <section className="flex-1 rounded-3xl border border-white/5 bg-slate-900/80 p-6 shadow-2xl">
              <div className="flex flex-col gap-6">
                <TimerDisplay />
                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <article
                      key={stat.label}
                      className="rounded-2xl border border-white/5 bg-slate-950/50 p-4 text-center"
                    >
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            <section className="flex-1 space-y-4 rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-xl">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Presets</h2>
              <div className="flex flex-wrap gap-3">
                {focusPresets.map((preset) => (
                  <button
                    key={preset}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition duration-200 hover:border-accent/70 hover:bg-slate-600"
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-4 text-sm text-slate-300">
                <p className="text-slate-400">Task</p>
                <p className="text-lg font-semibold text-white">Design review &amp; iteration</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">Focus on single objective</p>
              </div>
            </section>
          </div>
        </DashboardShell>
      </div>
    </div>
  )
}
