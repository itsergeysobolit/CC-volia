<?php
include "connect.php";
$sql_select_message= "SELECT val FROM other WHERE var = 'message' OR var = 'message-q' OR var= 'message-a'";
$result_select_message = mysqli_query($link,$sql_select_message);
if($result_select_message){
    $rows = mysqli_num_rows($result_select_message);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result_select_message);
        $message[$i] = $row[0];
    }
} else {
    echo json_encode("error 1");
} 

$sql_select_people= "SELECT message, name, lastname FROM users";
$result_select_people = mysqli_query($link,$sql_select_people);

if($result_select_people){
    $rows = mysqli_num_rows($result_select_people);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_select_people);
        $message[$i+3]['message'] = $row[0];
        $message[$i+3]['name'] = $row[1];
        $message[$i+3]['lastname'] = $row[2];
    }
    echo json_encode($message);
} else {
    echo json_encode("error 2");
} 