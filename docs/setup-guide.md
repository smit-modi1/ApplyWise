# ApplyWise Setup Guide

## Project Structure

The project has been scaffolded with the following structure:

```
ApplyWise/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── config.py            # Configuration settings
│   │   ├── auth/                # Authentication module
│   │   │   ├── __init__.py
│   │   │   └── router.py
│   │   ├── users/               # User management
│   │   │   ├── __init__.py
│   │   │   └── router.py
│   │   ├── jobs/                # Job management
│   │   │   ├── __init__.py
│   │   │   └── router.py
│   │   ├── ai/                  # AI features
│   │   │   ├── __init__.py
│   │   │   └── router.py
│   │   ├── scheduler/           # Background tasks
│   │   │   ├── __init__.py
│   │   │   └── tasks.py
│   │   └── utils/               # Utilities
│   │       ├── __init__.py
│   │       ├── database.py
│   │       └── file_handler.py
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── landing.html             # Landing page
│   ├── index.html               # Login page
│   ├── dashboard.html           # Dashboard
│   ├── styles.css               # All styles
│   └── app.js                   # JavaScript
│
├── docs/
│   └── setup-guide.md
│
├── .gitignore
├── LICENSE
└── README.md
```

## Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file in `backend/` directory:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///./applywise.db
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

5. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Frontend Setup

1. Open `frontend/landing.html` in a browser to see the landing page
2. Open `frontend/index.html` for the login page
3. For development, you can use a simple HTTP server:
```bash
# Python 3
python -m http.server 5500

# Or use Live Server extension in VS Code
```

## Next Steps

1. **Database Models**: Create SQLAlchemy models for User, Job, Application, etc.
2. **Authentication**: Implement JWT-based auth and Google OAuth
3. **CV Parsing**: Implement CV upload and parsing logic
4. **AI Integration**: Connect Gemini/OpenAI APIs for CV tailoring
5. **Job Scraping**: Implement web scraping for company career pages
6. **Scheduler**: Set up background tasks for nightly job scans
7. **Email**: Integrate SendGrid for daily summaries

## Notes

- The backend is a scaffold with placeholder endpoints
- All endpoints return placeholder responses and need implementation
- The frontend landing page is complete and ready for use
- CSS file may need minor cleanup (remove any JS code if present)
