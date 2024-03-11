<?php
    $nome = $_POST["nome"];
    $preco = $_POST["preco"];
    $imagem = $_FILES["imagem"];
    $endereco = "../img/".$imagem["name"];
    $img_nome = $imagem['name'];
    $regex_preco = "/^([0-9]{1,11}(\.[0-9]{1,2}))$|^[0-9]{1,14}$/u";
    $regex_nome = "/^((.){1,51})$/u";

    move_uploaded_file($imagem["tmp_name"], $endereco);

    if(preg_match($regex_nome, $nome)){
        $nome_ok = true;
    }else{
        $nome_ok = false;
    }

    if(preg_match($regex_preco, $preco)){
        $preco_ok = true;
    }else{
        $preco_ok = false;
    }

    $json = array("nome" => $nome, "preco" => $preco, "imagem" => $img_nome);

    $possui_null = false;

    $keys = array_keys($json);
 
    for ($i = 0; $i < count($json) && !$possui_null; $i++){
        $key   = $keys[$i];
        $value = $json[$key];

        if(empty($value)){
            $possui_null = true;
        }
        else{
            $possui_null = false;
        }
    }
    
    include "connection.php";

    if($possui_null == false && $preco_ok == true && $nome_ok == true){
        mysqli_query($conn, "INSERT INTO produto (nome, preco, imagem) VALUES ('$nome', $preco, '$img_nome')");
    }

    $json = array("nome" => $nome, "preco" => $preco, "imagem" => $img_nome, "tamanho" => $nome_ok, "valor" => $preco_ok, "null" => $possui_null);

    echo json_encode($json);
?>