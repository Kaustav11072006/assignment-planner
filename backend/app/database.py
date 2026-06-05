# backend/app/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

# 1. Create the SQLAlchemy engine that connects to PostgreSQL
# We don't need 'check_same_thread' for PostgreSQL as it handles concurrency natively
engine = create_engine(settings.DATABASE_URL)

# 2. Create a SessionLocal class. Each instance of this class will be a database session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 3. Create a Base class that our database tables (models) will inherit from later
Base = declarative_base()

# 4. Dependency function to handle opening and closing DB connections safely.
# This will be injected into our FastAPI route endpoints.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()