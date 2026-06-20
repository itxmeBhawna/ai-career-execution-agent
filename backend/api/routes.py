from fastapi import APIRouter

from agents.reasoning_agent import ReasoningAgent
from models.coach_request import CoachRequest
from services.memory_service import MemoryService

router = APIRouter()

agent = ReasoningAgent()
memory_service = MemoryService()


@router.get("/")
def home():
    return {
        "message": "AI Career Execution Agent API Running"
    }


@router.post("/coach")
def coach(data: CoachRequest):

    response = agent.coach(
        user_id=data.user_id,
        display_name=data.display_name,
        user_input=data.user_input
    )

    return {
        "response": response
    }


@router.get("/memory/{user_id}")
def get_memory(user_id: str):
    return memory_service.get_memories(user_id)


@router.get("/streak/{user_id}")
def get_streak(user_id: str):
    return {
        "user_id": user_id,
        "streak": memory_service.get_streak(user_id)
    }
  