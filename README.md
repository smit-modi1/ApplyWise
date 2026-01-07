# ApplyWise

**Smart job matching and AI-powered applications, built for modern professionals.**

ApplyWise automates job discovery, CV tailoring, and application preparation. Upload your CV, set your preferences, and let ApplyWise scan 30-40 company career pages nightly. Wake up to morning emails with new job matches, tailored CVs, and cover letters ready to download.

## Features

- 🎯 **Smart Job Matching** - AI analyzes job descriptions and matches them with your skills
- 📝 **Tailored CV Generation** - Every CV customized for each role
- ✉️ **Cover Letter Creation** - AI-generated personalized cover letters
- 🔄 **Automated Scanning** - Nightly scans of company career pages
- 📊 **Application Tracking** - Keep track of all applications in one place
- 🔒 **Secure & Private** - Encrypted storage of your personal data

## Project Status

✅ **Backend Scaffold Complete**
- FastAPI application structure
- Authentication, Users, Jobs, AI modules
- Database utilities and file handlers
- Configuration management

✅ **Frontend Complete**
- Professional landing page
- Login page
- Dashboard structure
- Banking/fintech style design

## Quick Start

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API available at: http://localhost:8000
API Docs: http://localhost:8000/api/docs

### Frontend

Open `frontend/landing.html` in your browser to see the landing page.

## Project Structure

```
ApplyWise/
├── backend/          # FastAPI backend
├── frontend/         # HTML/CSS/JS frontend
├── docs/             # Documentation
└── README.md
```

See `docs/setup-guide.md` for detailed setup instructions.

## Roadmap

- Week 1: Backend scaffold, Auth endpoints, User model, CV upload
- Week 2: AI CV parsing, Job matching logic, Basic dashboard
- Week 3: Scheduler, Email notifications, Document generation
- Week 4: UI polish, UX improvements, Demo-ready MVP

## License

MIT License - see LICENSE file for details.
