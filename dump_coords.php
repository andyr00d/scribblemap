<?php
   $filename = $_POST["map_id"] . "-map.json";
   error_log( "Filename: " . $filename );
   $filepath = "/tmp/scribble/" . $filename;
   error_log( "Filepath: " . $filepath );
   $cfile = fopen( $filepath, "w" ) or die("Unable to open file!");
   if ( $cfile ) {
      $bytes = fwrite( $cfile, $_POST["overlay_data"] );
      fclose( $cfile );
      if ( ! $bytes ) {
         echo "alert( 'An error occurred while saving the coordinates.' );";
      } else {
         echo "alert( 'Overlay coordinate files written successfully.' );";
      }
   } else {
      echo "alert( 'An error occurred creating the file to save the coordinates.' );";
   }
?>
