from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.dependencies import get_db
from app.models.task_model import Task
from app.schemas.task_schema import TaskCreate

router=APIRouter()

@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db)
):
    return db.query(Task).all()


@router.post("/tasks")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    new_task = Task(
        text = task.text,
        completed = task.completed,
        priority = task.priority
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.patch("/tasks/{task_id}")
def update_task(
    task_id:int,
    db: Session = Depends(get_db)
):

    task=db.query(Task).filter(
        Task.id==task_id
    ).first()


    if not task:

        return{
            "error":"Task not found"
        }


    task.completed=not task.completed


    db.commit()

    db.refresh(task)


    return task

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id:int,
    db: Session = Depends(get_db)
):

    task=db.query(Task).filter(
        Task.id==task_id
    ).first()


    if not task:

        return{
            "error":"Task not found"
        }


    db.delete(task)

    db.commit()


    return{
        "message":"Task deleted"
    }