from pydantic import BaseModel


class UserContext(BaseModel):
    available_hours: int
    stress_level: str
    goals: list[str]
    active_tasks: list[str]
    deadlines: list[str]
  