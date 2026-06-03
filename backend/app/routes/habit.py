from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.habit import Habit

from app.schemas.habit_schema import (
    HabitCreate
)

router = APIRouter()


@router.post("/habits")
def create_habit(

    habit: HabitCreate,

    db: Session = Depends(get_db)

):

    item = Habit(

        user_id=habit.user_id,

        name=habit.name,

        icon=habit.icon,

        frequency_type=
        habit.frequency_type,

        frequency_days=
        habit.frequency_days

    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


@router.get("/habits")
def get_habits(

    db: Session = Depends(get_db)

):

    return (

        db.query(
            Habit
        )

        .filter(
            Habit.active == True
        )

        .order_by(
            Habit.created_at.desc()
        )

        .all()

    )


@router.delete("/habits/{habit_id}")
def delete_habit(

    habit_id: str,

    db: Session = Depends(get_db)

):

    habit = (

        db.query(
            Habit
        )

        .filter(
            Habit.id == habit_id
        )

        .first()

    )

    if not habit:

        return {
            "success": False,
            "message": "Habit not found"
        }

    # Soft Delete

    habit.active = False

    db.commit()

    return {
        "success": True
    }