import pandas as pd
import numpy as np
import xgboost as xgb
import os
import joblib
from sklearn.metrics import mean_absolute_error, mean_squared_error

def create_features(df):
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values(['station_id', 'timestamp'])
    df['pm25_lag1'] = df.groupby('station_id')['pm25'].shift(1)
    df['pm25_lag24'] = df.groupby('station_id')['pm25'].shift(24)
    df['pm25_roll24'] = df.groupby('station_id')['pm25'].rolling(24).mean().reset_index(0,drop=True)
    df['hour'] = df['timestamp'].dt.hour
    df['weekday'] = df['timestamp'].dt.weekday
    return df.dropna()

def backtest():
    df = pd.read_csv("data/demo/delhi_data.csv")
    df = create_features(df)
    
    test_cutoff = df['timestamp'].max() - pd.Timedelta(days=5)
    test_mask = df['timestamp'] >= test_cutoff
    
    df_test = df[test_mask].copy()
    
    features = ['pm25_lag1', 'pm25_lag24', 'pm25_roll24', 'temperature', 'humidity', 'wind_speed', 'hour', 'weekday']
    X_test = df_test[features]
    y_test = df_test['pm25']
    
    model = joblib.load("models/pm25_xgboost.pkl")
    preds = model.predict(X_test)
    
    mae = mean_absolute_error(y_test, preds)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    
    # Baseline: persistence (pm25_lag24)
    baseline_mae = mean_absolute_error(y_test, X_test['pm25_lag24'])
    baseline_rmse = np.sqrt(mean_squared_error(y_test, X_test['pm25_lag24']))
    
    results = {
        "xgboost_mae": round(mae, 2),
        "xgboost_rmse": round(rmse, 2),
        "baseline_mae": round(baseline_mae, 2),
        "baseline_rmse": round(baseline_rmse, 2)
    }
    
    import json
    os.makedirs("data/processed", exist_ok=True)
    with open("data/processed/backtest_results.json", "w") as f:
        json.dump(results, f)
        
    print(f"Backtest completed: {results}")

if __name__ == "__main__":
    if not os.path.exists("data"):
        os.chdir("../..")
    backtest()
