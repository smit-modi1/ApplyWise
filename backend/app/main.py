"""
ApplyWise - FastAPI Main Application
Smart job matching and AI-powered applications
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse

from app.config import settings

# Initialize FastAPI app
app = FastAPI(
    title="ApplyWise API",
    description="Smart job matching and AI-powered applications",
    version="0.1.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return JSONResponse({
        "status": "healthy",
        "service": "ApplyWise API",
        "version": "0.1.0"
    })

# Include routers
from app.auth.router import router as auth_router
from app.users.router import router as users_router
from app.jobs.router import router as jobs_router
from app.ai.router import router as ai_router

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(users_router, prefix="/api/users", tags=["users"])
app.include_router(jobs_router, prefix="/api/jobs", tags=["jobs"])
app.include_router(ai_router, prefix="/api/ai", tags=["ai"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "ApplyWise API", "version": "0.1.0"}
