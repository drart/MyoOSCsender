var Myo = require('myo'),
    leftMyo, rightMyo;

var flock = require('flocking'),
    enviro= flock.init();

// todo find gesture in a array to map to freq
var gestures = ['double_tap', 'fist', 'wave_in', 'wave_out', 'fingers_spread'];

Myo.on('connected', function(data, timestamp){
    console.log(this); 
    console.log(data);
});

Myo.on('unlocked', function(){
    // register events for each arm
    //console.log(typeof leftMyo);
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined"){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            if(pose === 'fist')
                synth.set("lefty.freq", 500);
            if(pose === 'fingers_spread')
                synth.set("lefty.freq", 600);
        });
    
    }
    if (typeof rightMyo === "undefined"){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            synth.set("lefty.freq", 600);
        });
        rightMyo.on('pose_off', function(pose){
            synth.set("lefty.freq", 400);
        });
    }
});

Myo.connect('org.adamtindale.myoosc');


var synth = flock.synth({
    synthDef:{             
        id: "lefty",
        ugen: "flock.ugen.sinOsc",
        freq: 400
    }
});

enviro.play();
