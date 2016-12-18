var Myo = require('myo'),
    leftMyo, rightMyo;

var flock = require('flocking'),
    enviro= flock.init();

// todo find gesture in a array to map to freq
var gestures = ['double_tap', 'fist', 'wave_in', 'wave_out', 'fingers_spread'];

Myo.on('unlocked', function(){
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined"){
        setupLeftMyo();    
    }
    if (typeof rightMyo === "undefined"){
        setupRightMyo();    
    }
    console.log(this);
});

function setupLeftMyo(){

        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            if(pose === 'fist')
                synth.set("lefty.freq", 400);
            if(pose === 'fingers_spread')
                synth.set("lefty.freq", 600);
        });
}

function setupRightMyo(){

        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            synth2.set("lefty.freq", 700);
        });
        rightMyo.on('pose_off', function(pose){
            synth2.set("lefty.freq", 500);
        });
}

var synth = flock.synth({
    synthDef:{             
        id: "lefty",
        ugen: "flock.ugen.sinOsc",
        freq: 400
    }
});


var synth2 = flock.synth({
    synthDef:{             
        id: "righty",
        ugen: "flock.ugen.sinOsc",
        freq: 500
    }
});

Myo.connect('org.adamtindale.myoosc');
enviro.play();
