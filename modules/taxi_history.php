<?php
include "connect.php";
$date ="";
$sql = "SELECT * FROM  taxi_order";
$result=mysqli_query($link, $sql); 
$taxi_arr= array();
if($result){
    $rows = mysqli_num_rows($result);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result);
        $taxi_array[$i]["id"] = $row[1];
        $taxi_array[$i]["name"] = $row[2];
        $taxi_array[$i]["time"] = $row[3];
        $taxi_array[$i]["area"] = $row[4];
        $taxi_array[$i]["street"] = $row[5];
        $taxi_array[$i]["car_num"] = $row[6];
        $taxi_array[$i]["date"] = $row[7];
    }
    echo json_encode($taxi_array);
} else{
    echo "<script>alert('Что-то не так');</script>";
}

 
?>




