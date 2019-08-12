<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
if(isset($_SESSION['id'])){
    $sql_update = "UPDATE users SET message = 0 WHERE id = ".$_SESSION["id"];
    mysqli_query($link,$sql_update);

}

?>




