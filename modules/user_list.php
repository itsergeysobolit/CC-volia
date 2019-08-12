<?php
include "connect.php";
$sql_user_list = "SELECT id, name, lastname, login, password, photo, access  FROM  users";
$result_user_list=mysqli_query($link, $sql_user_list); 
$user_arr= array();
if($result_user_list){
    $rows = mysqli_num_rows($result_user_list);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result_user_list);
        $taxi_array[$i]["id"] = $row[0];
        $taxi_array[$i]["name"] = $row[1];
        $taxi_array[$i]["lastname"] = $row[2];
        $taxi_array[$i]["login"] = $row[3];
        $taxi_array[$i]["password"] = $row[4];
        $taxi_array[$i]["photo"] = $row[5];
        $taxi_array[$i]["access"] = $row[6];
    }
    echo json_encode($taxi_array);
} else{
    echo json_encode("Erorr");
}


?>




