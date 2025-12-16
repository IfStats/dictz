import React from 'react'

export default function ResultCard({ result }) {
  if (!result) return null
  const p = result.probabilities || {}
  return (
    <div style={{ marginTop: 12 }}>
      <h3>Prediction</h3>
      <div><strong>{result.home_team}</strong> vs <strong>{result.away_team}</strong></div>
      <ul>
        <li>Home win: {(p.home_win ?? 0).toFixed(3)}</li>
        <li>Draw: {(p.draw ?? 0).toFixed(3)}</li>
        <li>Away win: {(p.away_win ?? 0).toFixed(3)}</li>
      </ul>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}
