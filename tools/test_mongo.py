from dotenv import load_dotenv
from pymongo import MongoClient
import os
import certifi

load_dotenv()

uri = os.getenv("MONGODB_URI")

print("Connecting...")

client = MongoClient(
    uri,
    tls=True,
    tlsCAFile=certifi.where()
)

print(client.admin.command("ping"))
print("SUCCESS")