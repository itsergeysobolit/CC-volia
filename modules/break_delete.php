<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';


// Create a variables

//
$hour = $_REQUEST['time']; 
$peoples = mb_substr($_REQUEST['fio'], 0, -1);
$group = $_REQUEST['group'];
$amount_people = array();
$minutes= "";
$table= "break";


// dammy variables


//$hour = 20;


//create condition for cheks 
if($group==1){
$table= "break_happy";
} else if($group==2){
$table= "break_cross";
}
    $sql_amount_condition = "
SELECT peoples, minutes
FROM $table 
WHERE hours = $hour
AND peoples LIKE '%$peoples%'
";

$result_amount_condition=mysqli_query($link, $sql_amount_condition);
$row_amount= mysqli_fetch_row($result_amount_condition);
$amount_people = unserialize($row_amount[0]);
$minutes = $row_amount[1];
//create SQL for cheks conditions
if(is_string($amount_people)){
    $amount_people = "";
} else{
    $index = array_search($peoples, $amount_people);
    unset($amount_people[$index]);
    sort($amount_people);

}
$serarr_give_people = serialize($amount_people);



$sql_update = "
        UPDATE $table
        SET peoples = '$serarr_give_people'
        WHERE hours = $hour AND minutes = $minutes
        ";
$result_update=mysqli_query($link, $sql_update); 
if($result_update){
    echo json_encode("Delete");
} else{
    echo json_encode("Not delete");
}

?>




