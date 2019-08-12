<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$sql_kpi = $_REQUEST["kpi"];
$sql_trancate_kpi="TRUNCATE users_indicators";
$result_trancate_kpi=mysqli_query($link, $sql_trancate_kpi); 
if($result_trancate_kpi){
    $result_update_kpi=mysqli_multi_query($link, $sql_kpi); 
    if($result_update_kpi){
        echo json_encode($indicators);
    }else{
        echo json_encode("not update");
    }
} else{
    echo json_encode("not delete");
}
?>




