import {signal_phases} from "./map.js";

var chart;
var run;
var loop;

var dataPointObject = {
    xVal:0,
    university_raymond:{
        yVal:10,
        dps:[]
    },
    washington_raymond:{
        yVal:20,
        dps:[]
    },
    halsey_raymond:{
        yVal:30,
        dps:[]
    },
    broad_raymond:{
        yVal:40,
        dps:[]
    },
    commerce_raymond:{
        yVal:50,
        dps:[]
    },
    mulberry_raymond:{
        yVal:60,
        dps:[]
    },
    mccarter_raymond:{
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

function startLoop(){
    updateChart();
    if(run==true){
        loop = setTimeout(startLoop, 1000);
    }
}

export function breakRaymond(){
    run = false;
    chart.destroy();
    chart = null;
}

function updateChart(){
    var adjuster;

    var x = getSignalIndex(signal_phases[6],2);
    // adjuster = yAdjuster(x);
    dataPointObject.university_raymond.dps.push({x : dataPointObject.xVal, y : dataPointObject.university_raymond.yVal, lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[7],2);
    // adjuster = yAdjuster(x);
    dataPointObject.washington_raymond.dps.push({x:dataPointObject.xVal, y: dataPointObject.washington_raymond.yVal,  lineColor: color[x], color: color[x]});
    
    x = getSignalIndex(signal_phases[8],2);
    // adjuster = yAdjuster(x);
    dataPointObject.halsey_raymond.dps.push({x:dataPointObject.xVal, y:dataPointObject.halsey_raymond.yVal, lineColor: color[x], color: color[x]});

    x = getSignalIndex(signal_phases[9],2);
    // adjuster = yAdjuster(x);
    dataPointObject.broad_raymond.dps.push({x:dataPointObject.xVal,y:dataPointObject.broad_raymond.yVal, lineColor:color[x], color:color[x]});
    
    x = getSignalIndex(signal_phases[10],2);
    // adjuster = yAdjuster(x);
    dataPointObject.commerce_raymond.dps.push({x:dataPointObject.xVal, y: dataPointObject.commerce_raymond.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[11],6);
    // adjuster = yAdjuster(x);
    dataPointObject.mulberry_raymond.dps.push({x:dataPointObject.xVal, y: dataPointObject.mulberry_raymond.yVal, lineColor: color[x], color:color[x]});

    x = getSignalIndex(signal_phases[12],8);
    // adjuster = yAdjuster(x);
    dataPointObject.mccarter_raymond.dps.push({x:dataPointObject.xVal, y: dataPointObject.mccarter_raymond.yVal, lineColor: color[x], color:color[x]});

    
    dataPointObject.xVal++;
    if(dataPointObject.university_raymond.dps.length > 30){
        dataPointObject.university_raymond.dps.shift();
        dataPointObject.washington_raymond.dps.shift();
        dataPointObject.halsey_raymond.dps.shift();
        dataPointObject.broad_raymond.dps.shift();
        dataPointObject.commerce_raymond.dps.shift();
        dataPointObject.mulberry_raymond.dps.shift();
        dataPointObject.mccarter_raymond.dps.shift();
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