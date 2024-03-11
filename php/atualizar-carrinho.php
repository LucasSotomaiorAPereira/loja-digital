<?php

    include "connection.php";

    $id = $_POST["id"];
    $preco = $_POST["preco"];
    $select = $_POST["valor_select"];

    $preco_total = floatval($preco) * floatval($select);

    if($select > 0 && $select < 31){
        if(mysqli_query($conn, "UPDATE carrinho SET preco_total = $preco_total WHERE id = $id;") && mysqli_query($conn, "UPDATE carrinho SET quantidade = $select WHERE id = $id;")){
            $deu_certo = true;
        }else{
            $deu_certo = false;
        }
    }else{
        $deu_certo = false;
    }

    $json = array("id" => $id, "preco" => $preco, "quantidade" => $select, "preco_total" => $preco_total, "deu_certo" => $deu_certo);

    echo json_encode($json);

?>