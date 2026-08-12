import { ReactNode } from 'react'

type DashboardShellProps = {
  children: ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="flex-1 rounded-[28px] border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 drop-shadow-2xl">
      {children}
    </main>
  )
}
