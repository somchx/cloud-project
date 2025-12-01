#!/bin/bash

# สคริปต์สำหรับรัน Backend และ Frontend พร้อมกัน

echo "🚀 Starting POS Grocery System..."

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo "📦 Starting Backend (FastAPI)..."
cd backend
source venv/bin/activate 2>/dev/null || python3 -m venv venv && source venv/bin/activate
pip install -q -r requirements.txt
python seed_data.py 2>/dev/null || true
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 3

# Start Frontend
echo "⚛️  Starting Frontend (React)..."
cd frontend
npm install --silent 2>/dev/null || true
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servers are running!"
echo ""
echo "📍 Backend:  http://localhost:8000"
echo "📍 Frontend: http://localhost:3000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
