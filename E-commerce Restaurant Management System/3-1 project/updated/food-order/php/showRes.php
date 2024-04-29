<?php
require_once 'condb.php';
$q = "SELECT * FROM cust_info NATURAL JOIN orders NATURAL JOIN reservation";
Connect();
$data = GetData($q);
KillCon();

if($data){
  $array = array();
  while($row = mysqli_fetch_row($data)){
    $array[]=$row;
  }
}

echo json_encode($array);
 ?>
