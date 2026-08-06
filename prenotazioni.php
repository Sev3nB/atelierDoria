<?php require __DIR__ . '/includes/bootstrap.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json; charset=utf-8');
    $payload = json_decode(file_get_contents('php://input') ?: '{}', true) ?: [];
    if (!empty($payload['website'])) { http_response_code(400); echo json_encode(['ok'=>false]); exit; }
    if (!csrf_valid($payload['csrf_token'] ?? null)) {
        http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Sessione scaduta. Ricarica la pagina.']); exit;
    }
    foreach (['name','date','time','people','privacy_read'] as $field) {
        if (trim((string)($payload[$field] ?? '')) === '') {
            http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Campi obbligatori mancanti.']); exit;
        }
    }
    $notes = trim((string)($payload['notes'] ?? ''));
    if ($notes !== '' && preg_match('/allerg|intoller|celiach|glutin|lattos|salute|farmac|diabet/i', $notes) && ($payload['health_consent'] ?? '') !== '1') {
        http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Per inviare dati relativi alla salute è necessario il consenso esplicito.']); exit;
    }
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', (string)$payload['date']);
    $people = filter_var($payload['people'], FILTER_VALIDATE_INT);
    if (!$date || $date < new DateTimeImmutable('today') || $people === false || $people < 1 || $people > 30) {
        http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Data o numero di persone non valido.']); exit;
    }
    $name = trim((string) $payload['name']);
    $phone = trim((string) ($payload['phone'] ?? ''));
    $time = trim((string) $payload['time']);
    if (mb_strlen($name) > 120 || mb_strlen($phone) > 40 || mb_strlen($notes) > 2000 || !preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $time)) {
        http_response_code(400); echo json_encode(['ok'=>false,'error'=>'Dati della prenotazione non validi.']); exit;
    }
    try {
        smtp_send(
            'Nuova richiesta di prenotazione — ' . $name,
            "Nome: {$name}\nTelefono: " . ($phone ?: '-') . "\nData: " . $date->format('d/m/Y') . "\nOra: {$time}\nPersone: {$people}\n\nNote:\n" . ($notes ?: '-')
        );
    } catch (Throwable $exception) {
        error_log('Invio prenotazione fallito: ' . $exception->getMessage());
        http_response_code(503); echo json_encode(['ok'=>false,'error'=>'Invio temporaneamente non disponibile.']); exit;
    }
    echo json_encode(['ok'=>true]); exit;
}
page_start('Prenotazioni | Atelier Doria','Richiedi un tavolo da Atelier Doria a Brindisi tramite WhatsApp.'); ?>
<header class="page-hero booking-hero"><p class="eyebrow">La tua tavola</p><h1>Prenota</h1><p>Tre passaggi: compila, apri WhatsApp, attendi la conferma del ristorante.</p></header>
<section class="booking-steps"><span><b>1</b> Scegli</span><span><b>2</b> Invia</span><span><b>3</b> Ricevi conferma</span></section>
<section class="section booking-layout"><form id="booking-form" class="form-card" data-whatsapp="<?= e($whatsapp_number) ?>" novalidate><input type="hidden" name="csrf_token" value="<?= e(csrf_token()) ?>"><div class="field full"><label for="name">Nome e cognome *</label><input id="name" name="name" autocomplete="name" maxlength="120" required></div><div class="field"><label for="phone">Telefono</label><input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="40"></div><div class="field"><label for="date">Data *</label><input id="date" name="date" type="date" min="<?= date('Y-m-d') ?>" required></div><div class="field"><label for="time">Ora *</label><input id="time" name="time" type="time" required></div><div class="field"><label for="people">Persone *</label><input id="people" name="people" type="number" min="1" max="30" required></div><div class="field full"><label for="notes">Note o allergie</label><textarea id="notes" name="notes" rows="4" maxlength="2000" placeholder="Segnala qui allergie, intolleranze o esigenze particolari"></textarea><p class="field-help">Non inserire dati sanitari non necessari.</p></div><div class="field full privacy-check"><input id="booking-privacy" name="privacy_read" type="checkbox" value="1" required><label for="booking-privacy">Dichiaro di aver letto la <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>. *</label></div><div class="field full privacy-check"><input id="health-consent" name="health_consent" type="checkbox" value="1"><label for="health-consent">Se inserisco allergie, intolleranze o altri dati relativi alla salute nelle note, acconsento esplicitamente al loro trattamento per gestire la prenotazione.</label></div><input class="honeypot" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p id="form-status" class="form-status" role="alert"></p><button class="button full" type="submit">Invia richiesta su WhatsApp</button></form>
<aside class="info-card"><p class="eyebrow">Informazioni</p><h2>Prima di prenotare</h2><p>La richiesta non equivale a una conferma. Attendi la risposta del ristorante.</p><h3>Disponibilità</h3><?php foreach($hours as $row): ?><p><strong><?= e($row['days']) ?></strong><br><?= e($row['hours']) ?></p><?php endforeach; ?><a class="text-link" href="tel:<?= e($phone_uri) ?>">Chiama <?= e($phone_display) ?></a><hr><p>Per gruppi numerosi o cene private, indica il numero di ospiti e il tipo di occasione nelle note.</p></aside>
<figure class="page-photo booking-photo reveal"><img src="<?= asset($photos['featured']['bookings']['image']) ?>" alt="<?= e($photos['featured']['bookings']['alt']) ?>" width="1080" height="1920" loading="lazy"><figcaption class="photo-caption">La tavola · convivialità</figcaption></figure></section>
<?php page_end(['prenotazioni.js']);
