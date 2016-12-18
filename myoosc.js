var Myo = require('myo'), 
    leftMyo, rigtMyo;

var osc = require('osc');
var udpPort = new osc.UDPPort({

    localAddress: "127.0.0.1",
    localPort: 57124,

    remoteAddress: "127.0.0.1",
    remotePort: 57121
});

udpPort.open();

Myo.on('unlocked', function(){
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;

    if (typeof leftMyo === "undefined" && this.arm === "left"){
        leftMyo = this; 
        return;
    }
    if (typeof rightMyo === "undefined" && this.arm === "right"){
        rightMyo = this; 
    }
});

Myo.on('pose', function(pose){
    var msg = {
        address: "/myo/" + this.arm+ "/", 
        args: [pose] 
    };
    udpPort.send(msg);
    console.log(msg);
});

Myo.on('fist', function(){
    this.requestBatteryLevel();
});

Myo.on('battery_level', function(){
    console.log("Battery level for " + this.arm + " arm is " + this.batteryLevel + "%");
}); 

Myo.connect('org.adamtindale.myoosc', require('ws'));
