<?php

    session_start();
    $cliente_id = $_SESSION['id'];

    include "connection.php";

    $id = $_POST["id"];
    $nome = $_POST["nome"];
    $preco = $_POST["preco"];
    $img = $_POST["imagem"];

    $resultado = mysqli_query($conn, "SELECT * FROM carrinho");

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
            $dados[$i]["id_cliente"] = $registro["id_cliente"];
            $i++;
        }   
    
    }
 

    if (count($dados) < 1) {
        $igual = false;
    } else {
        foreach ($dados as $item) {
            echo $item["id_cliente"];
            echo "\n";
            if ($item["nome"] == $nome && $item["preco_unitario"] == $preco && $item["imagem"] == $img && $cliente_id == $item["id_cliente"]) {
                $igual = true;
                break;
            }else{
                $igual = false;
            }
        }
    }

    if($igual == false){
        mysqli_query($conn, "INSERT INTO carrinho (nome, preco_unitario, preco_total, imagem, quantidade, id_produto, id_cliente) VALUES ('$nome', $preco, $preco * 1, '$img', 1, $id, $cliente_id)");
    }

    $json = array("nome" => $nome, "preco_unitario" => $preco, "preco_unitario" => $preco * 1, "imagem" => $img, "igual" => $igual);

    echo json_encode($json);

?>