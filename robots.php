<?php
require __DIR__ . '/includes/bootstrap.php';
header('Content-Type: text/plain; charset=utf-8');

if ($site_indexable) {
    echo "User-agent: *\n";
    echo "Allow: /\n\n";
    echo 'Sitemap: ' . $site_url . "/sitemap.xml\n";
} else {
    echo "User-agent: *\n";
    echo "Disallow: /\n";
}
