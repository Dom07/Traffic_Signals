import {fetchData} from './fetchData.js';
import SignalAreas from './SignalAreas.js';

var vectorSource;
var vectorLayer;
var signal_phases;
var SIGNAL_COLORS = [];
var features = {};

var url = ["http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Summit_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Lock_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Norfolk_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=First_WestMarket",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=WestMarket_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Hudson_Warren",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=University_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Washington_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Halsey_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Broad_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Commerce_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=Mullberry_Raymond",
            "http://transprod04.njit.edu/SignalIntersection/api/values/Get?FileName=McCarter_Raymond"
        ];

// Available Signals
const summit_warren_signals = [2,4,6];
const lock_warren_signals = [2,4,6,8];
const norfolk_warren_signals = [2,4,6,8];
const first_street_west_market_signals = [2,3,6,7];
const west_market_warren_signals = [2,3,4];
const hudson_warren_signals = [2,3,4];
const university_raymond_signals = [2,3,4];
const washington_raymond_signals  = [2,3,4];
const halsey_raymond_signals = [2,3,4];
const broad_raymond_signals = [2,3,4,5];
const commerce_raymond_signals = [2,6];
const mullberry_raymond_signals = [2,4,6,8];
const mccarter_raymond_signals = [2,4,6,8];

// source file that holds the features, which are added below
vectorSource = new ol.source.Vector({
    projection: 'EPSG:3857'
});

// adding the vector source to vector layer
vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

// Rotation radians
const summit_warren_rotation_angles = {
    2:  1.12,
    4:  0.6,
    6:  0.1
}

const lock_warren_rotation_angles = {
    2:  1.6,
    4:  0.1,
    6:  0.5,
    8:  1.1
}

const norfolk_warren_rotation_angles = {
    2: 1.6,
    4: 1.1,
    6: 0.6,
    8: 0.1
}

// 
// Street signal lon lats
const Summit_Warren = {
    2:ol.proj.fromLonLat([-74.178686, 40.741117]), // incoming from left
    4:ol.proj.fromLonLat([-74.178671,40.741037]), // incoming from bottom
    6:ol.proj.fromLonLat([-74.178571, 40.741077]), // incoming from right
};

const Lock_Warren = {
    2: ol.proj.fromLonLat([-74.181362,40.742087]), // incoming from top
    4: ol.proj.fromLonLat([-74.181265,40.741980]), // incoming from right
    6: ol.proj.fromLonLat([-74.181408, 40.741951]), // incoming from bottom
    8: ol.proj.fromLonLat([-74.181472,40.742045]) // incoming from left
}

const Norfolk_Warren = {
    2: ol.proj.fromLonLat([-74.184492, 40.743106]), // incoming from top
    4: ol.proj.fromLonLat([-74.184601, 40.743077]), // incoming from left
    6: ol.proj.fromLonLat([-74.184546, 40.742997]), // incoming from bottom
    8: ol.proj.fromLonLat([-74.184422, 40.743028])  // incoming from right
}

const First_Street_West_Market = {
    2: ol.proj.fromLonLat([-74.189742,40.745560]),
    3: ol.proj.fromLonLat([-74.1898592,40.745531]),
    6: ol.proj.fromLonLat([-74.189798, 40.745397]),
    7: ol.proj.fromLonLat([-74.189689, 40.745424])
}

const WestMarket_Warren = {
    2: ol.proj.fromLonLat([-74.187835, 40.744200]), // incoming from top
    3: ol.proj.fromLonLat([-74.187584, 40.744114]), // incoming from right
    4: ol.proj.fromLonLat([-74.187378, 40.743888]) // incoming from bottom
}

const Hudson_Warren = {
    2: ol.proj.fromLonLat([-74.186172, 40.743599]), // incoming from right
    3: ol.proj.fromLonLat([-74.186329, 40.743652]), // incming from left
    4: ol.proj.fromLonLat([-74.186281, 40.743558]) // incoming from bottom
}

const University_Raymond = {
    2: ol.proj.fromLonLat([-74.175305, 40.738738]), // incoming from right
    3: ol.proj.fromLonLat([-74.175475, 40.738788]), // incoming from left
    4: ol.proj.fromLonLat([ -74.175346, 40.738866]) // incoming from top
}

const Washington_Raymond = {
    2: ol.proj.fromLonLat([-74.173726, 40.738241]),
    3: ol.proj.fromLonLat([-74.173898, 40.738290]),
    4: ol.proj.fromLonLat([-74.173867, 40.738174])
}

const Halsey_Raymond = {
    2: ol.proj.fromLonLat([-74.172584, 40.737908]),
    3: ol.proj.fromLonLat([-74.172718, 40.737946]),
    4: ol.proj.fromLonLat([-74.172605, 40.737983])
}

const Broad_Raymond = {
    2: ol.proj.fromLonLat([-74.170743, 40.737423]), // incoming from right
    3: ol.proj.fromLonLat([-74.171124, 40.737480]), // incoming from left
    4: ol.proj.fromLonLat([-74.170990, 40.737522]),
    5: ol.proj.fromLonLat([-74.171062, 40.737398])
}

const Commerce_Raymond = {
    2: ol.proj.fromLonLat([-74.169775, 40.737152]),
    6: ol.proj.fromLonLat([-74.169630, 40.737107])
}

const Mullberry_Raymond = {
    2: ol.proj.fromLonLat([-74.168008, 40.736618]),
    4: ol.proj.fromLonLat([-74.168031, 40.736725]),
    6: ol.proj.fromLonLat([-74.168147, 40.736658]),
    8: ol.proj.fromLonLat([-74.168114, 40.736575])
}

const McCarter_Raymond = {
    2: ol.proj.fromLonLat([-74.165857, 40.735859]),
    4: ol.proj.fromLonLat([-74.165719, 40.735878]),
    6: ol.proj.fromLonLat([-74.165805, 40.736034]),
    8: ol.proj.fromLonLat([-74.165928, 40.735953])
}

var summitWStreet = new SignalAreas("summit_warren", summit_warren_signals, Summit_Warren, summit_warren_rotation_angles)
var lockWStreet = new SignalAreas("lock_warren", lock_warren_signals, Lock_Warren, lock_warren_rotation_angles)
var norfolWStreet = new SignalAreas( "norfolk_warren", norfolk_warren_signals, Norfolk_Warren, norfolk_warren_rotation_angles)
// var firstStreetWestMarket = new SignalAreas("first_street_west_market", first_street_west_market_signals, First_Street_West_Market);
// var westMarketWarren = new SignalAreas("west_market_warren", west_market_warren_signals, WestMarket_Warren);
// var hudsonWarren = new SignalAreas("hudson_warren", hudson_warren_signals, Hudson_Warren);
// var universityRaymond = new SignalAreas("university_raymond", university_raymond_signals, University_Raymond);
// var washingtonRaymond = new SignalAreas("washington_raymond", washington_raymond_signals, Washington_Raymond);
// var halseyRaymond = new SignalAreas("halsey_raymond", halsey_raymond_signals, Halsey_Raymond);
// var broadRaymond = new SignalAreas("broad_raymond", broad_raymond_signals, Broad_Raymond);
// var commerceRaymond = new SignalAreas("commerce_raymond", commerce_raymond_signals, Commerce_Raymond);
// var mullberryRaymond = new SignalAreas("mullberry_raymond", mullberry_raymond_signals, Mullberry_Raymond);
// var mccarterRaymond = new SignalAreas("mccarter_raymond",mccarter_raymond_signals, McCarter_Raymond);
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
    var center = ol.proj.fromLonLat([-74.181345,40.742047]);
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
    // firstStreetWestMarket.createNewIconFeature(features);
    // westMarketWarren.createNewIconFeature(features);
    // hudsonWarren.createNewIconFeature(features);
    // universityRaymond.createNewIconFeature(features);
    // washingtonRaymond.createNewIconFeature(features);
    // halseyRaymond.createNewIconFeature(features);
    // broadRaymond.createNewIconFeature(features);
    // commerceRaymond.createNewIconFeature(features);
    // mullberryRaymond.createNewIconFeature(features);
    // mccarterRaymond.createNewIconFeature(features);
}

function addColorToFeatures(features){
    summitWStreet.addColorToFeatures(features, signal_phases[0], SIGNAL_COLORS);
    lockWStreet.addColorToFeatures(features, signal_phases[1],SIGNAL_COLORS);
    norfolWStreet.addColorToFeatures(features, signal_phases[2], SIGNAL_COLORS);
    // firstStreetWestMarket.addColorToFeatures(features, signal_phases[3], SIGNAL_COLORS);
    // westMarketWarren.addColorToFeatures(features, signal_phases[4], SIGNAL_COLORS);
    // hudsonWarren.addColorToFeatures(features, signal_phases[5], SIGNAL_COLORS);
    // universityRaymond.addColorToFeatures(features, signal_phases[6], SIGNAL_COLORS);
    // washingtonRaymond.addColorToFeatures(features, signal_phases[7], SIGNAL_COLORS);
    // halseyRaymond.addColorToFeatures(features, signal_phases[8], SIGNAL_COLORS);
    // broadRaymond.addColorToFeatures(features, signal_phases[9], SIGNAL_COLORS);
    // commerceRaymond.addColorToFeatures(features, signal_phases[10], SIGNAL_COLORS);
    // mullberryRaymond.addColorToFeatures(features, signal_phases[11], SIGNAL_COLORS);
    // mccarterRaymond.addColorToFeatures(features, signal_phases[12],SIGNAL_COLORS);
}

function addFeaturesToVectorSource(features){
    addFeatureToVectorSource(summitWStreet, features);
    addFeatureToVectorSource(lockWStreet, features);
    addFeatureToVectorSource(norfolWStreet, features);
    // addFeatureToVectorSource(firstStreetWestMarket, features);
    // addFeatureToVectorSource(westMarketWarren, features);
    // addFeatureToVectorSource(hudsonWarren, features);
    // addFeatureToVectorSource(universityRaymond, features);
    // addFeatureToVectorSource(washingtonRaymond, features);
    // addFeatureToVectorSource(halseyRaymond, features);
    // addFeatureToVectorSource(broadRaymond, features);
    // addFeatureToVectorSource(commerceRaymond, features);
    // addFeatureToVectorSource(mullberryRaymond, features);
    // addFeatureToVectorSource(mccarterRaymond, features);
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