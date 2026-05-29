from pydantic import BaseModel
from datetime import date


class TransactionCreate(
    BaseModel
):

    user_id:str

    type:str

    amount:float

    category:str

    description:str

    transaction_date:date