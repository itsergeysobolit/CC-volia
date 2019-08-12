<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";
if(isset($_SESSION['id'])){
    $sql_update = "UPDATE users SET session = 1 WHERE id = ".$_SESSION["id"];
    mysqli_query($link,$sql_update);

}
$sql_chek_message= "SELECT message FROM users WHERE id =".$_SESSION['id'];
$result_chek_message = mysqli_query($link,$sql_chek_message);
$message_toggle = mysqli_fetch_row($result_chek_message);
if($message_toggle[0]==1){
    $sql_select_message= "SELECT val FROM other WHERE var = 'message' OR var = 'message-q' OR var= 'message-a'";
    $result_select_message = mysqli_query($link,$sql_select_message);
    if($result_select_message){
        $rows = mysqli_num_rows($result_select_message);
        for ($i =0 ; $i < $rows ; ++$i){
            $row = mysqli_fetch_row($result_select_message);
            $message[$i] = $row[0];
        }
    }
    echo json_encode($message);
} else{
    echo json_encode("hide");
}
?>




