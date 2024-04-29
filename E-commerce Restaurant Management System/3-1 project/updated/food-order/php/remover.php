<?php
require_once 'condb.php';
$v = $_REQUEST["v"];
$q = "DELETE FROM `reservation` WHERE `cust_id` ='$v'";
$q1 = "DELETE FROM `cust_info` WHERE `cust_id` ='$v'";
$q2 = "DELETE FROM `orders` WHERE `cust_id` ='$v'";
Connect();
SetData($q);
SetData($q1);
SetData($q2);
KillCon();
 ?>
