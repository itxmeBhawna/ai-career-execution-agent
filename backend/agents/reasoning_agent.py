from services.progress_service import ProgressService
from services.gemini_service import GeminiService
from services.prompt_templates import build_reasoning_prompt


class ReasoningAgent:
    def __init__(self):
        self.progress = ProgressService()
        self.gemini = GeminiService()

    def coach(
        self,
        user_id: str,
        display_name: str,
        user_input: str
    ):
        history = self.progress.get_history(user_id)

        history_text = "\n".join(
            item["content"]
            for item in history[-10:]
        )

        prompt = build_reasoning_prompt(
            user_input=user_input,
            history=history_text
        )

        response = self.gemini.generate(prompt)

        classification_prompt = f"""
Classify this user statement into exactly one category.

Possible categories:
goal
progress
milestone

Examples:

I want to get an internship
goal

Need to solve 10 DSA questions this week
goal

Working on my resume today
progress

Currently building my project
progress

Completed 5 DSA questions
milestone

Applied to 3 internships
milestone

Statement:
{user_input}

Return only one word:
goal
progress
milestone
"""

        memory_type = (
            self.gemini.generate(classification_prompt)
            .strip()
            .lower()
        )

        if memory_type == "goal":
            self.progress.save_goal(
                user_id,
                display_name,
                user_input
            )

        elif memory_type == "milestone":
            self.progress.save_milestone(
                user_id,
                display_name,
                user_input
            )

        else:
            self.progress.save_progress(
                user_id,
                display_name,
                user_input
            )

        return response