# ApplyWise Backend

FastAPI backend for ApplyWise - Smart job matching and AI-powered applications.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the `backend/` directory:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///./applywise.db
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Run the development server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration settings
│   ├── auth/                # Authentication routes
│   │   ├── __init__.py
│   │   └── router.py
│   ├── users/               # User management routes
│   │   ├── __init__.py
│   │   └── router.py
│   ├── jobs/                # Job management routes
│   │   ├── __init__.py
│   │   └── router.py
│   ├── ai/                  # AI-powered features
│   │   ├── __init__.py
│   │   └── router.py
│   ├── scheduler/           # Background tasks
│   │   ├── __init__.py
│   │   └── tasks.py
│   └── utils/               # Utilities
│       ├── __init__.py
│       ├── database.py
│       └── file_handler.py
├── requirements.txt
└── README.md
```

## API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/cv/upload` - Upload CV
- `GET /api/users/cv` - Get user's CV
- `POST /api/users/preferences` - Update preferences
- `GET /api/users/preferences` - Get preferences

### Jobs
- `GET /api/jobs/` - List jobs
- `GET /api/jobs/{job_id}` - Get job details
- `POST /api/jobs/{job_id}/track` - Track a job
- `GET /api/jobs/tracked` - Get tracked jobs
- `POST /api/jobs/scan` - Trigger job scan

### AI
- `POST /api/ai/tailor-cv` - Generate tailored CV
- `POST /api/ai/generate-cover-letter` - Generate cover letter
- `POST /api/ai/analyze-match` - Analyze CV match
- `POST /api/ai/extract-skills` - Extract skills from CV

## Development

This is an MVP scaffold. Most endpoints return placeholder responses and need to be implemented according to the project roadmap.

## Next Steps

1. Implement database models (SQLAlchemy)
2. Implement JWT authentication
3. Implement Google OAuth
4. Implement CV parsing and AI integration
5. Implement job scraping logic
6. Implement scheduled tasks
7. Implement email notifications
