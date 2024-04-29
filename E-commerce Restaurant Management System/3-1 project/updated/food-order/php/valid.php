<?php
$v = $_REQUEST["v"];
include_once "condb.php";
$q="SELECT * FROM `admin` WHERE `cookie` = '$v'";
Connect();
$data= GetData($q);
KillCon();
if(mysqli_num_rows($data)==0)
  echo false;
else
  echo true;
 ?>
