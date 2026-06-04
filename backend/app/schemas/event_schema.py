from pydantic import BaseModel


class EventCreate(BaseModel):

    title:str

    event_date:str

    event_time:str

    duration:int