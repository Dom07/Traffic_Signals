import {fetchData} from "./fetchData.js";

var dataPointObject = {
    xVal:0,
    summit_warren:{
        yVal:5,
        dps:[]
    },
    lock_warren:{
        yVal:10,
        dps:[]
    },
    norfolk_warren:{
        yVal:15,
        dps:[]
    },
    hudson_warren:{
        yVal:20,
        dps:[]
    },
    west_market_warren:{
        yVal:25,
        dps:[]
    },
    west_market_first:{
        yVal:30,
        dps:[]
    }
};

var color=["green","orange","red"];
var signal_phases = [];
var lineThickness = 7;

var streetName = {
        0: "0",
        5:"Summit_Warren",
        10:"Lock_Warren",
        15:"Norfolk_Warren",
        20:"Hudson_Warren",
        25:"West_Market_Warren",
        30:"West_Market_First_Street",
        35:"x"};

var chart = new CanvasJS.Chart("myChart", {
    title:{
        text: "Time Series"              
    },
    axisX:{
        title: "Time",
        maximum : 100,
        // minimum:0,
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
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.summit_warren.dps,
        },
        {   
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.lock_warren.dps,
        },
        {   
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.norfolk_warren.dps,
        },
        {   
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.hudson_warren.dps,
        },
        {   
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.west_market_warren.dps,
        },
        {   
            lineThickness: lineThickness,
            markerType: "none",
            type: "line",
            dataPoints: dataPointObject.west_market_first.dps,
        }
    ]
});
chart.render();

var updateChart = function(){
    signal_phases = []
//  TODO: find a way to make only one call to the server every second rather then making
//  two calls i.e. one from map.js and second from chart.js
    signal_phases = fetchData();
    
    var x = getSignalIndex(signal_phases[0],6);
    dataPointObject.summit_warren.dps.push({x : dataPointObject.summit_warren.xVal, y : dataPointObject.summit_warren.yVal, lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[1],4);
    dataPointObject.lock_warren.dps.push({x:dataPointObject.lock_warren.xVal, y: dataPointObject.lock_warren.yVal,  lineColor: color[x], color: color[x]});
    
    
    x = getSignalIndex(signal_phases[2],4);
    dataPointObject.norfolk_warren.dps.push({x:dataPointObject.xVal, y:dataPointObject.norfolk_warren.yVal, lineColor: color[x], color: color[x]});

    x = getSignalIndex(signal_phases[3],4);
    dataPointObject.hudson_warren.dps.push({x:dataPointObject.xVal,y:dataPointObject.hudson_warren.yVal, lineColor:color[x], color:color[x]});
    
    x = getSignalIndex(signal_phases[4],4);
    dataPointObject.west_market_warren.dps.push({x:dataPointObject.xVal, y: dataPointObject.west_market_warren.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[5],4);
    dataPointObject.west_market_first.dps.push({x:dataPointObject.xVal, y: dataPointObject.west_market_first.yVal, lineColor: color[x], color:color[x]});
    
    dataPointObject.xVal++;
    // if(dataPointObject.summit_warren.dps.length>5){
    //     dataPointObject.summit_warren.dps.shift();
    // }
    console.log(dataPointObject.summit_warren.dps.length)
    chart.render();
}

setInterval(function(){updateChart()},1000);

function getSignalIndex(signals, signal_number){
    var index;
    for(var i = 0; i<signals.length; i++){
        for(var j = 0; j< signals[i].length; j++){
            if(signals[i][j] === signal_number){
                index = i;
            }
        }
    }
    return index;
}

// { x: 10, y: 71 },
// { x: 20, y: 55 },
// { x: 30, y: 50 ,lineColor: "green", color: "green",},
// { x: 40, y: 65 },
// { x: 50, y: 68 },
// { x: 60, y: 28 },
// { x: 70, y: 34 },
// { x: 80, y: 14 },
// { x: 90, y: 23 }