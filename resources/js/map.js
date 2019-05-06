import {fetchData} from './fetchData.js';
import SignalAreas from './SignalAreas.js';
import {createChartRaymond, breakRaymond} from './RaymondStreetChart.js';
import {createChartWarren, breakWarren} from './WarrenStreetChart.js';

var vectorSource;
var vectorLayer;
export var signal_phases;
var features = {};
var line;

// Street-Signal mapping
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

// Rotation radians for loading arrow images
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

const first_street_west_market_rotation_angles = {
    2: 1.6,
    3: 0,
    6: 0.6,
    7: 0
}

const west_market_warren_rotation_angles = {
    2: 0.7, 
    3: 0.1, 
    4: 0.2, 
    // 5: 1.2
}

const hudson_warren_rotation_angles = {
    2: 0.12, 
    3: 1.12,
    4: 0.6 
}

const university_raymond_rotation_angles = {
    2: 0.1, 
    3: 1.12, 
    4: 1.6 
}

const washington_raymond_rotation_angles = {
    2: 0.1, 
    3: 1.12,  
    4: 0.6  
}

const halsey_raymond_rotation_angles = {
    2: 0.1, 
    3: 1.12, 
    4: 1.6  
}

const broad_raymond_rotation_angles = {
    2: 0.1, 
    3: 1.12, 
    4: 1.6,  
    5: 0.6
}

const commerce_raymond_rotation_angles = {
    2: 1.12,
    6: 0
}

const mullberry_raymond_rotation_angles = {
    2: 0,
    4: 1.7,
    6: 1.12,
    8: 0
}

const mccarter_raymond_rotation_angles = {
    2: 0,
    4: 0.1,
    6: 0,
    8: 0
}

// Street signal lon lats
const Summit_Warren_Coordinates = {
    2:ol.proj.fromLonLat([-74.178686, 40.741117]), // incoming from left
    4:ol.proj.fromLonLat([-74.178671,40.741037]), // incoming from bottom
    6:ol.proj.fromLonLat([-74.178571, 40.741077]), // incoming from right
};

const Lock_Warren_Coordinates = {
    2: ol.proj.fromLonLat([-74.181362,40.742087]), // incoming from top
    4: ol.proj.fromLonLat([-74.181265,40.741980]), // incoming from right
    6: ol.proj.fromLonLat([-74.181408, 40.741951]), // incoming from bottom
    8: ol.proj.fromLonLat([-74.181472,40.742045]) // incoming from left
}

const Norfolk_Warren_Coordinates = {
    2: ol.proj.fromLonLat([-74.184492, 40.743106]), // incoming from top
    4: ol.proj.fromLonLat([-74.184601, 40.743077]), // incoming from left
    6: ol.proj.fromLonLat([-74.184546, 40.742997]), // incoming from bottom
    8: ol.proj.fromLonLat([-74.184422, 40.743028])  // incoming from right
}

const First_Street_West_Market_Coordinates = {
    2: ol.proj.fromLonLat([-74.189742,40.745560]),
    3: ol.proj.fromLonLat([-74.1898592,40.745531]),
    6: ol.proj.fromLonLat([-74.189798, 40.745397]),
    7: ol.proj.fromLonLat([-74.189689, 40.745424])
}

const WestMarket_Warren_Coordinates = {
    2: ol.proj.fromLonLat([-74.187882, 40.744230]), // incoming from top
    3: ol.proj.fromLonLat([-74.187584, 40.744114]), // incoming from right
    4: ol.proj.fromLonLat([-74.187378, 40.743888]), // incoming from bottom
    5: ol.proj.fromLonLat([-74.187835, 40.744180])
}

const Hudson_Warren_Coordinates = {
    2: ol.proj.fromLonLat([-74.186172, 40.743599]), // incoming from right
    3: ol.proj.fromLonLat([-74.186329, 40.743652]), // incming from left
    4: ol.proj.fromLonLat([-74.186281, 40.743558]) // incoming from bottom
}

const University_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.175305, 40.738738]), // incoming from right
    3: ol.proj.fromLonLat([-74.175475, 40.738788]), // incoming from left
    4: ol.proj.fromLonLat([ -74.175346, 40.738866]) // incoming from top
}

const Washington_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.173726, 40.738241]),
    3: ol.proj.fromLonLat([-74.173898, 40.738290]),
    4: ol.proj.fromLonLat([-74.173867, 40.738174])
}

const Halsey_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.172584, 40.737908]),
    3: ol.proj.fromLonLat([-74.172718, 40.737946]),
    4: ol.proj.fromLonLat([-74.172605, 40.737983])
}

const Broad_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.170743, 40.737423]), // incoming from right
    3: ol.proj.fromLonLat([-74.171124, 40.737480]), // incoming from left
    4: ol.proj.fromLonLat([-74.170990, 40.737522]),
    5: ol.proj.fromLonLat([-74.171062, 40.737398])
}

const Commerce_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.169775, 40.737152]),
    6: ol.proj.fromLonLat([-74.169630, 40.737107])
}

const Mullberry_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.168008, 40.736618]),
    4: ol.proj.fromLonLat([-74.168031, 40.736725]),
    6: ol.proj.fromLonLat([-74.168147, 40.736658]),
    8: ol.proj.fromLonLat([-74.168114, 40.736575])
}

const McCarter_Raymond_Coordinates = {
    2: ol.proj.fromLonLat([-74.165857, 40.735859]),
    4: ol.proj.fromLonLat([-74.165719, 40.735878]),
    6: ol.proj.fromLonLat([-74.165805, 40.736034]),
    8: ol.proj.fromLonLat([-74.165928, 40.735953])
}

const warrenStreetPath = new Array(
    Summit_Warren_Coordinates[6],Lock_Warren_Coordinates[4],Norfolk_Warren_Coordinates[4],
    Hudson_Warren_Coordinates[2],WestMarket_Warren_Coordinates[5],First_Street_West_Market_Coordinates[3]
);

const raymondStreetPath = new Array(
    University_Raymond_Coordinates[3], Washington_Raymond_Coordinates[2], Halsey_Raymond_Coordinates[2], Broad_Raymond_Coordinates[2], 
    Commerce_Raymond_Coordinates[2], Mullberry_Raymond_Coordinates[2], McCarter_Raymond_Coordinates[4]
);


// Creating Objects for each intersection
var summitWStreet = new SignalAreas("summit_warren", summit_warren_signals, Summit_Warren_Coordinates, summit_warren_rotation_angles)
var lockWStreet = new SignalAreas("lock_warren", lock_warren_signals, Lock_Warren_Coordinates, lock_warren_rotation_angles)
var norfolWStreet = new SignalAreas( "norfolk_warren", norfolk_warren_signals, Norfolk_Warren_Coordinates, norfolk_warren_rotation_angles)
var firstStreetWestMarket = new SignalAreas("first_street_west_market", first_street_west_market_signals, First_Street_West_Market_Coordinates, first_street_west_market_rotation_angles);
var westMarketWarren = new SignalAreas("west_market_warren", west_market_warren_signals, WestMarket_Warren_Coordinates, west_market_warren_rotation_angles);
var hudsonWarren = new SignalAreas("hudson_warren", hudson_warren_signals, Hudson_Warren_Coordinates, hudson_warren_rotation_angles);
var universityRaymond = new SignalAreas("university_raymond", university_raymond_signals, University_Raymond_Coordinates, university_raymond_rotation_angles);
var washingtonRaymond = new SignalAreas("washington_raymond", washington_raymond_signals, Washington_Raymond_Coordinates, washington_raymond_rotation_angles);
var halseyRaymond = new SignalAreas("halsey_raymond", halsey_raymond_signals, Halsey_Raymond_Coordinates, halsey_raymond_rotation_angles);
var broadRaymond = new SignalAreas("broad_raymond", broad_raymond_signals, Broad_Raymond_Coordinates, broad_raymond_rotation_angles);
var commerceRaymond = new SignalAreas("commerce_raymond", commerce_raymond_signals, Commerce_Raymond_Coordinates, commerce_raymond_rotation_angles);
var mullberryRaymond = new SignalAreas("mullberry_raymond", mullberry_raymond_signals, Mullberry_Raymond_Coordinates, mullberry_raymond_rotation_angles);
var mccarterRaymond = new SignalAreas("mccarter_raymond",mccarter_raymond_signals, McCarter_Raymond_Coordinates, mccarter_raymond_rotation_angles);

// NJIT Co-ordinate reference -> -74.181345,40.742047
// Map initialization
function initMap(){
    var center = ol.proj.fromLonLat([-74.175475, 40.738788]);
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }), vectorLayer
        ],
        view: new ol.View({
            center: center,
            zoom: 16
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
    if(line!==undefined){
        vectorSource.addFeature(line);
    }
}

function createNewFeatures(features){
    summitWStreet.createNewIconFeature(features);
    lockWStreet.createNewIconFeature(features);
    norfolWStreet.createNewIconFeature(features);   
    firstStreetWestMarket.createNewIconFeature(features);
    westMarketWarren.createNewIconFeature(features);
    hudsonWarren.createNewIconFeature(features);
    universityRaymond.createNewIconFeature(features);
    washingtonRaymond.createNewIconFeature(features);
    halseyRaymond.createNewIconFeature(features);
    broadRaymond.createNewIconFeature(features);
    commerceRaymond.createNewIconFeature(features);
    mullberryRaymond.createNewIconFeature(features);
    mccarterRaymond.createNewIconFeature(features);
}

function addColorToFeatures(features){
    summitWStreet.addColorToFeatures(features, signal_phases[0]);
    lockWStreet.addColorToFeatures(features, signal_phases[1]);
    norfolWStreet.addColorToFeatures(features, signal_phases[2]);
    firstStreetWestMarket.addColorToFeatures(features, signal_phases[3]);
    westMarketWarren.addColorToFeatures(features, signal_phases[4]);
    hudsonWarren.addColorToFeatures(features, signal_phases[5]);
    universityRaymond.addColorToFeatures(features, signal_phases[6]);
    washingtonRaymond.addColorToFeatures(features, signal_phases[7]);
    halseyRaymond.addColorToFeatures(features, signal_phases[8]);
    broadRaymond.addColorToFeatures(features, signal_phases[9]);
    commerceRaymond.addColorToFeatures(features, signal_phases[10]);
    mullberryRaymond.addColorToFeatures(features, signal_phases[11]);
    mccarterRaymond.addColorToFeatures(features, signal_phases[12]);
}

function addFeaturesToVectorSource(features){
    addFeatureToVectorSource(summitWStreet, features);
    addFeatureToVectorSource(lockWStreet, features);
    addFeatureToVectorSource(norfolWStreet, features);
    addFeatureToVectorSource(firstStreetWestMarket, features);
    addFeatureToVectorSource(westMarketWarren, features);
    addFeatureToVectorSource(hudsonWarren, features);
    addFeatureToVectorSource(universityRaymond, features);
    addFeatureToVectorSource(washingtonRaymond, features);
    addFeatureToVectorSource(halseyRaymond, features);
    addFeatureToVectorSource(broadRaymond, features);
    addFeatureToVectorSource(commerceRaymond, features);
    addFeatureToVectorSource(mullberryRaymond, features);
    addFeatureToVectorSource(mccarterRaymond, features);
}

function addFeatureToVectorSource(signalAreaObj, features){
    for(var i in signalAreaObj.signalPositions){
        vectorSource.addFeature(features[signalAreaObj.streetName+signalAreaObj.signalPositions[i]]);
    }
    return features;
}

// Dynamically adding click event to radio button
function addEventToRadioButtons(){
    var radio = document.getElementById('warren');
    radio.onclick = function(){
        createPath(0)
    }
    radio = document.getElementById('raymond');
    radio.onclick = function(){
        createPath(1)
    }
    radio = document.getElementById('none');
    radio.onclick = function(){
        createPath(2)
    }
}

// method that responds to click event on radio buttons
// This method is not stable yet, still working on it
function createPath(pathValue){
    var style = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color:'#3399ff',
            width: 10
        })
    })
    
    if(pathValue == 0){
        line = new ol.Feature({
            geometry: new ol.geom.LineString(warrenStreetPath),
        });
        createChartWarren();
        // breakRaymond();    
    }else if(pathValue == 1){
        line = new ol.Feature({
            geometry: new ol.geom.LineString(raymondStreetPath),
        });
        // breakWarren();
        createChartRaymond();
    }else if(pathValue == 2){
        line = undefined;
        breakRaymond();
        breakWarren();
    }
    if(line!== undefined){
        line.setStyle(style);
    }
}

// Method that reloads data every second on the map
function startLoop(){
    signal_phases = []
    signal_phases = fetchData();
    LayDataOnMap();
    setTimeout(startLoop,1000);
}

function main(){
    initMap();
    addEventToRadioButtons();
    startLoop();
}

main();