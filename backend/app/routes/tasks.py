from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database import get_db
import uuid

router = APIRouter(prefix="/tasks", tags=["tasks"])


class TaskCreate(BaseModel):
    title: str
    status: str = "pending"
    assignees: List[str] = []
    due_date: Optional[str] = None
    priority: str = "normal"


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    assignees: Optional[List[str]] = None
    due_date: Optional[str] = None
    priority: Optional[str] = None


class TaskResponse(BaseModel):
    id: str
    title: str
    status: str
    assignees: List[str]
    due_date: Optional[str]
    priority: str


# Sample data initialization
SAMPLE_TASKS = [
    {
        "id": str(uuid.uuid7()),
        "title": "Solutions Pages",
        "status": "pending",
        "assignees": ["user1", "user2"],
        "due_date": "2024-03-17T09:00:00",
        "priority": "normal"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Company Pages",
        "status": "pending",
        "assignees": ["user3"],
        "due_date": "2024-03-18T10:00:00",
        "priority": "normal"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Help Center Pages",
        "status": "pending",
        "assignees": ["user1"],
        "due_date": "2024-03-19T14:00:00",
        "priority": "normal"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Order Flow",
        "status": "in_progress",
        "assignees": ["user2", "user4"],
        "due_date": "2024-03-20T16:00:00",
        "priority": "high"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "New Work Flow",
        "status": "in_progress",
        "assignees": ["user3"],
        "due_date": "2024-03-21T11:00:00",
        "priority": "high"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "About Us Illustration",
        "status": "completed",
        "assignees": ["user1"],
        "due_date": "2024-03-15T09:00:00",
        "priority": "normal"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Hero Illustration",
        "status": "completed",
        "assignees": ["user2", "user5"],
        "due_date": "2024-03-16T13:00:00",
        "priority": "normal"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Moodboarding",
        "status": "completed",
        "assignees": ["user4"],
        "due_date": "2024-03-14T15:00:00",
        "priority": "high"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Research",
        "status": "completed",
        "assignees": ["user1", "user3"],
        "due_date": "2024-03-13T10:00:00",
        "priority": "high"
    },
    {
        "id": str(uuid.uuid7()),
        "title": "Features Pages",
        "status": "launched",
        "assignees": ["user5"],
        "due_date": "2024-03-12T09:00:00",
        "priority": "normal"
    }
]

# In-memory storage for tasks
tasks_db = SAMPLE_TASKS.copy()


@router.get("", response_model=List[TaskResponse])
def get_tasks():
    """
    Fetch all tasks.
    """
    return tasks_db


@router.post("", status_code=201, response_model=TaskResponse)
def create_task(task: TaskCreate):
    """
    Create a new task.
    """
    new_task = {
        "id": str(uuid.uuid7()),
        "title": task.title,
        "status": task.status,
        "assignees": task.assignees,
        "due_date": task.due_date,
        "priority": task.priority
    }
    tasks_db.append(new_task)
    return new_task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task_update: TaskUpdate):
    """
    Update an existing task.
    """
    task = next((t for t in tasks_db if t["id"] == task_id), None)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update only provided fields
    if task_update.title is not None:
        task["title"] = task_update.title
    if task_update.status is not None:
        task["status"] = task_update.status
    if task_update.assignees is not None:
        task["assignees"] = task_update.assignees
    if task_update.due_date is not None:
        task["due_date"] = task_update.due_date
    if task_update.priority is not None:
        task["priority"] = task_update.priority
    
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: str):
    """
    Delete a task.
    """
    task_index = next((i for i, t in enumerate(tasks_db) if t["id"] == task_id), None)
    if task_index is None:
        raise HTTPException(status_code=404, detail="Task not found")
    
    tasks_db.pop(task_index)
    return None