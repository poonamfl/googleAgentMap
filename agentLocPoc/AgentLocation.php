<?php
$jsonAgentData = '[
    {    "name":"Poonam",
        "allocPin": "600030", 
        "empCode" :"1234",
        "line1":"Poonam line 1",
        "line2" :"poonam line 2",
        "line3" :"poonam line3",
        "image" : "https://8454-118-103-255-147.ngrok-free.app/poonam1.jpg", 
        "currLoc":"13.16484058347479, 80.26615730544903"
    },
    {    "name":"Pradeep",
        "allocPin": "600090", 
        "empCode" :"1235",
        "line1":"Pradeep line 1",
        "line2" :"Pradeep line 2",
        "line3" :"Pradeep line3", 
        "image" : "https://img.icons8.com/3d-fluency/1x/crab.png", 
        "currLoc":"13.108003028805678, 80.17449013327641"
    },
    {    "name":"Rajesh",
        "allocPin": "600035,600034", 
        "empCode" :"1236",
        "line1":"Rajesh line 1",
        "line2" :"Rajesh line 2",
        "line3" :"Rajesh line3", 
        "image" : "https://img.icons8.com/3d-fluency/1x/duck.png", 
        "currLoc":"13.058510227662387, 80.23251167671152"
    },
    {    "name":"Aravind",
        "allocPin": "600091", 
        "empCode" :"1237",
        "line1":"Aravind line 1",
        "line2" :"Aravind line 2",
        "line3" :"Aravind line3", 
        "image" : "https://img.icons8.com/color/1x/pelican.png", 
        "currLoc":"12.958156590542423, 80.20470253459175"
    }
]';

?>


  <html>
  <head>
    <title>Marker Labels</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

    <link rel="stylesheet" type="text/css" href="./style.css?v=1.8.0" />
    <script type="module" src="./index.js"></script>
  </head>
  <body>
    <div id="map"></div>
    <p id="agentLocJson" ><?php
    echo $jsonAgentData;
    ?></p>
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