<?php
include "connect.php";
$date = "";
$sql = "SELECT * FROM  operators_cc";
$sql_2 = "SELECT CONCAT( users.lastname,  ' ', users.name ) AS fio, operators_cc.id
FROM operators_cc, users
WHERE operators_cc.id = users.id";
$userName = mysqli_query($link, $sql_2);
if ($userName) {
    $rows = mysqli_num_rows($userName);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($userName);
        $getFio_array[$i]["fio"] = $row[0];
        $getFio_array[$i]["id"] = $row[1];
    }
}
$result = mysqli_query($link, $sql);
if ($result) {
    $rows = mysqli_num_rows($result);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($result);
        $getUsers_array[$i]["id"] = $row[0];
        $getUsers_array[$i]["team"] = $row[1];
        // $getUsers_array[$i]["01.08] = $row[3];
    }
    for ($y = 0; $y < count($getFio_array); $y++) {
        for ($j = 0; $j < count($getUsers_array); $j++) {
            if ($getFio_array[$y]["id"] == $getUsers_array[$j]["id"]) {
                $getUsers_array[$j]["fio"] = $getFio_array[$y]["fio"];
            }
        }
    }
    echo json_encode($getUsers_array);
} else {
    echo "<script>alert('Что-то не так');</script>";
}
