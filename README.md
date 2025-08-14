<div align="center">

# <img src="https://raw.githubusercontent.com/mato1321/Healixir/main/frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - Smart Health Recommendation System

</div>

<div align="center">
  
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=Your+Personal+Health+Advisor;Data+Analytics+Platform" alt="Typing SVG" />
  
  <br/>
  
  [![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)](https://github.com/mato1321/Healixir)
  [![Node.js](https://img.shields.io/badge/Node.js-≥14.0.0-339933.svg?logo=node.js)](https://nodejs.org/)
  [![Python](https://img.shields.io/badge/Python-≥3.8-3776AB.svg?logo=python)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-≥0.68.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
  
  <br/>
  
  [中文檔案](README_CN.md)
  
</div>

---

## 📖 Introduction

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pill.png" width="150" alt="Pill">

**Healixir** is an integrated health data analytics platform with a proprietary recommendation algorithm for intelligent health supplement recommendations. By analyzing your personal health status, lifestyle habits, and individual needs, our self-developed multi-dimensional scoring algorithm provides customized supplement suggestions tailored specifically for you.

### 🎯 Target Audience

<table>
  <tr>
    <td align="center">💪<br/><b>Boost Immunity</b></td>
    <td align="center">🧠<br/><b>Improve Memory & Focus</b></td>
    <td align="center">😴<br/><b>Better Sleep Quality</b></td>
    <td align="center">🏃<br/><b>Enhance Athletic Performance</b></td>
  </tr>
</table>

---

## 🚀 Key Features

<details open>
<summary><b>📋 Core Features Overview</b></summary>

| Feature | Description |
|---------|-------------|
| 👤 **User Management** | Complete user registration, login, and profile management |
| 📝 **Profile Editing** | Edit personal information and health data |
| 🔐 **Secure Authentication** | JWT-based authentication with encrypted passwords |
| 📊 **Health Data Storage** | PostgreSQL database with complete user health records |
| 🔒 **Privacy Protection** | Encrypted technology to protect your data |
| 🧮 **Proprietary Algorithm Recommendations** | Personalized supplement recommendations based on our custom algorithm |
| 📈 **Visual Analytics** | Intuitive charts displaying health trends |

</details>

---

## 🏗️ System Architecture

<div align="center">
  
```mermaid
graph TD
    A[React Frontend Application] --> B[FastAPI Backend Service]
    B --> C[JWT Authentication]
    B --> D[PostgreSQL Database]
    B --> E[Recommendation Algorithm Engine]
    B --> F[Redis Cache Layer]
    
    C --> G[User Registration/Login]
    C --> H[Profile Management]
    
    D --> I[User Health Data]
    D --> J[Drug Database]
    D --> K[Recommendation History]
    
    E --> L[Drug Matching Algorithm]
    E --> M[Health Status Analysis]
    E --> N[Personalized Recommendation Logic]
    
    subgraph "Recommendation System Core"
        L
        M
        N
    end
    
    subgraph "Data Storage Layer"
        I
        J
        K
    end
    
    subgraph "API Endpoints"
        B --> B1[POST /auth/register]
        B --> B2[POST /auth/login]
        B --> B3[GET /api/user/me]
        B --> B4[PUT /api/user/update]
    end
```

</div>

### 🛠️ Technology Stack

**Frontend Technologies:**
- React 18.3.1 + TypeScript
- Vite Build Tool
- Tailwind CSS + shadcn/ui
- Zustand State Management
- React Query Data Management
- Axios HTTP Client

**Backend Technologies:**
- FastAPI (Python) - High-performance API framework
- PostgreSQL - Primary database
- Redis - Caching and session management
- JWT - Authentication
- Pydantic - Data validation
- SQLAlchemy - ORM for database operations
- Alembic - Database migration management
- bcrypt - Password hashing

**Implementation Features:**
- User registration and authentication system
- Secure password hashing with bcrypt
- JWT token-based authentication
- User profile management and editing
- PostgreSQL database with complete user schema:
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR UNIQUE NOT NULL,
      hashed_password VARCHAR NOT NULL,
      name VARCHAR,
      gender genderenum,  -- ENUM: 'MALE', 'FEMALE', 'OTHER'
      birth_date DATE,
      phone VARCHAR,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- RESTful API endpoints for user operations
- Responsive frontend design with modern UI components

**Recommendation Algorithm:**
- Proprietary drug matching algorithm
- Health status assessment system
- Personalized weight calculation
- Multi-dimensional recommendation scoring mechanism

---

## 🚀 Quick Start

### 📋 System Requirements

- **Node.js** ≥ 14.0.0
- **Python** ≥ 3.8
- **PostgreSQL** ≥ 12.0
- **npm** ≥ 6.0.0 or **yarn** ≥ 1.22.0
- **Git** Latest version

### 📦 Installation Steps

<details>
<summary><b>📥 Step 1: Clone the Project</b></summary>

```bash
# Clone the project locally
git clone https://github.com/mato1321/Healixir.git

# Enter the project directory
cd Healixir
```

</details>

<details>
<summary><b>🗄️ Step 2: Database Setup</b></summary>

```bash
# Install and start PostgreSQL
# Create database
createdb drug_recommend_db

# Create user (optional)
psql -c "CREATE USER drug_user WITH PASSWORD 'drug123456';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE drug_recommend_db TO drug_user;"
```

</details>

<details>
<summary><b>⚙️ Step 3: Backend Setup</b></summary>

#### 🐍 Python FastAPI Backend

```bash
# Enter the backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-jose passlib bcrypt python-multipart pydantic pydantic-settings

# Set up environment variables
# Create .env file with database configuration
echo "DATABASE_URL=postgresql://drug_user:drug123456@localhost:5432/drug_recommend_db" > .env
echo "SECRET_KEY=your-super-secret-key-change-this-in-production" >> .env
echo "ACCESS_TOKEN_EXPIRE_MINUTES=30" >> .env
echo "ALGORITHM=HS256" >> .env
echo "DEBUG=True" >> .env

# Initialize database
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# Start the server
python -m app.main
```

> 🔧 Backend service runs on `http://localhost:8000` by default

</details>

<details>
<summary><b>🎨 Step 4: Frontend Setup</b></summary>

```bash
# Enter the frontend directory
cd ../frontend

# Install dependencies
npm install
# or use yarn
yarn install

# Start the development server
npm run dev
# or use yarn
yarn dev
```

> 🌐 Frontend service runs on `http://localhost:5173` by default (Vite default port)

</details>

---

## 📖 User Guide

### 🎯 Getting Started

<table>
  <tr>
    <td><b>1️⃣ Start Services</b></td>
    <td>Ensure both frontend and backend services are successfully running</td>
  </tr>
  <tr>
    <td><b>2️⃣ Visit Application</b></td>
    <td>Open your browser and go to <code>http://localhost:5173</code></td>
  </tr>
  <tr>
    <td><b>3️⃣ Register Account</b></td>
    <td>Create a new account with your email, password, and personal information</td>
  </tr>
  <tr>
    <td><b>4️⃣ Login</b></td>
    <td>Login with your credentials to access the dashboard</td>
  </tr>
  <tr>
    <td><b>5️⃣ Edit Profile</b></td>
    <td>Update your personal information including name, phone, and birth date</td>
  </tr>
</table>

### 🔄 Common Development Commands

**Frontend Development:**
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build production version
npm run lint         # Code linting
npm run preview      # Preview production build
```

**Backend Development:**
```bash
cd backend
venv\Scripts\activate                    # Activate virtual environment (Windows)
source venv/bin/activate                 # Activate virtual environment (macOS/Linux)
python -m app.main                       # Start development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🔧 Environment Configuration

### 📝 Environment Variables Configuration

Please add the following settings to your `.env` file:

**Backend (.env):**
```env
# Database Configuration
DATABASE_URL=postgresql://drug_user:drug123456@localhost:5432/drug_recommend_db

# Security Settings
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256

# Application Settings
DEBUG=True
PROJECT_NAME=Drug Recommendation API
VERSION=1.0.0

# CORS Settings
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

---

## 📁 Project Structure

```
Healixir/
├── 🎨 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 pages/            # Application pages
│   │   │   ├── 📄 Register.tsx   # User registration
│   │   │   └── 📁 member/
│   │   │       └── 📄 editProfile.tsx  # Profile editing
│   │   ├── 📁 lib/              # Utility libraries
│   │   └── 📄 App.tsx           # Main application component
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── ⚙️ backend/
│   ├── 📁 app/
│   │   ├── 📁 api/              # API route handlers
│   │   │   ├── 📄 auth.py       # Authentication routes
│   │   │   ├── 📄 deps.py       # Dependency injection
│   │   │   └── 📁 v1/
│   │   │       └── 📄 users.py  # User management routes
│   │   ├── 📁 core/             # Core application logic
│   │   │   ├── 📄 config.py     # Configuration settings
│   │   │   ├── 📄 database.py   # Database connection
│   │   │   └── 📄 security.py   # Security utilities
│   │   ├── 📁 crud/             # Database operations
│   │   │   └── 📄 user.py       # User CRUD operations
│   │   ├── 📁 models/           # Database models
│   │   │   └── 📄 user.py       # User model definition
│   │   ├── 📁 schemas/          # Pydantic schemas
│   │   │   └── 📄 user.py       # User data validation
│   │   └── 📄 main.py           # FastAPI application
│   ├── 📁 alembic/              # Database migrations
│   ├── 📄 .env                  # Environment variables
│   └── 📄 requirements.txt      # Python dependencies
└── 📄 README.md
```

---

## 🤝 Contributing Guidelines

We welcome suggestions and feedback!

### 📝 How to Contribute

1. **Fork** the project to your GitHub
2. **Clone** locally: `git clone https://github.com/your-username/Healixir.git`
3. **Create** a feature branch: `git checkout -b feature/your-feature`
4. **Commit** changes: `git commit -m 'Add: new feature description'`
5. **Push**: `git push origin feature/your-feature`
6. **Open** a Pull Request

### 📧 Or Contact Us Directly
For suggestions, please email: charleskao811@gmail.com

---

## 📞 Contact Information

<div align="center">

| Contact Method | Information |
|---------------|-------------|
| 📧 Email | charleskao811@gmail.com |

</div>

---

## 💝 Acknowledgments

<div align="center">
  
  Special thanks to all developers and users who have contributed to **Healixir**!
  
  
  ---
  
  <b>Made with ❤️ by Healixir Team</b>
  
  <br/>
  
  If this project helps you, please give us a ⭐!
  
</div>
