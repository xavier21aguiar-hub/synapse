from sqlalchemy import Column,Integer,String,Boolean

from app.database.base import Base


class Task(Base):

    __tablename__="tasks"


    id=Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True
    )


    text=Column(
        String
    )


    completed=Column(
        Boolean,
        default=False
    )


    priority=Column(
        Integer,
        default=1
    )