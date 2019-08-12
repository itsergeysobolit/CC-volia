<?php
include 'connect.php';
$del_name = $_REQUEST['name'];
$sql = "DELETE FROM taxi_order
WHERE name = '$del_name'";
$result=mysqli_query($link, $sql); 
if($result){
    echo json_encode(true);
} else{
    echo json_encode(false);
}
?>








