import React, { useState } from 'react'
import PredictionForm from './components/PredictionForm'
import ResultCard from './components/ResultCard'
import { predict } from './services/api'

export default function App() {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handlePredict(payload) {
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const data = await predict(payload)
      setResult(data)
    } catch (e) {
      setError(e.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Soccer Predictor</h1>
      <PredictionForm onPredict={handlePredict} />
      {loading && <div style={{ marginTop: 12 }}>Loading…</div>}
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      <ResultCard result={result} />
    </div>
  )
}
