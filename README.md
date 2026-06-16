# 🚀 Assignment Planner API (Backend)

An intelligent, asynchronous backend engine built with **FastAPI**, **SQLAlchemy ORM**, and **PostgreSQL**. This system handles secure JWT user authentication, assignment tracking, automated background urgency triggers, and runs a custom prioritization sorting engine.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** FastAPI (Python 3.10+)
* **Database ORM:** SQLAlchemy with `psycopg2` driver bindings
* **Database Engine:** PostgreSQL
* **Data Validation:** Pydantic v2
* **Security Layer:** Passlib (Bcrypt) & Python-Jose (JWT tokens)

---

## 📦 System Prerequisites & Local Installation

Ensure you have a PostgreSQL server instance running locally and an active database created named `assignment_planner`.

### 1. Set Up a Virtual Environment
Navigate to the backend folder and initialize a fresh Python virtual environment:
```bash
cd backend
python -m venv venv






# 🎨 Assignment Planner (React Frontend)

An intuitive, fast, and responsive assignment management dashboard styled cleanly with **Tailwind CSS** and orchestrated using **React (Vite)**. 

---

## ✨ Features Implemented

* 🔐 **Secure Session State:** Built-in JWT verification context (`AuthContext`) keeps users signed in without loose re-authentication steps on page refresh.
* 🛡️ **Route Guards:** High-priority workspace routes are shielded using structural `ProtectedRoute` conditional wrappers.
* 📊 **Dynamic Badging:** Tasks render visual hierarchy tags dynamically calculated by the Python algorithmic core backend pipeline.
* ⚡ **Vite Tooling:** Hyper-fast Hot Module Replacement (HMR) for friction-free local development.

---

## 🛠️ Step-by-Step UI Execution Setup

### 1. System Dependency Installation
Navigate to your frontend root workspace tree and clean run standard node packet installations:
```bash
cd frontend
npm install