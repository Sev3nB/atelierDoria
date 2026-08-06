<?php

$root = dirname(__DIR__);
$path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

$routes = [
    ''              => 'index.php',
    'menu'          => 'menu.php',
    'chi-siamo'     => 'chi-siamo.php',
    'recensioni'    => 'recensioni.php',
    'prenotazioni'  => 'prenotazioni.php',
    'galleria'      => 'galleria.php',
    'eventi'        => 'eventi.php',
    'contatti'      => 'contatti.php',
    'privacy'       => 'privacy.php',
    'cookie-policy' => 'cookie-policy.php',
    'sitemap.xml'   => 'sitemap.php',
];

if (isset($routes[$path])) {
    require $root . '/' . $routes[$path];
    exit;
}

http_response_code(404);
require $root . '/404.php';