// In the following example, markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let labelIndex = 0;
const AgentMarkerArr = [];
async function initMap() {

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const chennai = { lat: 13.067439, lng: 80.237617 };
  const map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: chennai,
    mapId: "4504f8b37365c3d0",
  });

  const geocoder = new google.maps.Geocoder();
  getAgentData(geocoder, map);
    setInterval(  function() {
      console.log("errasing markers!!!!");
      getAgentData(geocoder, map);
    }, 60000);
  

}
function getAgentData(geocoder, map) {
  let post = `{
    "appName":"in.fl.uplift.agent",
    "customerId":"100000002",
    "device_id":"-b040-4513-9011-439a24476860",
    "installId":"0",
    "random":"1682687048246",
    "requestCreatedAt":"2023-04-28, 18:34:26",
    "version":"39.00"
  }`;
  fetch("https://app.friendloan.in/FLUPLIFT/getAgentTrackingDetails", {
    method: 'post',
    body: post,
    headers: {
      'Content-Type': 'application/json',
    }
    }).then((response) => {
        return response.json()
  }).then((res) => {
    console.log(res);
    plotAgentMarkers(geocoder, map,res);
  }).catch((error) => {
    alert("Error in fetching agent Data!!!");
    console.log(error)
  })

}
function erraseAgentMarkers(){
let arrLen = AgentMarkerArr.length;
for (let i = 0; i < arrLen; i++) {
  AgentMarkerArr[i].map = null;
}
}

function plotAgentMarkers(geocoder, map,res){
  erraseAgentMarkers();
  const agentinfo = res.agentDetails;
  for (let i = 0; i < agentinfo.length; i++) {
    //console.log(JSON.stringify(agentinfo[i]));
    if(agentinfo[i].currLoc != null && agentinfo[i].currLoc !== "" ){
      geocodeLatLng(geocoder, map, agentinfo[i]);
    }
  }
}

const is6DigitNum = (num) => /^\d{6}$/gm.test(num);
function extractPincode(address) {
  const addrList = address.split(" ");
  let flag = null;
  let pincode = null;
  //alert(addrList);
  for (let i = 0; i < addrList.length; i++) {
    let txt = addrList[i].replaceAll(/\s/g, '');
    txt = txt.replaceAll(/,/g, '');
    txt = txt.toLowerCase();
    //alert(txt);
    if (txt == "nadu" && i + 1 < addrList.length) {
      let addressPart = addrList[i + 1];
      addressPart = addressPart.replaceAll(/,/g, '');
      //alert(addressPart);
      if (is6DigitNum(addressPart)) {
        pincode = addressPart;
      }
    }

  }
  return pincode;
}
async function geocodeLatLng(geocoder, map, agentinfo) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  const input = agentinfo.currLoc;
  const latlngStr = input.split(",");
  const agentLocation = {
    lat: parseFloat(latlngStr[0]),
    lng: parseFloat(latlngStr[1]),
  };
  //console.log(agentLocation);
  geocoder
    .geocode({ location: agentLocation })
    .then((response) => {
      if (response.results[0]) {
        const currentPin = extractPincode(response.results[0].formatted_address);
        //alert(currentPin);
        const allocPinList = agentinfo.pincode.split(",");
        allocPinList[0]
        let clrClass = "yellow";
        if (currentPin != null) {
          clrClass = "red";
          for (let i = 0; i < allocPinList.length; i++) {
            if (allocPinList[i] == currentPin) {
              clrClass = "green";
            }
          }
        }
        const content = document.createElement("div");

        content.classList.add("agent");
        content.classList.add(clrClass);
        content.classList.add("collapsed");

        content.innerHTML = `<div class="icon">
                  <img src="${agentinfo.image}">
              </div>
              <div class="name">
                ${agentinfo.name}
              </div>
              <div class="name2">
                ${agentinfo.name}
              </div>
              <div class="line">
                ${agentinfo.line1}
              </div>
              <div class="line">
                ${agentinfo.line1}
              </div>
              <div class="line">
                ${agentinfo.line1}
              </div>`;

        const marker = new AdvancedMarkerElement({
          map,
          position: agentLocation,
          content: content,
          title: agentinfo.name,
        });

        marker.addListener("click", () => {
          toggleHighlight(marker);
        });
        AgentMarkerArr.push(marker);
      } else {
        window.alert("No results found");
      }
    })
    .catch((e) => window.alert("Geocoder failed due to: " + e));
}
function toggleHighlight(markerView) {
  if (markerView.content.classList.contains("collapsed")) {
    markerView.content.classList.remove("collapsed");
    markerView.zIndex = 1;
  } else {
    markerView.content.classList.add("collapsed");
    markerView.zIndex = null;
  }
}

window.initMap = initMap;