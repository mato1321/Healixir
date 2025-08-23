# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Healixir is a full-stack health recommendation system with a React TypeScript frontend and FastAPI Python backend. The application provides personalized health supplement recommendations through a proprietary algorithm that analyzes user health data and lifestyle habits.

## Development Commands

### Frontend (React + TypeScript + Vite)
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start development server (localhost:5173)
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

### Backend (FastAPI + Python)
```bash
cd backend
python -m venv venv                           # Create virtual environment
venv\Scripts\activate                         # Activate venv (Windows)
source venv/bin/activate                      # Activate venv (macOS/Linux)
pip install -r requirements.txt              # Install dependencies
python -m app.main                           # Start development server (localhost:8000)
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000  # Alternative start command
```

### Database Management (Alembic)
```bash
cd backend
alembic revision --autogenerate -m "description"  # Create new migration
alembic upgrade head                               # Apply migrations
alembic downgrade -1                              # Rollback one migration
```

## Architecture Overview

### Backend Structure (FastAPI)
- **app/main.py**: FastAPI application entry point with CORS and router configuration
- **app/core/**: Core application logic
  - `config.py`: Pydantic settings with environment variable management
  - `database.py`: SQLAlchemy database connection and session management
  - `security.py`: JWT authentication and password hashing utilities
- **app/api/**: API route handlers
  - `auth.py`: Authentication endpoints (login/register)
  - `v1/users.py`: User management CRUD operations
  - `deps.py`: Dependency injection for database sessions and authentication
- **app/models/**: SQLAlchemy database models with User model supporting gender enum
- **app/schemas/**: Pydantic validation schemas for request/response data
- **app/crud/**: Database CRUD operations separated from API logic
- **alembic/**: Database migration management

### Frontend Structure (React + TypeScript)
- **src/App.tsx**: Main application component with routing
- **src/components/**: Reusable UI components including shadcn/ui components
- **src/pages/**: Application pages organized by feature areas:
  - `auth/`: Login and registration pages
  - `member/`: User profile management including editProfile.tsx
  - `nutrition/`: 48 nutrition questionnaire pages (Question1.tsx through Question48.tsx)
  - `shop/`: Shopping cart and product detail pages
- **src/contexts/**: React contexts including CartContext for shopping functionality
- **src/data/**: Static data including supplementData.ts for product information
- **src/lib/utils.ts**: Utility functions with cn() for className merging

### Technology Stack
- **Frontend**: React 18.3.1, TypeScript, Vite, Tailwind CSS, shadcn/ui, Zustand, React Query, Axios
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL (production) / SQLite (development), JWT authentication, bcrypt
- **Database**: Alembic for migrations, supports both PostgreSQL and SQLite
- **Authentication**: JWT tokens with bcrypt password hashing

## Key Development Patterns

### Backend Patterns
- Uses dependency injection pattern with `app/api/deps.py` for database sessions and authentication
- CRUD operations are separated into `app/crud/` modules, not mixed with API route handlers  
- Pydantic schemas in `app/schemas/` handle both request validation and response serialization
- Configuration managed through Pydantic Settings with `.env` file support

### Frontend Patterns
- Uses `@/` alias for src directory imports (configured in vite.config.ts)
- shadcn/ui components in `src/components/ui/` follow consistent patterns
- State management with Zustand for global state (cart functionality)
- React Query for server state management and API calls via Axios

### Database Schema
- User model supports gender enumeration (MALE, FEMALE, OTHER)
- Includes comprehensive user profile fields: email, hashed_password, name, gender, birth_date, phone
- Uses SQLAlchemy with Alembic for schema migrations

## Environment Configuration

### Backend (.env file required)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/db_name  # or sqlite:///./test.db
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256
DEBUG=True
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

### Key Application Features
- User registration and authentication with JWT
- 48-question nutrition assessment questionnaire
- Personalized health supplement recommendations
- Shopping cart functionality with product management
- User profile editing and management
- Health data analytics and visualization

## Development Notes

- The application supports both PostgreSQL (production) and SQLite (development)
- Frontend uses Vite with React SWC plugin for fast development builds
- Backend includes automatic table creation on startup via SQLAlchemy
- CORS is configured to allow frontend development server connections
- Authentication uses HTTP-only patterns with JWT tokens