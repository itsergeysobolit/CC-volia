<?php
include 'connect.php';
$index = $_REQUEST['index'];
$index_val = $_REQUEST['index_val'];
$index_id = $_REQUEST['index_id'];


if ($index == 3) {
    $index = "01.08 чт";
} else if ($index == 4) {
    $index = "02.08 пт";
}

$sql = "UPDATE operators_cc SET `$index` = '$index_val' WHERE id = '$index_id'";

$result = mysqli_query($link, $sql);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}