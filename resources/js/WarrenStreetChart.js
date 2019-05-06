import {signal_phases} from "./map.js";

var chart = null;
var run;
var loop;

var dataPointObject = {
    
    summit_warren:{
        xVal:0,
        yVal:10,
        dps:[]
    },
    lock_warren:{
        xVal:0,
        yVal:20,
        dps:[]
    },
    norfolk_warren:{
        xVal:0,
        yVal:30,
        dps:[]
    },
    hudson_warren:{
        xVal:0,
        yVal:40,
        dps:[]
    },
    west_market_warren:{
        xVal:0,
        yVal:50,
        dps:[]
    },
    west_market_first:{
        xVal:0,
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
        for(var x in dataPointObject){
            dataPointObject[x].dps = [];
            dataPointObject[x].xVal = 0;
        }
        chart.destroy();
        chart = null;
    }
}

export function breakWarren(){
    run = false;
}

function updateChart(){
    var x = getSignalIndex(signal_phases[0],6);
    dataPointObject.summit_warren.dps.push({x : dataPointObject.summit_warren.xVal, y : dataPointObject.summit_warren.yVal, lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[1],4);
    dataPointObject.lock_warren.dps.push({x:dataPointObject.lock_warren.xVal, y: dataPointObject.lock_warren.yVal,  lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[2],4);
    dataPointObject.norfolk_warren.dps.push({x:dataPointObject.norfolk_warren.xVal, y:dataPointObject.norfolk_warren.yVal, lineColor: color[x], color: color[x]});

    x = getSignalIndex(signal_phases[3],2);
    dataPointObject.hudson_warren.dps.push({x:dataPointObject.hudson_warren.xVal,y:dataPointObject.hudson_warren.yVal, lineColor:color[x], color:color[x]});
    
    x = getSignalIndex(signal_phases[4],2);
    dataPointObject.west_market_warren.dps.push({x:dataPointObject.west_market_warren.xVal, y: dataPointObject.west_market_warren.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[5],4);
    dataPointObject.west_market_first.dps.push({x:dataPointObject.west_market_first.xVal, y: dataPointObject.west_market_first.yVal, lineColor: color[x], color:color[x]});
    
    for(var x in dataPointObject){
        dataPointObject[x].xVal++;
    }
    
    if(dataPointObject.summit_warren.dps.length > 30){
        for(var x in dataPointObject){
            dataPointObject[x].dps.shift();
        }
    }
    chart.render();
}

function getSignalIndex(signals, signal_number){
    var index;
    for(var i = 0; i<signals.length; i++){
        if(signals[i] != null){
            for(var j = 0; j< signals[i].length; j++){
                if(signals[i][j] === signal_number){
                    index = i;
                }
            }
        }
    }
    return index;
}