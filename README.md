# Atelier Doria

Sito vetrina Flask per Atelier Doria — Osteria Contemporanea, Corso Roma 32, Brindisi.

## Avvio locale

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
flask --app app run --debug
```

Compilare `.env` con telefono, WhatsApp, email, URL Google e dati verificati. Menu, recensioni, orari e feed Instagram sono nei JSON in `data/`. Recensioni e immagini incluse sono segnaposto da sostituire con contenuti autorizzati.
