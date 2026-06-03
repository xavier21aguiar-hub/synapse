from sqlalchemy import (
    Column,
    String,
    Numeric,
    Boolean,
    Date,
    DateTime
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.database.base import Base

class FinancialGoal(Base):

    __tablename__ = "financial_goals"

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

    target_amount = Column(
        Numeric,
        nullable=False
    )

    current_amount = Column(
        Numeric,
        default=0
    )

    icon = Column(
        String,
        default="🎯"
    )

    is_favorite = Column(
        Boolean,
        default=False
    )

    target_date = Column(
        Date,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )