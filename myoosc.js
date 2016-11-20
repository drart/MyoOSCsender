var Myo = require('myo');
var osc = require("osc");

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
Myo.connect('org.adamtindale.myoosc');

Myo.on('connected', function(data, timestamp){
    console.log(Myo.myos.length + " " + this.id);
    console.log(Myo.arm); 
    // register events for each arm
    // http://developerblog.myo.com/myo-unleashed-myo-js/
    // https://github.com/thalmiclabs/myo.js/blob/master/docs.md
    if(Myo.arm === "left"){
        // 
    }else if (Myo.arm === "right"){
    
    }
});



Myo.on('pose', function(pose){
    var msg = {
        address: "/myo/0/", 
        args: [pose] 
    };
    udpPort.send(msg);
    console.log(msg);
});


