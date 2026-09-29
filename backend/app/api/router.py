from fastapi import APIRouter
import pandas as pd
import json
import os

router = APIRouter()

@router.get("/stations")
def get_stations():
    df = pd.read_csv("data/demo/delhi_data.csv")
    stations = df.drop_duplicates(subset=["station_id"]).to_dict("records")
    return [
        {
            "id": s["station_id"],
            "name": s["station_name"],
            "lat": s["lat"],
            "lon": s["lon"]
        } for s in stations
    ]

@router.get("/observations")
def get_observations():
    df = pd.read_csv("data/demo/delhi_data.csv")
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    latest = df[df['timestamp'] == df['timestamp'].max()]
    return latest.to_dict("records")

@router.get("/forecast")
def get_forecast():
    # Return mock forecast for prototype speed
    df = pd.read_csv("data/demo/delhi_data.csv")
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    latest_time = df['timestamp'].max()
    stations = df['station_id'].unique()
    
    forecasts = []
    for s in stations:
        last_val = df[(df['station_id'] == s) & (df['timestamp'] == latest_time)]['pm25'].values[0]
        for i in range(1, 97):  # 96 hours
            forecasts.append({
                "station_id": s,
                "timestamp": (latest_time + pd.Timedelta(hours=i)).isoformat(),
                "pm25": round(last_val + (i * 0.5) if i < 48 else last_val + 24 - ((i-48) * 0.5), 2),
                "modeled": True
            })
    return forecasts

@router.get("/backtest")
def get_backtest():
    if os.path.exists("data/processed/backtest_results.json"):
        with open("data/processed/backtest_results.json") as f:
            return json.load(f)
    return {"error": "No backtest data found"}
