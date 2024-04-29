<?php

include 'condb.php';
if(isset($_POST['submit'])){
  $email=$_POST['email'];
  $password= $_POST['password'];
}

$q="SELECT * FROM `admin` WHERE `email` = '$email' AND `PASSWORD` = '$password' ";
Connect();
$data=GetData($q);
$row = mysqli_fetch_row($data);

if($row){
  $id=$row[0];
  $cookie = uniqid();
  $q1="UPDATE `admin` SET `cookie`='$cookie' WHERE `id`= $id";
  SetData($q1);
  setcookie("admin", $cookie, time() + (86400 * 30), "/");
  header("Location: ../adminpanel.html");
}
else{
  echo "<script> alert('Not Found');
  window.location.href='../adminlogin.html'; </script>";
}


KillCon();
 ?>
