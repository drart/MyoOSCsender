var Myo = require('myo'); 
var osc = require('osc');
var BarCli = require('barcli'); 

var barcli_lx  = new BarCli({label: "left x", range: [-1, 1]});
var barcli_ly  = new BarCli({label: "left y", range: [-1, 1]});
var barcli_lz  = new BarCli({label: "left z", range: [-1, 1]});
var barcli_rx  = new BarCli({label: "right x", range: [-1, 1]});
var barcli_ry  = new BarCli({label: "right y", range: [-1, 1]});
var barcli_rz  = new BarCli({label: "right z", range: [-1, 1]});

var barcli_lxa  = new BarCli({label: "left x accel", range: [-1, 1]});
var barcli_lya  = new BarCli({label: "left y accel", range: [-1, 1]});
var barcli_lza  = new BarCli({label: "left z accel", range: [-1, 1]});
var barcli_rxa  = new BarCli({label: "right x accel", range: [-1, 1]});
var barcli_rya  = new BarCli({label: "right y accel", range: [-1, 1]});
var barcli_rza  = new BarCli({label: "right z accel", range: [-1, 1]});

var barcli_posel = new BarCli({label: "left pose", type: "string"});
var barcli_poser = new BarCli({label: "right pose", type: "string"});
var barcli_myocount = new BarCli({label: "Number of Myos connected", type: "number"});

barcli_myocount.update(Myo.myos.length);

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
    
    if (this.arm === "left"){
        barcli_lxa.update(data.x); 
        barcli_lya.update(data.y); 
        barcli_lza.update(data.z); 
    }else{
        barcli_rxa.update(data.x); 
        barcli_rya.update(data.y); 
        barcli_rza.update(data.z); 
    }
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
    
    if ( this.arm === "left"){
        barcli_lx.update(data.x); 
        barcli_ly.update(data.y); 
        barcli_lz.update(data.z); 
    }else{
        barcli_rx.update(data.x); 
        barcli_ry.update(data.y); 
        barcli_rz.update(data.z); 
    }
});

Myo.on('pose', function(pose){
    var msg = {
        address: "/myo/" + this.arm + "/pose", 
        args: [pose] 
    };
    udpPort.send(msg);

    if (this.arm === "left"){
        barcli_posel.update(this.arm + " " + pose);
    }else{
        barcli_poser.update(this.arm + " " + pose);
    }
});

Myo.on('pose_off', function(pose){
    var msg = {
        address: "/myo/" + this.arm + "/pose_off", 
        args: [pose] 
    };
    udpPort.send(msg);

    if (this.arm === "left"){
        barcli_posel.update(this.arm + " " + pose + "_off");
    }else{
        barcli_poser.update(this.arm + " " + pose + "_off");
    }
});

Myo.on('unlocked', function(){
    Myo.setLockingPolicy('none');
});

/*
Myo.on('fist', function(){
    this.requestBatteryLevel();
});

Myo.on('battery_level', function(){
    console.log("Battery level for " + this.arm + " arm is " + this.batteryLevel + "%");
}); 
*/

Myo.connect('org.adamtindale.myoosc', require('ws'));

Myo.on('connected', function(){  
        //Myo.streamEMG(true);
});


/*
Myo.on('emg', function(data){  
        console.log(data);
});
*/
