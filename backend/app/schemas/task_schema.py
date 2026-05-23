from pydantic import BaseModel


class TaskCreate(BaseModel):
    text: str
    completed: bool
    priority: int