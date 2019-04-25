var signal_phases = [];
var Summit_Signal_Phases;
var Lock_warren_signal_phases;
var norfolk_warren_signal_phases;
var first_street_west_market;
var west_market_warren;
var hudson_warren;
var university_raymond;
var washington_raymond;
var halsey_raymond;
var broad_raymond;
var commerce_raymond;
var mullbery_raymond;
var mccarter_raymond;
var signal_color;
var signal_number;

function getJSON(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
    var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

export function fetchSignal(url, signal_number){
    getJSON(url, function(err,data){
        if(err===null){
            var phases = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
            for(var i = 0; i < phases.length; i++){
                for(var j = 0; j < phases[i].length; j++){
                    if(phases[i][j] === signal_number){
                        signal_color = i;
                        break;
                    }
                }
            }
        }
    })
    return signal_color;
}

export function fetchData(url){
    signal_phases = [];   

    getJSON(url[0],function(err,data){
        if(err===null){    
            Summit_Signal_Phases = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[1],function(err,data){
        if(err===null){
            Lock_warren_signal_phases = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[2],function(err,data){
        if(err===null){
            norfolk_warren_signal_phases = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[3],function(err,data){
        if(err===null){
            first_street_west_market = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[4],function(err,data){
        if(err===null){
            west_market_warren = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[5],function(err,data){
        if(err===null){
            hudson_warren = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })
    
    getJSON(url[6],function(err,data){
        if(err===null){
            university_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[7],function(err,data){
        if(err===null){
            washington_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[8],function(err,data){
        if(err===null){
            halsey_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[9],function(err,data){
        if(err===null){
            broad_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[10],function(err,data){
        if(err===null){
            commerce_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[11],function(err,data){
        if(err===null){
            mullbery_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })

    getJSON(url[12],function(err,data){
        if(err===null){
            mccarter_raymond = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
        }
    })
    
    
    signal_phases.push(Summit_Signal_Phases);
    signal_phases.push(Lock_warren_signal_phases);
    signal_phases.push(norfolk_warren_signal_phases);
    signal_phases.push(first_street_west_market);
    signal_phases.push(west_market_warren);
    signal_phases.push(hudson_warren);
    signal_phases.push(university_raymond);
    signal_phases.push(washington_raymond);
    signal_phases.push(halsey_raymond);
    signal_phases.push(broad_raymond);
    signal_phases.push(commerce_raymond);
    signal_phases.push(mullbery_raymond);
    signal_phases.push(mccarter_raymond);
    // signal_remaining_time.push(summit_remaining_time);
    
    return signal_phases;
}

