<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$table = "break";
$name = $_SESSION['fio'];

$sql_access="SELECT access FROM users WHERE id= '".$_SESSION['id']."'";
$result_access=mysqli_query($link, $sql_access);
$row_access = mysqli_fetch_row($result_access);

if($row_access[0]==3){
    $table= "break_happy";
} else if($row_access[0]==4){
    $table= "break_cross";
}

$sql_break_sv = "SELECT val FROM  other
 WHERE var = 'sv'";
$result_break_sv=mysqli_query($link, $sql_break_sv);
$val_sv= mysqli_fetch_row($result_break_sv);

$sql = "SELECT hours, minutes FROM  $table
 WHERE peoples LIKE '%$name%'";
$result=mysqli_query($link, $sql); 
$break = array();
if($result){
    $rows = mysqli_num_rows($result);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result);
        if($row[1]=="0"){
            $break[$i]["time"] = $row[0].":".$row[1]."0";
        } else {
            $break[$i]["time"] = $row[0].":".$row[1];
        }
    }
    $break[0]["sv"]=$val_sv[0];
//    sort($break);
    echo json_encode($break);
} else{
    echo json_encode("error 1");;
}
?>




