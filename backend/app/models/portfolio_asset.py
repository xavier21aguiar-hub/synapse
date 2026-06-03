from sqlalchemy import(
    Column,
    String,
    Numeric,
    DateTime
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.database.base import Base


class PortfolioAsset(Base):

    __tablename__ = "portfolio_assets"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    symbol = Column(
        String,
        nullable=False
    )

    asset_name = Column(
        String,
        nullable=False
    )

    asset_type = Column(
        String,
        nullable=False
    )

    invested_amount = Column(
        Numeric,
        nullable=False
    )

    current_value = Column(
        Numeric,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )