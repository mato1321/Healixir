<div align="center">

# <img src="https://raw.githubusercontent.com/mato1321/Healixir/main/drug-frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - Smart Health Recommendation System (Work in Progress)

</div>

<div align="center">
  
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=Smart+Health+Supplement+Recommendations;Data+Analytics+Platform" alt="Typing SVG" />
  
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
| 📊 **Health Data Management** | Complete recording and tracking of your health data |
| 🧮 **Proprietary Algorithm Recommendations** | Personalized supplement recommendations based on our custom algorithm |
| 📝 **Personalized Suggestions** | Professional health advice tailored to your condition |
| 📈 **Visual Analytics** | Intuitive charts displaying health trends |
| 🔒 **Privacy Protection** | Encrypted technology to protect your data |

</details>

---

## 🏗️ System Architecture

<div align="center">
  
```mermaid
graph TD
    A[React Frontend Application] --> B[FastAPI Backend Service]
    B --> C[Recommendation Algorithm Engine]
    B --> D[PostgreSQL Database]
    B --> E[Redis Cache Layer]
    
    C --> F[Drug Matching Algorithm]
    C --> G[Health Status Analysis]
    C --> H[Personalized Recommendation Logic]
    
    D --> I[User Health Data]
    D --> J[Drug Database]
    D --> K[Recommendation History]
    
    subgraph "Recommendation System Core"
        F
        G  
        H
    end
    
    subgraph "Data Storage Layer"
        I
        J
        K
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
<summary><b>🎨 Step 2: Frontend Setup</b></summary>

```bash
# Enter the frontend directory
cd drug-frontend

# Install dependencies
npm install
# or use yarn
yarn install

# Copy environment variables file (if .env.example exists)
cp .env.example .env

# Start the development server
npm run dev
# or use yarn
yarn dev
```

> 🌐 Frontend service runs on `http://localhost:5173` by default (Vite default port)

</details>

<details>
<summary><b>⚙️ Step 3: Backend Setup</b></summary>

#### 🐍 Python FastAPI Backend

```bash
# Enter the backend directory
cd ../drug-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables file (if available)
cp .env.example .env

# Run database migrations (if applicable)
# python -m alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

> 🔧 Backend service runs on `http://localhost:8000` by default

**Quick Start Commands (for subsequent use):**
```bash
# Activate virtual environment
venv\Scripts\activate

# Start backend service
uvicorn app.main:app --reload --port 8000
```

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
    <td><b>3️⃣ Register/Login</b></td>
    <td>Create a new account or login with existing credentials</td>
  </tr>
  <tr>
    <td><b>4️⃣ Complete Survey</b></td>
    <td>Fill out the personal health data questionnaire</td>
  </tr>
  <tr>
    <td><b>5️⃣ Get Recommendations</b></td>
    <td>View algorithm-recommended supplements and analysis reports</td>
  </tr>
</table>

### 🔄 Common Development Commands

**Frontend Development:**
```bash
cd drug-frontend
npm run dev          # Start development server
npm run build        # Build production version
npm run lint         # Code linting
npm run preview      # Preview production build
```

**Backend Development:**
```bash
cd drug-backend
venv\Scripts\activate                    # Activate virtual environment (Windows)
source venv/bin/activate                 # Activate virtual environment (macOS/Linux)
uvicorn app.main:app --reload --port 8000  # Start development server
```

---

## 🔧 Environment Configuration

### 📝 Environment Variables Configuration

Please add the following settings to your `.env` file:

**Frontend (.env):**
```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8000

# Application Information
VITE_APP_NAME=Drug Recommendation System
VITE_APP_VERSION=1.0.0

# Development Mode Settings
VITE_DEV_MODE=true
```

**Backend (.env):**
```env
# === Server Configuration ===
PORT=8000

# === Database Configuration ===
DATABASE_URL=postgresql://user:password@localhost:5432/healixir
REDIS_URL=redis://localhost:6379

# === Security Settings ===
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key

# === Recommendation Algorithm Settings ===
ALGORITHM_VERSION=1.0
RECOMMENDATION_CACHE_TTL=3600
HEALTH_WEIGHT_MATRIX=default

# === Data Analysis Settings ===
ANALYSIS_ENGINE=custom
SCORING_MODEL=weighted_average

# === Third-party Services ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📁 Project Structure

```
Healixir/
├── 🎨 drug-frontend/
│   ├── 📁 node_modules/
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 assets/
│   │   ├── 📁 components/
│   │   ├── 📁 hooks/
│   │   ├── 📁 lib/
│   │   ├── 📁 pages/
│   │   ├── 📁 services/
│   │   ├── 📁 stores/
│   │   ├── 📁 styles/
│   │   ├── 📁 types/
│   │   ├── 📁 utils/
│   │   ├── 📄 App.css
│   │   ├── 📄 App.tsx
│   │   ├── 📄 index.css
│   │   ├── 📄 main.tsx
│   │   └── 📄 vite-env.d.ts
│   ├── 📄 .env
│   ├── 📄 .gitignore
│   ├── 📄 eslint.config.js
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 package-lock.json
│   ├── 📄 postcss.config.js
│   ├── 📄 README.md
│   ├── 📄 tailwind.config.ts
│   ├── 📄 tsconfig.app.json
│   ├── 📄 tsconfig.json
│   ├── 📄 tsconfig.node.json
│   └── 📄 vite.config.ts
├── ⚙️ drug-backend/
│   ├── 📁 alembic/
│   ├── 📁 app/
│   ├── 📁 scripts/
│   ├── 📁 venv/
│   ├── 📄 .env
│   ├── 📄 .env.example
│   ├── 📄 .gitignore
│   ├── 📄 docker-compose.yml
│   ├── 📄 Dockerfile
│   ├── 📄 README.md
│   ├── 📄 requirements.txt
│   ├── 📄 requirements-dev.txt
│   └── 📄 test.db
├── 🐳 docker-compose.yml
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
