<?php

    include "connection.php";

    session_start();

    $id = $_SESSION["id"];

    if(mysqli_query($conn, "DELETE FROM carrinho WHERE id_cliente = $id;")){
        $deu_certo = true;
    }else{
        $deu_certo = false;
    }

    echo json_encode(array("ok" => $deu_certo));

?>