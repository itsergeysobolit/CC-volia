<?php
include "connect.php";
$date ="";
if(date("H")>=0 && date("H")<=3){
    $date = date("d.m.Y", mktime(0, 0, 0, date("m"), date("d")-1, date("Y")));;
} else {
    $date = date('d.m.Y');
}
$sql = "SELECT * FROM  taxi_order WHERE date = '".$date."' ORDER BY car_num ASC";
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
    }
    echo json_encode($taxi_array);
} else{
    echo "<script>alert('Что-то не так');</script>";
}


?>




