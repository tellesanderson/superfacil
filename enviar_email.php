<?php
// filepath: c:\Users\User\Documents\GITHUB\superfacil\enviar_email.php

header('Content-Type: text/plain; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefone = strip_tags(trim($_POST["telefone"])); // Get the phone number
    $assunto = isset($_POST["assunto"]) ? strip_tags(trim($_POST["assunto"])) : 'Contato';
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // Validação básica
    if (empty($nome) OR empty($mensagem) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, preencha todos os campos corretamente.";
        exit;
    }

    $timezone = new DateTimeZone('America/Sao_Paulo');
    $date = new DateTime('now', $timezone);
    $dataStr = $date->format('d/m/Y H:i:s');

    $data = "Data: $dataStr\n";
    $data .= "Nome: $nome\n";
    $data .= "Email: $email\n";
    $data .= "Telefone: $telefone\n";
    $data .= "Assunto: $assunto\n";
    $data .= "Mensagem:\n$mensagem\n-------------------------\n";

    $dir = 'Sub';
    $file = $dir . '/submissions.php';

    // Create directory if it doesn't exist
    if (!is_dir($dir)) {
        mkdir($dir);
    }
    
    // Add security lock to the file if it doesn't exist
    if (!file_exists($file)) {
        file_put_contents($file, "<?php exit(\"Acesso Restrito.\"); ?>\n\n");
    }

    // Save to file
    if (file_put_contents($file, $data, FILE_APPEND | LOCK_EX)) {
        http_response_code(200);
        echo "Mensagem salva com sucesso!";
    } else {
        http_response_code(500);
        echo "Ops! Algo deu errado ao salvar sua mensagem.";
    }

} else {
    http_response_code(403);
    echo "Houve um problema com o seu envio, por favor tente novamente.";
}
?>