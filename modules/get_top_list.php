<?php
ini_set('session.gc_maxlifetime', 86400);
ini_set('session.cookie_lifetime', 0);
session_set_cookie_params(0);
session_start();
include "connect.php";

$sql_user_name="SELECT * FROM users";
$result_user_name=mysqli_query($link, $sql_user_name);

$users_names = array();
if($result_user_name){
    $rows_user = mysqli_num_rows($result_user_name);
    for ($i =0 ; $i < $rows_user ; ++$i){
        $row_user_name = mysqli_fetch_row($result_user_name);
        $users_names[$i]["id"] = $row_user_name[0];
        $users_names[$i]["name"] = $row_user_name[2].' '.$row_user_name[1];
    }
}

$table = "users_indicators";

$sql = "SELECT * FROM  $table";

$result=mysqli_query($link, $sql); 
$indicators = array();
if($result){
    $rows = mysqli_num_rows($result);


    for ($i =1 ; $i < $rows ; ++$i){
        $row = mysqli_fetch_row($result);
        $indicators[$i]["id"] = $row[0];
        $indicators[$i]["csat"] = $row[4];
        $indicators[$i]["aht"] = $row[6];
        $indicators[$i]["sr"] = $row[7];
        $indicators[$i]["tss"] = $row[8];
        $indicators[$i]["work"] = $row[13];
        $indicators[$i]["nps"] = $row[15];
    }

    $top_array = array();
    $top_array[0] = $indicators[2]["id"];   //top по Ц-сату консул
    $top_array[1] = "user_name";            //имя по ц-сату
    $top_array[2] = $indicators[2]["csat"]; //показатель по ц-сату

    $top_array[3] = $indicators[2]["id"]; //top по aht консул
    $top_array[4] = "user_name";            //имя по aht
    $top_array[5] = $indicators[2]["aht"]; //показатель по aht

    $top_array[6] = $indicators[2]["id"]; //top по sr консул
    $top_array[7] = "user_name";            //имя по sr
    $top_array[8] = $indicators[2]["sr"]; //показатель по sr

    $top_array[9] = $indicators[2]["id"]; //top по tss консул
    $top_array[10] = "user_name";            //имя по tss
    $top_array[11] = $indicators[2]["tss"]; //показатель по tss

    $top_array[12] = $indicators[2]["id"]; //top по work консул
    $top_array[13] = "user_name";            //имя по work
    $top_array[14] = $indicators[2]["work"]; //показатель по work

    $top_array[15] = $indicators[2]["id"]; //top по nps консул
    $top_array[16] = "user_name";            //имя по nps
    $top_array[17] = $indicators[2]["nps"]; //показатель по nps


    $len_arr = count($indicators);
    for($i=1 ; $i < $len_arr ; ++$i){
        if($indicators[$i]["csat"]>$top_array[2]){
            $top_array[0]=$indicators[$i]["id"]; 
            $top_array[2]=$indicators[$i]["csat"];             
        }

        if($indicators[$i]["aht"]<$top_array[5] && $indicators[$i]["aht"]!=0){
            $top_array[3]=$indicators[$i]["id"]; 
            $top_array[5]=$indicators[$i]["aht"];             
        }
        if($indicators[$i]["sr"]>$top_array[8]){
            $top_array[6]=$indicators[$i]["id"]; 
            $top_array[8]=$indicators[$i]["sr"];             
        }
        if($indicators[$i]["tss"]>$top_array[11]){
            $top_array[9]=$indicators[$i]["id"]; 
            $top_array[11]=$indicators[$i]["tss"];             
        }
        if($indicators[$i]["work"]<$top_array[14] && $indicators[$i]["work"]!=0){
            $top_array[12]=$indicators[$i]["id"]; 
            $top_array[14]=$indicators[$i]["work"];             
        }
        if($indicators[$i]["nps"]>$top_array[17]){
            $top_array[15]=$indicators[$i]["id"]; 
            $top_array[17]=$indicators[$i]["nps"];             
        }
    }

    for ($i = 0 ; $i < $rows_user ; ++$i){
        if ($users_names[$i]["id"] == $top_array[0]){
            $top_array[1] = $users_names[$i]["name"];
        }
        if ($users_names[$i]["id"] == $top_array[3]){
            $top_array[4] = $users_names[$i]["name"];
        }
        if ($users_names[$i]["id"] == $top_array[6]){
            $top_array[7] = $users_names[$i]["name"];
        }
        if ($users_names[$i]["id"] == $top_array[9]){
            $top_array[10] = $users_names[$i]["name"];
        }
        if ($users_names[$i]["id"] == $top_array[12]){
            $top_array[13] = $users_names[$i]["name"];
        }
        if ($users_names[$i]["id"] == $top_array[15]){
            $top_array[16] = $users_names[$i]["name"];
        }
    }
    
    echo json_encode($top_array);
} else{
    echo "<script>alert('Что-то не так');</script>";
}
?>




