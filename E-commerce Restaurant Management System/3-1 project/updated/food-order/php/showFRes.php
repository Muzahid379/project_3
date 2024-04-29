<?php
require_once 'condb.php';
$v = $_REQUEST["v"];
if($v!='')
  $q = "SELECT `isrc`,`food_id`,`name`,`category`,`price` FROM `food` WHERE `category`='$v'";
else
  $q = "SELECT `isrc`,`food_id`,`name`,`category`,`price` FROM `food`";
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
