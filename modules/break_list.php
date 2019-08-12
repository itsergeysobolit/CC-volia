<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';


// Create a variables


$time = $_REQUEST['time']; 
$group = $_REQUEST['group']; 
$break_arr = array();
$table = "break";


$sql_access="SELECT access FROM users WHERE id= '".$_SESSION['id']."'";
$result_access=mysqli_query($link, $sql_access);
$row_access = mysqli_fetch_row($result_access);

if($row_access[0]==3){
    $table= "break_happy";
} else if($row_access[0]==4){
    $table= "break_cross";
}

// dammy variables


//$time = 14;


//create SQL for cheks conditions
if($group==1){
    $table= "break_happy";
} else if($group==2){
    $table= "break_cross";
}

$sql_condition = "
SELECT peoples, minutes, amount, hours
FROM $table ";


// write results in array $break_arr


$result_condition=mysqli_query($link, $sql_condition);
if($result_condition){
    $rows = mysqli_num_rows($result_condition);
    for ($i =0 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result_condition);
        $break_arr[$i]['peoples'] = unserialize($row[0]);
        $break_arr[$i]["minutes"] = $row[1];
        $break_arr[$i]["amount"] = $row[2];
        $break_arr[$i]["hours"] = $row[3];
    }
    echo json_encode($break_arr);
} else{
    echo json_encode("Can`t reach a data base");
}


?>




