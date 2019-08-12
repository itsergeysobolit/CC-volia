<?php
include "connect.php";
$sv = $_REQUEST['sv']; 
$sql_sv_update = "UPDATE other SET val = '".$sv."' WHERE var='sv'";
$result_sv_update=mysqli_query($link, $sql_sv_update); 
if($result_sv_update){
    echo json_encode("ok");
} else{
    echo json_encode("Erorr");
}


?>




 