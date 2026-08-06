# Atelier Doria — versione PHP

Versione PHP del sito Atelier Doria, compatibile con Aruba Hosting Basic Linux.

## Pubblicazione

Caricare nella document root del dominio tutti i file e le cartelle del branch. Il server deve usare PHP 8.0 o superiore e Apache con mod_rewrite.

Duplicare .env.example come .env e impostare i valori del dominio. La configurazione .htaccess mantiene gli URL senza estensione già usati dal sito.

## Avvio locale

Avviare con: php -S localhost:8000 router.php


## Pubblicazione SEO e Google

Prima della messa online, configurare nel file `.env`:

```dotenv
SITE_URL=https://www.atelierdoria.it
SITE_INDEXABLE=1
GOOGLE_SITE_VERIFICATION=valore-fornito-da-search-console
GOOGLE_BUSINESS_URL=https://maps.app.goo.gl/URL-DELLA-SCHEDA
```

`SITE_INDEXABLE` deve restare `0` su Vercel e su ogni anteprima: in questo modo le copie del sito non vengono indicizzate. Impostarlo a `1` soltanto sul dominio definitivo, dopo aver verificato HTTPS, canonical e contenuti.

In Google Search Console:

1. creare una proprietà Dominio e verificarla tramite record DNS;
2. in alternativa, usare la proprietà Prefisso URL e il valore del tag HTML in `GOOGLE_SITE_VERIFICATION`;
3. inviare `https://www.atelierdoria.it/sitemap.xml`;
4. controllare `https://www.atelierdoria.it/robots.txt`;
5. richiedere l'indicizzazione della homepage, del menu, delle prenotazioni e dei contatti.

Nella scheda Google Business Profile usare URL distinti e misurabili:

- sito: `https://www.atelierdoria.it/?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile`
- menu: `https://www.atelierdoria.it/menu?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile&utm_content=menu`
- prenotazioni: `https://www.atelierdoria.it/prenotazioni?utm_source=google&utm_medium=organic&utm_campaign=google_business_profile&utm_content=booking`

Inserire gli stessi nome, indirizzo, telefono, categoria, orari e URL su sito e scheda Google. Non usare l'URL Vercel nella scheda pubblica.
