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

// SETUP MYO
Myo.on("status", function(){
        console.log(this);
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;

    if (typeof leftMyo === "undefined" && this.arm === "left"){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            var msg = {
                address: "/myo/left/", 
            args: [pose] 
            };
            udpPort.send(msg);
            console.log(msg);
        });
        return;
    }
    if (typeof rightMyo === "undefined" && this.arm === "right"){
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

Myo.on("connected", function(){
    Myo.setLockingPolicy('none');
    console.log(this);
});

Myo.connect('org.adamtindale.myoosc', require('ws'));

