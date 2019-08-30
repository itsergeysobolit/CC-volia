<?php
include 'connect.php';
$index = $_REQUEST['index'];
$start = $_REQUEST['start'];
$end = $_REQUEST['end'];

$nextDay;

$result = true;
$result_2 = true;
if ($index == 3) {
    $index = "01.08 чт";
    $nextDay = "02.08 пт";
} else if ($index == 4) {
    $index = "02.08 пт";
    $nextDay = "03.08 сб";
} else if ($index == 5) {
    $index = "03.08 сб";
    $nextDay = "04.08 вс";
} else if ($index == 6) {
    $index = "04.08 вс";
    $nextDay = "05.08 пн";
} else if ($index == 7) {
    $index = "05.08 пн";
    $nextDay = "06.08 вт";
} else if ($index == 8) {
    $index = "06.08 вт";
    $nextDay = "07.08 ср";
} else if ($index == 9) {
    $index = "07.08 ср";
    $nextDay = "08.08 чт";
} else if ($index == 10) {
    $index = "08.08 чт";
    $nextDay = "09.08 пт";
} else if ($index == 11) {
    $index = "09.08 пт";
    $nextDay = "10.08 сб";
} else if ($index == 12) {
    $index = "10.08 сб";
    $nextDay = "11.08 вс";
} else if ($index == 13) {
    $index = "11.08 вс";
    $nextDay = "12.08 пн";
} else if ($index == 14) {
    $index = "12.08 пн";
    $nextDay = "13.08 вт";
} else if ($index == 15) {
    $index = "13.08 вт";
    $nextDay = "14.08 ср";
} else if ($index == 16) {
    $index = "14.08 ср";
    $nextDay = "15.08 чт";
} else if ($index == 17) {
    $index = "15.08 чт";
    $nextDay = "16.08 пт";
} else if ($index == 18) {
    $index = "16.08 пт";
    $nextDay = "17.08 сб";
} else if ($index == 19) {
    $index = "17.08 сб";
    $nextDay = "18.08 вс";
} else if ($index == 20) {
    $index = "18.08 вс";
    $nextDay = "19.08 пн";
} else if ($index == 21) {
    $index = "19.08 пн";
    $nextDay = "20.08 вт";
} else if ($index == 22) {
    $index = "20.08 вт";
    $nextDay = "21.08 ср";
} else if ($index == 23) {
    $index = "21.08 ср";
    $nextDay = "22.08 чт";
} else if ($index == 24) {
    $index = "22.08 чт";
    $nextDay = "23.08 пт";
} else if ($index == 25) {
    $index = "23.08 пт";
    $nextDay = "24.08 сб";
} else if ($index == 26) {
    $index = "24.08 сб";
    $nextDay = "25.08 вс";
} else if ($index == 27) {
    $index = "25.08 вс";
    $nextDay = "26.08 пн";
} else if ($index == 28) {
    $index = "26.08 пн";
    $nextDay = "27.08 вт";
} else if ($index == 29) {
    $index = "27.08 вт";
    $nextDay = "28.08 ср";
} else if ($index == 30) {
    $index = "28.08 ср";
    $nextDay = "29.08 чт";
} else if ($index == 31) {
    $index = "29.08 чт";
    $nextDay = "30.08 пт";
} else if ($index == 32) {
    $index = "30.08 пт";
    $nextDay = "31.08 сб";
} else if ($index == 33) {
    $index = "31.08 сб";
    $nextDay = "01.09 вс";
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