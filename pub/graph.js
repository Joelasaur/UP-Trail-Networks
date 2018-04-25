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

$(document).ready(function() {
    socket.on("receiveData", function(data){
        dictOfData = data;
        drawChart();
    });
  $("#dateEntered").click(function(e){
      var start = $("#startDate").val();
      var end = $("#endDate").val();
      var graphType = $("#trailSelector").val();
      //Here we would sendData with the start and end dates
      socket.emit("sendData", start, end);
      socket.on("receiveData", function(data){
          dictOfData = data;
          drawChart();
      });
  })
});
