from fastapi import APIRouter

from agents.reasoning_agent import ReasoningAgent
from models.coach_request import CoachRequest

router = APIRouter()

agent = ReasoningAgent()


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