<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
$sql = "SELECT * FROM  users_indicators
 WHERE users_indicators.id = '".$_SESSION["id"]."' OR users_indicators.id = 'date'";
$result=mysqli_query($link, $sql); 
$indicators = array();
if($result){
    $rows = mysqli_num_rows($result);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result);
        $indicators[$i]["id"] = $row[0];
        $indicators[$i]["date_of_issue"] = $row[1];
        $indicators[$i]["time"] = $row[2];
        $indicators[$i]["workBreak"] = $row[3];
        $indicators[$i]["csat"] = $row[4];
        $indicators[$i]["klk"] = $row[5];
        $indicators[$i]["aht"] = $row[6];
        $indicators[$i]["sr"] = $row[7];
        $indicators[$i]["tss"] = $row[8];
        $indicators[$i]["sts"] = $row[9];
        $indicators[$i]["rft"] = $row[10];
        $indicators[$i]["phone"] = $row[11];
        $indicators[$i]["email"] = $row[12];
        $indicators[$i]["work"] = $row[13];
        $indicators[$i]["klk_happy"] = $row[14];
        $indicators[$i]["nps"] = $row[15];
        $indicators[$i]["reg"] = $row[16];
        $indicators[$i]["plan_hours"] = $row[17];
        $indicators[$i]["exp"] = $row[18];
        $indicators[$i]["rank"] = $row[19];
        $indicators[$i]["sales_coef"] = $row[20];
    }
    echo json_encode($indicators);
} else{
    echo "<script>alert('Что-то не так');</script>";
}
?>




