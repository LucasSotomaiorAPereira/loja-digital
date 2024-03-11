<?php
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];
    $condfirmar_senha = $_POST["confirmar_senha"];

    include "connection.php";

    mysqli_query($conn, "INSERT INTO cliente (nome, email, senha, confirmar_senha) VALUES ('$nome', '$email', '$senha', '$condfirmar_senha')");
?>