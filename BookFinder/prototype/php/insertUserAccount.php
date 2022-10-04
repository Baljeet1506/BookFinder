<?php
    require 'sqlpdo.php';
    
    $insert = $_POST["data"];
    $query = $connection -> prepare("$insert");
    $query -> execute();
    
    echo "Successful!";
?>