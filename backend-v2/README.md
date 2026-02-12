# ApplyWise Backend

Modern, scalable backend for ApplyWise - AI-powered job application assistant.

## Tech Stack

- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini API
- **Authentication**: JWT + Google OAuth
- **Email**: Nodemailer
- **Job Scraping**: Puppeteer + Cheerio
- **Document Generation**: docx + pdfkit

## Prerequisites

- Node.js >= 20.0.0
- PostgreSQL >= 15
- npm >= 10.0.0 (or pnpm)

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your values:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET` and `REFRESH_TOKEN_SECRET`: Generate secure random strings
   - `GEMINI_API_KEY`: Get from Google AI Studio
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Get from Google Cloud Console
   - `SMTP_*`: Email configuration (use Gmail or other SMTP provider)

3. **Set up database**:
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Run migrations
   npm run prisma:migrate
   
   # Seed database with companies
   npm run prisma:seed
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

   Server will start at `http://localhost:3001`

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run prisma:seed` - Seed database with initial data
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code with Prettier

## Project Structure

```
backend-v2/
├── src/
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── modules/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── resumes/      # Resume upload & parsing
│   │   ├── ai/           # AI features (Gemini)
│   │   ├── companies/    # Company management
│   │   ├── jobs/         # Job management
│   │   ├── scrapers/     # Web scraping
│   │   ├── documents/    # Document generation
│   │   ├── notifications/# Email notifications
│   │   └── scheduler/    # Cron jobs
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── app.ts            # Express app
│   └── server.ts         # Server entry point
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Seed data
│   └── migrations/       # Database migrations
├── uploads/              # Uploaded files
├── generated/            # Generated documents
└── logs/                 # Application logs
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/preferences` - Get preferences
- `PUT /api/users/preferences` - Update preferences

### Resumes
- `POST /api/resumes/upload` - Upload resume
- `GET /api/resumes` - Get user's resumes
- `GET /api/resumes/:id` - Get resume details
- `DELETE /api/resumes/:id` - Delete resume

### AI
- `POST /api/ai/suggest-roles` - Get role suggestions
- `POST /api/ai/tailor-resume` - Generate tailored resume
- `POST /api/ai/generate-cover-letter` - Generate cover letter

### Companies
- `GET /api/companies` - List companies
- `GET /api/companies/:id` - Get company details
- `POST /api/companies` - Add custom company
- `POST /api/companies/select` - Select companies to track

### Jobs
- `GET /api/jobs` - List job matches
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/scrape` - Trigger manual scrape (dev only)

### Applications
- `GET /api/applications` - Get application tracking
- `PUT /api/applications/:id` - Update application status

## Development

### Database Changes

When you modify the Prisma schema:

1. Create a migration:
   ```bash
   npm run prisma:migrate
   ```

2. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

### Adding New Features

1. Create module directory in `src/modules/`
2. Add types, service, controller, and routes
3. Register routes in `src/app.ts`

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT
