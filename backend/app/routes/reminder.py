from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.reminder import Reminder
from app.schemas.reminder_schema import ReminderCreate


router = APIRouter(
    prefix="/reminders",
    tags=["Reminders"]
)


@router.get("")
def get_reminders(
    db: Session = Depends(get_db)
):

    return (
        db.query(Reminder)
        .all()
    )


@router.post("")
def create_reminder(
    reminder: ReminderCreate,
    db: Session = Depends(get_db)
):

    new_reminder = Reminder(

        title=reminder.title,

        reminder_date=reminder.reminder_date,

        reminder_time=reminder.reminder_time,

        smart_schedule=reminder.smart_schedule

    )

    db.add(new_reminder)

    db.commit()

    db.refresh(new_reminder)

    return new_reminder

@router.patch("/{reminder_id}")
def toggle_reminder(
    reminder_id:int,
    db: Session = Depends(get_db)
):

    reminder = (
        db.query(Reminder)
        .filter(
            Reminder.id == reminder_id
        )
        .first()
    )

    reminder.completed = not reminder.completed

    db.commit()

    db.refresh(reminder)

    return reminder