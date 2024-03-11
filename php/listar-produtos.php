<?php
    include "connection.php";

    $resultado = mysqli_query($conn, "SELECT * FROM produto");

    $i = 0;

    while ($registro = mysqli_fetch_assoc($resultado)){
        $dados[$i]["id"] = $registro["id"];
        $dados[$i]["nome"] = $registro["nome"];
        $dados[$i]["preco"] = $registro["preco"];
        $dados[$i]["imagem"] = $registro["imagem"];
        $i++;
    }   
    
    if(isset($dados) ){
        $objetoJSON = json_encode($dados);
        echo $objetoJSON;
    } else {
        echo json_encode(null);
    }
?>