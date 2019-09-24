<?php
   $json = $_POST['json'];

   /* sanity check */
   if (json_decode($json) != null)
   {
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     $record = json_decode($json, true);
     if (in_array($record, $array_data)){
         echo 'true';
     }else {
         echo 'false';
     }
   }
   else
   {
     echo 'false';
   }
?>