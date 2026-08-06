<?php
declare(strict_types=1);

const ROOT_DIR = __DIR__ . '/..';

function load_env_file(string $path): void {
    if (!is_file($path)) return;
    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
        [$key, $value] = array_map('trim', explode('=', $line, 2));
        if (getenv($key) === false) putenv($key . '=' . trim($value, "\"'"));
    }
}

load_env_file(ROOT_DIR . '/.env');

function ensure_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_name('atelier_session');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function csrf_token(): string {
    ensure_session();
    if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf_token'];
}

function csrf_valid(mixed $token): bool {
    ensure_session();
    return is_string($token) && isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function rate_limit(string $key, int $maxAttempts = 5, int $windowSeconds = 900): bool {
    ensure_session();
    $now = time();
    $bucket = array_values(array_filter(
        $_SESSION['rate_limits'][$key] ?? [],
        static fn (int $timestamp): bool => $timestamp > $now - $windowSeconds
    ));
    if (count($bucket) >= $maxAttempts) {
        $_SESSION['rate_limits'][$key] = $bucket;
        return false;
    }
    $bucket[] = $now;
    $_SESSION['rate_limits'][$key] = $bucket;
    return true;
}


require_once ROOT_DIR . '/includes/mailer.php';

function env_value(string $key, string $default = ''): string {
    $value = getenv($key);
    return $value === false || $value === '' ? $default : $value;
}

function json_data(string $name): array {
    $json = file_get_contents(ROOT_DIR . '/data/' . $name);
    if ($json === false) throw new RuntimeException("Impossibile leggere {$name}");
    return json_decode($json, true, 512, JSON_THROW_ON_ERROR);
}

function e(mixed $value): string {
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function asset(string $path): string { return '/static/' . ltrim($path, '/'); }

function route(string $name): string {
    return [
        'home' => '/', 'menu' => '/menu', 'about' => '/chi-siamo',
        'reviews' => '/recensioni', 'bookings' => '/prenotazioni',
        'gallery' => '/galleria', 'events' => '/eventi', 'contacts' => '/contatti', 'privacy' => '/privacy', 'cookies' => '/cookie-policy',
    ][$name] ?? '/';
}

$site_url = rtrim(env_value('SITE_URL', 'https://www.atelierdoria.it'), '/');
$site_indexable = env_value('SITE_INDEXABLE', '0') === '1';
$search_console_verification = env_value('GOOGLE_SITE_VERIFICATION');
$google_business_url = env_value('GOOGLE_BUSINESS_URL');
$phone_display = env_value('PHONE_DISPLAY', '+39 329 896 2703');
$phone_uri = env_value('PHONE_URI', '+393298962703');
$contact_email = env_value('CONTACT_EMAIL', 'atelierdoria@libero.it');
$whatsapp_number = env_value('WHATSAPP_NUMBER', '393298962703');
$maps_url = env_value('GOOGLE_MAPS_EMBED_URL', 'https://www.google.com/maps?q=Corso+Roma+32,+Brindisi&output=embed');
$hero_video_mp4 = env_value('HERO_VIDEO_MP4');
$hero_video_webm = env_value('HERO_VIDEO_WEBM');
$rating = env_value('RESTAURANT_RATING', '8.5');
$review_count = env_value('RESTAURANT_REVIEW_COUNT', '22');
$instagram_url = 'https://www.instagram.com/hostaria_atelierdoria/';
$facebook_url = 'https://www.facebook.com/p/Atelier-Doria-61567679798300/';
$thefork_url = 'https://www.thefork.it/ristorante/atelier-doria-r856705';
$menu_updated = '5 agosto 2026';
$hours = json_data('orari.json');
$photos = json_data('photos.json');

$csp_nonce = base64_encode(random_bytes(18));

function send_security_headers(): void {
    global $csp_nonce;
    if (headers_sent()) return;
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()');
    header('Cross-Origin-Opener-Policy: same-origin');
    header("Content-Security-Policy: default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; object-src 'none'; script-src 'self' 'nonce-{$csp_nonce}'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; media-src 'self'; frame-src https://www.google.com https://maps.google.com; connect-src 'self'; upgrade-insecure-requests");
}
send_security_headers();

function page_start(string $title = 'Atelier Doria | Osteria contemporanea a Brindisi', string $description = 'Cucina pugliese contemporanea nel centro storico di Brindisi'): void {
    global $site_url, $site_indexable, $search_console_verification, $google_business_url, $phone_uri, $contact_email, $instagram_url, $facebook_url, $thefork_url, $photos, $csp_nonce;
    $request_uri = strtok($_SERVER['REQUEST_URI'] ?? '/', '?') ?: '/';
    $canonical = $site_url . $request_uri;
?><!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#063f44">
  <meta name="color-scheme" content="light">
  <title><?= e($title) ?></title>
  <meta name="description" content="<?= e($description) ?>">
  <meta name="robots" content="<?= $site_indexable ? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' : 'noindex,nofollow' ?>">
  <?php if ($search_console_verification): ?><meta name="google-site-verification" content="<?= e($search_console_verification) ?>"><?php endif; ?>
  <meta property="og:title" content="<?= e($title) ?>">
  <meta property="og:description" content="<?= e($description) ?>">
  <meta property="og:type" content="restaurant">
  <meta property="og:locale" content="it_IT">
  <meta property="og:url" content="<?= e($canonical) ?>">
  <meta property="og:image" content="<?= e($site_url . asset($photos['featured']['hero_poster']['image'])) ?>">
  <meta property="og:image:alt" content="<?= e($photos['featured']['hero_poster']['alt']) ?>">
  <meta property="og:site_name" content="Atelier Doria">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="<?= e($canonical) ?>">
  <?php if ($request_uri === '/'): ?><link rel="preload" as="image" href="<?= asset($photos['featured']['hero_poster']['image']) ?>" fetchpriority="high"><?php endif; ?>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <?php foreach (['variables.css','style.css','desktop-fixes.css','brief-completion.css','brand-story.css','official-logo.css','photo-library.css','legal.css','accessibility.css'] as $css): ?>
  <link rel="stylesheet" href="<?= asset('css/' . $css) ?>">
  <?php endforeach; ?>
  <link rel="icon" href="<?= asset('favicon/favicon-32.png') ?>" type="image/png" sizes="32x32">
  <link rel="icon" href="<?= asset('favicon/favicon-192.png') ?>" type="image/png" sizes="192x192">
  <link rel="apple-touch-icon" href="<?= asset('favicon/apple-touch-icon.png') ?>" sizes="180x180">
  <?php
    $same_as = array_values(array_filter([$google_business_url, $instagram_url, $facebook_url, $thefork_url]));
    $restaurant_schema = array_filter([
      '@context' => 'https://schema.org',
      '@type' => 'Restaurant',
      '@id' => $site_url . '/#restaurant',
      'name' => 'Atelier Doria',
      'description' => 'Osteria contemporanea di cucina pugliese a Brindisi',
      'url' => $site_url . '/',
      'image' => $site_url . asset($photos['featured']['hero_poster']['image']),
      'logo' => $site_url . asset('img/brand/logo-atelier-doria.png'),
      'telephone' => $phone_uri ?: null,
      'email' => $contact_email ?: null,
      'menu' => $site_url . '/menu',
      'acceptsReservations' => $site_url . '/prenotazioni',
      'hasMap' => $google_business_url ?: null,
      'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => 'Corso Roma, 32',
        'postalCode' => '72100',
        'addressLocality' => 'Brindisi',
        'addressRegion' => 'BR',
        'addressCountry' => 'IT',
      ],
      'servesCuisine' => ['Cucina pugliese', 'Cucina italiana contemporanea'],
      'priceRange' => '€€',
      'sameAs' => $same_as ?: null,
    ]);
  ?>
  <script type="application/ld+json" nonce="<?= e($csp_nonce) ?>"><?= json_encode($restaurant_schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
</head>
<body>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <?php site_header(); ?>
  <main id="contenuto">
<?php }

function site_header(): void { ?>
<header class="site-header">
  <a class="brand" data-brand="atelier-doria" href="/" aria-label="Atelier Doria, home"><img src="<?= asset('img/brand/logo-atelier-doria.png') ?>" alt="Atelier Doria — Osteria Contemporanea" width="2019" height="449" fetchpriority="high" decoding="async"></a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span></span><span></span><span></span><span class="sr-only">Apri menu</span></button>
  <nav id="main-nav" class="main-nav" aria-label="Navigazione principale">
    <a href="/">Home</a><a href="/menu">Menu</a><a href="/chi-siamo">Chi siamo</a><a href="/galleria">Galleria</a><a href="/recensioni">Recensioni</a><a href="/contatti">Contatti</a>
    <button class="language-toggle" type="button" aria-label="Switch to English" title="Switch to English"><span class="language-flags" aria-hidden="true"><img class="language-flag-image flag-en" src="<?= asset('img/flags/flag-gb.svg') ?>" alt="" width="28" height="20"><img class="language-flag-image flag-it" src="<?= asset('img/flags/flag-it.svg') ?>" alt="" width="28" height="20"></span><span class="language-label">English</span></button>
    <a class="button button-small" href="/prenotazioni">Prenota</a>
  </nav>
</header>
<?php }

function page_end(array $scripts = []): void {
    global $phone_uri, $phone_display, $contact_email, $instagram_url, $facebook_url, $thefork_url;
?></main>
<footer class="site-footer">
  <div class="footer-brand-copy"><a class="footer-brand-mark" href="/" aria-label="Atelier Doria, home"><img src="<?= asset('img/brand/logo-atelier-doria.png') ?>" alt="Atelier Doria — Osteria Contemporanea" width="2019" height="449" loading="lazy" decoding="async"></a><p>Corso Roma, 32 · Brindisi</p></div>
  <div><p class="eyebrow">Contatti</p><?php if ($phone_uri): ?><a href="tel:<?= e($phone_uri) ?>"><?= str_replace(' ', '&nbsp;', e($phone_display)) ?></a><?php else: ?><span><?= str_replace(' ', '&nbsp;', e($phone_display)) ?></span><?php endif; ?><br><?php if ($contact_email): ?><a href="mailto:<?= e($contact_email) ?>"><?= e($contact_email) ?></a><?php endif; ?></div>
  <div><p class="eyebrow">Seguici</p><a href="<?= e($instagram_url) ?>" target="_blank" rel="noopener">Instagram</a><br><a href="<?= e($facebook_url) ?>" target="_blank" rel="noopener">Facebook</a><br><a href="<?= e($thefork_url) ?>" target="_blank" rel="noopener">TheFork</a></div>
  <div class="footer-legal"><p class="eyebrow">Dati legali</p><p>Appia Food S.R.L.S.</p><p>P.IVA 02717510743</p><p>Sede legale · Corso Roma 32, 72100 Brindisi (BR)</p><p><a href="/privacy">Privacy Policy</a><br><a href="/cookie-policy">Cookie Policy</a></p></div>
  <p class="footer-bottom">© <?= date('Y') ?> Atelier Doria · Appia Food S.R.L.S. · P.IVA 02717510743</p>
</footer>
<button class="back-to-top" type="button" aria-label="Torna all’inizio" title="Torna all’inizio"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg></button>
<script src="<?= asset('js/main.js') ?>" defer></script>
<script src="<?= asset('js/i18n.js') ?>" defer></script>
<script src="<?= asset('js/privacy.js') ?>" defer></script>
<?php foreach ($scripts as $script): ?><script src="<?= asset('js/' . $script) ?>" defer></script><?php endforeach; ?>
</body>
</html>
<?php }
