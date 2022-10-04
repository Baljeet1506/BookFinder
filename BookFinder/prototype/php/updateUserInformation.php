<?php
    require 'sqlpdo.php';
    
    $update = $_POST["data"];
    $query = $connection -> prepare("$update");
    $query -> execute();
    
    echo "Successful!";
?>