<?php
include "connect.php";
$name = $_REQUEST['name']; 
$lastname = $_REQUEST['lastname']; 
$id = $_REQUEST['id']; 
$login = $_REQUEST['login']; 
//$ind = "name"; 
//$text = "Парубчишин, Виталий"; 
//$id = "0580106"; 
$sql_add = "INSERT INTO `users`(id, name, lastname, login) VALUES ('".$id."', '".$name."', '".$lastname."', '".$login."')";
$result_add=mysqli_query($link, $sql_add); 


if($result_add){
    echo json_encode("Update");
} else{
    echo json_encode("Not update");
}


?>




