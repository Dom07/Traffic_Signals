import {signal_phases} from "./map.js";

var chart = null;
var run;
var loop;

var dataPointObject = {
    
    university_raymond:{
        xVal:0,
        yVal:10,
        dps:[]
    },
    washington_raymond:{
        xVal:0,
        yVal:20,
        dps:[]
    },
    halsey_raymond:{
        xVal:0,
        yVal:30,
        dps:[]
    },
    broad_raymond:{
        xVal:0,
        yVal:40,
        dps:[]
    },
    commerce_raymond:{
        xVal:0,
        yVal:50,
        dps:[]
    },
    mulberry_raymond:{
        xVal:0,
        yVal:60,
        dps:[]
    },
    mccarter_raymond:{
        xVal:0,
        yVal:70,
        dps:[]
    }
};

var color=["green","orange","red"];
var lineThickness = 5;
var markerType = "none";

var streetName = {
    0: "0",
    10:"University Raymond",
    20:"Washington Raymond",
    30:"Halsey Raymond",
    40:"Broad Raymond",
    50:"Commerce Raymond",
    60:"Mulberry Raymond",
    70:"Mccarter Raymond",
    80:""
};

export function createChartRaymond(){
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
                },
                maximum:80
            },
            dataPointMaxWidth:0,
            data: [              
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.university_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.washington_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.halsey_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.broad_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.commerce_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.mulberry_raymond.dps,
                },
                {   
                    lineThickness: lineThickness,
                    markerType: markerType,
                    type: "line",
                    dataPoints: dataPointObject.mccarter_raymond.dps,
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

export function breakRaymond(){
    run = false;
}

function updateChart(){

    var x = getSignalIndex(signal_phases[6],2);
    dataPointObject.university_raymond.dps.push({x : dataPointObject.university_raymond.xVal, y : dataPointObject.university_raymond.yVal, lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[7],2);
    dataPointObject.washington_raymond.dps.push({x:dataPointObject.washington_raymond.xVal, y: dataPointObject.washington_raymond.yVal,  lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[8],2);
    dataPointObject.halsey_raymond.dps.push({x:dataPointObject.halsey_raymond.xVal, y:dataPointObject.halsey_raymond.yVal, lineColor: color[x], color: color[x]});

    x = getSignalIndex(signal_phases[9],2);
    dataPointObject.broad_raymond.dps.push({x:dataPointObject.broad_raymond.xVal,y:dataPointObject.broad_raymond.yVal, lineColor:color[x], color:color[x]});
    
    x = getSignalIndex(signal_phases[10],2);
    dataPointObject.commerce_raymond.dps.push({x:dataPointObject.commerce_raymond.xVal, y: dataPointObject.commerce_raymond.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[11],6);
    dataPointObject.mulberry_raymond.dps.push({x:dataPointObject.mulberry_raymond.xVal, y: dataPointObject.mulberry_raymond.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[12],8);
    dataPointObject.mccarter_raymond.dps.push({x:dataPointObject.mccarter_raymond.xVal, y: dataPointObject.mccarter_raymond.yVal, lineColor: color[x], color:color[x]});

    for(var x in dataPointObject){
        dataPointObject[x].xVal++;
    }
    if(dataPointObject.university_raymond.dps.length > 30){
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