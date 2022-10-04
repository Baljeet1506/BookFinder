<?php
    require 'sqlpdo.php';
    
    $search = $_POST["data"];
    $query = $connection -> prepare("$search");
    $query -> execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($result);
?>