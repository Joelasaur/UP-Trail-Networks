var map, heatmap;

function initMap() {
  console.log("callback function from Google API");
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 46.545111, lng: -87.427002},
    mapTypeId: 'satellite'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
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

var tempArray = [[46.530727,-87.432305, 1],[46.535972,-87.428475, 1], [46.545111,   -87.427002, 5]];

function makeArray(data){
    var finalArray = [];
    for(i = 0; i < data.length; i++){
        for(x = 0; x < data[i][2]; x++){
            var lat = data[i][0];
            var long = data[i][1];
            finalArray.push(new google.maps.LatLng(lat, long));
        }
    }
    return finalArray;
}

var image = 'marker.png'
function getPoints() {

      var myLatlng = new google.maps.LatLng(46.545111,-87.427002);

      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: image,
          url: 'graph.html'
      });
      google.maps.event.addListener(marker, 'click', function() {
          window.location.href = this.url;
      });

      return makeArray(tempArray);

      /*
      return [
        new google.maps.LatLng(46.545111,   -87.427002),
        new google.maps.LatLng(46.535972,   -87.428475),
        new google.maps.LatLng(46.530727,   -87.432305),
        new google.maps.LatLng(46.522939,   -87.43726),
        new google.maps.LatLng(46.516554,   -87.444386),
        new google.maps.LatLng(46.513687,   -87.422298),
        new google.maps.LatLng(46.507771,   -87.441524),
        new google.maps.LatLng(46.521565,   -87.419839),
        new google.maps.LatLng(46.518875,   -87.423132),
        new google.maps.LatLng(46.518067,   -87.418985),
        new google.maps.LatLng(46.510196,   -87.408255),
        new google.maps.LatLng(46.512969,   -87.406343),
        new google.maps.LatLng(46.50908 ,   -87.395311),
        new google.maps.LatLng(46.517575,   -87.400652),
        new google.maps.LatLng(46.519059,   -87.395571),
        new google.maps.LatLng(46.513229,   -87.38722),
        new google.maps.LatLng(46.571059,   -87.435722),
        new google.maps.LatLng(46.568029,   -87.436319),
        new google.maps.LatLng(46.565954,   -87.439851),
        new google.maps.LatLng(46.565174,   -87.443713),
        new google.maps.LatLng(46.56545 ,   -87.445418),
        new google.maps.LatLng(46.566886,   -87.44556),
        new google.maps.LatLng(46.56851 ,   -87.451259),
        new google.maps.LatLng(46.566857,   -87.46248),
        new google.maps.LatLng(46.577393,   -87.471239),
        new google.maps.LatLng(46.57825 ,   -87.471397),
        new google.maps.LatLng(46.577525,   -87.46263),
        new google.maps.LatLng(46.577332,   -87.45057)
    ]; */
}
