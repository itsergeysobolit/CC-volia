<?php
include "connect.php";
$message = $_REQUEST['message'];
$message_a = $_REQUEST['message_a'];
$message_q = $_REQUEST['message_q'];
//$message = "1";
//$message_a = "12";
//$message_q = "123";

$sql_update_mesasge = "UPDATE other SET val = '$message' WHERE var = 'message'";
$sql_update_mesasge_q = "UPDATE other SET val = '$message_q' WHERE var = 'message-q'";
$sql_update_mesasge_a = "UPDATE other SET val = '$message_a' WHERE var = 'message-a'";
$result_update_mesasge = mysqli_query($link, $sql_update_mesasge);
$result_update_mesasge_q = mysqli_query($link, $sql_update_mesasge_q);
$result_update_mesasge_a = mysqli_query($link, $sql_update_mesasge_a);
if($result_update_mesasge && $result_update_mesasge_q && $result_update_mesasge_a){
    //обновляем у пользователь значение сообщение на 1, чтобы консультант высветило сообщение
    $sql_update_toggle = "UPDATE users SET message  = 1";
    $result_update_mesasge_toggle = mysqli_query($link, $sql_update_toggle);
    if($result_update_mesasge_toggle){
        echo json_encode("ok");
    } else {
    // Не удалось обновить переключатель и консультантов  
        echo json_encode("error 2");
    }

} else {
    // Какое то из сообщений не записывает в базу 
    echo json_encode("error 1");
}

?>




