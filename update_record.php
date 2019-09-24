<?php
   $json = $_POST['json'];

   if (json_decode($json) != null)
   {
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     $json = json_decode($json, true);
     $k1 = 0;
     $k2 = 0;
    foreach ($array_data as $key1 => $value1) {
      foreach ($value1 as $key2 => $value2) {
        if($json == $key2){
          $k1 = $key1;
          $k2 = $key2;
        }
      }
    }
    

    $array_data[$k1][$k2] = 2;

    $final_data = json_encode($array_data);
    file_put_contents('data.json', $final_data);


  }

     /*$final_data = json_encode($array_data);
     file_put_contents('data.json', $final_data);*/

?>