<?php
require_once 'condb.php';
$v = $_REQUEST["v"];
$q = "DELETE FROM table_info WHERE `table_no`=$v";
Connect();
SetData($q);
KillCon();
 ?>
