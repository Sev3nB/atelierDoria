<?php
declare(strict_types=1);

function smtp_read($socket): string {
    $response = '';
    do {
        $line = fgets($socket, 515);
        if ($line === false) throw new RuntimeException('Risposta SMTP non valida.');
        $response .= $line;
    } while (isset($line[3]) && $line[3] === '-');
    return $response;
}

function smtp_command($socket, string $command, array $expected): string {
    if ($command !== '') fwrite($socket, $command . "\r\n");
    $response = smtp_read($socket);
    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expected, true)) {
        throw new RuntimeException('Errore SMTP (' . $code . ').');
    }
    return $response;
}

function smtp_send(string $subject, string $text, ?string $replyTo = null): void {
    $host = env_value('SMTP_HOST', 'smtp.libero.it');
    $port = (int) env_value('SMTP_PORT', '465');
    $username = env_value('SMTP_USERNAME');
    $password = env_value('SMTP_PASSWORD');
    $from = env_value('SMTP_FROM', $username);
    $to = env_value('CONTACT_EMAIL', 'atelierdoria@libero.it');

    if ($username === '' || $password === '' || $from === '' || $to === '') {
        throw new RuntimeException('Configurazione SMTP incompleta.');
    }
    foreach ([$from, $to, $replyTo] as $address) {
        if ($address !== null && !filter_var($address, FILTER_VALIDATE_EMAIL)) {
            throw new RuntimeException('Indirizzo e-mail non valido.');
        }
    }

    $timeout = 12;
    $socket = @stream_socket_client(
        'ssl://' . $host . ':' . $port,
        $errorNumber,
        $errorMessage,
        $timeout,
        STREAM_CLIENT_CONNECT
    );
    if ($socket === false) throw new RuntimeException('Connessione SMTP non disponibile.');
    stream_set_timeout($socket, $timeout);

    try {
        smtp_command($socket, '', [220]);
        smtp_command($socket, 'EHLO atelierdoria.it', [250]);
        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);
        smtp_command($socket, 'MAIL FROM:<' . $from . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $headers = [
            'Date: ' . date(DATE_RFC2822),
            'From: Atelier Doria <' . $from . '>',
            'To: <' . $to . '>',
            'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
            'X-Mailer: Atelier Doria Website',
        ];
        if ($replyTo !== null) $headers[] = 'Reply-To: <' . $replyTo . '>';

        $body = str_replace(["\r\n", "\r"], "\n", $text);
        $body = str_replace("\n", "\r\n", $body);
        $body = preg_replace('/^\./m', '..', $body) ?? $body;
        fwrite($socket, implode("\r\n", $headers) . "\r\n\r\n" . $body . "\r\n.\r\n");
        smtp_command($socket, '', [250]);
        smtp_command($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}
