import pandas as pd
import numpy as np
import xgboost as xgb
import os
import joblib

def create_features(df):
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df = df.sort_values(['station_id', 'timestamp'])
    
    # Lags
    df['pm25_lag1'] = df.groupby('station_id')['pm25'].shift(1)
    df['pm25_lag24'] = df.groupby('station_id')['pm25'].shift(24)
    
    # Rolling
    df['pm25_roll24'] = df.groupby('station_id')['pm25'].rolling(24).mean().reset_index(0,drop=True)
    
    # Time features
    df['hour'] = df['timestamp'].dt.hour
    df['weekday'] = df['timestamp'].dt.weekday
    
    return df.dropna()

def train():
    df = pd.read_csv("data/demo/delhi_data.csv")
    df = create_features(df)
    
    features = ['pm25_lag1', 'pm25_lag24', 'pm25_roll24', 'temperature', 'humidity', 'wind_speed', 'hour', 'weekday']
    X = df[features]
    y = df['pm25']
    
    # Time-based split (last 5 days for test/backtest)
    test_cutoff = df['timestamp'].max() - pd.Timedelta(days=5)
    train_mask = df['timestamp'] < test_cutoff
    
    X_train, y_train = X[train_mask], y[train_mask]
    
    model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
    model.fit(X_train, y_train)
    
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/pm25_xgboost.pkl")
    
    print("Model trained and saved to models/pm25_xgboost.pkl")

if __name__ == "__main__":
    if not os.path.exists("data"):
        os.chdir("../..")
    train()
