# backend/app/routes/assignments.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Assignment, User
from app.schemas import AssignmentCreate, AssignmentUpdate, AssignmentResponse
from app.routes.auth import get_current_user
from app.services.priority_engine import calculate_assignment_priority  # Injected logic engine

router = APIRouter()

@router.post("/", response_model=AssignmentResponse, status_code=status.HTTP_201_CREATED)
def create_assignment(
    assignment_in: AssignmentCreate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Convert schema input to database model structure
    new_assignment = Assignment(
        **assignment_in.model_dump(),
        user_id=current_user.id
    )
    
    # Calculate the sorting scores instantly using your priority service engine
    new_assignment = calculate_assignment_priority(new_assignment)
    
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return new_assignment


@router.get("/", response_model=List[AssignmentResponse])
def get_assignments(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    # Retrieve user's assignments sorted by priority score (descending) and closest due dates
    assignments = db.query(Assignment)\
                    .filter(Assignment.user_id == current_user.id)\
                    .order_by(Assignment.is_completed.asc(), Assignment.priority_score.desc(), Assignment.due_date.asc())\
                    .all()
    return assignments


@router.put("/{assignment_id}", response_model=AssignmentResponse)
def update_assignment(
    assignment_id: int, 
    assignment_update: AssignmentUpdate, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id, Assignment.user_id == current_user.id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found or unauthorized")
        
    # Apply changes dynamically
    update_data = assignment_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(assignment, key, value)
        
    # Re-calculate the priority score dynamically in case weight or dates changed
    assignment = calculate_assignment_priority(assignment)
    
    db.commit()
    db.refresh(assignment)
    return assignment


@router.delete("/{assignment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_assignment(
    assignment_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    assignment = db.query(Assignment).filter(Assignment.id == assignment_id, Assignment.user_id == current_user.id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found or unauthorized")
        
    db.delete(assignment)
    db.commit()
    return None