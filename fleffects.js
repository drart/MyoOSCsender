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
                synth.set("lefty.freq", 400);
            if(pose === 'fingers_spread')
                synth.set("lefty.freq", 600);
        });
    
    }
    if (typeof rightMyo === "undefined"){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            synth2.set("lefty.freq", 700);
        });
        rightMyo.on('pose_off', function(pose){
            synth2.set("lefty.freq", 500);
        });
        rightMyo.on('orientation', function(){
            //synth2.set("lefty.freq", 500);
            console.log(data);
            dusty.set("dusty.mix", Math.max(data.x, 0.01)); 
        });
    }
    }
});



var dusty = flock.synth({
    synthDef: {
        id: "dusty",
        ugen: "flock.ugen.freeverb",
        mix: 1, 
        room: 0.7,
        damp: 0.7,
        source: {
            ugen: "flock.ugen.dust",
            density: 100,
            mul: 0.5
        }    
    }
});



Myo.connect('org.adamtindale.myoosc');
enviro.play();
