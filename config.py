import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-change-me")
    SITE_URL = os.getenv("SITE_URL", "http://localhost:5000").rstrip("/")
    WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "")
    PHONE_DISPLAY = os.getenv("PHONE_DISPLAY", "Numero da confermare")
    PHONE_URI = os.getenv("PHONE_URI", "")
    CONTACT_EMAIL = os.getenv("CONTACT_EMAIL", "")
    GOOGLE_REVIEW_URL = os.getenv("GOOGLE_REVIEW_URL", "")
    GOOGLE_MAPS_EMBED_URL = os.getenv("GOOGLE_MAPS_EMBED_URL", "")
    INSTAGRAM_TOKEN = os.getenv("INSTAGRAM_TOKEN", "")
    INSTAGRAM_API_URL = os.getenv("INSTAGRAM_API_URL", "")
    RESTAURANT_RATING = os.getenv("RESTAURANT_RATING", "")
    RESTAURANT_REVIEW_COUNT = os.getenv("RESTAURANT_REVIEW_COUNT", "")

