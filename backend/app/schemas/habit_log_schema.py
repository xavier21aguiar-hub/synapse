from pydantic import BaseModel
from uuid import UUID
from datetime import date


class HabitLogCreate(
    BaseModel
):

    habit_id: UUID

    completed_date: date