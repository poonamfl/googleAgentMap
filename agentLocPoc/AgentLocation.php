<?php

?>


  <html>
  <head>
    <title>Marker Labels</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

    <link rel="stylesheet" type="text/css" href="./style.css?v=1.14.0" />
    <script type="module" src="./index.js"></script>
  </head>
  <body>
    <div id="map"></div>
    <!-- 
      The `defer` attribute causes the callback to execute after the full HTML
      document has been parsed. For non-blocking uses, avoiding race conditions,
      and consistent behavior across browsers, consider loading using Promises.
      See https://developers.google.com/maps/documentation/javascript/load-maps-js-api
      for more information.
      -->
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzrk2bqzyT1QgJ_RXrjjqWtQE784IcMBU&callback=initMap&v=weekly"
      defer
    ></script>
  </body>
</html>