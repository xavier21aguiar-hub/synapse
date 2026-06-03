from pydantic import BaseModel
from uuid import UUID


class HabitCreate(
    BaseModel
):

    user_id: UUID

    name: str

    icon: str

    frequency_type: str

    frequency_days: list[str] | None = None