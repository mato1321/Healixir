<div align="center">

# <img src="https://raw.githubusercontent.com/mato1321/Healixir/main/frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - 智慧健康保健品推薦系統

</div>

<div align="center">
  
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=智慧健康保健品推薦;數據分析平台;您的專屬健康顧問" alt="Typing SVG" />
  
  <br/>
  
  [![Version](https://img.shields.io/badge/版本-1.0.0-blue.svg)](https://github.com/mato1321/Healixir)
  [![Node.js](https://img.shields.io/badge/Node.js-≥14.0.0-339933.svg?logo=node.js)](https://nodejs.org/)
  [![Python](https://img.shields.io/badge/Python-≥3.8-3776AB.svg?logo=python)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-≥0.68.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
  
</div>

---

## 📖 介紹

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pill.png" width="150" alt="Pill">

**Healixir** 是一套整合健康數據分析平台與自主研發推薦演算法的智慧型健康保健品推薦系統。透過分析您個人的健康狀況、生活習慣與個人需求，運用我們自行設計的多維度評分演算法，為您提供量身客製化的保健品建議。

### 🎯 適用族群

<table>
  <tr>
    <td align="center">💪<br/><b>增強免疫力</b></td>
    <td align="center">🧠<br/><b>改善記憶與專注</b></td>
    <td align="center">😴<br/><b>改善日常睡眠</b></td>
    <td align="center">🏃<br/><b>提升運動表現</b></td>
  </tr>
</table>

---

## 🚀 主要功能

<details open>
<summary><b>📋 核心功能一覽</b></summary>

| 功能 | 說明 |
|------|------|
| 👤 **用戶管理** | 完整的用戶註冊、登入與個人資料管理 |
| 📝 **個人資料編輯** | 編輯個人資訊與健康數據 |
| 🔐 **安全身份驗證** | 基於 JWT 的身份驗證與密碼加密 |
| 📊 **健康數據儲存** | PostgreSQL 資料庫完整記錄用戶健康資料 |
| 🔒 **隱私保護** | 採用加密技術保護數據安全 |
| 🧮 **獨家演算法推薦** | 基於自研演算法的個人化保健品推薦 |
| 📈 **視覺化分析** | 直觀的圖表展示健康趨勢 |

</details>

---

## 🏗️ 系統架構

<div align="center">
  
```mermaid
graph TD
    A[React 前端應用] --> B[FastAPI 後端服務]
    B --> C[JWT 身份驗證]
    B --> D[PostgreSQL 數據庫]
    B --> E[推薦演算法引擎]
    B --> F[Redis 緩存層]
    
    C --> G[用戶註冊/登入]
    C --> H[個人資料管理]
    
    D --> I[用戶健康資料]
    D --> J[藥物資料庫]
    D --> K[推薦歷史記錄]
    
    E --> L[藥物配對算法]
    E --> M[健康狀況分析]
    E --> N[個人化推薦邏輯]
    
    subgraph "推薦系統核心"
        L
        M
        N
    end
    
    subgraph "數據存儲層"
        I
        J
        K
    end
    
    subgraph "API 端點"
        B --> B1[POST /auth/register]
        B --> B2[POST /auth/login]
        B --> B3[GET /api/user/me]
        B --> B4[PUT /api/user/update]
    end
```

</div>

### 🛠️ 技術棧

**前端技術：**
- React 18.3.1 + TypeScript
- Vite 構建工具
- Tailwind CSS + shadcn/ui
- Zustand 狀態管理
- React Query 數據管理
- Axios HTTP 客戶端

**後端技術：**
- FastAPI (Python) - 高性能 API 框架
- PostgreSQL - 主要數據庫
- Redis - 緩存與會話管理
- JWT - 身份驗證
- Pydantic - 數據驗證
- SQLAlchemy - ORM 數據庫操作
- Alembic - 數據庫遷移管理
- bcrypt - 密碼雜湊加密

**實現功能：**
- 用戶註冊與身份驗證系統
- 使用 bcrypt 進行安全密碼雜湊
- 基於 JWT token 的身份驗證
- 用戶個人資料管理與編輯
- PostgreSQL 資料庫完整用戶模式：
  ```sql
  CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR UNIQUE NOT NULL,
      hashed_password VARCHAR NOT NULL,
      name VARCHAR,
      gender genderenum,  -- 枚舉: 'MALE', 'FEMALE', 'OTHER'
      birth_date DATE,
      phone VARCHAR,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- 用戶操作的 RESTful API 端點
- 現代 UI 組件的響應式前端設計

**推薦演算法：**
- 自研藥物配對演算法
- 健康狀況評估系統
- 個人化權重計算
- 多維度推薦評分機制

---

## 🚀 快速開始

### 📋 系統需求

- **Node.js** ≥ 14.0.0
- **Python** ≥ 3.8
- **PostgreSQL** ≥ 12.0
- **npm** ≥ 6.0.0 或 **yarn** ≥ 1.22.0
- **Git** 最新版本

### 📦 安裝步驟

<details>
<summary><b>📥 Step 1: Clone 專案</b></summary>

```bash
# 複製專案到本地
git clone https://github.com/mato1321/Healixir.git

# 進入專案目錄
cd Healixir
```

</details>

<details>
<summary><b>🗄️ Step 2: 資料庫設定</b></summary>

```bash
# 安裝並啟動 PostgreSQL
# 建立資料庫
createdb drug_recommend_db

# 建立用戶（可選）
psql -c "CREATE USER drug_user WITH PASSWORD 'drug123456';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE drug_recommend_db TO drug_user;"
```

</details>

<details>
<summary><b>⚙️ Step 3: 後端設定</b></summary>

#### 🐍 Python FastAPI 後端

```bash
# 進入後端目錄
cd backend

# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安裝依賴套件
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-jose passlib bcrypt python-multipart pydantic pydantic-settings

# 設定環境變數
# 建立 .env 檔案並配置資料庫連接
echo "DATABASE_URL=postgresql://drug_user:drug123456@localhost:5432/drug_recommend_db" > .env
echo "SECRET_KEY=your-super-secret-key-change-this-in-production" >> .env
echo "ACCESS_TOKEN_EXPIRE_MINUTES=30" >> .env
echo "ALGORITHM=HS256" >> .env
echo "DEBUG=True" >> .env

# 初始化資料庫
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# 啟動服務器
python -m app.main
```

> 🔧 後端服務預設運行於 `http://localhost:8000`

</details>

<details>
<summary><b>🎨 Step 4: 前端設定</b></summary>

```bash
# 進入前端目錄
cd ../frontend

# 安裝依賴套件
npm install
# 或使用 yarn
yarn install

# 啟動開發伺服器
npm run dev
# 或使用 yarn
yarn dev
```

> 🌐 前端服務預設運行於 `http://localhost:5173` (Vite 默認端口)

</details>

---

## 📖 使用指南

### 🎯 快速上手

<table>
  <tr>
    <td><b>1️⃣ 啟動服務</b></td>
    <td>確保前端和後端服務都已成功啟動</td>
  </tr>
  <tr>
    <td><b>2️⃣ 造訪應用</b></td>
    <td>開啟瀏覽器前往 <code>http://localhost:5173</code></td>
  </tr>
  <tr>
    <td><b>3️⃣ 註冊帳號</b></td>
    <td>使用電子郵件、密碼和個人資訊建立新帳號</td>
  </tr>
  <tr>
    <td><b>4️⃣ 登入系統</b></td>
    <td>使用註冊的帳號密碼登入進入儀表板</td>
  </tr>
  <tr>
    <td><b>5️⃣ 編輯個人資料</b></td>
    <td>更新個人資訊包括姓名、電話、生日等資料</td>
  </tr>
</table>

### 🔄 常用開發指令

**前端開發：**
```bash
cd frontend
npm run dev          # 啟動開發服務器
npm run build        # 構建生產版本
npm run lint         # 代碼檢查
npm run preview      # 預覽生產版本
```

**後端開發：**
```bash
cd backend
venv\Scripts\activate                    # 啟動虛擬環境 (Windows)
source venv/bin/activate                 # 啟動虛擬環境 (macOS/Linux)
python -m app.main                       # 啟動開發服務器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 🔧 環境設定

### 📝 環境變數配置

請在 `.env` 檔案中加入以下設定：

**後端 (.env)：**
```env
# 資料庫設定
DATABASE_URL=postgresql://drug_user:drug123456@localhost:5432/drug_recommend_db

# 安全設定
SECRET_KEY=your-super-secret-key-change-this-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256

# 應用程式設定
DEBUG=True
PROJECT_NAME=Drug Recommendation API
VERSION=1.0.0

# CORS 設定
BACKEND_CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

---

## 📁 專案結構

```
Healixir/
├── 🎨 frontend/
│   ├── 📁 src/
│   │   ├── 📁 components/        # 可重用 UI 組件
│   │   ├── 📁 pages/            # 應用程式頁面
│   │   │   ├── 📄 Register.tsx   # 用戶註冊頁面
│   │   │   └── 📁 member/
│   │   │       └── 📄 editProfile.tsx  # 個人資料編輯
│   │   ├── 📁 lib/              # 工具庫
│   │   └── 📄 App.tsx           # 主應用程式組件
│   ├── 📄 package.json
│   └── 📄 vite.config.ts
├── ⚙️ backend/
│   ├── 📁 app/
│   │   ├── 📁 api/              # API 路由處理器
│   │   │   ├── 📄 auth.py       # 身份驗證路由
│   │   │   ├── 📄 deps.py       # 依賴注入
│   │   │   └── 📁 v1/
│   │   │       └── 📄 users.py  # 用戶管理路由
│   │   ├── 📁 core/             # 核心應用邏輯
│   │   │   ├── 📄 config.py     # 配置設定
│   │   │   ├── 📄 database.py   # 資料庫連接
│   │   │   └── 📄 security.py   # 安全工具
│   │   ├── 📁 crud/             # 資料庫操作
│   │   │   └── 📄 user.py       # 用戶 CRUD 操作
│   │   ├── 📁 models/           # 資料庫模型
│   │   │   └── 📄 user.py       # 用戶模型定義
│   │   ├── 📁 schemas/          # Pydantic 模式
│   │   │   └── 📄 user.py       # 用戶資料驗證
│   │   └── 📄 main.py           # FastAPI 應用程式
│   ├── 📁 alembic/              # 資料庫遷移
│   ├── 📄 .env                  # 環境變數
│   └── 📄 requirements.txt      # Python 依賴套件
└── 📄 README.md
```

---

## 🤝 貢獻指南

歡迎提供建議和回饋！

### 📝 如何貢獻

1. **Fork** 專案到您的 GitHub
2. **Clone** 到本地：`git clone https://github.com/your-username/Healixir.git`
3. **建立**功能分支：`git checkout -b feature/your-feature`
4. **提交**變更：`git commit -m 'Add: 新功能描述'`
5. **推送**：`git push origin feature/your-feature`
6. **開啟** Pull Request

### 📧 或者直接聯絡我們
如有建議請寄信至：charleskao811@gmail.com

---

## 📞 聯絡資訊

<div align="center">

| 聯絡方式 | 資訊 |
|---------|------|
| 📧 Email | charleskao811@gmail.com |

</div>

---

## 💝 致謝

<div align="center">
  
  特別感謝所有為 **Healixir** 做出貢獻的開發者和使用者！
  
  
  ---
  
  <b>Made with ❤️ by Healixir Team</b>
  
  <br/>
  
  如果這個專案對您有幫助，請給我們一個 ⭐！
  
</div>
