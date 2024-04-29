<?php
include 'condb.php';
if(isset($_POST['submit'])){
  $date=$_POST['date'];
  $atime= date('Y-m-d H:i:s', strtotime($date ." ". date("H:i", strtotime($_POST['atime']))));
  $dtime= date('Y-m-d H:i:s', strtotime($date ." ". date("H:i", strtotime($_POST['dtime']))));
  $phone=$_POST['phone'];
  $ppl=$_POST['seats'];
  $cust_id = uniqid();
}

$q="INSERT INTO `cust_info`(`cust_id`, `phone`, `atime`, `dtime`, `ppl`) VALUES ('$cust_id','$phone','$atime','$dtime','$ppl')";
$q1="SELECT table_no, seats FROM table_info where table_no NOT IN(
SELECT table_no FROM `reservation` NATURAL JOIN cust_info NATURAL JOIN table_info where
('$atime'>atime AND '$atime'<dtime) or ('$dtime'>atime AND '$dtime'<dtime) or ('$atime'<=atime AND '$dtime'>=dtime)
)";

$tables = array();
$overlimit = false;

function findOptimal($q1,$ppl){
  $data = GetData($q1);
  $array= array();
  $table = 0;
  if(!$data){
    echo "no results found".$data;
    exit();
  }
  while($row = mysqli_fetch_row($data)){
    $array[]=$row;
  }
  if($ppl>array_sum(array_column($array,1))){
    echo"can not be done";
    global $overlimit;
    $overlimit=true;
    return;
  }
  findTable($ppl,$array);
  global $tables;
}

function findTable($s,$array){
  global $tables;
  if($s==0){
    return;
  }
  $max = max(array_column($array, 1));

  if($max<$s){
    $i = array_search($max, array_column($array, 1));
    $tables[] = $array[$i][0];
    unset($array[$i]);
    $array = array_values($array);
    $s=$s-$max;
    if($s<=0){
      $s=0;
      return;
    }
    findTable($s,$array);
    return;
  }

  $t=$array[0][1];
  $table=0;
  $n = count($array);
  for ($i=0; $i <$n; $i++) {
    $temp = $array[$i][1] - $s;
    if($t>$temp && $temp>=0){
      $t=$temp;
      $table = $i;
    }
  }
  $tables[] = $array[$table][0];
  return;
}
Connect();
findOptimal($q1,$ppl);
if(!$overlimit){
  SetData($q);
  echo "Your id: ".$cust_id."<br> Table:";
  for ($i=0; $i <count($tables) ; $i++) {
    $q0="INSERT INTO `reservation`(`table_no`, `cust_id`) VALUES ('$tables[$i]','$cust_id')";
    SetData($q0);
    echo " ".$tables[$i];
  }
  echo "<script> window.localStorage.setItem('id','".$cust_id."');
      function delete_id(){localStorage.clear(); window.location.href='../index.html';}</script>";
  echo '<link rel="stylesheet" href="../css/swap.css">
  <a class="ref_btn" href="../order.html">Order Now</a> <a class="ref_btn"
  onClick="delete_id()">Order On Spot</a>';
}
else echo " over limit";
KillCon();

 ?>
