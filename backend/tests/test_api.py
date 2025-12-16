from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"status": "ok"}


def test_predict():
    payload = {
        "home_team": "Liverpool",
        "away_team": "Real Madrid",
        "competition": "UEFA Champions League",
        "match_date": "2025-02-14",
    }
    r = client.post("/api/predict", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert "probabilities" in data
    probs = data["probabilities"]
    assert abs(sum(probs.values()) - 1.0) < 1e-6
