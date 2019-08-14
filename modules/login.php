<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
session_regenerate_id();
include 'connect.php';

$login = $_POST['login'];
$password = $_POST['password'];

if (empty($login) or empty($password)) {
    echo 0;
    exit;
}

$login = stripslashes($login);
$login = htmlspecialchars($login);
$password = stripslashes($password);
$password = htmlspecialchars($password);
$login = trim($login);
$password = trim($password);
$result = mysqli_query($link, "SELECT * FROM users WHERE login ='" . $login . "'"); //извлекаем из базы все данные о пользователе с введенным логином
$myrow = mysqli_fetch_array($result);
if (empty($myrow['password'])) {
    echo 0;
    exit;
} else {
    if ($myrow['password'] == $password) {
        $_SESSION['login'] = $myrow['login'];
        $_SESSION['id'] = $myrow['id'];
        $_SESSION['fio'] = $myrow['name'] . ", " . $myrow['lastname'];
        $_SESSION['access'] = $myrow['access'];
        $_SESSION['photo'] = $myrow['photo'];
        $_SESSION['lastlogin'] = $myrow['Lastlogin'];
        $sql = mysqli_query($link, "SELECT team FROM operators_cc WHERE id ='" . $myrow['id'] . "'");
        if ($sql) {
            $teamSql = mysqli_fetch_array($sql);
            $team = $teamSql['team'];
        }
        $_SESSION['team'] = $team;
        $response = array("name" => $_SESSION['fio'], "id" => $myrow['id'], "last" => $myrow['Lastlogin'], "team" => $_SESSION['team']);

        $today = date("d.m.y");

        $lastLogin = "UPDATE users SET Lastlogin = '$today' WHERE id=" . $myrow['id'];
        mysqli_query($link, $lastLogin);

        $sql_update_session = "UPDATE users SET session = 1 WHERE id =" . $myrow['id'];
        mysqli_query($link, $sql_update_session);
        echo json_encode($response);
        exit;
    } else {
        echo 0;
        exit;
    }
}
