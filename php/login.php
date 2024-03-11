<?php
    session_start();

    $email = $_POST["email"];
    $senha = $_POST["senha"];

    include "connection.php";

    $query = "SELECT * FROM cliente WHERE email = '$email' AND senha = '$senha'";
    $query_adm = "SELECT * FROM administrador WHERE email = '$email' AND senha = '$senha'";
    $result = mysqli_query($conn, $query);
    $result_adm = mysqli_query($conn, $query_adm);

    if($result_adm && mysqli_num_rows($result_adm) == 1){
        $row = mysqli_fetch_array($result_adm);
        $nome = $row['nome'];
        $id = $row['id'];
        $_SESSION['id_adm'] = $id;
        $_SESSION['nome_adm'] = $nome;    
        $_SESSION['email_adm'] = $email; 
        $resposta = "Login do admin realizado com sucesso.";
    }
    else if ($result && mysqli_num_rows($result) == 1) 
    {
        $row = mysqli_fetch_array($result);
        $nome = $row['nome'];
        $id = $row['id'];
        $_SESSION['email'] = $email;
        $_SESSION['nome'] = $nome;  
        $_SESSION['id'] = $id; 
        $resposta = "Login realizado com sucesso.";
    } 
    else 
    {
        $resposta = "E-mail ou senha incorretos. Tente novamente.";
        session_unset();
    }

    $resposta = json_encode($resposta);
    echo $resposta;
?>