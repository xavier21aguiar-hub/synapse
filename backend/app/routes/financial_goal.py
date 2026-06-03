from fastapi import (APIRouter,Depends)
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.financial_goal import (
    FinancialGoal
)
from app.schemas.financial_goal_schema import (
    FinancialGoalCreate
)

router = APIRouter()

@router.post("/financial-goals")

def create_goal(
    goal: FinancialGoalCreate,
    db: Session = Depends(get_db)
):
    item = FinancialGoal(
        user_id=goal.user_id,
        name=goal.name,
        target_amount=goal.target_amount,
        current_amount=goal.current_amount,
        icon=goal.icon,
        is_favorite=goal.is_favorite,
        target_date=goal.target_date
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/financial-goals")

def get_goals(
    db: Session = Depends(get_db)
):
    return (
        db.query(
            FinancialGoal
        )

        .order_by(
            FinancialGoal.created_at.desc()
        )

        .all()
    )