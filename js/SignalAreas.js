import SignalCanvas from "./canvas.js";

export default class SignalAreas{
    constructor(streetName, signalPositions, lonLatMapping){
        this.canvasHolder = {};
        this.style;
        this.streetName = streetName;
        this.signalPositions = signalPositions;
        this.lonLatMapping = lonLatMapping;
        for(var i in this.signalPositions){
            this.canvasHolder[this.signalPositions[i]] = new SignalCanvas(this.streetName+this.signalPositions[i])
        }
    }   

    getStreetName(){
        return this.streetName;
    }

    getsignalPosition(){
        return this.signalPositions;
    }

    getLonLatMapping(){
        return this.lonLatMapping;
    }

    // createNewFeature(features){
    //     for (var i in this.signalPositions){
    //         features[this.streetName+this.signalPositions[i]] = new ol.Feature(new ol.geom.Circle(this.lonLatMapping[this.signalPositions[i]] ,4));
    //     }
    //     return features;
    // }

    createNewIconFeature(features){
        for(var i in this.signalPositions){
            features[this.streetName+this.signalPositions[i]] = new ol.Feature({
                geometry : new ol.geom.Point(this.lonLatMapping[this.signalPositions[i]])
            })
        }
        return features;
    }

    addColorToFeatures(features, signals){
        var style, style2;
        if(this.getStreetName() === "summit_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] !==1 && signals[i][j] !==8){
                            this.canvasHolder[signals[i][j]].drawFullCircle(i);
                            style = this.createStyle(signals[i][j]);
                            features[this.streetName+signals[i][j]].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "lock_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] !==6 && signals[i][j] !==8){
                            this.canvasHolder[signals[i][j]].drawFullCircle(i);
                            style = this.createStyle(signals[i][j]);
                            features[this.streetName+signals[i][j]].setStyle(style)
                            if(signals[i][j]===2){
                                features[this.streetName+6].setStyle(style);
                            } else if(signals[i][j]===4){
                                features[this.streetName+8].setStyle(style);
                            }
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "norfolk_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] !==1 && signals[i][j] !==3 && signals[i][j] !== 5 && signals[i][j] !==6 && signals[i][j] !== 7 && signals[i][j] !==8){
                            this.canvasHolder[signals[i][j]].drawFullCircle(i);
                            style = this.createStyle(signals[i][j])
                            features[this.streetName+signals[i][j]].setStyle(style)
                            if(signals[i][j]===4){
                                features[this.streetName+8].setStyle(style);
                            }else if(signals[i][j]===2){
                                features[this.streetName+6].setStyle(style);    
                            }
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "first_street_west_market"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2 || signals[i][j] === 6){
                            this.canvasHolder[2].drawFullCircle(i);
                            this.canvasHolder[6].drawFullCircle(i);
                            style = this.createStyle(2);
                            style2 = this.createStyle(6);
                            features[this.streetName+2].setStyle(style);
                            features[this.streetName+6].setStyle(style2);
                        } else if(signals[i][j] === 3){
                            this.canvasHolder[signals[i][j]].drawRightDiagOfCircle(i);
                            style = this.createStyle(signals[i][j]);
                            features[this.streetName+signals[i][j]].setStyle(style);
                        }else if(signals[i][j] === 7){
                            this.canvasHolder[signals[i][j]].drawLeftDiagOfCircle(i);
                            style = this.createStyle(signals[i][j]);
                            features[this.streetName+signals[i][j]].setStyle(style);
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[3].drawLeftDiagOfCircle(i);
                            this.canvasHolder[7].drawRightDiagOfCircle(i);
                            style = this.createStyle(3);
                            style2 = this.createStyle(7); 
                            features[this.streetName+3].setStyle(style);
                            features[this.streetName+7].setStyle(style2);
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "west_market_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawRightDiagOfCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[2].drawLeftDiagOfCircle(i)
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(4)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+4].setStyle(style2)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "hudson_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "university_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "washington_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "halsey_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "broad_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            this.canvasHolder[3].drawFullCircle(i)
                            style = this.createStyle(2)
                            style2 = this.createStyle(3)
                            features[this.streetName+2].setStyle(style)
                            features[this.streetName+3].setStyle(style2)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            this.canvasHolder[5].drawFullCircle(i)
                            style = this.createStyle(4)
                            style2 = this.createStyle(5)
                            features[this.streetName+4].setStyle(style)
                            features[this.streetName+5].setStyle(style2)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "commerce_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawFullCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 1){
                            this.canvasHolder[6].drawLeftDiagOfCircle(i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }else if(signals[i][j] === 6){
                            this.canvasHolder[6].drawRightDiagOfCircle(i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "mullberry_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawRightDiagOfCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 3){
                            this.canvasHolder[8].drawLeftHalfOfCircle(i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }else if(signals[i][j] === 5){
                            this.canvasHolder[2].drawLeftDiagOfCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 6){
                            this.canvasHolder[6].drawFullCircle(i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }else if(signals[i][j] === 8){
                            this.canvasHolder[8].drawRightHalfOfCircle(i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "mccarter_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            this.canvasHolder[2].drawRightHalfOfCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 3){
                            this.canvasHolder[8].drawLeftDiagOfCircle(i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[4].drawFullCircle(i)
                            style = this.createStyle(4)
                            features[this.streetName+4].setStyle(style)
                        }else if(signals[i][j] === 5){
                            this.canvasHolder[2].drawLeftHalfOfCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 6){
                            this.canvasHolder[6].drawLeftHalfOfCircle(i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }else if(signals[i][j] === 1){
                            this.canvasHolder[6].drawRightHalfOfCircle(i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }else if(signals[i][j] === 8){
                            this.canvasHolder[8].drawLeftDiagOfCircle(i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }
                    }
                }
            }
        }else{
            console.log("LOL")
        }
        return features;
    }

    createStyle(cvsPos){
        this.style = new ol.style.Style({
            image: new ol.style.Icon({
                img: this.canvasHolder[cvsPos].getCanvas(),
                anchor: [0.5, 80],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixel',
                imgSize: [300, 300],
                scale: 0.7
            })
        });
        return this.style;
    }
}