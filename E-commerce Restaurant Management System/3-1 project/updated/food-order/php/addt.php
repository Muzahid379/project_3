<?php
if(isset($_POST['entry'])){
  $tn = $_POST['tn'];
  $ns = $_POST['ns'];

  $q = "INSERT INTO `table_info`(`table_no`, `seats`) VALUES ($tn,$ns)";

  include_once "condb.php";
  Connect();
  SetData($q);
  KillCon();
  header('Location:../adminpanel.html');
}
