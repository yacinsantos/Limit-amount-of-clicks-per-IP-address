<?php
   $json = $_POST['json'];

   /* sanity check */
   if (json_decode($json) != null)
   {
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     $extra = json_decode($json, true);
     $array_data[] = $extra;
     $final_data = json_encode($array_data);
     file_put_contents('data.json', $final_data);
   }
   else
   {
     // user has posted invalid JSON, handle the error 
   }
?>