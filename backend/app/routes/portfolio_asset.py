from fastapi import (APIRouter,Depends)
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.portfolio_asset import (
    PortfolioAsset
)
from app.schemas.portfolio_asset_schema import (
    PortfolioAssetCreate
)

router = APIRouter()

@router.post("/portfolio-assets")

def create_asset(

    asset: PortfolioAssetCreate,
    db: Session = Depends(get_db)
):
    item = PortfolioAsset(

        user_id=asset.user_id,
        symbol=asset.symbol,
        asset_name=asset.asset_name,
        asset_type=asset.asset_type,
        invested_amount=asset.invested_amount,
        current_value=asset.current_value
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

@router.get("/portfolio-assets")

def get_assets(

    db: Session = Depends(get_db)
):
    return (
        db.query(
            PortfolioAsset
        )

        .order_by(
            PortfolioAsset.created_at.desc()
        )

        .all()
    )