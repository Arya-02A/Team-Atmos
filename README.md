# AtmosTwin
**Urban Environmental Digital Twin**

AtmosTwin is an interactive digital twin prototype designed to demonstrate how a city can move from observing air quality to forecasting it, attributing its sources, and simulating interventions.

## Architecture
- **Frontend**: React (Vite, TypeScript, Tailwind CSS, Recharts, React-Leaflet)
- **Backend**: FastAPI (Python, XGBoost, Pandas)

## Data Sources
- **Live/API**: Extensible to OpenAQ / Open-Meteo
- **Demo/Cached**: Included historical snapshot of Delhi PM2.5 metrics for resilient prototyping

## Running the Application

### 1. Unified Demo Script (Recommended)
You can start both the backend and frontend simultaneously using the provided demo script:
```bash
bash run_demo.sh
```
- Frontend will be available at: http://localhost:3000
- Backend API will be available at: http://localhost:8080/docs

### 2. Manual Startup
**Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

**Frontend**
```bash
cd frontend
npm install
npm run dev -- --port 3000
```

### 3. ML Pipeline
To retrain the XGBoost forecasting model or generate new demo data:
```bash
cd backend
source venv/bin/activate
python scripts/prepare_data.py
python scripts/train_model.py
python scripts/backtest.py
```

## Features Implemented
1. **Dashboard & Interactive Map**: Live PM2.5 overview with heatmap toggles.
2. **PM2.5 Forecast**: 96-hour prediction using an XGBoost regressor with explicit feature importance.
3. **Source Attribution**: Visual breakdown of pollution sources based on established studies (e.g. Sharma & Dikshit, 2016).
4. **Scenarios Simulator**: Interactive sliders for Traffic, Industry, and Dust to calculate modeled PM2.5 reductions.
5. **Clean Air Windows**: Recommendations for the best times and locations over the next 4 days.
6. **Model Validation**: Backtest metrics showing Actual vs Predicted PM2.5 on a holdout period.
