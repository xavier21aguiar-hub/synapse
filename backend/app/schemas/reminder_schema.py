from pydantic import BaseModel


class ReminderCreate(BaseModel):

    title:str

    reminder_date:str

    reminder_time:str | None = None

    smart_schedule:bool = True