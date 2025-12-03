- **FastAPI (Python)** – Backend API  
- **PostgreSQL (Neon)** – Database  
- **Next.js + React** – Frontend  
- **Inline CSS** – No Tailwind (clean and simple)

---

## 📁 Project Structure

project/
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── requirements.txt
│ └── database.sql
├── frontend/
│ ├── src/app/page.tsx
│ └── src/app/layout.tsx
└── README.md

---

# 🚀 How to Run the Project Locally

## Clone the repository

git clone <your_repo_url>
cd project

---

#  Backend Setup (FastAPI + Neon)

## Install Python dependencies

cd backend
pip install -r requirements.txt

## Add environment variable

Create `.env` inside `backend/`:

DATABASE_URL=postgresql+psycopg2://<user>:<password>@<neon_host>/<dbname>

⚠️ Must use **psycopg2** URL (sync engine).  
SSL is handled in `connect_args={"sslmode": "require"}`.

---

##  Run the database setup file

psql "<your_neon_connection_string>" -f database.sql

This creates the `campaigns` table and inserts 10 sample rows.

---

## Start FastAPI server

uvicorn main:app --reload --host 0.0.0.0 --port 8000

Backend will run at:

http://localhost:8000

Test endpoint:

http://localhost:8000/campaigns

---

# Frontend Setup (Next.js)

## Install frontend dependencies

cd frontend
npm install

## Add frontend environment variable

Create `.env.local`:

NEXT_PUBLIC_API_URL=http://localhost:8000

When deployed:

NEXT_PUBLIC_API_URL=https://your-backend-production-url

## Start the frontend

npm run dev

Frontend runs at:

http://localhost:3000

