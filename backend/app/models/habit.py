from sqlalchemy import (
    Column,
    String,
    Boolean,
    DateTime
)

from sqlalchemy.dialects.postgresql import UUID, ARRAY

from sqlalchemy.sql import func

import uuid

from app.database.base import Base


class Habit(Base):

    __tablename__ = "habits"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    name = Column(
        String,
        nullable=False
    )

    icon = Column(
        String,
        default="🎯"
    )

    frequency_type = Column(
        String,
        nullable=False
    )

    frequency_days = Column(
        ARRAY(String)
    )

    active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )