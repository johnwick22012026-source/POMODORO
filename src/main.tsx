import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

type ThemeMode = 'light' | 'dark'

const themeStorageKey = 'pomodoro-theme'

const resolvedTheme = (() => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(themeStorageKey) as ThemeMode | null
  return stored === 'light' ? 'light' : 'dark'
})()

if (typeof document !== 'undefined') {
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
