<?php
    session_start();
    $values = array();
    if(isset($_SESSION['email']))
    {
        $logged = "Cliente";
        $nome = $_SESSION['nome'];
        array_push($values, $logged);
        array_push($values, $nome);
        array_push($values, $_SESSION['id']);
        echo json_encode($values);
    }
    elseif(isset($_SESSION['email_adm']))
    {
        $logged = "Administrador";
        $nome = $_SESSION['nome_adm'];
        array_push($values, $logged);
        array_push($values, $nome);
        array_push($values, $_SESSION['id_adm']);
        echo json_encode($values);
    }
    else
    {
        $logged = false;
        echo json_encode($logged);
    }
?>