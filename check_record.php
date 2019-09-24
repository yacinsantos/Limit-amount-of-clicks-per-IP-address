<?php
  $json = $_POST['json'];
  $bool = 0;
   /* sanity check */
   if (json_decode($json) != null)
   {
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     $record = json_decode($json, true);
     
     
     foreach ($array_data as $key1 => $value1) {
      foreach ($value1 as $key2 => $value2) {
        if($record == $key2){
          $bool = 1;
        }
        
      }
    }  

    echo $bool;
  }
?>