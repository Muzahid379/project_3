<?php
require_once 'condb.php';
$v = $_REQUEST["v"];
$q = "DELETE FROM `food` WHERE `food_id`=$v";
Connect();
SetData($q);
KillCon();
 ?>
