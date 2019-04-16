import {fetchData} from './fetchData.js';
// import {drawCircle} from './canvas.js';
import SignalAreas from './SignalAreas.js';

var Summit_Warren;
var Norfolk_Warren;
var Lock_Warren;
var First_Street_West_Market;
var WestMarket_Warren;
var vectorSource;
var vectorLayer;
var signal_phases;
var SIGNAL_COLORS = [];
var features = {};

var url = ["http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Summit_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Lock_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Norfolk_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=First_WestMarket",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=WestMarket_Warren"
        ];

// Available Signals
const summit_warren_signals = [2,4,6];
const lock_warren_signals = [2,4,6,8];
const norfolk_warren_signals = [2,4,6,8];
const first_street_west_market_signals = [2,3,6,7];
const west_market_warren_signals = [2,3,4];

// source file that holds the features, which are added below
vectorSource = new ol.source.Vector({
    projection: 'EPSG:3857'
});

// adding the vector source to vector layer
vectorLayer = new ol.layer.Vector({
    source: vectorSource
});


// Street signal lon lats
Summit_Warren = {
    2:ol.proj.fromLonLat([-74.178686, 40.741117]),
    4:ol.proj.fromLonLat([-74.178671,40.741037]), // ^ // ->
    6:ol.proj.fromLonLat([-74.178571, 40.741077]), // <-
};

Lock_Warren = {
    2: ol.proj.fromLonLat([-74.181362,40.742087]), // v
    4: ol.proj.fromLonLat([-74.181265,40.741980]), // <- 
    6: ol.proj.fromLonLat([-74.181408, 40.741951]), // ^
    8: ol.proj.fromLonLat([-74.181472,40.742045]) // ->
}

Norfolk_Warren = {
    2: ol.proj.fromLonLat([-74.184492, 40.743106]), // V 
    4: ol.proj.fromLonLat([-74.184601, 40.743077]), // ->
    6: ol.proj.fromLonLat([-74.184546, 40.742997]),
    8: ol.proj.fromLonLat([-74.184422, 40.743028])
}

First_Street_West_Market = {
    2: ol.proj.fromLonLat([-74.189742,40.745560]),
    3: ol.proj.fromLonLat([-74.1898592,40.745531]),
    6: ol.proj.fromLonLat([-74.189798, 40.745397]),
    7: ol.proj.fromLonLat([-74.189689, 40.745424])
}

WestMarket_Warren = {
    2: ol.proj.fromLonLat([-74.187835, 40.744200]), // incoming from top
    3: ol.proj.fromLonLat([-74.187584, 40.744114]), // incoming from right
    4: ol.proj.fromLonLat([-74.187378, 40.743888]) // incoming from bottom
}

var summitWStreet = new SignalAreas("summit_warren", summit_warren_signals, Summit_Warren)
var lockWStreet = new SignalAreas("lock_warren", lock_warren_signals, Lock_Warren)
var norfolWStreet = new SignalAreas( "norfolk_warren", norfolk_warren_signals, Norfolk_Warren)
var firstStreetWestMarket = new SignalAreas("first_street_west_market", first_street_west_market_signals, First_Street_West_Market);
var westMarketWarren = new SignalAreas("west_market_warren", west_market_warren_signals, WestMarket_Warren);

// signal colors 
// index    color
// 0        gree
// 1        yellow
// 2        red
SIGNAL_COLORS[0] = new ol.style.Style({
    fill: new ol.style.Fill({
        color:'rgba(124,252,0)' 
    })
})

SIGNAL_COLORS[1] = new ol.style.Style({
    fill: new ol.style.Fill({
        color:'rgba(255,255,0)' 
    })
})

SIGNAL_COLORS[2] = new ol.style.Style({
    fill: new ol.style.Fill({
        color:'rgba(242, 38, 19)' 
    })
})

// NJIT -74.181345,40.742047
function initMap(){
    var center = ol.proj.fromLonLat([-74.187815, 40.744200]);
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }), vectorLayer
        ],
        view: new ol.View({
            center: center,
            zoom: 18
        })
    });
    return map;
}

function LayDataOnMap(){
    vectorSource.clear();
    features = {};
    createNewFeatures(features);
    addColorToFeatures(features);
    addFeaturesToVectorSource(features);
}

function createNewFeatures(features){
    summitWStreet.createNewIconFeature(features);
    lockWStreet.createNewIconFeature(features);
    norfolWStreet.createNewIconFeature(features);   
    firstStreetWestMarket.createNewIconFeature(features);
    westMarketWarren.createNewIconFeature(features);
}


function addColorToFeatures(features){
    summitWStreet.addColorToFeatures(features, signal_phases[0], SIGNAL_COLORS);
    lockWStreet.addColorToFeatures(features, signal_phases[1],SIGNAL_COLORS);
    norfolWStreet.addColorToFeatures(features, signal_phases[2], SIGNAL_COLORS);
    firstStreetWestMarket.addColorToFeatures(features, signal_phases[3], SIGNAL_COLORS);
    westMarketWarren.addColorToFeatures(features, signal_phases[4], SIGNAL_COLORS);
}

function addFeaturesToVectorSource(features){
    addFeatureToVectorSource(summitWStreet, features);
    addFeatureToVectorSource(lockWStreet, features);
    addFeatureToVectorSource(norfolWStreet, features);
    addFeatureToVectorSource(firstStreetWestMarket, features);
    addFeatureToVectorSource(westMarketWarren, features);
}

function addFeatureToVectorSource(signalAreaObj, features){
    for(var i in signalAreaObj.signalPositions){
        vectorSource.addFeature(features[signalAreaObj.streetName+signalAreaObj.signalPositions[i]]);
    }
    return features;
}

function repeatingLoop(){
    signal_phases = []
    signal_phases = fetchData(url);
    // summit_remaining_time = tempObj['signal_remaining_time'];
    // console.log(summit_re)
    LayDataOnMap();
    setTimeout(repeatingLoop,1000);
}


function main(){
    initMap();
    repeatingLoop();
}

main();