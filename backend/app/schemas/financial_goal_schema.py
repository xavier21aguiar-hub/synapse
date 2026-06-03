from pydantic import BaseModel
from datetime import date
from uuid import UUID


class FinancialGoalCreate(
    BaseModel
):
    user_id: UUID
    name: str
    target_amount: float
    current_amount: float = 0
    icon: str = "🎯"
    is_favorite: bool = False
    target_date: date | None = None