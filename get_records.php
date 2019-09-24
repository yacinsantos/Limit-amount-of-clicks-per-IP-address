<?php

   
     $current_data = file_get_contents('data.json');
     $array_data = json_decode($current_data, true);
     print_r($array_data);

?>