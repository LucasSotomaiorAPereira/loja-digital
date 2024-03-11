<?php
    session_start();

    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];
    $confirmar_senha = $_POST["confirmar_senha"];

    include "connection.php";
    try {
        if ($nome == '' ||  $email == '' || $senha == '' || $confirmar_senha == '')
        {
            $resposta = "Preencha todos os campos.";
        }
        else
        {
            if ($senha == $confirmar_senha) 
            {
                if (!filter_var($email, FILTER_VALIDATE_EMAIL)) 
                {
                    unset($_SESSION['email']);
                    unset($_SESSION['senha']);
                    $resposta = "O email não é válido.";
                } 
                else
                {

                    mysqli_query($conn, "INSERT INTO cliente (nome, email, senha, confirmar_senha) VALUES ('$nome', '$email', '$senha', '$confirmar_senha')");
                    $_SESSION['email'] = $email;
                    $_SESSION['senha'] = $senha;
                    $resposta = "Dados cadastrados com sucesso";
                        
                }
            }
            else
            {
                $resposta = "As senhas não são iguais.";
            }
        }
    } catch (Exception $e) {
        $resposta = "Já existe um usuário cadastrado com esse e-mail.";
    } finally {
        $resposta = json_encode($resposta);
        echo $resposta;
    }
?>