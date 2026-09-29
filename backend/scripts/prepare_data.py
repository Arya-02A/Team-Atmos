import pandas as pd
import numpy as np
import os
from datetime import datetime, timedelta
import joblib

def generate_demo_data(data_path="data/demo/delhi_data.csv"):
    os.makedirs(os.path.dirname(data_path), exist_ok=True)
    
    # Generate 30 days of hourly data for 5 stations
    stations = [
        {"id": "s1", "name": "Anand Vihar", "lat": 28.6476, "lon": 77.3158, "base_pm25": 180},
        {"id": "s2", "name": "Punjabi Bagh", "lat": 28.6738, "lon": 77.1273, "base_pm25": 140},
        {"id": "s3", "name": "RK Puram", "lat": 28.5632, "lon": 77.1869, "base_pm25": 120},
        {"id": "s4", "name": "Okhla", "lat": 28.5648, "lon": 77.2913, "base_pm25": 160},
        {"id": "s5", "name": "ITO", "lat": 28.6276, "lon": 77.2405, "base_pm25": 150},
    ]
    
    end_time = datetime.now()
    start_time = end_time - timedelta(days=30)
    
    hours = int((end_time - start_time).total_seconds() // 3600)
    times = [start_time + timedelta(hours=i) for i in range(hours)]
    
    rows = []
    for t in times:
        hour_factor = np.sin(t.hour * np.pi / 12) + 1  # 0 to 2
        for s in stations:
            noise = np.random.normal(0, 10)
            pm25 = max(10, s["base_pm25"] + hour_factor * 30 + noise)
            rows.append({
                "timestamp": t.isoformat(),
                "station_id": s["id"],
                "station_name": s["name"],
                "lat": s["lat"],
                "lon": s["lon"],
                "pm25": round(pm25, 2),
                "pm10": round(pm25 * 1.5, 2),
                "no2": round(pm25 * 0.4, 2),
                "temperature": round(25 + np.sin(t.hour * np.pi / 12) * 10, 1),
                "humidity": round(50 - np.sin(t.hour * np.pi / 12) * 20, 1),
                "wind_speed": round(1.5 + np.random.uniform(0, 3), 1),
            })
            
    df = pd.DataFrame(rows)
    df.to_csv(data_path, index=False)
    print(f"Generated demo data at {data_path}")

if __name__ == "__main__":
    # Ensure working directory is project root
    if not os.path.exists("data"):
        os.chdir("../..")
    generate_demo_data("data/demo/delhi_data.csv")
