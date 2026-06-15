import os

from google import genai
from dotenv import load_dotenv

load_dotenv()


class GeminiService:

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise ValueError("GEMINI_API_KEY not found")

        self.client = genai.Client(api_key=api_key)

    def generate(self, prompt: str) -> str:

        models = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-2.5-flash-lite"
        ]

        last_error = None

        for model_name in models:

            try:
                print(f"Trying model: {model_name}")

                response = self.client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )

                print(f"Success with {model_name}")

                return response.text

            except Exception as e:
                print(f"{model_name} failed: {e}")
                last_error = e

        return f"""
The AI service is temporarily unavailable.

Please try again in a few minutes.

Technical Details:
{last_error}
"""