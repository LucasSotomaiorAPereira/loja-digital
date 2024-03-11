<?php
    session_start();
    $cliente_id = $_SESSION['id'];

    include "connection.php";

    $resultado = mysqli_query($conn, "SELECT * FROM carrinho WHERE id_cliente = $cliente_id");

    $dados = array();

    if ($resultado) {
        $i = 0;
        while ($registro = mysqli_fetch_assoc($resultado)){
            $dados[$i]["id"] = $registro["id"];
            $dados[$i]["nome"] = $registro["nome"];
            $dados[$i]["preco_unitario"] = $registro["preco_unitario"];
            $dados[$i]["preco_total"] = $registro["preco_total"];
            $dados[$i]["imagem"] = $registro["imagem"];
            $dados[$i]["quantidade"] = $registro["quantidade"];
            $i++;
        }   
    
        $objetoJSON = json_encode($dados);
        echo $objetoJSON;
    } else {
        echo json_encode(array());
    }
?>
