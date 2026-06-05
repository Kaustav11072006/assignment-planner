# backend/app/models.py

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship linking the user to their assignments
    assignments = relationship("Assignment", back_populates="owner", cascade="all, delete-orphan")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    due_date = Column(DateTime(timezone=True), nullable=False)
    
    # Priority Math inputs
    weightage = Column(Float, default=10.0)      # e.g., 40.0 for a final exam, 5.0 for a quiz
    estimated_hours = Column(Float, default=2.0)  # Estimated time needed to finish
    
    # Calculated values
    priority_score = Column(Float, default=0.0)   # Populated by your algorithm engine
    priority_level = Column(String, default="Medium") # Critical, High, Medium, Low
    
    is_completed = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Foreign key referencing back to the user
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    
    # Relationship tying the assignment back to its user
    owner = relationship("User", back_populates="assignments")