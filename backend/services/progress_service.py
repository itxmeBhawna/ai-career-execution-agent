from services.memory_service import MemoryService


class ProgressService:
    def __init__(self):
        self.memory = MemoryService()

    def save_progress(self, user_id: str, display_name: str, progress: str):
        self.memory.save_memory(
            user_id=user_id,
            display_name=display_name,
            content=progress,
            memory_type="progress"
        )

    def save_goal(self, user_id: str, display_name: str, goal: str):
        self.memory.save_memory(
            user_id=user_id,
            display_name=display_name,
            content=goal,
            memory_type="goal"
        )

    def save_milestone(self, user_id: str, display_name: str, milestone: str):
        self.memory.save_memory(
            user_id=user_id,
            display_name=display_name,
            content=milestone,
            memory_type="milestone"
        )

    def get_history(self, user_id: str):
        return self.memory.get_memories(user_id)