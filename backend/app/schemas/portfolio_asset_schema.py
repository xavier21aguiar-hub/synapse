from pydantic import BaseModel
from uuid import UUID


class PortfolioAssetCreate(
    BaseModel
):

    user_id: UUID

    symbol: str

    asset_name: str

    asset_type: str

    invested_amount: float

    current_value: float