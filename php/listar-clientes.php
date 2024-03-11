<?php
    include "connection.php";

    $resultado = mysqli_query($conn, "SELECT * FROM cliente");

    $dados = array();

    if ($resultado) {
        $i = 0;
        while ($registro = mysqli_fetch_assoc($resultado)){
            $dados[$i]["id"] = $registro["id"];
            $dados[$i]["nome"] = $registro["nome"];
            $dados[$i]["email"] = $registro["email"];
            $i++;
        }   
    
        $objetoJSON = json_encode($dados);
        echo $objetoJSON;
    } else {
        echo json_encode(array());
    }
?>
