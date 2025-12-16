from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from services.predictor import predict_proba

class PredictRequest(BaseModel):
    home_team: str
    away_team: str
    competition: str | None = None
    match_date: str | None = None

app = FastAPI()

# Allowing all origins for local/dev convenience (matches README)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/predict")
def predict(req: PredictRequest):
    probs = predict_proba(req.home_team, req.away_team, req.competition, req.match_date)
    return {
        "home_team": req.home_team,
        "away_team": req.away_team,
        "competition": req.competition,
        "match_date": req.match_date,
        "probabilities": probs,
    }
