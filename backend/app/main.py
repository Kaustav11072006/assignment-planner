# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routes import auth, assignments

# Create database tables on application startup 
# (Note: In production, migrations like Alembic are preferred, but this works great for development)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Assignment Planner API",
    description="Backend API for tracking deadlines, calculating priorities, and managing user assignments.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your React frontend to send requests to this Python backend
origins = [
    "http://localhost:3000",  # Default React port
    "http://localhost:5173",  # Default Vite + React port
    settings.CLIENT_ORIGIN,   # Fallback to an environment variable config
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allows all headers (like Authorization tokens)
)

# Root Endpoint (Health Check)
@app.get("/", tags=["Root"])
async def root():
    return {
        "status": "healthy",
        "message": "Welcome to the Assignment Planner API",
        "docs_url": "/docs"  # FastAPI builds interactive Swagger documentation automatically here
    }

# Include routers from the routes directory
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(assignments.router, prefix="/api/assignments", tags=["Assignments"])