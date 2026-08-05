import json
import logging
from datetime import date
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, abort, jsonify, render_template, request, send_from_directory

from config import Config

load_dotenv()
ROOT = Path(__file__).resolve().parent


def load_json(name):
    with (ROOT / "data" / name).open(encoding="utf-8") as source:
        return json.load(source)


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.from_object(Config)
    if test_config:
        app.config.update(test_config)

    @app.context_processor
    def shared_context():
        return {
            "site_url": app.config["SITE_URL"],
            "phone_display": app.config["PHONE_DISPLAY"],
            "phone_uri": app.config["PHONE_URI"],
            "contact_email": app.config["CONTACT_EMAIL"],
            "whatsapp_number": app.config["WHATSAPP_NUMBER"],
            "instagram_url": "https://www.instagram.com/hostaria_atelierdoria/",
            "facebook_url": "https://www.facebook.com/p/Atelier-Doria-61567679798300/",
            "thefork_url": "https://www.thefork.it/ristorante/atelier-doria-r856705",
            "menu_updated": "12 giugno 2026",
            "hero_video_mp4": app.config["HERO_VIDEO_MP4"],
            "hero_video_webm": app.config["HERO_VIDEO_WEBM"],
            "hours": load_json("orari.json"),
            "photos": load_json("photos.json"),
            "current_year": date.today().year,
        }

    @app.get("/")
    def home():
        return render_template(
            "index.html",
            reviews=load_json("recensioni.json")[:3],
            menu=load_json("menu.json"),
        )

    @app.get("/menu")
    def menu():
        return render_template("menu.html", menu=load_json("menu.json"))

    @app.get("/chi-siamo")
    def about():
        return render_template("chi_siamo.html")

    @app.get("/recensioni")
    def reviews():
        return render_template(
            "recensioni.html",
            reviews=load_json("recensioni.json"),
            rating=app.config["RESTAURANT_RATING"],
            review_count=app.config["RESTAURANT_REVIEW_COUNT"],
            review_url=app.config["GOOGLE_REVIEW_URL"],
        )

    @app.route("/prenotazioni", methods=["GET", "POST"])
    def bookings():
        if request.method == "POST":
            payload = request.get_json(silent=True) or {}
            if payload.get("website"):
                abort(400)
            required = ("name", "date", "time", "people")
            if any(not str(payload.get(field, "")).strip() for field in required):
                return jsonify({"ok": False, "error": "Campi obbligatori mancanti."}), 400
            try:
                booking_date = date.fromisoformat(payload["date"])
                people = int(payload["people"])
            except (TypeError, ValueError):
                return jsonify({"ok": False, "error": "Dati non validi."}), 400
            if booking_date < date.today() or people < 1 or people > 30:
                return jsonify({"ok": False, "error": "Data o numero di persone non valido."}), 400
            logging.info("Booking attempt for %s on %s", payload["name"], payload["date"])
            return jsonify({"ok": True})
        return render_template("prenotazioni.html", today=date.today().isoformat())

    @app.get("/galleria")
    def gallery():
        return render_template("galleria.html")

    @app.get("/eventi")
    def events():
        return render_template("eventi.html")

    @app.route("/contatti", methods=["GET", "POST"])
    def contacts():
        sent = False
        error = None
        if request.method == "POST":
            if request.form.get("website"):
                abort(400)
            if not all(request.form.get(key, "").strip() for key in ("name", "email", "message")):
                error = "Compila tutti i campi obbligatori."
            else:
                logging.info("Contact request from %s", request.form["email"])
                sent = True
        return render_template(
            "contatti.html",
            sent=sent,
            error=error,
            maps_url=app.config["GOOGLE_MAPS_EMBED_URL"],
        )

    @app.get("/robots.txt")
    def robots():
        return send_from_directory(app.static_folder, "robots.txt", mimetype="text/plain")

    @app.get("/sitemap.xml")
    def sitemap():
        pages = ("home", "menu", "about", "reviews", "bookings", "gallery", "events", "contacts")
        urls = [app.config["SITE_URL"] + app.url_for(endpoint) for endpoint in pages]
        return render_template("sitemap.xml", urls=urls), 200, {"Content-Type": "application/xml"}

    @app.errorhandler(404)
    def not_found(_error):
        return render_template("errors/404.html"), 404

    @app.errorhandler(500)
    def server_error(_error):
        return render_template("errors/500.html"), 500

    return app


app = create_app()
