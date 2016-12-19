var Myo = require('myo'); 
var osc = require('osc');

var udpPort = new osc.UDPPort({

    localAddress: "127.0.0.1",
    localPort: 57124,

    remoteAddress: "127.0.0.1",
    remotePort: 57121
});

udpPort.open();

Myo.on('accelerometer', function(data){
    var msg = {
        address: "/myo/" + this.arm + "/accelerometer/x", 
        args: [data.x] 
    };
    udpPort.send(msg);
    var msg = {
        address: "/myo/" + this.arm + "/accelerometer/y", 
        args: [data.y] 
    };
    udpPort.send(msg);
    var msg = {
        address: "/myo/" + this.arm + "/accelerometer/z", 
        args: [data.z] 
    };
    udpPort.send(msg);
});

Myo.on('orientation', function(data){
    var msg = {
        address: "/myo/" + this.arm + "/orientation/x", 
        args: [data.x] 
    };
    udpPort.send(msg);
    var msg = {
        address: "/myo/" + this.arm + "/orientation/y", 
        args: [data.y] 
    };
    udpPort.send(msg);
    var msg = {
        address: "/myo/" + this.arm + "/orientation/z", 
        args: [data.z] 
    };
    udpPort.send(msg);
});

Myo.on('pose', function(pose){
    var msg = {
        address: "/myo/" + this.arm + "/pose", 
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
