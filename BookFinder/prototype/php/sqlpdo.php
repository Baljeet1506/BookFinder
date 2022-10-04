<?php
    try{
        $connection = new PDO('pgsql:host=localhost;dbname=BookFinder', 'postgres', 'admin');
        
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        //echo "<p>Connected successfully</p>";
    }
    catch(PDOException $ex){
        echo "Connection failed: " . $ex -> getMessage();
    }
?>