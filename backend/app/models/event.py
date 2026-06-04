from sqlalchemy import Column,Integer,String,Boolean

from app.database.base import Base


class Event(Base):

    __tablename__ = "events"


    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )


    title = Column(
        String
    )


    event_date = Column(
        String
    )


    event_time = Column(
        String
    )


    duration = Column(
        Integer,
        default=60
    )


    completed = Column(
        Boolean,
        default=False
    )