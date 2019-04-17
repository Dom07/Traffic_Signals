var signal_phases = [];
var Summit_Signal_Phases;
var Lock_warren_signal_phases;
var norfolk_warren_signal_phases;
var first_street_west_market;
var west_market_warren;
var hudson_warren;
var university_raymond;
var washington_raymond;
var signal_remaining_time;
var summit_remaining_time;

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

export function fetchData(url){
    signal_phases = [];   
    signal_remaining_time = [];
    getJSON(url[0],function(err,data){
        if(err===null){    
            Summit_Signal_Phases = [data[0].CurGreenPhase, data[0].CurYellowPhase, data[0].CurRedPhase];
            // summit_remaining_time = [data[0].ReGreen, [], data[0].ReRed];
            // convertRemainingTime(summit_remaining_time);
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
    
    signal_phases.push(Summit_Signal_Phases);
    signal_phases.push(Lock_warren_signal_phases);
    signal_phases.push(norfolk_warren_signal_phases);
    signal_phases.push(first_street_west_market);
    signal_phases.push(west_market_warren);
    signal_phases.push(hudson_warren);
    signal_phases.push(university_raymond);
    signal_phases.push(washington_raymond);
    // signal_remaining_time.push(summit_remaining_time);
    
    return signal_phases;
}

function convertRemainingTime(summit_remaining_time){
    for(var i=0;i<summit_remaining_time;i++){
        for(var j=0;j<summit_remaining_time[i];j++){
            summit_remaining_time[i][j] = summit_remaining_time[i][j] % 1000;
        }
    }
}
