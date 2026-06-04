from pydantic import BaseModel
from typing import Literal


class TaskCreate(BaseModel):
    text: str
    completed: bool
    priority: Literal[
        "low",
        "medium",
        "high"
    ]