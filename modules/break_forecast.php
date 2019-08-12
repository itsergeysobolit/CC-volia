<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include 'connect.php';


// Create a variables


$forecast = $_REQUEST['time']; 
$forecast_counter = 0; 


//writing forecast on time gap
$sql_drop="
DROP EVENT IF EXISTS `forecast_download`";
$result_drop=mysqli_query($link, $sql_drop);

$sql_event_forecast="
CREATE EVENT `forecast_download` 
ON SCHEDULE EVERY 1 DAY 
STARTS '2019-06-15 23:19:00' 
ON COMPLETION 
NOT PRESERVE 
ENABLE 
COMMENT 'загрузка' 
DO 
UPDATE break SET `amount`= CASE
WHEN `hours`='8' THEN '".$forecast[7]."'
WHEN `hours`='9' THEN '".$forecast[8]."'
WHEN `hours`='10' THEN '".$forecast[9]."'
WHEN `hours`='11' THEN '".$forecast[11]."'
WHEN `hours`='12' THEN '".$forecast[12]."'
WHEN `hours`='13' THEN '".$forecast[13]."'
WHEN `hours`='14' THEN '".$forecast[14]."'
WHEN `hours`='15' THEN '".$forecast[15]."'
WHEN `hours`='16' THEN '".$forecast[16]."'
WHEN `hours`='17' THEN '".$forecast[17]."'
WHEN `hours`='18' THEN '".$forecast[18]."'
WHEN `hours`='19' THEN '".$forecast[19]."'
WHEN `hours`='20' THEN '".$forecast[20]."'
WHEN `hours`='21' THEN '".$forecast[21]."'
WHEN `hours`='22' THEN '".$forecast[22]."'
WHEN `hours`='23' THEN '".$forecast[23]."'
END
";
$result_forecast=mysqli_query($link, $sql_event_forecast);

if($result_drop && $result_forecast){
    echo json_encode("ok");
} else{
    echo json_encode("not ok");
}



?>




