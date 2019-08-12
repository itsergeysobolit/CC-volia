<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';


// Create a variables


$direction = $_REQUEST['direction']; 
$index = $_REQUEST['index']; 
$hours = $_REQUEST['hours']; 
$group = $_REQUEST['group']; 
$table ="break";
$minutes=0;
if($group==1){
    $table= "break_happy";
} else if($group==2){
    $table= "break_cross";
}

if($index==1){
    $minutes="20";
} else if($index==2){
    $minutes="30";
} else if($index==3){
    $minutes="40";
} else if($index==4){
    $minutes="50";
}


$sql_get_forecast = "
SELECT amount
FROM $table 
WHERE hours =".$hours." AND minutes= ".$minutes;



$result_get_forecast=mysqli_query($link, $sql_get_forecast);
if($result_get_forecast){
    $value = mysqli_fetch_row($result_get_forecast);
    $amount = $value[0];
    if($direction=="up"){
        $amount +=8;
    } else if($direction == "down"){
        $amount -=8;
    }
    if($amount<0){
        $amount=0;
    }
    $sql_update = "UPDATE $table SET amount =".$amount." WHERE hours = ".$hours." AND minutes = ".$minutes;
    $result_update_forecast=mysqli_query($link, $sql_update);
    if($result_update_forecast){
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else{
    echo json_encode("Can`t reach a data base");
}


?>




