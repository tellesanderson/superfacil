<?php
// filepath: c:\Users\User\Documents\GITHUB\superfacil\enviar_email.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $assunto = isset($_POST["assunto"]) ? strip_tags(trim($_POST["assunto"])) : 'Trabalhe Conosco'; // Assunto padrão para o formulário "Trabalhe Conosco"
    $mensagem = strip_tags(trim($_POST["mensagem"]));
    
    // Validação básica
    if (empty($nome) OR empty($mensagem) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, preencha todos os campos corretamente.";
        exit;
    }

    $destinatario = "c6@superfacil.inf.br";
    $titulo = "Novo contato: $assunto";
    $corpo = "Nome: $nome\n";
    $corpo .= "Email: $email\n\n";
    $corpo .= "Mensagem:\n$mensagem";
    $cabecalhos = "From: $nome <$email>";

    // Enviar o email
    if (mail($destinatario, $titulo, $corpo, $cabecalhos)) {
        http_response_code(200);
        echo "Mensagem enviada com sucesso!";
    } else {
        http_response_code(500);
        echo "Ops! Algo deu errado e não pudemos enviar sua mensagem.";
    }

} else {
    http_response_code(403);
    echo "Houve um problema com o seu envio, por favor tente novamente.";
}
?>