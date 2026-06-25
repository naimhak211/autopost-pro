from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from dotenv import load_dotenv
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from zoneinfo import ZoneInfo
import os, json, requests, sqlite3, logging, time, urllib.parse

from google_auth import verify_google_token
from platforms import (
    facebook_post_video, facebook_post_video_file, facebook_get_pages, facebook_get_page_followers,
    instagram_post_reel, tiktok_post_video, youtube_upload_short,
)
from scraper import download_tiktok, download_youtube, scrape_tiktok_profile, scrape_youtube_channel
from drive import list_videos, get_public_url, move_to_success, get_drive_service_for_user
from ai import generate_caption, generate_seo

load_dotenv()
app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

DB = "autopost.db"
scheduler = BackgroundScheduler(timezone="Asia/Dhaka")
scheduler.start()

UPLOAD_DIR = os.path.join(app.static_folder or "static", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
ALLOWED_IMAGE_EXT = {"png", "jpg", "jpeg", "webp", "gif"}

serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY", "dev-secret-change-me"))
TOKEN_MAX_AGE = 7 * 24 * 3600

# ════════════════════════════════════════════════
# DATABASE
# ════════════════════════════════════════════════
def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db()

