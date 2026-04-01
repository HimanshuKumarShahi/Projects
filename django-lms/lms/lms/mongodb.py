from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGO_URI"))
mongo_db = client["lms_backup"]