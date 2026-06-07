# backend/app/services/scheduler.py

from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from app.models import Assignment, User

def scan_and_trigger_reminders(db: Session):
    """
    Scans the database tables for uncompleted deadlines approaching within 24 hours
    and prints out system notification triggers.
    """
    now = datetime.now(timezone.utc)
    reminder_window = now + timedelta(hours=24)

    # Find assignments that are due within 24 hours, are incomplete, and haven't been alerted
    upcoming_tasks = db.query(Assignment).filter(
        Assignment.is_completed == False,
        Assignment.due_date > now,
        Assignment.due_date <= reminder_window
    ).all()

    notifications_sent = 0

    print(f"[{now.isoformat()}] Starting automated deadline check engine...")
    
    for task in upcoming_tasks:
        # Fetch the owner details to discover target emails
        owner = db.query(User).filter(User.id == task.user_id).first()
        if not owner:
            continue
            
        time_left = task.due_date.replace(tzinfo=timezone.utc) - now
        hours_left = int(time_left.total_seconds() / 3600)
        
        # --- Notification Discharging Layer ---
        # Note: This is where you would hook up Nodemailer/SMTP or Twilio APIs.
        # For now, we simulate the hook using structured stdout console alerts.
        print(f"🚨 [REMINDER TRIPPED] Sending alert to {owner.email}!")
        print(f"   ↳ Task: '{task.title}' is due in {hours_left} hours! [Priority: {task.priority_level}]")
        
        notifications_sent += 1

    print(f"💥 Scan complete. Triggered {notifications_sent} active alerts.")
    return {"status": "success", "processed_alerts": notifications_sent}