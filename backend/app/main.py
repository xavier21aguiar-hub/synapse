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
from app.models.financial_goal import FinancialGoal
from app.routes import financial_goal
from app.models.portfolio_asset import PortfolioAsset
from app.routes import portfolio_asset
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.routes import habit
from app.routes import habit_log
from app.routes.event import router as event_router
from app.routes.reminder import router as reminder_router

app = FastAPI()

@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "Synapse API is running"
    }

Base.metadata.create_all(
    bind = engine
)

origins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://synapse-theta-rust.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
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

app.include_router(
    financial_goal.router
)

app.include_router(
    portfolio_asset.router
)

app.include_router(
    habit.router
)

app.include_router(
    habit_log.router
)

app.include_router(
    event_router
)

app.include_router(
    reminder_router
)