from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.history import History
from app.schemas.history_schema import HistoryCreate

router=APIRouter()

@router.post("/history")

def create_history(
    history:HistoryCreate,
    db:Session=Depends(get_db)
):
    item=History(
    text=history.text
    )
    db.add(item)
    db.commit()
    db.refresh(item)

    return item

@router.get("/history")

def get_history(
    db:Session=Depends(get_db)
):
    return (
        db.query(
            History
        )
        .order_by(
            History.completed_at.desc()
        )
        .limit(20)
        .all()
    )