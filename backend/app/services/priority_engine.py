# backend/app/services/priority_engine.py

from datetime import datetime, timezone
from app.models import Assignment

def calculate_assignment_priority(assignment: Assignment) -> Assignment:
    """
    Computes an assignment's urgency and impact score, updating its
    priority_score and priority_level attributes dynamically.
    """
    # If the assignment is checked off, drop its dynamic priority to zero
    if assignment.is_completed:
        assignment.priority_score = 0.0
        assignment.priority_level = "Completed"
        return assignment

    # Calculate time left until deadline in hours
    now = datetime.now(timezone.utc)
    
    # Ensure due_date is offset-aware to match utcnow
    due_date = assignment.due_date
    if due_date.tzinfo is None:
        due_date = due_date.replace(tzinfo=timezone.utc)
        
    time_delta = due_date - now
    hours_remaining = time_delta.total_seconds() / 3600.0

    # 1. Handle critical past due or immediate deadlines
    if hours_remaining <= 0:
        assignment.priority_score = 1000.0  # Force to the absolute top
        assignment.priority_level = "Critical"
        return assignment

    # 2. Mathematical Core Engine Formula
    # Urgency scales inversely with hours left. Weightage scales impact.
    urgency_factor = 24.0 / hours_remaining  # Normalized based on a day baseline
    impact_factor = assignment.weightage / 10.0
    workload_factor = assignment.estimated_hours
    
    # Calculate base raw score
    raw_score = (urgency_factor * impact_factor) + workload_factor
    assignment.priority_score = round(raw_score, 2)

    # 3. Classify score into categorical levels for the UI badges
    if hours_remaining <= 24 or assignment.priority_score >= 50.0:
        assignment.priority_level = "Critical"
    elif assignment.priority_score >= 25.0:
        assignment.priority_level = "High"
    elif assignment.priority_score >= 10.0:
        assignment.priority_level = "Medium"
    else:
        assignment.priority_level = "Low"

    return assignment