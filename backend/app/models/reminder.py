from sqlalchemy import Column,Integer,String,Boolean

from app.database.base import Base


class Reminder(Base):

    __tablename__ = "reminders"


    id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )


    title = Column(
        String
    )


    reminder_date = Column(
        String
    )


    reminder_time = Column(
        String,
        nullable=True
    )


    smart_schedule = Column(
        Boolean,
        default=True
    )


    completed = Column(
        Boolean,
        default=False
    )