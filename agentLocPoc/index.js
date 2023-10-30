// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
async function initMap() {
  
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // const bangalore = { lat: 12.97, lng: 77.59 };
  const chennai = {lat: 13.067439, lng: 80.237617};
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: chennai,
    mapId: "4504f8b37365c3d0",
  });

  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  const agentinfo = JSON.parse(document.getElementById("agentLocJson").innerHTML);
  console.log(JSON.stringify(agentinfo));
  console.log(agentinfo);
  console.log(agentinfo[1]);
  for (let i = 0; i < agentinfo.length; i++) {
    console.log(JSON.stringify(agentinfo[i]));
    // const input = agentinfo[i].currLoc;
    // const latlngStr = input.split(",");
    // const agentLocation = {
    //   lat: parseFloat(latlngStr[0]),
    //   lng: parseFloat(latlngStr[1]),
    // };
    // console.log(agentLocation);
    geocodeLatLng(geocoder, map,infowindow,agentinfo[i]);
  }
  

  //This event listener calls addMarker() when the map is clicked.
  // google.maps.event.addListener(map, "click", (event) => {
  // //   addMarker(event.latLng, map,labels[labelIndex++ % labels.length]);
  //   geocodeLatLng(geocoder, map, event.latLng, "Agent "+labels[labelIndex++ % labels.length]);
  // });


  // Add a marker at the center of the map.
  //addMarker(bangalore, map,"bangalore");

  // const agentTag = document.createElement("div");

  // agentTag.className = "agent-name";
  // agentTag.textContent = "chennai";

  // //addMarker(chennai, map,"chennai");
  // const marker = new AdvancedMarkerElement({
  //   map,
  //   position: chennai,
  //   content: agentTag,
  // });
}

// Adds a marker to the map.
// function addMarker(location, map, name) {
//   // Add the marker at the clicked location, and add the next-available label
//   // from the array of alphabetical characters.
//   new google.maps.Marker({
//     position: location,
//     label: name,
//     map: map,
//   });
// }
const is6DigitNum = (num) => /^\d{6}$/gm.test(num);
function extractPincode(address){
  const addrList = address.split(" ");
  let flag = null;
  let pincode = null;
  //alert(addrList);
  for (let i = 0; i < addrList.length; i++) {
    let txt = addrList[i].replaceAll(/\s/g,'');
    txt = txt.replaceAll(/,/g,'');
    txt = txt.toLowerCase();
    //alert(txt);
    if(txt == "nadu" && i+1<addrList.length){
      let addressPart = addrList[i+1];
      addressPart = addressPart.replaceAll(/,/g,'');
      //alert(addressPart);
      if(is6DigitNum(addressPart)) {
        pincode = addressPart;
      }
    }
    
  }
  return pincode;
}
async function geocodeLatLng(geocoder, map,infowindow,agentinfo) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const input = agentinfo.currLoc;
  const latlngStr = input.split(",");
  const agentLocation = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };
  console.log(agentLocation);
  geocoder
    .geocode({ location: agentLocation })
    .then((response) => {
      if (response.results[0]) {
        map.setZoom(11);
        const currentPin = extractPincode(response.results[0].formatted_address);
        //alert(currentPin);
        const allocPinList = agentinfo.allocPin.split(",");
        allocPinList[0]
        let clrClass = "yellow";
        if(currentPin != null){
          clrClass = "red";
          for (let i = 0; i < allocPinList.length; i++) {
            if (allocPinList[i] == currentPin){
              clrClass = "green";
            }
          }
        }

        // const agentTag = document.createElement("div");

        // agentTag.className = "agent-name "+clrClass;
        // agentTag.textContent = agentName;

        const beachFlagImg = document.createElement("img");

        beachFlagImg.src = agentinfo.image;
      
          beachFlagImg.className = "agent-name "+clrClass;
        const marker = new AdvancedMarkerElement({
          map,
          position: agentLocation,
          content: beachFlagImg,
          title: agentinfo.name,
        });
        marker.addListener("click", ({ domEvent, latLng }) => {
          const { target } = domEvent;
    
          infowindow.close();
          infowindow.setContent(agentinfo.line1+"\n"+agentinfo.line1+"\n"+agentinfo.line3);
          infowindow.open(marker.map, marker);
        });

      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}

window.initMap = initMap;