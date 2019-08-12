<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';
$sql_update_session="UPDATE users SET session = 0 WHERE id =".$_SESSION['id'];
mysqli_query($link, $sql_update_session);
session_destroy();
exit;
?>