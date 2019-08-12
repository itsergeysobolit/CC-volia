<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$sql = "SELECT car_num, time, id, area, street FROM  taxi_order WHERE id = '".$_SESSION["id"]."' AND date = '".date('d.m.Y')."'";
$result=mysqli_query($link, $sql); 
$car_num = mysqli_fetch_row($result);
$sqllist = "SELECT taxi_order.name, users.photo, taxi_order.time FROM  taxi_order, users WHERE car_num = '".$car_num[0]."' AND time = '".$car_num[1]."' AND time != ''  AND users.id = taxi_order.id AND date = '".date('d.m.Y')."'";
$result1=mysqli_query($link, $sqllist); 
$namelist = array();
$namelist[0]["car_num"]=  $car_num[0]; 
$namelist[0]["time"]=  $car_num[1]; 
$namelist[0]["area"]=  $car_num[3]; 
$namelist[0]["street"]=  $car_num[4]; 
if($result){
    $rows = mysqli_num_rows($result1);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result1);
        $namelist[$i+1]["name"] = $row[0];
        $namelist[$i+1]["photo"] = $row[1];
        $namelist[$i+1]["time"] = $row[2];
    }
    echo json_encode($namelist);
} else{
    echo "<script>alert('Что-то не так');</script>";
}
?>




