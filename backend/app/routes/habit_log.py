from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.habit_log import HabitLog

from app.schemas.habit_log_schema import (
    HabitLogCreate
)

router = APIRouter()


@router.post("/habit-logs")
def create_habit_log(

    habit_log: HabitLogCreate,

    db: Session = Depends(get_db)

):

    item = HabitLog(

        habit_id=
        habit_log.habit_id,

        completed_date=
        habit_log.completed_date

    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item


@router.get("/habit-logs")
def get_habit_logs(

    db: Session = Depends(get_db)

):

    return (

        db.query(
            HabitLog
        )

        .order_by(
            HabitLog.completed_date.desc()
        )

        .all()

    )