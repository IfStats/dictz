import React, { useState } from 'react'

export default function PredictionForm({ onPredict }) {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!home || !away) return
    onPredict({ home_team: home, away_team: away })
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <input placeholder="Home team" value={home} onChange={(e) => setHome(e.target.value)} />
      <input placeholder="Away team" value={away} onChange={(e) => setAway(e.target.value)} />
      <button type="submit">Predict</button>
    </form>
  )
}
