<?php
include "connect.php";
$date = "";
$sql = "select 
    concat (users.lastname, ' ', users.name) as fio, 
    operators_cc.id
from operators_cc, users
where operators_cc.id = users.id";
$result = mysqli_query($link, $sql);
if ($result) {
    $rows = mysqli_num_rows($result);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($result);
        $getUsers_array[$i]["fio"] = $row[0];
    }
    echo json_encode($getUsers_array);
} else {
    echo "<script>alert('Что-то не так');</script>";
}
