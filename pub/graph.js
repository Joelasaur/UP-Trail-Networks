//Have const variables for start date and end date?
var socket = io();
var dictOfData = {}

function getData(request){
    if(request === "labels"){
        return Object.keys(dictOfData);
    }
    else{
         var values = Object.keys(dictOfData).map(function(key){
            return dictOfData[key];
        });
        return values;
    }
}

function drawChart(){
    const CHART = document.getElementById('barChart');
    let barChart = new Chart(CHART,  {
        type: 'bar',
        data: {
          labels: getData("labels"),
          datasets: [
            {
              backgroundColor: "#3e95cd",
              label: "Number of Trail hits",
              data: getData()
            }
          ]
        }
    });
}

function getToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
     if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }
    today = yyyy+'-'+mm+'-'+dd;
    return today;
}

$(document).ready(function() {
    $("#startDate").attr( "max", getToday() );
    $("#endDate").attr( "max", getToday() );
    socket.emit("getAllTrailData", "2017-11-26", getToday());
    socket.on("receiveData", function(data){
        for (var i in data){
          dictOfData[data[i]["_id"]["node_name"]] = data[i]["count"];
        }
        drawChart();
    });
  $("#dateEntered").click(function(e){

      var start = $("#startDate").val();
      var end = $("#endDate").val();
      var graphType = $("#trailSelector").val();
      if( $("#trailSelector").val() == "All"){
          //Have emit("getAllTrailHits") only if the option is All
          socket.emit("getAllTrailData", start, end);
      }
      else{
          socket.emit( "getTrail", start, end, $("#trailSelector").val() );
      }
      //Have emit("getPerHourByTrail")
      socket.on("receiveData", function(data){
          dictOfData = data;
          drawChart();
      });
  })
});
