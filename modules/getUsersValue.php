<?php
include 'connect.php';
$index = $_REQUEST['index'];
$index_val = $_REQUEST['index_val'];
$index_id = $_REQUEST['index_id'];


if ($index == 3) {
    $index = "01.11 пт";
} else if ($index == 4) {
    $index = "02.11 сб";
} else if ($index == 5) {
    $index = "03.11 вс";
} else if ($index == 6) {
    $index = "04.11 пн";
} else if ($index == 7) {
    $index = "05.11 вт";
} else if ($index == 8) {
    $index = "06.11 ср";
} else if ($index == 9) {
    $index = "07.11 чт";
} else if ($index == 10) {
    $index = "08.11 пт";
} else if ($index == 11) {
    $index = "09.11 сб";
} else if ($index == 12) {
    $index = "10.11 вс";
} else if ($index == 13) {
    $index = "11.11 пн";
} else if ($index == 14) {
    $index = "12.11 вт";
} else if ($index == 15) {
    $index = "13.11 ср";
} else if ($index == 16) {
    $index = "14.11 чт";
} else if ($index == 17) {
    $index = "15.11 пт";
} else if ($index == 18) {
    $index = "16.11 сб";
} else if ($index == 19) {
    $index = "17.11 вс";
} else if ($index == 20) {
    $index = "18.11 пн";
} else if ($index == 21) {
    $index = "19.11 вт";
} else if ($index == 22) {
    $index = "20.11 ср";
} else if ($index == 23) {
    $index = "21.11 чт";
} else if ($index == 24) {
    $index = "22.11 пт";
} else if ($index == 25) {
    $index = "23.11 сб";
} else if ($index == 26) {
    $index = "24.11 вс";
} else if ($index == 27) {
    $index = "25.11 пн";
} else if ($index == 28) {
    $index = "26.11 вт";
} else if ($index == 29) {
    $index = "27.11 ср";
} else if ($index == 30) {
    $index = "28.11 чт";
} else if ($index == 31) {
    $index = "29.11 пт";
} else if ($index == 32) {
    $index = "30.11 сб";
}

$sql = "UPDATE operators_cc SET `$index` = '$index_val' WHERE id = '$index_id'";

$result = mysqli_query($link, $sql);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}
