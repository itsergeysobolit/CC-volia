<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$peopl_arr= array();
$peopl_taxi_arr= array();
$peopl_taxi_arr_on_foot= array();
$date = date('d.m.Y');
$sql_list_session="SELECT name, lastname, id FROM users WHERE session = 1";
$sql_list_order="SELECT name, id FROM taxi_order WHERE date ='".$date."'";
$sql_list_on_foot="SELECT name, id FROM taxi_order WHERE date ='".$date."' AND time =''";
$result_session = mysqli_query($link, $sql_list_session);
$result_taxi = mysqli_query($link, $sql_list_order);
$result_on_foot = mysqli_query($link, $sql_list_on_foot);
if($result_session){
    $rows = mysqli_num_rows($result_session);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_session);
        $peopl_arr[$i]["id"] = $row[2];
        $peopl_arr[$i]["name"] = $row[0].", ".$row[1];
    }
} else{
    echo json_encode("Erorr1");
}

if($result_taxi){
    $rows = mysqli_num_rows($result_taxi);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_taxi);
        $peopl_taxi_arr[$i]["id"] = $row[1];
        $peopl_taxi_arr[$i]["name"] = $row[0];
    }
} else{
    echo json_encode("Erorr2");
}
if($result_on_foot){
    $rows = mysqli_num_rows($result_on_foot);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_on_foot);
        $peopl_taxi_arr_on_foot[$i]["id"] = $row[1];
        $peopl_taxi_arr_on_foot[$i]["name"] = $row[0];
    }
} else{
    echo json_encode("Erorr3");
}

$count_all_session = count($peopl_arr);
$count_all_order = count($peopl_taxi_arr);


for($y=0; $y<$count_all_session;$y++){
    for($z=0;$z<$count_all_order;$z++){
        if($peopl_arr[$y]["id"]==$peopl_taxi_arr[$z]["id"]){
            unset($peopl_arr[$y]);
            break;
        }

    }
}
sort($peopl_arr);

$arr[0] = $peopl_arr;
$arr[1] = $peopl_taxi_arr_on_foot;

echo json_encode($arr);
?>
