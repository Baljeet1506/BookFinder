<?php
    require 'sqlpdo.php';
    
    $insert = $_POST["data"];
    $query = $connection -> prepare("$insert");
    $query -> execute();
    $id = $query->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($id);
?>