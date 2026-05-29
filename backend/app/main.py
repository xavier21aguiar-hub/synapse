from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.tasks import router
from app.database.database import engine
from app.database.base import Base
from app.models.task_model import Task
from app.models.history import  History
from app.routes.history import router as historyRouter
from app.models.transaction import Transaction
from app.routes import transaction

app = FastAPI()

Base.metadata.create_all(
    bind = engine
)

origins=["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    router
)

app.include_router(
    historyRouter
)

app.include_router(
    transaction.router
)