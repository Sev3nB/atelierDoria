<?php
require __DIR__ . '/includes/bootstrap.php';
header('Content-Type: application/xml; charset=utf-8');

$pages = [
    ['path' => '', 'file' => 'index.php', 'priority' => '1.0', 'changefreq' => 'weekly'],
    ['path' => 'menu', 'file' => 'menu.php', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['path' => 'prenotazioni', 'file' => 'prenotazioni.php', 'priority' => '0.9', 'changefreq' => 'monthly'],
    ['path' => 'chi-siamo', 'file' => 'chi-siamo.php', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => 'galleria', 'file' => 'galleria.php', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['path' => 'eventi', 'file' => 'eventi.php', 'priority' => '0.7', 'changefreq' => 'weekly'],
    ['path' => 'recensioni', 'file' => 'recensioni.php', 'priority' => '0.6', 'changefreq' => 'monthly'],
    ['path' => 'contatti', 'file' => 'contatti.php', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['path' => 'privacy', 'file' => 'privacy.php', 'priority' => '0.2', 'changefreq' => 'yearly'],
    ['path' => 'cookie-policy', 'file' => 'cookie-policy.php', 'priority' => '0.2', 'changefreq' => 'yearly'],
];

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($pages as $page):
?>
  <url>
    <loc><?= e($site_url . '/' . $page['path']) ?></loc>
    <changefreq><?= e($page['changefreq']) ?></changefreq>
    <priority><?= e($page['priority']) ?></priority>
  </url>
<?php endforeach; ?>
</urlset>
