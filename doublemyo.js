var Myo = require('myo');
var osc = require('osc');

var leftMyo, rightMyo;

// Setup osc.js
var udpPort = new osc.UDPPort({
    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57121
});

udpPort.open();

//Start talking with Myo Connect
Myo.on('connected', function(data, timestamp){
    console.log(this);
});

Myo.on('unlocked', function(){
    console.log(typeof leftMyo);
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined"){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            var msg = {
                address: "/myo/left/", 
            args: [pose] 
            };
            udpPort.send(msg);
            console.log(msg);
        });
    }
    if (typeof rightMyo === "undefined"){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            var msg = {
                address: "/myo/right/", 
            args: [pose] 
            };
            udpPort.send(msg);
            console.log(msg);
        });
    }
});

// moving this to the bottom doesn't help the late registartion issue
Myo.connect('org.adamtindale.myoosc');
