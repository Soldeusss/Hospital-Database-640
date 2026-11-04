import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import './Home.css'

export default function Home() {
  const [dbStatus, setDbStatus] = useState('checking')

  useEffect(() => {
    let cancelled = false

    async function checkConnection() {
      const { error } = await supabase.auth.getSession()
      if (cancelled) return
      setDbStatus(error ? 'offline' : 'online')
    }

    checkConnection().catch(() => {
      if (!cancelled) setDbStatus('offline')
    })

    return () => {
      cancelled = true
    }
  }, [])

  const statusLabel =
    dbStatus === 'checking'
      ? 'Connecting…'
      : dbStatus === 'online'
        ? 'Database online'
        : 'Database offline'

  return (
    <div className="home">
      <header className="home__nav">
        <span className="home__nav-mark" aria-hidden="true" />
        <span className="home__nav-word">Meridian Care</span>
        <span
          className={`home__db-status home__db-status--${dbStatus}`}
          aria-live="polite"
        >
          {statusLabel}
        </span>
      </header>

      <main className="home__hero">
        <div className="home__media" aria-hidden="true">
          <div className="home__media-image" />
          <div className="home__media-veil" />
        </div>

        <div className="home__copy">
          <p className="home__brand">Meridian Care</p>
          <h1 className="home__headline">Care coordinated in one place.</h1>
          <p className="home__lede">
            A hospital management system for patients, staff, and records —
            built for clear daily operations.
          </p>
          <div className="home__actions">
            <a className="home__cta home__cta--primary" href="#enter">
              Enter system
            </a>
            <a className="home__cta home__cta--ghost" href="#overview">
              View overview
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
