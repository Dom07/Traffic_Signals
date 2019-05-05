import {signal_phases} from "./map.js";

var chart = null;
var run;
var loop;

var dataPointObject = {
    xVal:0,
    summit_warren:{
        yVal:10,
        dps:[]
    },
    lock_warren:{
        yVal:20,
        dps:[]
    },
    norfolk_warren:{
        yVal:30,
        dps:[]
    },
    hudson_warren:{
        yVal:40,
        dps:[]
    },
    west_market_warren:{
        yVal:50,
        dps:[]
    },
    west_market_first:{
        yVal:60,
        dps:[]
    }
};

var color=["green","orange","red"];
var lineThickness = 5;
var markerType = "none";

var streetName = {
    0: "0",
    10:"Summit_Warren",
    20:"Lock_Warren",
    30:"Norfolk_Warren",
    40:"Hudson_Warren",
    50:"West_Market_Warren",
    60:"West_Market_First_Street",
    70:"x"
};

export function createChartWarren(){
    run = true;
    console.log(chart);
    if(chart == null){
        chart = new CanvasJS.Chart("myChart", {
            title:{
                text: "Time Series"              
            },
            axisX:{
                title: "Time",
                interval:1,
                // maximum : 5,
                // minimum:0,
                // viewPortMinimum:0,
            },
            axisY:{
                title: "StreetNames",
                interval: 10,
                gridThickness : 0.1,
                labelFormatter: function(e){
                    return streetName[e.value]
                }
            },
            dataPointMaxWidth:0,
            data: [              
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.summit_warren.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.lock_warren.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.norfolk_warren.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.hudson_warren.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.west_market_warren.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.west_market_first.dps,
                }
            ]
        });
        chart.render();
        startLoop();
    }
}

function startLoop(){
    updateChart();
    if(run==true){
        loop = setTimeout(startLoop, 1000);
    }else{
        clearInterval(loop);
        dataPointObject.summit_warren.dps = []
        dataPointObject.lock_warren.dps = []
        dataPointObject.norfolk_warren.dps = []
        dataPointObject.hudson_warren.dps = []
        dataPointObject.west_market_warren.dps = []
        dataPointObject.west_market_first.dps = []
        chart.destroy();
        chart = null;
        dataPointObject.xVal = 0;
    }
}

export function breakWarren(){
    run = false;
}

function updateChart(){
    // var adjuster;
    var x = getSignalIndex(signal_phases[0],6);
    // adjuster = yAdjuster(x);
    dataPointObject.summit_warren.dps.push({x : dataPointObject.xVal, y : dataPointObject.summit_warren.yVal, lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[1],4);
    // adjuster = yAdjuster(x);
    dataPointObject.lock_warren.dps.push({x:dataPointObject.xVal, y: dataPointObject.lock_warren.yVal,  lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[2],4);
    // adjuster = yAdjuster(x);
    dataPointObject.norfolk_warren.dps.push({x:dataPointObject.xVal, y:dataPointObject.norfolk_warren.yVal, lineColor: color[x], color: color[x]});

    x = getSignalIndex(signal_phases[3],4);
    // adjuster = yAdjuster(x);
    dataPointObject.hudson_warren.dps.push({x:dataPointObject.xVal,y:dataPointObject.hudson_warren.yVal, lineColor:color[x], color:color[x]});
    
    x = getSignalIndex(signal_phases[4],4);
    // adjuster = yAdjuster(x);
    dataPointObject.west_market_warren.dps.push({x:dataPointObject.xVal, y: dataPointObject.west_market_warren.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[5],4);
    // adjuster = yAdjuster(x);
    dataPointObject.west_market_first.dps.push({x:dataPointObject.xVal, y: dataPointObject.west_market_first.yVal, lineColor: color[x], color:color[x]});
    
    dataPointObject.xVal++;
    if(dataPointObject.summit_warren.dps.length > 30){
        dataPointObject.summit_warren.dps.shift();
        dataPointObject.lock_warren.dps.shift();
        dataPointObject.norfolk_warren.dps.shift();
        dataPointObject.hudson_warren.dps.shift();
        dataPointObject.west_market_warren.dps.shift();
        dataPointObject.west_market_first.dps.shift();
    }
    chart.render();
}

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

function yAdjuster(x){
    var y;
    if(x==0){
        y = 3
    }else if(x==2){
        y = -3
    }else{
        y = 0
    }
    return y;
}