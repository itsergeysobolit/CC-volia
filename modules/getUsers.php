<?php
include "connect.php";
$date = "";
$sql = "SELECT * FROM  operators_cc";
$result = mysqli_query($link, $sql);
if ($result) {
    $rows = mysqli_num_rows($result);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($result);
        $getUsers_array[$i]["fio"] = $row[1];
        $getUsers_array[$i]["group"] = $row[6];
        $getUsers_array[$i]["01"] = $row[7];
        $getUsers_array[$i]["02"] = $row[8];
    }
    echo json_encode($getUsers_array);
} else {
    echo "<script>alert('Что-то не так');</script>";
}
