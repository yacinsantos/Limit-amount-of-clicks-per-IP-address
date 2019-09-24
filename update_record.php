<?php
   $json = $_POST['json'];

   /* sanity check */
   if (json_decode($json) != null)
   {
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     $record = json_decode($json, true);
     
     $key_ = 0;
     foreach ($record as $k => $value) {
         $key_ = $k;
     }
     $record[$key_] = 2;

     $key = array_search($record, $array_data);
     unset($array_data[$key]);
     $array_data[] = $record;
     $final_data = json_encode($array_data);
     file_put_contents('data.json', $final_data);
     
   }
   else
   {
     echo 'false';
   }
?>