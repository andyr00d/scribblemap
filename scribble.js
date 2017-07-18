theMap = null;
window.onload = function() {
   theMap = new ScribbleMap(document.getElementById('ScribbleMap'));
   theMap.settings.clearListeners();
   theMap.map.loadById( "<?php echo $map_id; ?>" );
   theMap.map.addListener( scribblemaps.MapEvent.OVERLAY_ADDED, function(event) {
      console.log( "OVERLAY ADDED..." );
   });
}

function dump_overlays() {
   overlays = theMap.map.getOverlays();
   json_data = "var overlay_data = { \"map_id\": \"<?php echo $map_id; ?>\", \"overlays\": [ ";
   for ( var oIdx = 0 ; oIdx < overlays.length ; oIdx++ ) {
      overlay = overlays[oIdx];
      coords = overlay.getCoords();
      json_data += "{ \"idx\": " + oIdx + ", \"coordinates\": [";
      for ( var cIdx = 0 ; cIdx < coords.length ; cIdx++ ) {
         coord = coords[cIdx];
         json_data += "{ \"long\": " + coord.lng() + ", \"lat\": " + coord.lat() + " }";
         if ( cIdx < (coords.length - 1) ) { json_data += ", "; }
      }
      json_data += "] }";
      if ( oIdx < (overlays.length - 1) ) { json_data = json_data + ", "; }
   }
   json_data += " ] };";
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.open( "POST", "/dump_coords.php", true );
   xmlhttp.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
   xmlhttp.onreadystatechange = function() {
      if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
         eval( xmlhttp.responseText );
      }
   }
   xmlhttp.send( "map_id=<?php echo $map_id; ?>&overlay_data=" + json_data );
}
