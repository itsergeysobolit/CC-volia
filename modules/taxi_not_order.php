<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';
$sql_condition="
SELECT EXISTS(SELECT name, date FROM taxi_order WHERE date ='".date('d.m.Y')."' AND name ='".$_SESSION['fio']."')";
$result_condition = mysqli_query($link,$sql_condition);

if($result_condition){
    $rows = mysqli_num_rows($result_condition);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_condition);
    }
}

if($row[0]==0){
    $sql = "INSERT INTO 
taxi_order (id, name, time, area, street, car_num, date) 
VALUES ('".$_SESSION['id']."','".$_SESSION['fio']."','','','','0','".date('d.m.Y')."')";
    $result=mysqli_query($link, $sql); 
    if($result){
        echo 'ok';
    } else{
        echo 'error';
    }
} else{
    echo 'ordered';
}


?>




