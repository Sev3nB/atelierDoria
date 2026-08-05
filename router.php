<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $path;
if ($path !== '/' && is_file($file)) return false;
$routes = ['/' => 'index.php', '/menu' => 'menu.php', '/chi-siamo' => 'chi-siamo.php', '/recensioni' => 'recensioni.php', '/prenotazioni' => 'prenotazioni.php', '/galleria' => 'galleria.php', '/eventi' => 'eventi.php', '/contatti' => 'contatti.php', '/sitemap.xml' => 'sitemap.php'];
require __DIR__ . '/' . ($routes[rtrim($path,'/') ?: '/'] ?? '404.php');
