var map, heatmap;

function initMap() {
  console.log("callback function from Google API");
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.775, lng: -122.434},
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

function getPoints() {
      return [
        new google.maps.LatLng(37.782551, -122.445368),
        new google.maps.LatLng(37.782745, -122.444586),
        new google.maps.LatLng(37.782842, -122.443688),
        new google.maps.LatLng(37.782919, -122.442815),
        new google.maps.LatLng(37.782992, -122.442112),
        new google.maps.LatLng(37.783100, -122.441461),
        new google.maps.LatLng(37.783206, -122.440829),
        new google.maps.LatLng(37.783273, -122.440324),
        new google.maps.LatLng(37.783316, -122.440023),
        new google.maps.LatLng(37.783357, -122.439794),
        new google.maps.LatLng(37.783371, -122.439687),
        new google.maps.LatLng(37.783368, -122.439666),
        new google.maps.LatLng(37.783383, -122.439594),
        new google.maps.LatLng(37.783508, -122.439525),
        new google.maps.LatLng(37.783842, -122.439591),
        new google.maps.LatLng(37.784147, -122.439668),
        new google.maps.LatLng(37.784206, -122.439686),
        new google.maps.LatLng(37.784386, -122.439790),
        new google.maps.LatLng(37.784701, -122.439902),
        new google.maps.LatLng(37.784965, -122.439938),
        new google.maps.LatLng(37.785010, -122.439947),
        new google.maps.LatLng(37.785360, -122.439952),
        new google.maps.LatLng(37.785715, -122.440030),
        new google.maps.LatLng(37.786117, -122.440119),
        new google.maps.LatLng(37.786564, -122.440209),
        new google.maps.LatLng(37.786905, -122.440270),
        new google.maps.LatLng(37.786956, -122.440279),
        new google.maps.LatLng(37.800224, -122.433520),
        new google.maps.LatLng(37.800155, -122.434101),
        new google.maps.LatLng(37.800160, -122.434430),
        new google.maps.LatLng(37.800378, -122.434527),
        new google.maps.LatLng(37.800738, -122.434598),
        new google.maps.LatLng(37.800938, -122.434650),
        new google.maps.LatLng(37.801024, -122.434889),
        new google.maps.LatLng(37.800955, -122.435392),
        new google.maps.LatLng(37.800886, -122.435959),
        new google.maps.LatLng(37.800811, -122.436275),
        new google.maps.LatLng(37.800788, -122.436299),
        new google.maps.LatLng(37.800719, -122.436302),
        new google.maps.LatLng(37.800702, -122.436298),
        new google.maps.LatLng(37.800661, -122.436273),
        new google.maps.LatLng(37.800395, -122.436172),
        new google.maps.LatLng(37.800228, -122.436116),
        new google.maps.LatLng(37.800169, -122.436130),
        new google.maps.LatLng(37.800066, -122.436167),
        new google.maps.LatLng(37.784345, -122.422922),
        new google.maps.LatLng(37.784389, -122.422926),
        new google.maps.LatLng(37.784437, -122.422924),
        new google.maps.LatLng(37.784746, -122.422818),
        new google.maps.LatLng(37.785436, -122.422959),
        new google.maps.LatLng(37.786120, -122.423112),
        new google.maps.LatLng(37.786433, -122.423029),
        new google.maps.LatLng(37.786631, -122.421213),
        new google.maps.LatLng(37.786660, -122.421033),
        new google.maps.LatLng(37.786801, -122.420141),
        new google.maps.LatLng(37.786823, -122.420034),
        new google.maps.LatLng(37.786831, -122.419916),
        new google.maps.LatLng(37.787034, -122.418208),
        new google.maps.LatLng(37.787056, -122.418034),
        new google.maps.LatLng(37.787169, -122.417145),
        new google.maps.LatLng(37.787217, -122.416715),
        new google.maps.LatLng(37.786144, -122.416403),
        new google.maps.LatLng(37.785292, -122.416257),
        new google.maps.LatLng(37.773021, -122.413009),
        new google.maps.LatLng(37.772501, -122.412371),
        new google.maps.LatLng(37.771964, -122.411681),
        new google.maps.LatLng(37.771479, -122.411078),
        new google.maps.LatLng(37.770992, -122.410477),
        new google.maps.LatLng(37.770467, -122.409801),
        new google.maps.LatLng(37.770090, -122.408904),
        new google.maps.LatLng(37.769657, -122.408103),
        new google.maps.LatLng(37.769132, -122.407276),
        new google.maps.LatLng(37.768564, -122.406469),
        new google.maps.LatLng(37.767980, -122.405745),
        new google.maps.LatLng(37.767380, -122.405299),
        new google.maps.LatLng(37.766604, -122.405297),
        new google.maps.LatLng(37.765838, -122.405200),
        new google.maps.LatLng(37.765139, -122.405139),
        new google.maps.LatLng(37.764457, -122.405094),
        new google.maps.LatLng(37.763716, -122.405142),
        new google.maps.LatLng(37.762932, -122.405398),
        new google.maps.LatLng(37.762126, -122.405813),
        new google.maps.LatLng(37.761344, -122.406215),
        new google.maps.LatLng(37.760556, -122.406495),
        new google.maps.LatLng(37.759732, -122.406484),
        new google.maps.LatLng(37.758910, -122.406228),
        new google.maps.LatLng(37.758182, -122.405695),
        new google.maps.LatLng(37.757676, -122.405118),
        new google.maps.LatLng(37.757039, -122.404346),
        new google.maps.LatLng(37.756335, -122.403719),
        new google.maps.LatLng(37.755503, -122.403406),
        new google.maps.LatLng(37.754665, -122.403242),
        new google.maps.LatLng(37.753837, -122.403172),
        new google.maps.LatLng(37.752986, -122.403112),
        new google.maps.LatLng(37.751266, -122.403355)
      ];
    }

