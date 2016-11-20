var Myo = require('myo');
var osc = require('osc');

var leftMyo, rightMyo;

// Setup osc.js
var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: 57124,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: 57121
});

udpPort.open();

//Start talking with Myo Connect

Myo.on('connected', function(data, timestamp){
    console.log(Myo.myos); 
    console.log(data);
    console.log(this);
    // register events for each arm
    // http://developerblog.myo.com/myo-unleashed-myo-js/
    // https://github.com/thalmiclabs/myo.js/blob/master/docs.md
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

Myo.connect('org.adamtindale.myoosc');


