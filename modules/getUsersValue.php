<?php
include 'connect.php';
$index = $_REQUEST['index'];
$index_val = $_REQUEST['index_val'];
$index_id = $_REQUEST['index_id'];


if ($index == 3) {
    $index = "01.08 чт";
} else if ($index == 4) {
    $index = "02.08 пт";
} else if ($index == 5) {
    $index = "03.08 сб";
} else if ($index == 6) {
    $index = "04.08 вс";
} else if ($index == 7) {
    $index = "05.08 пн";
} else if ($index == 8) {
    $index = "06.08 вт";
} else if ($index == 9) {
    $index = "07.08 ср";
} else if ($index == 10) {
    $index = "08.08 чт";
} else if ($index == 11) {
    $index = "09.08 пт";
} else if ($index == 12) {
    $index = "10.08 сб";
} else if ($index == 13) {
    $index = "11.08 вс";
} else if ($index == 14) {
    $index = "12.08 пн";
} else if ($index == 15) {
    $index = "13.08 вт";
} else if ($index == 16) {
    $index = "14.08 ср";
} else if ($index == 17) {
    $index = "15.08 чт";
} else if ($index == 18) {
    $index = "16.08 пт";
} else if ($index == 19) {
    $index = "17.08 сб";
} else if ($index == 20) {
    $index = "18.08 вс";
} else if ($index == 21) {
    $index = "19.08 пн";
} else if ($index == 22) {
    $index = "20.08 вт";
} else if ($index == 23) {
    $index = "21.08 ср";
} else if ($index == 24) {
    $index = "22.08 чт";
} else if ($index == 25) {
    $index = "23.08 пт";
} else if ($index == 26) {
    $index = "24.08 сб";
} else if ($index == 27) {
    $index = "25.08 вс";
} else if ($index == 28) {
    $index = "26.08 пн";
} else if ($index == 29) {
    $index = "27.08 вт";
} else if ($index == 30) {
    $index = "28.08 ср";
} else if ($index == 31) {
    $index = "29.08 чт";
} else if ($index == 32) {
    $index = "30.08 пт";
} else if ($index == 33) {
    $index = "31.08 сб";
}

$sql = "UPDATE operators_cc SET `$index` = '$index_val' WHERE id = '$index_id'";

$result = mysqli_query($link, $sql);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
