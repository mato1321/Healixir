<img src="https://raw.githubusercontent.com/mato1321/Healixir/main/drug-frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - Smart Health Supplement Recommendation System (Drug Analysis)
<div align="center"> <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=Smart+Supplement+Recommendations;Data+Analysis+Platform;Your+Personal+Health+Advisor" alt="Typing SVG" /> <br/>






</div>
📖 Introduction
<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pill.png" width="150" alt="Pill">
Healixir is an intelligent supplement recommendation system that integrates health data analytics and a proprietary recommendation algorithm. It analyzes your personal health status, lifestyle habits, and specific needs to provide personalized supplement suggestions using our custom-built multi-dimensional scoring algorithm.

🎯 Target Users
<table> <tr> <td align="center">💪<br/><b>Boost Immunity</b></td> <td align="center">🧠<br/><b>Improve Focus & Memory</b></td> <td align="center">😴<br/><b>Enhance Sleep Quality</b></td> <td align="center">🏃<br/><b>Enhance Athletic Performance</b></td> </tr> </table>
🚀 Key Features
<details open> <summary><b>📋 Feature Overview</b></summary>
Feature	Description
📊 Health Data Management	Track and manage your health data
🧮 Proprietary Recommendation Algorithm	Personalized supplement suggestions
📝 Tailored Advice	Professional advice based on personal data
📈 Visual Analysis	Health trend visualizations
🔒 Privacy Protection	Encrypted data handling

</details>
🏗️ System Architecture
<div align="center">
mermaid
複製
編輯
graph TD
    A[React Frontend App] --> B[FastAPI Backend Service]
    B --> C[Recommendation Engine]
    B --> D[PostgreSQL Database]
    B --> E[Redis Cache]
    
    C --> F[Drug Matching Algorithm]
    C --> G[Health Condition Analysis]
    C --> H[Personalized Logic]
    
    D --> I[User Health Data]
    D --> J[Drug Database]
    D --> K[Recommendation History]
    
    subgraph "Recommendation Core"
        F
        G  
        H
    end
    
    subgraph "Data Storage Layer"
        I
        J
        K
    end
</div>
🛠️ Tech Stack
Frontend:

React 18.3.1 + TypeScript

Vite

Tailwind CSS + shadcn/ui

Zustand state management

React Query for data handling

Axios HTTP client

Backend:

FastAPI (Python) - High-performance API

PostgreSQL - Primary database

Redis - Caching and session management

JWT - Authentication

Pydantic - Data validation

Recommendation Algorithms:

Custom drug matching algorithm

Health condition evaluation system

Personalized weighting logic

Multi-dimensional scoring mechanism

🚀 Quick Start
📋 Requirements
Node.js ≥ 14.0.0

Python ≥ 3.8

npm ≥ 6.0.0 or yarn ≥ 1.22.0

Git latest version

📦 Installation Steps
<details> <summary><b>📥 Step 1: Clone Project</b></summary>
bash
複製
編輯
# Clone the project
git clone https://github.com/mato1321/Healixir.git

# Navigate to the directory
cd Healixir
</details> <details> <summary><b>🎨 Step 2: Frontend Setup</b></summary>
bash
複製
編輯
cd drug-frontend

# Install dependencies
npm install
# or
yarn install

# Copy environment variables (if applicable)
cp .env.example .env

# Start development server
npm run dev
# or
yarn dev
🌐 Frontend runs on http://localhost:5173 (default Vite port)

</details> <details> <summary><b>⚙️ Step 3: Backend Setup</b></summary>
🐍 Python FastAPI Backend
bash
複製
編輯
cd ../drug-backend

# Create virtual environment
python -m venv venv

# Activate environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run DB migration if needed
# python -m alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --port 8000
🔧 Backend runs on http://localhost:8000

Quick startup (for later use):

bash
複製
編輯
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
</details>
📖 User Guide
🎯 Getting Started
<table> <tr> <td><b>1️⃣ Start Services</b></td> <td>Make sure both frontend and backend are running</td> </tr> <tr> <td><b>2️⃣ Visit App</b></td> <td>Open browser at <code>http://localhost:5173</code></td> </tr> <tr> <td><b>3️⃣ Register/Login</b></td> <td>Create or log in to your account</td> </tr> <tr> <td><b>4️⃣ Fill Questionnaire</b></td> <td>Provide personal health information</td> </tr> <tr> <td><b>5️⃣ Get Recommendations</b></td> <td>View supplements and analysis reports</td> </tr> </table>
🔄 Development Commands
Frontend:

bash
複製
編輯
cd drug-frontend
npm run dev          # Start dev server
npm run build        # Build production version
npm run lint         # Lint code
npm run preview      # Preview production
Backend:

bash
複製
編輯
cd drug-backend
venv\Scripts\activate                    # Windows
source venv/bin/activate                 # macOS/Linux
uvicorn app.main:app --reload --port 8000
🔧 Environment Configuration
📝 .env Setup
Frontend (.env):

env
複製
編輯
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Supplement Recommendation System
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
Backend (.env):

env
複製
編輯
PORT=8000

DATABASE_URL=postgresql://user:password@localhost:5432/healixir
REDIS_URL=redis://localhost:6379

JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key

ALGORITHM_VERSION=1.0
RECOMMENDATION_CACHE_TTL=3600
HEALTH_WEIGHT_MATRIX=default

ANALYSIS_ENGINE=custom
SCORING_MODEL=weighted_average

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
📁 Project Structure
pgsql
複製
編輯
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
🤝 Contributing
We welcome contributions and feedback!

📝 How to Contribute
Fork the project on GitHub

Clone to your local machine:
git clone https://github.com/your-username/Healixir.git

Create a new feature branch:
git checkout -b feature/your-feature

Commit your changes:
git commit -m 'Add: description of your feature'

Push to GitHub:
git push origin feature/your-feature

Open a Pull Request

📧 Contact Us
Email: charleskao811@gmail.com

📞 Contact Info
<div align="center">
Contact	Details
📧 Email	charleskao811@gmail.com

</div>
💝 Acknowledgements
<div align="center">
Special thanks to all developers and users who contributed to Healixir!

<b>Made with ❤️ by the Healixir Team</b>

<br/>
If you found this project helpful, please give us a ⭐!

</div>
