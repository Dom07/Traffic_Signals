import SignalCanvas from "./canvas.js";

export default class SignalAreas{
    constructor(streetName, signalPositions, lonLatMapping, rotationAngle){
        this.canvasHolder = {};
        this.style;
        this.streetName = streetName;
        this.signalPositions = signalPositions;
        this.lonLatMapping = lonLatMapping;
        this.SignalColorImages = ["/resources/images/green_straight.png","/resources/images/yellow_straight.png","/resources/images/red_straight.png"]
        this.SignalColorImagesWithLeft = ["/resources/images/green_straight_left.png","/resources/images/yellow_straight_left.png","/resources/images/red_straight_left.png"]
        this.SignalColorImagesOnlyLeft = ["/resources/images/green_left.png","/resources/images/yellow_left.png","/resources/images/red_left.png"]
        this.radians = rotationAngle;
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
                            style = this.createImageStyle(this.SignalColorImages[i], signals[i][j]);
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
                            // this.canvasHolder[signals[i][j]].drawFullCircle(i);
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], signals[i][j]);
                            features[this.streetName+signals[i][j]].setStyle(style)
                            if(signals[i][j]===2){
                                style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 6)
                                features[this.streetName+6].setStyle(style);
                            } else if(signals[i][j]===4){
                                style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 8)
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
                            // this.canvasHolder[signals[i][j]].drawFullCircle(i);
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], signals[i][j])
                            features[this.streetName+signals[i][j]].setStyle(style)
                            if(signals[i][j]===4){
                                style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 8)
                                features[this.streetName+8].setStyle(style);
                            }else if(signals[i][j]===2){
                                style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 6)
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
                            // this.canvasHolder[2].drawFullCircle(i);
                            // this.canvasHolder[6].drawFullCircle(i);
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i],2);
                            features[this.streetName+2].setStyle(style);
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i],6);
                            features[this.streetName+6].setStyle(style);
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
                            // this.canvasHolder[3].drawFullCircle(i)
                            // style = this.createImageStyle(this.SignalColorImages[i], 2)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 3)
                            // style = this.createStyle(3)
                            features[this.streetName+3].setStyle(style)
                        }else if(signals[i][j] === 4){
                            this.canvasHolder[2].drawLeftDiagOfCircle(i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImages[i],4)
                            features[this.streetName+4].setStyle(style)
                            // style = this.createImageStyle(this.SignalColorImages[i],5)
                            // features[this.streetName+5].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "hudson_warren"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            // this.canvasHolder[2].drawFullCircle(i)
                            // this.canvasHolder[3].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 3)
                            features[this.streetName+3].setStyle(style) 
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 4)
                            // style = this.createStyle(4)
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
                            // this.canvasHolder[2].drawFullCircle(i)
                            // this.canvasHolder[3].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i],3)
                            features[this.streetName+3].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 4)
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
                            // this.canvasHolder[2].drawFullCircle(i)
                            // this.canvasHolder[3].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i],2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImages[i],3)
                            features[this.streetName+3].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i],4)
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
                            // this.canvasHolder[2].drawFullCircle(i)
                            // this.canvasHolder[3].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImages[i], 2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 3)
                            features[this.streetName+3].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 4)
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
                            // this.canvasHolder[2].drawFullCircle(i)
                            // this.canvasHolder[3].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 2)
                            features[this.streetName+2].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 3)
                            features[this.streetName+3].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            // this.canvasHolder[5].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 4)
                            features[this.streetName+4].setStyle(style)
                            style = this.createImageStyle(this.SignalColorImagesWithLeft[i], 5)
                            features[this.streetName+5].setStyle(style)
                        }
                    }
                }
            }
        }else if(this.getStreetName() === "commerce_raymond"){
            for(var i in signals){
                if(signals[i] !== null){
                    for(var j in signals[i]){
                        if(signals[i][j] === 2){
                            // this.canvasHolder[2].drawFullCircle(i)
                            // style = this.createStyle(2)
                            style = this.createImageStyle(this.SignalColorImages[i], 2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 1){
                            this.canvasHolder[6].drawCustomHalfOfCircle(0.1,1.1,i)
                            style = this.createStyle(6)
                            features[this.streetName+6].setStyle(style)
                        }else if(signals[i][j] === 6){
                            this.canvasHolder[6].drawCustomHalfOfCircle(1.1,2.1,i)
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
                            this.canvasHolder[2].drawCustomHalfOfCircle(0.1,1.1,i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 3){
                            this.canvasHolder[8].drawLeftHalfOfCircle(i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImages[i],4)
                            features[this.streetName+4].setStyle(style)
                        }else if(signals[i][j] === 5){
                            this.canvasHolder[2].drawCustomHalfOfCircle(1.1,2.1,i)
                            style = this.createStyle(2)
                            features[this.streetName+2].setStyle(style)
                        }else if(signals[i][j] === 6){
                            // this.canvasHolder[6].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImages[i],6)
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
                            this.canvasHolder[8].drawCustomHalfOfCircle(0.1,1.1,i)
                            style = this.createStyle(8)
                            features[this.streetName+8].setStyle(style)
                        }else if(signals[i][j] === 4){
                            // this.canvasHolder[4].drawFullCircle(i)
                            style = this.createImageStyle(this.SignalColorImages[i],4)
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
                            this.canvasHolder[8].drawCustomHalfOfCircle(1.1,2.1,i)
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

    createImageStyle(imgSrc, multiplier){
        this.style = new ol.style.Style({
            image: new ol.style.Icon({
                // img: image,
                anchor : [0.5,0.5],
                size: [100,98],
                offset:[0,0],
                opacity: 1,
                scale: 0.25,
                src: imgSrc,
                rotation: this.radians[multiplier]*Math.PI,
                // rotation : 1.6*Math.PI
            })
        });
        return this.style;
    }
}