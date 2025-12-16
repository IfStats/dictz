import React, { useState } from 'react'
import axios from 'axios'

export default function App() {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [res, setRes] = useState(null)
  const [err, setErr] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setErr(null)
    setRes(null)
    try {
      const backend = (typeof window !== 'undefined' && window.__BACKEND_URL__) ? window.__BACKEND_URL__ : 'http://localhost:8000'
      const resp = await axios.post(`${backend}/api/predict`, {
        home_team: home,
        away_team: away,
        competition: '',
        match_date: '',
      })
      setRes(resp.data)
    } catch (e) {
      setErr(e.toString())
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Soccer Predictor</h1>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input placeholder="Home team" value={home} onChange={(e) => setHome(e.target.value)} />
        <input placeholder="Away team" value={away} onChange={(e) => setAway(e.target.value)} />
        <button type="submit">Predict</button>
      </form>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      {res && <pre style={{ marginTop: 12 }}>{JSON.stringify(res, null, 2)}</pre>}
    </div>
  )
}
