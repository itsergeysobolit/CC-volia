<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$pass = $_REQUEST['password'];
$id =$_SESSION['id'];

$sql_upd="UPDATE users SET password = '$pass' WHERE id ='$id'";
$result_upd=mysqli_query($link, $sql_upd);

if($result_upd){
    echo json_encode("ok");
} else{
    echo json_encode("not");
}
?>




