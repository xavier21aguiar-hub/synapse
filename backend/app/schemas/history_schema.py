from pydantic import BaseModel

class HistoryCreate( BaseModel ):
    text:str

class HistoryResponse( BaseModel ):

    id:int
    text:str
    class Config: from_attributes=True