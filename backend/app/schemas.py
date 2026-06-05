# backend/app/schemas.py

from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional, List

# ----------------------------
# USER SCHEMAS
# ----------------------------

# What the frontend sends during Registration
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, description="Password must be at least 6 characters long")

# Safe representation returned back to the frontend (excluding hashed_password!)
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True


# ----------------------------
# ASSIGNMENT SCHEMAS
# ----------------------------

# Core assignment data shared between creating and editing
class AssignmentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    due_date: datetime
    weightage: float = Field(10.0, ge=1.0, le=100.0, description="Task impact weight out of 100")
    estimated_hours: float = Field(2.0, ge=0.5, description="Estimated effort in hours")

# Data template used when creating a new assignment
class AssignmentCreate(AssignmentBase):
    pass

# Data template used when modifying fields or toggling status
class AssignmentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    weightage: Optional[float] = None
    estimated_hours: Optional[float] = None
    is_completed: Optional[bool] = None

# Full representation sent back to the React app
class AssignmentResponse(AssignmentBase):
    id: int
    user_id: int
    priority_score: float
    priority_level: str
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ----------------------------
# AUTHENTICATION TOKEN SCHEMAS
# ----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None