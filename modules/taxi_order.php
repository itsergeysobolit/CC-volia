<?php
session_start();
include 'connect.php';
$area = $_POST['area'];
$time = $_POST['time'];
$street = $_POST['street'];
$sql_condition="
SELECT EXISTS(SELECT name, date FROM taxi_order WHERE date ='".date('d.m.Y')."' AND name ='".$_SESSION['fio']."')";
$result_condition = mysqli_query($link,$sql_condition);

if($result_condition){
    $rows = mysqli_num_rows($result_condition);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_condition);
    }
    echo $row[0];
}
if($row[0]==0){
    $sql = "INSERT INTO 
taxi_order (id, name, time, area, street, car_num, date) 
VALUES ('".$_SESSION['id']."','".$_SESSION['fio']."','".$time."','".$area."','".$street."','0','".date('d.m.Y')."')";
    $result=mysqli_query($link, $sql); 
    if($result){
        echo "<script>alert('Вы успешно записались! Присядь на дорожку.'); window.location.href = '/break/pages/personal.html';</script>";
    } else{
        echo "<script>alert('Проблемы с записью! Обратитесь к СВ!');window.location.href = '/break/pages/personal.html';</script>";
    }
} else{
    echo "<script>alert('Вы уже записаны. Если нет, подойдите к СВ!');window.location.href = '/break/pages/personal.html';</script>";
}


?>




