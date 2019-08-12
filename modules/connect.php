<?php
$host = "localhost";
$user = "root";
//$password = "DDNXjiRZalhNqRId2CU8";
$password = "";
$database = "new_break";
$link = mysqli_connect($host, $user, $password, $database);
if(!mysqli_connect($host, $user, $password, $database)){
    echo 3;
}
mysqli_set_charset($link, "utf8");

function getIP(){
    if (!empty($_SERVER['HTTP_CLIENT_IP'])){
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>