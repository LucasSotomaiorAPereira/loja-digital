<?php
    $id = $_POST["id"];
    
    include "connection.php";

    $result = mysqli_query($conn, "DELETE FROM carrinho WHERE id=$id");

    if($result)
    {
        $json = array("sucesso" => true);
        echo json_encode($json);
    }
    else
    {
        $json = array("sucesso" => false);
        echo json_encode($json);

    }

?>  