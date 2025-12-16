[README.md](https://github.com/user-attachments/files/23609395/README.md)

# Soccer Predictor App

A full‑stack, containerized web application that predicts match outcomes (home/draw/away) for European club fixtures.

**Stack**: FastAPI (Python) + React (Vite) + Docker + GitHub Actions CI.

## Features
- REST API with `/health` and `/api/predict`.
- Simple, deterministic baseline model seeded on team strings (replace with your ML code).
- CORS enabled for local dev.
- React UI to enter teams, competition and match date; shows probability bars and JSON.
- Dockerfiles for frontend/backend and `docker-compose.yml` for one‑command startup.
- Basic API test with `pytest`.

## Quickstart (no Docker)

### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

### 2) Frontend (new terminal)
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
Open http://localhost:5173 (frontend calls API at http://localhost:8000).

## Quickstart (Docker, recommended)
```bash
docker compose up --build
```
Then open http://localhost:5173.

## Replace the Baseline Model
- Put your model code in `backend/services/predictor.py` (function `predict_proba`).
- If you have serialized weights, store under `backend/models/` and load them in `predictor.py`.
- Keep return shape: `{"home_win": float, "draw": float, "away_win": float}` summing to 1.0.

## API
- `GET /health` → `{"status": "ok"}`
- `POST /api/predict`
```json
{
  "home_team": "Liverpool",
  "away_team": "Real Madrid",
  "competition": "UEFA Champions League",
  "match_date": "2025-02-14"
}
```
Response:
```json
{
  "home_team": "Liverpool",
  "away_team": "Real Madrid",
  "competition": "UEFA Champions League",
  "match_date": "2025-02-14",
  "probabilities": {
    "home_win": 0.42,
    "draw": 0.28,
    "away_win": 0.30
  }
}
```

## Tests
```bash
cd backend
pytest
```

## Project Structure
```
soccer-predictor-app/
  backend/
    app.py
    services/predictor.py
    requirements.txt
    Dockerfile
    tests/test_api.py
  frontend/
    index.html
    package.json
    vite.config.js
    Dockerfile
    src/
      main.jsx
      App.jsx
      components/
        PredictionForm.jsx
        ResultCard.jsx
      services/
        api.js
  docker-compose.yml
  README.md
```

## Note
A minimal backend, frontend, and `docker-compose.yml` were added to this workspace so you can build and run the app locally for demo and testing. These are lightweight scaffolding files; replace them with your real project files if you have the full source.

The frontend now reads `window.__BACKEND_URL__` at runtime (set via the `BACKEND_URL` env var for the container). When running with Docker Compose the frontend is configured to proxy `/api/*` to the `backend` service so API calls from the browser work without CORS adjustments.

## License
MIT
