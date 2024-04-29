<?php
require_once 'condb.php';
$q = "SELECT * FROM `table_info`";
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
