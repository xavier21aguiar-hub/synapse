from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.event import Event
from app.schemas.event_schema import EventCreate


router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.get("")
def get_events(
    db: Session = Depends(get_db)
):

    return (
        db.query(Event)
        .all()
    )


@router.post("")
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db)
):

    new_event = Event(

        title=event.title,

        event_date=event.event_date,

        event_time=event.event_time,

        duration=event.duration

    )

    db.add(new_event)

    db.commit()

    db.refresh(new_event)

    return new_event

@router.patch("/{event_id}")
def toggle_event(
    event_id:int,
    db: Session = Depends(get_db)
):

    event = (
        db.query(Event)
        .filter(
            Event.id == event_id
        )
        .first()
    )

    event.completed = (
        not event.completed
    )

    db.commit()

    db.refresh(event)

    return event