<?php
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $senha = $_POST["senha"];
    $confirmar_senha = $_POST["confirmar_senha"];
    $regex_email = "/\w+@admin\\.com/u";

    include "connection.php";
    try {
        if ( is_null($nome) ||  is_null($email) || is_null($senha))
        {
            $resposta = false;
        }
        else if ($senha != $confirmar_senha){
            $resposta = false;
        }
        else
        {
            if (!preg_match($regex_email, $email)) 
            {
                $resposta = false;
            } 
            else
            {
                mysqli_query($conn, "INSERT INTO administrador (nome, email, senha) VALUES ('$nome', '$email', '$senha')");
                $resposta = true;
            }
        }
    } catch (Exception $e) {
        $resposta = false;
    } finally {
        $resposta = json_encode($resposta);
        echo $resposta;
    }
?>