@echo off
echo Starting POS Grocery System...

echo.
echo Starting Backend (FastAPI)...
start cmd /k "cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python seed_data.py && uvicorn main:app --reload"

timeout /t 5

echo.
echo Starting Frontend (React)...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo Servers are starting...
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
pause
