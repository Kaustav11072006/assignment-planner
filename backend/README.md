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