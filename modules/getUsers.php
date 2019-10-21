<?php
include "connect.php";
$team = $_REQUEST['team'];
$query = "SELECT * FROM operators_cc WHERE team = '$team'";
$result = mysqli_query($link, $query);
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
if ($result) {
    $rows = mysqli_num_rows($result);
    for ($i = 0; $i < $rows; ++$i) {
        $row = mysqli_fetch_row($result);
        $getUsers_array[$i]["id"] = $row[0];
        $getUsers_array[$i]["team"] = $row[1];
        for ($y = 0; $y < count($getFio_array); $y++) {
            for ($j = 0; $j < count($getUsers_array); $j++) {
                if ($getFio_array[$y]["id"] == $getUsers_array[$j]["id"]) {
                    $getUsers_array[$j]["fio"] = $getFio_array[$y]["fio"];
                }
            }
        }
        $getUsers_array[$i]['01.11 пт'] = $row[4];
        $getUsers_array[$i]['02.11 сб'] = $row[5];
        $getUsers_array[$i]['03.11 вс'] = $row[6];
        $getUsers_array[$i]['04.11 пн'] = $row[7];
        $getUsers_array[$i]['05.11 вт'] = $row[8];
        $getUsers_array[$i]['06.11 ср'] = $row[9];
        $getUsers_array[$i]['07.11 чт'] = $row[10];
        $getUsers_array[$i]['08.11 пт'] = $row[11];
        $getUsers_array[$i]['09.11 сб'] = $row[12];
        $getUsers_array[$i]['10.11 вс'] = $row[13];
        $getUsers_array[$i]['11.11 пн'] = $row[14];
        $getUsers_array[$i]['12.11 вт'] = $row[15];
        $getUsers_array[$i]['13.11 ср'] = $row[16];
        $getUsers_array[$i]['14.11 чт'] = $row[17];
        $getUsers_array[$i]['15.11 пт'] = $row[18];
        $getUsers_array[$i]['16.11 сб'] = $row[19];
        $getUsers_array[$i]['17.11 вс'] = $row[20];
        $getUsers_array[$i]['18.11 пн'] = $row[21];
        $getUsers_array[$i]['19.11 вт'] = $row[22];
        $getUsers_array[$i]['20.11 ср'] = $row[23];
        $getUsers_array[$i]['21.11 чт'] = $row[24];
        $getUsers_array[$i]['22.11 пт'] = $row[25];
        $getUsers_array[$i]['23.11 сб'] = $row[26];
        $getUsers_array[$i]['24.11 вс'] = $row[27];
        $getUsers_array[$i]['25.11 пн'] = $row[28];
        $getUsers_array[$i]['26.11 вт'] = $row[29];
        $getUsers_array[$i]['27.11 ср'] = $row[30];
        $getUsers_array[$i]['28.11 чт'] = $row[31];
        $getUsers_array[$i]['29.11 пт'] = $row[32];
        $getUsers_array[$i]['30.11 сб'] = $row[33];
    }

    echo json_encode($getUsers_array);
} else {
    echo "<script>alert('Что-то не так');</script>";
}
