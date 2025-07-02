# <img src="https://raw.githubusercontent.com/mato1321/Healixir/main/drug-frontend/public/favicon.ico" alt="Healixir Logo" width="35" height="35" /> Healixir - 智慧健康保健品推薦系統(藥物分析)

<div align="center">
  
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=30&pause=1000&color=2E7D32&center=true&vCenter=true&width=600&lines=智慧健康保健品推薦;數據分析平台;您的專屬健康顧問" alt="Typing SVG" />
  
  <br/>
  
  [![Version](https://img.shields.io/badge/版本-1.0.0-blue.svg)](https://github.com/mato1321/healixir)
  [![Node.js](https://img.shields.io/badge/Node.js-?14.0.0-339933.svg?logo=node.js)](https://nodejs.org/)
  [![Python](https://img.shields.io/badge/Python-?3.8-3776AB.svg?logo=python)](https://www.python.org/)
  [![FastAPI](https://img.shields.io/badge/FastAPI-?0.68.0-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB.svg?logo=react)](https://reactjs.org/)
  
</div>

---

## ? 介紹

<img align="right" src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Pill.png" width="150" alt="Pill">

**Healixir** 是一套整合健康數據分析平台與各品牌的健康保健品推薦系統。透過分析您個人的健康狀況、生活習慣與個人需求，為您提供量身客製化的保健品建議。

### ? 適用族群

<table>
  <tr>
    <td align="center">?<br/><b>增強免疫力</b></td>
    <td align="center">?<br/><b>改善記憶與專注</b></td>
    <td align="center">?<br/><b>改善日常睡眠</b></td>
    <td align="center">?<br/><b>提升運動表現</b></td>
  </tr>
</table>

---

## ? 主要功能

<details open>
<summary><b>? 核心功能一覽</b></summary>

| 功能 | 說明 |
|------|------|
| ? **健康數據管理** | 完整記錄並追蹤您的健康數據 |
| ? **獨家演算法推薦** | 基於獨家的演算法來個人化保健品推薦 |
| ? **個人化建議** | 根據您的狀況提供專業健康建議 |
| ? **視覺化分析** | 直觀的圖表展示健康趨勢 |
| ? **隱私保護** | 採用加密技術保護數據 |

</details>

---

## ?? 技術架構

<div align="center">
  
```mermaid
graph TD
    A[React 前端應用] --> B[FastAPI 後端服務]
    B --> C[推薦演算法引擎]
    B --> D[PostgreSQL 數據庫]
    B --> E[Redis 緩存層]
    
    C --> F[藥物配對算法]
    C --> G[健康狀況分析]
    C --> H[個人化推薦邏輯]
    
    D --> I[用戶健康資料]
    D --> J[藥物資料庫]
    D --> K[推薦歷史記錄]
    
    subgraph "推薦系統核心"
        F
        G  
        H
    end
    
    subgraph "數據存儲層"
        I
        J
        K
    end
```

</div>

### ?? 技術棧

**前端技術：**
- React 18.3.1 + TypeScript
- Vite 構建工具
- Tailwind CSS + shadcn/ui
- Zustand 狀態管理
- React Query 數據管理

**後端技術：**
- FastAPI (Python)
- PostgreSQL 數據庫
- Redis 緩存
- JWT 身份驗證

---

## ? 快速開始

### ? 系統需求

- **Node.js** ? 14.0.0
- **Python** ? 3.8
- **npm** ? 6.0.0 或 **yarn** ? 1.22.0
- **Git** 最新版本

### ? 安裝步驟

<details>
<summary><b>? Step 1: Clone 專案</b></summary>

```bash
# 複製專案到本地
git clone https://github.com/mato1321/healixir.git

# 進入專案目錄
cd healixir
```

</details>

<details>
<summary><b>? Step 2: 前端設定</b></summary>

```bash
# 進入前端目錄
cd frontend

# 安裝依賴套件
npm install
# 或使用 yarn
yarn install

# 複製環境變數檔案
cp .env.example .env

# 啟動開發伺服器
npm run dev
# 或使用 yarn
yarn dev
```

> ? 前端服務預設運行於 `http://localhost:5173` (Vite 默認端口)

</details>

<details>
<summary><b>?? Step 3: 後端設定</b></summary>

#### ? Python FastAPI 後端

```bash
# 進入後端目錄
cd ../backend

# 建立虛擬環境
python -m venv venv

# 啟動虛擬環境
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 安裝依賴套件
pip install -r requirements.txt

# 複製環境變數檔案
cp .env.example .env

# 執行數據庫遷移 (如果有的話)
# python -m alembic upgrade head

# 啟動服務器
uvicorn app.main:app --reload --port 8000
```

> ? 後端服務預設運行於 `http://localhost:8000`

**快速啟動指令（後續使用）：**
```bash
# 啟動虛擬環境
venv\Scripts\activate

# 啟動後端服務
uvicorn app.main:app --reload --port 8000
```

</details>

---

## ? 使用指南

### ? 快速上手

<table>
  <tr>
    <td><b>1?? 啟動服務</b></td>
    <td>確保前端和後端服務都已成功啟動</td>
  </tr>
  <tr>
    <td><b>2?? 造訪應用</b></td>
    <td>開啟瀏覽器前往 <code>http://localhost:5173</code></td>
  </tr>
  <tr>
    <td><b>3?? 註冊登入</b></td>
    <td>建立新帳號或使用既有帳號登入</td>
  </tr>
  <tr>
    <td><b>4?? 填寫問卷</b></td>
    <td>完成個人健康數據問卷調查</td>
  </tr>
  <tr>
    <td><b>5?? 獲得推薦</b></td>
    <td>查看 AI 推薦的保健品與分析報告</td>
  </tr>
</table>

### ? 常用開發指令

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
uvicorn app.main:app --reload --port 8000  # 啟動開發服務器
```

---

## ? 環境設定

### ? 環境變數配置

請在 `.env` 檔案中加入以下設定：

**前端 (.env)：**
```env
# API 基礎 URL
VITE_API_BASE_URL=http://localhost:8000

# 應用程式資訊
VITE_APP_NAME=藥物推薦系統
VITE_APP_VERSION=1.0.0

# 開發模式設定
VITE_DEV_MODE=true
```

**後端 (.env)：**
```env
# === 服務器設定 ===
NODE_ENV=development
PORT=8000

# === 數據庫設定 ===
DATABASE_URL=postgresql://user:password@localhost:5432/healixir
REDIS_URL=redis://localhost:6379

# === 安全設定 ===
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-encryption-key

# === AI API 設定 ===
AI_API_KEY=your-ai-api-key
AI_API_URL=https://api.example.com/v1
AI_MODEL=gpt-4

# === 第三方服務 ===
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## ? 專案結構

```
Healixir/
├── ? drug-frontend/
│   ├── ? node_modules/
│   ├── ? public/
│   ├── ? src/
│   │   ├── ? assets/
│   │   ├── ? components/
│   │   ├── ? hooks/
│   │   ├── ? lib/
│   │   ├── ? pages/
│   │   ├── ? services/
│   │   ├── ? stores/
│   │   ├── ? styles/
│   │   ├── ? types/
│   │   ├── ? utils/
│   │   ├── ? App.css
│   │   ├── ? App.tsx
│   │   ├── ? index.css
│   │   ├── ? main.tsx
│   │   └── ? vite-env.d.ts
│   ├── ? .env
│   ├── ? .gitignore
│   ├── ? eslint.config.js
│   ├── ? index.html
│   ├── ? package.json
│   ├── ? package-lock.json
│   ├── ? postcss.config.js
│   ├── ? README.md
│   ├── ? tailwind.config.ts
│   ├── ? tsconfig.app.json
│   ├── ? tsconfig.json
│   ├── ? tsconfig.node.json
│   └── ? vite.config.ts
├── ?? drug-backend/
│   ├── ? alembic/
│   ├── ? app/
│   ├── ? scripts/
│   ├── ? venv/
│   ├── ? .env
│   ├── ? .env.example
│   ├── ? .gitignore
│   ├── ? docker-compose.yml
│   ├── ? Dockerfile
│   ├── ? README.md
│   ├── ? requirements.txt
│   ├── ? requirements-dev.txt
│   └── ? test.db
├── ? docker-compose.yml
└── ? README.md
```

---

## ? 貢獻指南

我們歡迎各種形式的貢獻！無論是新功能、錯誤修復還是文件改進。

<details>
<summary><b>? 如何貢獻</b></summary>

1. **Fork** 專案到您的 GitHub
2. **Clone** 到本地：`git clone https://github.com/your-username/Healixir.git`
3. **建立**功能分支：`git checkout -b feature/your-feature`
4. **提交**變更：`git commit -m 'Add: 新功能描述'`
5. **推送**：`git push origin feature/your-feature`
6. **開啟** Pull Request

</details>

---

## ? 聯絡資訊

<div align="center">

| 聯絡方式 | 資訊 |
|---------|------|
| ? Email | charleskao811@gmail.com |

</div>

---

## ? 致謝

<div align="center">
  
  特別感謝所有為 **Healixir** 做出貢獻的開發者和使用者！
  
  
  ---
  
  <b>Made with ?? by Healixir Team</b>
  
  <br/>
  
  如果這個專案對您有幫助，請給我們一個 ?！
  
</div>
