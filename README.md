# SchemeSathi AI (योजनासाथी AI)

> **Discover Benefits. Understand Eligibility. Apply with Confidence.**  
> *AI-Powered Citizen Welfare Scheme Discovery and Assistance Platform*

---

## 📌 Overview

**SchemeSathi AI** is a secure, citizen-centric government welfare scheme discovery and eligibility assistance platform. India hosts thousands of central and state government welfare programs, but eligible citizens frequently miss out due to information fragmentation, complex eligibility rules, and opaque application procedures.

SchemeSathi AI solves this through:
- **Demographic & Economic Profile Matching**: Evaluates criteria such as age, state, district, family income, student/farmer status, and occupation.
- **Deterministic Eligibility Engine**: Evaluates criteria using clear logical rules (`LIKELY_MATCH`, `DOES_NOT_MATCH_KNOWN_CRITERIA`, `NEEDS_MORE_INFORMATION`, `NEEDS_SOURCE_VERIFICATION`) rather than relying on generative AI hallucinations for eligibility decisions.
- **Official Source Citations**: Traceable links and verification timestamps from official government portals (`gov.in`, `nic.in`, `maharashtra.gov.in`).
- **Step-by-Step Application Guidance**: Actionable document checklists and structured guides for official government portals.
- **Privacy & Security**: Zero collection of sensitive financial credentials (Aadhaar OTPs, bank passwords, UPI PINs).

> **Disclaimer**: SchemeSathi AI is an independent citizen assistance platform. It is not an official government agency and does not submit applications on behalf of citizens. All applications are directed to official government portals.

---

## 🏛️ UI/UX Design System

Designed in accordance with modern Indian digital public service aesthetics:
- **Primary (Ashoka Navy)**: `#142B4A`
- **Secondary (Muted Saffron)**: `#D6A45B`
- **Accent (Heritage Green)**: `#28634A`
- **Background (Warm Alabaster)**: `#F5F2EA`
- **Text (Charcoal Slate)**: `#30343B`
- **Borders & Dividers**: `#DEDCD4`
- **Muted Text**: `#737982`
- **Success**: `#28634A`
- **Warning**: `#B47A29`
- **Error**: `#A33A32`

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React, React Hook Form, Zod |
| **Backend** | Node.js, Express.js, Helmet, CORS, Express Rate Limit, Zod, bcryptjs, jsonwebtoken, dotenv |
| **Database & Auth** | Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS) |
| **Integrations** | SerpAPI, You.com API, Ollama (Local LLM), Nexconn Chat SDK |

---

## 📂 Project Structure

```text
SchemeSathi/
├── backend/
│   ├── migrations/               # Supabase SQL migrations (profiles, schemes, rules, etc.)
│   ├── src/
│   │   ├── config/              # Environment & Supabase client initialization
│   │   ├── controllers/         # Express route handlers
│   │   ├── middleware/          # Helmet, rate-limiting, error handling, auth
│   │   ├── routes/              # Health, auth, profiles, schemes, eligibility
│   │   ├── services/            # Eligibility engine, SerpAPI, You.com, AI RAG, Citations
│   │   ├── utils/               # Sanitizers, response helpers
│   │   ├── validators/          # Zod request schemas
│   │   ├── app.js               # Express application configuration
│   │   └── server.js            # Server entrypoint
│   ├── tests/                   # Automated tests
│   ├── .env.example             # Backend configuration template
│   └── package.json
│
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── components/          # Reusable UI widgets & forms
│   │   ├── context/             # Auth & citizen profile state
│   │   ├── hooks/               # Custom hooks
│   │   ├── layouts/             # Government portal header/footer layouts
│   │   ├── pages/               # Landing, Questionnaire, Schemes, Dashboard, Admin
│   │   ├── routes/              # App router
│   │   ├── services/            # Axios API client
│   │   ├── styles/              # Tailwind CSS & theme tokens
│   │   ├── App.jsx              # Main routing application
│   │   └── main.jsx             # React entrypoint
│   ├── .env.example             # Frontend configuration template
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18+ (tested on v24)
- **npm** v9+
- A free **Supabase** project (for PostgreSQL database & Auth)

### 2. Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your Supabase credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   JWT_SECRET=your-secure-jwt-secret-at-least-32-chars
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   Backend will run at: `http://localhost:5000`  
   Health check: `http://localhost:5000/api/v1/health`

### 3. Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Frontend will run at: `http://localhost:5173`

### 4. Deploy the Frontend to Netlify
The root `netlify.toml` builds the Vite app from `frontend/`, rewrites client-side routes to `index.html`, and sets `VITE_API_BASE_URL` to the Render backend. Update that value in `netlify.toml` if the backend URL changes.

---

## 🔒 Security Principles
- **No Secret Leaks**: All provider API keys and service-role keys reside exclusively in `backend/.env`.
- **Zero Frontend Secrets**: The React bundle never receives private keys.
- **Strict Row Level Security (RLS)**: Citizens can only access and modify their own records.
- **Input Validation**: All incoming requests are strictly validated using Zod.
- **Defense in Depth**: Helmet headers, origin-restricted CORS, and express rate limiters enabled.
