//Have const variables for start date and end date?
var socket = io();

function start(){
    socket.emit("sendGraph");
}

socket.on("buildGraph", function(graph){
    //some function to put the graph into the html
    //we could literally place the script code into a blank <script> </script> section
    console.log(graph);

});


function dateEntered(){
    var start = document.getElementById("startDate").value;
    var end = document.getElementById("endDate").value;
    console.log(start);
    console.log(end);
    location.reload();
}


function getData(){
    return [Math.random(),Math.random(),Math.random(),Math.random(),Math.random()];
}


window.onload = function(){
    const CHART = document.getElementById('barChart');

    console.log(CHART);

    let barChart = new Chart(CHART,  {
        type: 'bar',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: getData()
            }
          ]
        }
    });
}

$(start);
