import { useCallback, useEffect, useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { SessionType } from '../types'

const sessionOptions: { label: string; description: string; type: SessionType }[] = [
  { label: 'Focus', description: '25 minutes', type: 'focus' },
  { label: 'Short Break', description: '5 minutes', type: 'short-break' },
  { label: 'Long Break', description: '15 minutes', type: 'long-break' }
]

const sessionOrder: SessionType[] = ['focus', 'short-break', 'long-break']

const hasWindow = typeof window !== 'undefined'

type SessionTabsProps = {
  activeSession: SessionType
  onSessionChange: (session: SessionType) => void
}

export default function SessionTabs({ activeSession, onSessionChange }: SessionTabsProps) {
  const sessions = useMemo(() => sessionOptions, [])
  const [isReducedMotion, setReducedMotionPreferences] = useState(false)

  useEffect(() => {
    if (!hasWindow) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => setReducedMotionPreferences(mediaQuery.matches)
    handleMotionChange()
    mediaQuery.addEventListener('change', handleMotionChange)
    return () => mediaQuery.removeEventListener('change', handleMotionChange)
  }, [])

  const focusSession = useCallback(
    (session: SessionType) => {
      onSessionChange(session)
    },
    [onSessionChange]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const currentIndex = sessionOrder.indexOf(activeSession)
        const direction = event.key === 'ArrowRight' ? 1 : -1
        const nextIndex = (currentIndex + direction + sessionOrder.length) % sessionOrder.length
        onSessionChange(sessionOrder[nextIndex])
      }
      if (event.key === 'Home') {
        event.preventDefault()
        onSessionChange(sessionOrder[0])
      }
      if (event.key === 'End') {
        event.preventDefault()
        onSessionChange(sessionOrder[sessionOrder.length - 1])
      }
    },
    [activeSession, onSessionChange]
  )

  return (
    <div className="flex items-center justify-center">
      <div
        role="tablist"
        aria-label="Session modes"
        className="flex w-full max-w-lg items-center justify-between rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/20 p-1 text-sm text-slate-200"
      >
        {sessions.map((session) => {
          const isActive = session.type === activeSession
          return (
            <button
              key={session.type}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => focusSession(session.type)}
              onKeyDown={handleKeyDown}
              className={`group flex flex-col items-center justify-center gap-1 rounded-[26px] px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/30
                ${isActive ? 'border border-slate-900 bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-900 shadow-[0_15px_45px_rgba(14,116,144,0.35)]' : 'border border-white/10 bg-slate-950/40 text-white/80'}
                ${isReducedMotion ? 'duration-0 ease-linear' : 'duration-200 ease-out'}`}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">{session.label}</span>
              <span className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{session.description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
