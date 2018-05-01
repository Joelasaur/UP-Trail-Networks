var socket = io();
var map, heatmap, pointArray;

socket.on('onconnected', function() {
  console.log( 'Connected successfully to the socket.io server.');
});
$(document).ready(function() {
  $("#dateEntered").click(function(e){
    console.log("clicked button");
    var start = $("#startDate").val();
    var end = $("#endDate").val();
    socket.emit("getAllTrailData", start, end);
  });

$("#dateEntered").click(function(e){
  console.log("clicked button");
  var start = $("#startDate").val();
  var end = $("#endDate").val();
  socket.emit("getAllTrailData", start, end);
});

function parseLatLongs(data) {
  console.log("parsing lat longs");
  var image = 'marker.png'
  var finalArray = [];
  for(var i in data){
    var lat = parseFloat(data[i]["_id"]["lat"]);
    var long = parseFloat(data[i]["_id"]["long"]);
    finalArray.push({location: new google.maps.LatLng(lat, long), weight: data[i]["count"]});
  }

  socket.on("sendLatLongJson", function(latLongJson) {
    console.log(latLongJson[0]["lat"]);
    var initialLatLongs = [];
    for (var i in latLongJson) {
      googleLatLng = new google.maps.LatLng(latLongJson[i]["lat"], latLongJson[i]["long"]);
      pointArray.push(googleLatLng);
    }
  });

  socket.on("receiveData", function(data) {
    console.log("Data: " + data);
    heatmap.setData(parseLatLongs(data));
  });
});
function initMap() {
  console.log("callback function from Google API");
  pointArray = new google.maps.MVCArray();

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 46.545111, lng: -87.427002},
    mapTypeId: 'satellite'
  });
  heatmap = new google.maps.visualization.HeatmapLayer({
    data: pointArray,
    map: map
  });
  socket.emit("getLatLongData");
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}



/*
function getInitialPoints() {
    var mylatlng = new google.maps.LatLng(46.545111,   -87.427002);
    var marker = new google.maps.Marker({
              position: mylatlng,
              map: map,
              icon: image,
              title:"TRAIL-1"
    });
    return pointArray;
}*/
