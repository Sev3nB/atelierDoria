import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-change-me")
    SITE_URL = os.getenv("SITE_URL", "http://localhost:5000").rstrip("/")
    WHATSAPP_NUMBER = os.getenv("WHATSAPP_NUMBER", "393298962703")
    PHONE_DISPLAY = os.getenv("PHONE_DISPLAY", "+39 329 896 2703")
    PHONE_URI = os.getenv("PHONE_URI", "+393298962703")
    CONTACT_EMAIL = os.getenv("CONTACT_EMAIL", "")
    GOOGLE_REVIEW_URL = os.getenv("GOOGLE_REVIEW_URL", "")
    GOOGLE_MAPS_EMBED_URL = os.getenv(
        "GOOGLE_MAPS_EMBED_URL",
        "https://www.google.com/maps?q=Corso+Roma+32,+Brindisi&output=embed",
    )
    INSTAGRAM_TOKEN = os.getenv("INSTAGRAM_TOKEN", "")
    INSTAGRAM_API_URL = os.getenv("INSTAGRAM_API_URL", "")
    RESTAURANT_RATING = os.getenv("RESTAURANT_RATING", "8.5")
    RESTAURANT_REVIEW_COUNT = os.getenv("RESTAURANT_REVIEW_COUNT", "22")
