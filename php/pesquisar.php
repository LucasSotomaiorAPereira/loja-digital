<?php
    include "connection.php";

    $pesquisar = $_POST['produto'];
    

    if(strlen($pesquisar) < 51){
        $tamanho_ok = true;
    }else{
        $tamanho_ok = false;
    }

    $dados = array();

    if($tamanho_ok == true){
        $query = "SELECT * FROM produto WHERE nome LIKE '%$pesquisar%'";
        $resultado_produtos = mysqli_query($conn, $query);

        if ($resultado_produtos) {
            $i = 0;
            while ($registro = mysqli_fetch_assoc($resultado_produtos)){
                $dados[$i]["id"] = $registro["id"];
                $dados[$i]["nome"] = $registro["nome"];
                $dados[$i]["preco"] = $registro["preco"];
                $dados[$i]["imagem"] = $registro["imagem"];
                $i++;
            }  
    
            $objetoJSON = json_encode($dados);
            echo $objetoJSON;
        }else {
            echo json_encode(array());
        }
    }else {
        echo json_encode(array());
    }
?>