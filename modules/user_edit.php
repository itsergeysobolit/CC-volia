<?php
include "connect.php";
$ind = $_REQUEST['val']; 
$text = $_REQUEST['text']; 
$id = $_REQUEST['id']; 
//$ind = "name"; 
//$text = "Парубчишин, Виталий"; 
//$id = "0580106"; 
$count=0;
if($ind == "name"){
    $name_arr = explode(", ", $text);
    $sql_upadte_name = "UPDATE users  SET  name = '".$name_arr[0]."' WHERE id = '".$id."'";
    $result_update_users_name=mysqli_query($link, $sql_upadte_name);
    if($result_update_users_name){
        $count+=1;
    }
    $sql_upadte_last_name = "UPDATE users  SET  lastname = '".$name_arr[1]."' WHERE id = '".$id."'";
    $result_update_users_lastname=mysqli_query($link, $sql_upadte_last_name); 
    if($result_update_users_lastname){
        $count+=1;
    }
} else if($ind == "password"){
    $sql_update = "UPDATE users  SET  password = '".$text."' WHERE id = '".$id."'";
    $result_update_users_password=mysqli_query($link, $sql_update); 
    if($result_update_users_password){
        $count=2;
    }
} else if($ind == "login"){
    $sql_update = "UPDATE users  SET  login = '".$text."' WHERE id = '".$id."'";
    $result_update_users_login=mysqli_query($link, $sql_update); 
    if($result_update_users_login){
        $count=2;
    }
} else if($ind == "delete"){
    $sql_delete = "DELETE FROM users WHERE id = '".$id."'";
    $result_delete_users=mysqli_query($link, $sql_delete); 
    if($result_delete_users){
        $count=2;
    }
} else if($ind == "access"){
    $sql_update = "UPDATE users  SET  access = '".$text."' WHERE id = '".$id."'";
    $result_update_access=mysqli_query($link, $sql_update); 
    if($result_update_access){
        $count=2;
    }
}



if($count ==2){
    echo json_encode("Update");
} else{
    echo json_encode("Not update");
}


?>




