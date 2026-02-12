"""
File handling utilities for CV uploads and document generation
"""

import os
from pathlib import Path
from datetime import datetime
from typing import Optional
from app.config import settings


def ensure_directories():
    """Ensure upload and output directories exist"""
    Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
    Path(settings.OUTPUT_DIR).mkdir(parents=True, exist_ok=True)


def get_output_path(date: Optional[datetime] = None) -> Path:
    """
    Get output directory path for a specific date
    Format: outputs/YYYY-MM-DD/
    """
    if date is None:
        date = datetime.now()
    
    date_str = date.strftime("%Y-%m-%d")
    output_path = Path(settings.OUTPUT_DIR) / date_str
    output_path.mkdir(parents=True, exist_ok=True)
    
    return output_path


def save_uploaded_file(file_content: bytes, filename: str, user_id: int) -> Path:
    """
    Save uploaded file to user's upload directory
    Returns path to saved file
    """
    ensure_directories()
    user_upload_dir = Path(settings.UPLOAD_DIR) / str(user_id)
    user_upload_dir.mkdir(parents=True, exist_ok=True)
    
    file_path = user_upload_dir / filename
    with open(file_path, "wb") as f:
        f.write(file_content)
    
    return file_path
