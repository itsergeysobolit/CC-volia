<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';


// Create a variables

//
$time = $_REQUEST['time']; 
$minutes= $_REQUEST['minutes'];
$peoples = $_SESSION['fio'];
$break_arr = array();
$time_toggle = 0;
$amout_people = array();
$amout_number = 0;
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


//$time = 11;
//$minutes= 0;

if($minutes==0){
    $sql_lunch="
    SELECT Count(amount)
    FROM $table
    WHERE minutes = '0'
    AND peoples LIKE '%$peoples%'
    ";
    $result_lunch=mysqli_query($link, $sql_lunch);
    $row_lunch = mysqli_fetch_row($result_lunch);
    if($row_lunch[0]>0){
        echo json_encode("Alredy eat");
        exit;
    }
}
//
//create condition for cheks 
$sql_amount_condition = "
SELECT peoples, amount
FROM $table 
WHERE hours = $time
AND minutes = $minutes
";


$result_amount_condition=mysqli_query($link, $sql_amount_condition);
$row_amount= mysqli_fetch_row($result_amount_condition);
if(unserialize($row_amount[0])==""){
    $amout_people = 0;
} else {
    $amout_people = count(unserialize($row_amount[0]));
}
$amout_number = $row_amount[1];

if($amout_number>=48){
    if($amout_people>= floor($amout_number/8)-2){
        echo json_encode("Full");
        exit;
    }
} else if($amout_number<=24){
    if($amout_people>= floor($amout_number/8)){
        echo json_encode("Full");
        exit;
    }
} else{
    if($amout_people>= floor($amout_number/8)-1){
        echo json_encode("Full");
        exit;
    }
}



//create SQL for cheks conditions


$sql_condition = "
SELECT hours, minutes, peoples
FROM $table 
WHERE peoples LIKE '%$peoples%' 
AND hours >=".($time-2)."
AND hours <= ".($time+2);


// write results in array $break_arr


$result_condition=mysqli_query($link, $sql_condition);
if($result_condition){
    $rows = mysqli_num_rows($result_condition);
    for ($i =0 ; $i < $rows ; $i++){
        $row = mysqli_fetch_row($result_condition);
        $break_arr[$i]["hours"] = $row[0];
        $break_arr[$i]["minutes"] = $row[1];
        $break_arr[$i]["peoples"] = unserialize($row[2]);
    }
} else{
    echo "<script>alert('Что-то не так');</script>";
}


//check conditions
//if time gap more then 1,5, deny for reserve place

if(count($break_arr)!=0){
    for($j=0; $j<count($break_arr);$j++){
        $time_gap=abs((($break_arr[$j]["hours"]*60+$break_arr[$j]["minutes"])-($time*60+$minutes))/60);
        if($time_gap<1.5){
            $time_toggle = 1;
            break; 
        }
    }
}


// if all right, create SQL for update data base


if($time_toggle == 0){
    $sql_get_people = "
   SELECT  peoples
   FROM $table 
   WHERE hours = $time AND minutes = $minutes
";
    $result_get_peoples= mysqli_query($link, $sql_get_people);
    $rowg= mysqli_fetch_row($result_get_peoples);
    $arr_get_people = $rowg[0];
    $unarr_get_people = unserialize($arr_get_people);
    if($unarr_get_people == ""){
        $serarr_give_people = serialize($peoples);
    } else {
        if(is_array($unarr_get_people)){
            array_push($unarr_get_people, $peoples);
            $serarr_give_people = serialize($unarr_get_people);
        } else{
            $dammy_arr[0]=$unarr_get_people;
            $dammy_arr[1]=$peoples;
            $serarr_give_people = serialize($dammy_arr);

        }
    }
    $sql_update = "
        UPDATE $table
        SET peoples = '$serarr_give_people'
        WHERE hours = $time AND minutes = $minutes
        ";
    $result_update=mysqli_query($link, $sql_update); 
    if($result_update){
        echo json_encode("Updated");
    } else{
        echo json_encode("Not updated");
    }
} else {
    echo json_encode("Can`t reserv a break");
}

?>