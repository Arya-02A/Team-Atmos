#!/bin/bash
echo "Starting AtmosTwin..."

# Start Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8080 &
BACKEND_PID=$!
echo "Backend running on PID $BACKEND_PID"

# Start Frontend
cd ../frontend
npm run dev -- --port 3000 &
FRONTEND_PID=$!
echo "Frontend running on PID $FRONTEND_PID"

# Handle graceful shutdown
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait
