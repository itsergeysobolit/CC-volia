<?php
include 'connect.php';
$index = $_REQUEST['index'];
$index_val = $_REQUEST['index_val'];
$index_name = $_REQUEST['index_name'];
if($index==1){
    $index= "area";
} else if($index==2){
    $index= "street";
} else if($index==3){
    $index= "car_num";
} else if($index==4){
    $index= "time";
}
$sql = "UPDATE taxi_order
SET $index = '$index_val'
WHERE name = '$index_name'";
$result=mysqli_query($link, $sql); 
if($result){
    echo json_encode(true);
} else{
    echo json_encode(false);

}

?>




