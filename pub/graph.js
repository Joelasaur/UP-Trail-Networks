//Have const variables for start date and end date?
var socket = io();

function start(){
    socket.emit("sendGraph");
}

var dictOfData = {
    "TRAIL-1":256,
    "TRAIL-2":150,
    "TRAIL-3":16,
    "TRAIL-4":350,
    "TRAIL-5":57,
    "TRAIL-6":179,
    "TRAIL-7":221,
    "TRAIL-8":77
}


socket.on("buildGraph", function(graph){
    //some function to put the graph into the html
    //we could literally place the script code into a blank <script> </script> section
    console.log(graph);

});


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

function dateEntered(){
    var start = document.getElementById("startDate").value;
    var end = document.getElementById("endDate").value;
    console.log(start);
    console.log(end);
}

function refresh(){
    dictOfData["TRAIL-1"] = Math.random()*100;
    console.log(dictOfData["TRAIL-1"]);
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
  drawChart();
  $("#refresh").click(function(e){
      refresh();
      drawChart();
  })
});

$(start);
