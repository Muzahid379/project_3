<?php
if(isset($_POST['entry'])){
  $file = $_FILES['file'];
  $file_Name = $_FILES['file']['name'];
  $temp_Location = $_FILES['file']['tmp_name'];
  $part_Name = explode('.',$file_Name);
  $type = strtolower(end($part_Name));

  $Img_name=uniqid(''.true);

  $folder = '../images/';
  $save_To = $folder.$Img_name.".jpg";

  move_uploaded_file($temp_Location,$save_To);


  $name = $_POST['name'];
  $cat = $_POST['cat'];
  $price= $_POST['price'];

  $q = "INSERT INTO `food`(`name`, `category`, `isrc`, `price`) VALUES ('$name','$cat','$Img_name',$price)";

  include_once "condb.php";
  Connect();
  SetData($q);
  KillCon();
  header('Location:../adminpanel.html');
}
