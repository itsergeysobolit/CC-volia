<?php
include 'connect.php';
$index_val = $_REQUEST['index_val'];


$sql = "UPDATE fact_fte SET hours = '$index_val' ORDER BY hours";

$result = mysqli_query($link, $sql);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
