import {fetchSignal} from "./fetchData.js";

var dps=[];
var dps1=[];
var xVal = 0;
var yVal = 5;
var yVal1 = 10;
var yVal2 = 15;
var yVal3 = 20;
var yVal4 = 25;
var color=["green","yellow","red"];
var x,x1;
var streetName = {
        0: "0",
        5:"Summit_Warren",
        10:"Lock_Warren"};

var chart = new CanvasJS.Chart("myChart", {
    title:{
        text: "Time Series"              
    },
    axisX:{
        title: "Time",
        maximum : 100,
    },
    axisY:{
        title: "StreetNames",
        interval: 5,
        labelFormatter: function(e){
            return streetName[e.value]
        }
    },
    data: [              
        {
            type: "line",
            dataPoints: dps,
        },
        // {
        //     type: "line",
        //     dataPoints: dps1,
        // }
        // {
        //     type: "line",
        //     dataPoints: dps2,
        // },
        // {
        //     type: "line",
        //     dataPoints: dps3,
        // },
        // {
        //     type: "line",
        //     dataPoints: dps4,
        // }
    ]
});
chart.render();

var updateChart = function(){
    var url = "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Summit_Warren";
    // var url1 = "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Lock_Warren";
    x = fetchSignal(url, 6);
    // x1 = fetchSignal(url1, 4);
    dps.push({x : xVal, y : yVal, lineColor: color[x], color: color[x]});
    // dps1.push({x: xVal, y: yVal1, lineColor: color[x1], color: color[x1]});
    xVal++;
    if(dps.length>20){
        dps.shift();
        // dps1.shift();
    }
    chart.render();
}

setInterval(function(){updateChart()},1000);

// { x: 10, y: 71 },
// { x: 20, y: 55 },
// { x: 30, y: 50 ,lineColor: "green", color: "green",},
// { x: 40, y: 65 },
// { x: 50, y: 68 },
// { x: 60, y: 28 },
// { x: 70, y: 34 },
// { x: 80, y: 14 },
// { x: 90, y: 23 }