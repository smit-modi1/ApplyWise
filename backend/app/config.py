"""
Configuration settings for ApplyWise
"""

from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # App
    APP_NAME: str = "ApplyWise"
    DEBUG: bool = False
    SECRET_KEY: str = "change-me-in-production"
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:5500"]
    
    # Database
    DATABASE_URL: str = "sqlite:///./applywise.db"
    
    # JWT
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # OAuth
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    
    # AI
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    AI_PROVIDER: str = "gemini"  # or "openai"
    
    # Email
    SENDGRID_API_KEY: str = ""
    EMAIL_FROM: str = "noreply@applywise.com"
    
    # File Storage
    UPLOAD_DIR: str = "./uploads"
    OUTPUT_DIR: str = "./outputs"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
