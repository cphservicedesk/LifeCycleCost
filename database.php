<?php
    $servername = "localhost";
    $username = "readonly";
    $password = "readonly";
    $dbname = "life_cycle_cost";

    $query = $_GET["query"];

    //$mysqli->set_charset("utf8");
    $connection = mysqli_connect($servername, $username, $password, $dbname);
    mysqli_set_charset ($connection, "utf8");
    
    if(mysqli_connect_errno()){
        die("connection failed: ".mysqli_connect_error()." (" . mysqli_connect_error().")");
    }
    if($result = mysqli_query($connection, $query)){
      $headers = mysqli_fetch_fields($result);
      while($row = $result->fetch_array(MYSQL_ASSOC)) {
        $data[] = $row;
      }
      echo json_encode(array("headers" => $headers, "query_result_rows" => $data));
    }
    else{
        echo "error";
    }
    $result->close();
    $connection->close();
?>
