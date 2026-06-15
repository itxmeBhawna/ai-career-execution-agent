import os
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()


class MemoryService:
    def __init__(self):
        mongo_uri = os.getenv("MONGODB_URI")

        if not mongo_uri:
            raise ValueError("MONGODB_URI not found")

        self.client = MongoClient(
            mongo_uri,
            tls=True,
            tlsCAFile=certifi.where()
        )

        self.db = self.client["career_agent"]
        self.memory = self.db["user_memory"]

    def save_memory(
        self,
        user_id: str,
        display_name: str,
        content: str,
        memory_type: str
    ):
        self.memory.insert_one({
            "user_id": user_id,
            "display_name": display_name,
            "type": memory_type,
            "content": content,
            "created_at": datetime.now(
                ZoneInfo("Asia/Kolkata")
            )
        })

        self.cleanup_old_memories(user_id)

    def cleanup_old_memories(self, user_id: str):
        """
        Cleanup strategy:

        1. Keep all goals.
        2. Keep only latest 30 progress entries.
        3. Delete milestones older than 30 days.
        """

        thirty_days_ago = (
            datetime.now(
                ZoneInfo("Asia/Kolkata")
            ) - timedelta(days=30)
        )

        self.memory.delete_many({
            "user_id": user_id,
            "type": "milestone",
            "created_at": {
                "$lt": thirty_days_ago
            }
        })

        progress_docs = list(
            self.memory.find({
                "user_id": user_id,
                "type": "progress"
            }).sort("created_at", -1)
        )

        if len(progress_docs) > 30:

            docs_to_delete = progress_docs[30:]

            ids = [
                doc["_id"]
                for doc in docs_to_delete
            ]

            self.memory.delete_many({
                "_id": {
                    "$in": ids
                }
            })

    def get_memories(self, user_id: str):
        return list(
            self.memory.find(
                {"user_id": user_id},
                {"_id": 0}
            ).sort("created_at", 1)
        )