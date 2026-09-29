import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .api.router import router

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AtmosTwin API")

@app.on_event("startup")
async def startup_event():
    env_mode = os.getenv("APP_ENV", "demo").upper()
    openaq_key = "Configured" if os.getenv("OPENAQ_API_KEY") else "Missing"
    logger.info(f"🚀 Starting AtmosTwin in {env_mode} mode")
    logger.info(f"🔑 OpenAQ API Key: {openaq_key}")
    logger.info(f"🗺️ Mapbox API Key: Configured")
    logger.info(f"📡 Serving endpoints on /api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "AtmosTwin backend"}
