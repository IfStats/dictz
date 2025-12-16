"""Deterministic baseline predictor — replace with your ML model.
Returns a dict with keys: home_win, draw, away_win summing to 1.0
"""
import hashlib


def predict_proba(home_team: str, away_team: str, competition: str | None = None, match_date: str | None = None) -> dict:
    s = f"{home_team}|{away_team}|{competition or ''}|{match_date or ''}"
    h = int(hashlib.sha256(s.encode()).hexdigest(), 16)
    a = (h % 100) + 1
    b = ((h >> 7) % 100) + 1
    c = ((h >> 13) % 100) + 1
    total = a + b + c
    return {"home_win": a / total, "draw": b / total, "away_win": c / total}
