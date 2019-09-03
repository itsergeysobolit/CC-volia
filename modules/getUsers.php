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
        $getUsers_array[$i]['01.08 чт'] = $row[4];
        $getUsers_array[$i]['02.08 пт'] = $row[5];
        $getUsers_array[$i]['03.08 сб'] = $row[6];
        $getUsers_array[$i]['04.08 вс'] = $row[7];
        $getUsers_array[$i]['05.08 пн'] = $row[8];
        $getUsers_array[$i]['06.08 вт'] = $row[9];
        $getUsers_array[$i]['07.08 ср'] = $row[10];
        $getUsers_array[$i]['08.08 чт'] = $row[11];
        $getUsers_array[$i]['09.08 пт'] = $row[12];
        $getUsers_array[$i]['10.08 сб'] = $row[13];
        $getUsers_array[$i]['11.08 вс'] = $row[14];
        $getUsers_array[$i]['12.08 пн'] = $row[15];
        $getUsers_array[$i]['13.08 вт'] = $row[16];
        $getUsers_array[$i]['14.08 ср'] = $row[17];
        $getUsers_array[$i]['15.08 чт'] = $row[18];
        $getUsers_array[$i]['16.08 пт'] = $row[19];
        $getUsers_array[$i]['17.08 сб'] = $row[20];
        $getUsers_array[$i]['18.08 вс'] = $row[21];
        $getUsers_array[$i]['19.08 пн'] = $row[22];
        $getUsers_array[$i]['20.08 вт'] = $row[23];
        $getUsers_array[$i]['21.08 ср'] = $row[24];
        $getUsers_array[$i]['22.08 чт'] = $row[25];
        $getUsers_array[$i]['23.08 пт'] = $row[26];
        $getUsers_array[$i]['24.08 сб'] = $row[27];
        $getUsers_array[$i]['25.08 вс'] = $row[28];
        $getUsers_array[$i]['26.08 пн'] = $row[29];
        $getUsers_array[$i]['27.08 вт'] = $row[30];
        $getUsers_array[$i]['28.08 ср'] = $row[31];
        $getUsers_array[$i]['29.08 чт'] = $row[32];
        $getUsers_array[$i]['30.08 пт'] = $row[33];
        $getUsers_array[$i]['31.08 сб'] = $row[34];
    }

    echo json_encode($getUsers_array);
} else {
    echo "<script>alert('Что-то не так');</script>";
}
