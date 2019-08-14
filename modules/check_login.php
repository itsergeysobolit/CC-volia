<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';

$query = "SELECT * FROM schedule WHERE id = 0";
$result = mysqli_query($link, $query);
// $schedule = mysqli_fetch_row($result);

if (empty($_SESSION['login']) or empty($_SESSION['id'])) {
    echo 0;
} else {
    $respons = array("name" => $_SESSION['fio'], "login" => $_SESSION['login'], "photo" => $_SESSION['photo'], "access" => $_SESSION['access'], "team" => $_SESSION['team']);
    echo json_encode($respons);
}
