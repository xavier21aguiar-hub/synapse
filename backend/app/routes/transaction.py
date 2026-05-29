from fastapi import (APIRouter, Depends)
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.transaction import Transaction
from app.schemas.transaction_schema import (
    TransactionCreate
)

router=APIRouter()

@router.post("/transactions")

def create_transaction(

    transaction:TransactionCreate,

    db:Session=Depends(get_db)

):

    item=Transaction(

        user_id=transaction.user_id,

        type=transaction.type,

        amount=transaction.amount,

        category=transaction.category,

        description=transaction.description,

        transaction_date=
        transaction.transaction_date

    )

    db.add(item)

    db.commit()

    db.refresh(item)

    return item

@router.get("/transactions")

def get_transactions(

    db:Session=Depends(get_db)

):

    return (

        db.query(
            Transaction
        )

        .order_by(
            Transaction.transaction_date.desc()
        )

        .all()

    )

