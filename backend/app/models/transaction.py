from sqlalchemy import (
    Column,
    String,
    Numeric,
    Date,
    DateTime
)

from sqlalchemy.dialects.postgresql import UUID

from sqlalchemy.sql import func

import uuid

from app.database.base import Base


class Transaction(Base):

    __tablename__="transactions"

    id=Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id=Column(
        UUID(as_uuid=True),
        nullable=False
    )

    type=Column(
        String,
        nullable=False
    )

    amount=Column(
        Numeric,
        nullable=False
    )

    category=Column(
        String,
        nullable=False
    )

    description=Column(
        String
    )

    transaction_date=Column(
        Date
    )

    created_at=Column(
        DateTime(timezone=True),
        server_default=func.now()
    )