export async function predict(payload) {
  const backend = (typeof window !== 'undefined' && window.__BACKEND_URL__) ? window.__BACKEND_URL__ : 'http://localhost:8000'
  const res = await fetch(`${backend}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API error ${res.status}: ${text}`)
  }
  return res.json()
}
