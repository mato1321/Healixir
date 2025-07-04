# <img src="https://raw.githubusercontent.com/mato1321/Healixir/main/frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - 智慧健康保健品推薦系統

<div align="center">
  
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=智慧健康保健品推薦;您的專屬健康顧問;個人化補充品建議" alt="Typing SVG" />
  
  <br/>
  
  [![Version](https://img.shields.io/badge/版本-1.0.0-blue.svg)](https://github.com/mato1321/Healixir)
  [![Node.js](https://img.shields.io/badge/Node.js-≥14.0.0-339933.svg?logo=node.js)](https://nodejs.org/)
  [![Python](https://img.shields.io/badge/Python-≥3.8-3776AB.svg?logo=python)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-≥0.104.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
  
</div>

---

## 📖 介紹

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pill.png" width="150" alt="Pill">

**Healixir** 是一套整合健康數據分析與個人化推薦演算法的智慧型健康保健品推薦系統。透過分析您個人的健康狀況、生活習慣與個人需求，為您提供量身客製化的保健品建議。

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

| 功能 | 說明 | 狀態 |
|------|------|------|
| 👤 **用戶管理** | 完整的用戶註冊、登入與個人資料管理 | ✅ 已完成 |
| 📝 **個人資料編輯** | 編輯個人資訊與健康數據 | ✅ 已完成 |
| 🔐 **安全身份驗證** | 基於 JWT 的身份驗證與密碼加密 | ✅ 已完成 |
| 📊 **健康數據儲存** | PostgreSQL 資料庫完整記錄用戶健康資料 | ✅ 已完成 |
| 🔒 **隱私保護** | 採用加密技術保護數據安全 | ✅ 已完成 |
| 🧮 **推薦演算法** | 個人化保健品推薦系統 | 🚧 開發中 |
| 📈 **視覺化分析** | 直觀的圖表展示健康趨勢 | 🚧 開發中 |

</details>

---

## 🏗️ 系統架構

<div align="center">
  
```mermaid
graph TD
    A[React 前端應用] --> B[FastAPI 後端服務]
    B --> C[JWT 身份驗證]
    B --> D[PostgreSQL 數據庫]
    
    C --> E[用戶註冊/登入]
    C --> F[個人資料管理]
    
    D --> G[用戶健康資料]
    D --> H[身份驗證記錄]
    
    subgraph "前端組件"
        A --> A1[註冊頁面]
        A --> A2[登入頁面]
        A --> A3[個人資料編輯頁面]
        A --> A4[儀表板]
    end
    
    subgraph "後端 API 端點"
        B --> B1[/auth/register]
        B --> B2[/auth/login]
        B --> B3[/api/user/me]
        B --> B4[/api/user/update]
    end
    
    subgraph "資料庫結構"
        G --> G1[Users 表]
        G1 --> G2[id, email, hashed_password]
        G1 --> G3[name, gender, birth_date, phone]
        G1 --> G4[is_active, created_at, updated_at]
    end
```

</div>

### 🛠️ 技術棧

**前端技術：**
- React 18.3.1 + TypeScript
- Vite 構建工具
- Tailwind CSS + shadcn/ui 組件庫
- React Router 路由管理
- Axios HTTP 客戶端
- Lucide React 圖標庫

**後端技術：**
- FastAPI (Python) - 高性能 API 框架
- PostgreSQL - 主要數據庫，完整 ACID 支援
- SQLAlchemy - ORM 數據庫操作
- Alembic - 數據庫遷移管理
- JWT (JSON Web Tokens) - 安全身份驗證
- bcrypt - 密碼雜湊加密
- Pydantic - 數據驗證與序列化

**安全特性：**
- 使用 bcrypt 進行密碼加密
- 基於 JWT token 的身份驗證
- CORS 中間件確保跨域請求安全
- SQLAlchemy ORM 防止 SQL 注入攻擊
- Pydantic 模式進行輸入驗證

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

# 初始化資料庫（如果使用 Alembic）
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

### 🔄 API 端點

**身份驗證：**
- `POST /auth/register` - 用戶註冊
- `POST /auth/login` - 用戶登入
- `GET /auth/me` - 取得當前用戶資訊

**用戶管理：**
- `GET /api/user/me` - 取得用戶個人資料
- `PUT /api/user/me` - 更新用戶個人資料（RESTful）
- `PUT /api/user/update` - 更新用戶個人資料（前端兼容）

### 🗄️ 資料庫結構

```sql
-- Users 表結構
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

---

## 🔧 環境設定

### 📝 環境變數配置

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

## 🚧 開發路線圖

### ✅ 已完成功能
- [x] 用戶註冊與身份驗證系統
- [x] 使用 bcrypt 進行安全密碼雜湊
- [x] 基於 JWT token 的身份驗證
- [x] 用戶個人資料管理與編輯
- [x] PostgreSQL 資料庫整合
- [x] RESTful API 端點
- [x] 響應式前端設計

### 🚧 開發中
- [ ] 健康問卷調查系統
- [ ] 保健品推薦演算法
- [ ] 健康數據分析儀表板
- [ ] 視覺化圖表與報告
- [ ] 保健品管理後台

### 🎯 未來計劃
- [ ] 手機應用程式
- [ ] AI 驅動的健康洞察
- [ ] 健康設備整合
- [ ] 多語言支援
- [ ] 進階報告功能

---

## 📞 聯絡資訊

<div align="center">

| 聯絡方式 | 資訊 |
|---------|------|
| 📧 Email | charleskao811@gmail.com |
| 🐙 GitHub | [mato1321](https://github.com/mato1321) |

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
