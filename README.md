# Atelier Doria — versione PHP

Versione PHP del sito Atelier Doria, compatibile con Aruba Hosting Basic Linux.

## Pubblicazione

Caricare nella document root del dominio tutti i file e le cartelle del branch. Il server deve usare PHP 8.0 o superiore e Apache con mod_rewrite.

Duplicare .env.example come .env e impostare i valori del dominio. La configurazione .htaccess mantiene gli URL senza estensione già usati dal sito.

## Avvio locale

Avviare con: php -S localhost:8000 router.php
