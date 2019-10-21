<?php
include 'connect.php';
$index = $_REQUEST['index'];
$start = $_REQUEST['start'];
$end = $_REQUEST['end'];

$nextDay;

$result = true;
$result_2 = true;
if ($index == 3) {
    $index = "01.11 пт";
    $nextDay = "02.11 сб";
} else if ($index == 4) {
    $index = "02.11 сб";
    $nextDay = "03.11 вс";
} else if ($index == 5) {
    $index = "03.11 вс";
    $nextDay = "04.11 пн";
} else if ($index == 6) {
    $index = "04.11 пн";
    $nextDay = "05.11 вт";
} else if ($index == 7) {
    $index = "05.11 вт";
    $nextDay = "06.11 ср";
} else if ($index == 8) {
    $index = "06.11 ср";
    $nextDay = "07.11 чт";
} else if ($index == 9) {
    $index = "07.11 чт";
    $nextDay = "08.11 пт";
} else if ($index == 10) {
    $index = "08.11 пт";
    $nextDay = "09.11 сб";
} else if ($index == 11) {
    $index = "09.11 сб";
    $nextDay = "10.11 вс";
} else if ($index == 12) {
    $index = "10.11 вс";
    $nextDay = "11.11 пн";
} else if ($index == 13) {
    $index = "11.11 пн";
    $nextDay = "12.11 вт";
} else if ($index == 14) {
    $index = "12.11 вт";
    $nextDay = "13.11 ср";
} else if ($index == 15) {
    $index = "13.11 ср";
    $nextDay = "14.11 чт";
} else if ($index == 16) {
    $index = "14.11 чт";
    $nextDay = "15.11 пт";
} else if ($index == 17) {
    $index = "15.11 пт";
    $nextDay = "16.11 сб";
} else if ($index == 18) {
    $index = "16.11 сб";
    $nextDay = "17.11 вс";
} else if ($index == 19) {
    $index = "17.11 вс";
    $nextDay = "18.11 пн";
} else if ($index == 20) {
    $index = "18.11 пн";
    $nextDay = "19.11 вт";
} else if ($index == 21) {
    $index = "19.11 вт";
    $nextDay = "20.11 ср";
} else if ($index == 22) {
    $index = "20.11 ср";
    $nextDay = "21.11 чт";
} else if ($index == 23) {
    $index = "21.11 чт";
    $nextDay = "22.11 пт";
} else if ($index == 24) {
    $index = "22.11 пт";
    $nextDay = "23.11 сб";
} else if ($index == 25) {
    $index = "23.11 сб";
    $nextDay = "24.11 вс";
} else if ($index == 26) {
    $index = "24.11 вс";
    $nextDay = "25.11 пн";
} else if ($index == 27) {
    $index = "25.11 пн";
    $nextDay = "26.11 вт";
} else if ($index == 28) {
    $index = "26.11 вт";
    $nextDay = "27.11 ср";
} else if ($index == 29) {
    $index = "27.11 ср";
    $nextDay = "28.11 чт";
} else if ($index == 30) {
    $index = "28.11 чт";
    $nextDay = "29.11 пт";
} else if ($index == 31) {
    $index = "29.11 пт";
    $nextDay = "30.11 сб";
} else if ($index == 32) {
    $index = "30.11 сб";
    $nextDay = "01.12 вс";
}


$hours = "UPDATE fact_fte SET `$index`=`$index`+1 WHERE ";
$next = "UPDATE fact_fte SET `$nextDay`=`$nextDay`+1 WHERE ";

if ($end > $start) {
    for ($i = $start; $i < $end; $i++) {
        $hours = $hours . " hours = " . $i;
        if ($i != $end - 1) {
            $hours = $hours . " OR";
        }
    }
} else {
    for ($i = $start; $i <= 24; $i++) {
        if ($i == 24) {
            for ($y = 0; $y < $end; $y++) {
                if ($y != 0) {
                    $next = $next . " OR";
                }
                $next = $next . " hours = " . $y;
            }
            $result_2 = mysqli_query($link, $next);
        } else {
            if ($i != $start) {
                $hours = $hours . " OR";
            }
            $hours = $hours . " hours = " . $i;
        }
    }
}

$result = mysqli_query($link, $hours);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}