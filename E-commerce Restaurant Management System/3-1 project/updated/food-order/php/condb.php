<?php
$host = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "hotel3";
$con;

function Connect(){
  $GLOBALS['con'] = new mysqli($GLOBALS['host'], $GLOBALS['dbuser'], $GLOBALS['dbpass'],  $GLOBALS['dbname']);
}

function KillCon(){
  mysqli_close($GLOBALS['con']);
}

function GetData($q){
  return mysqli_query($GLOBALS['con'], $q);
}

function SetData($q){
  mysqli_query($GLOBALS['con'], $q);
}

?>
