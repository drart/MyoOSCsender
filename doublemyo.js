var Myo = require('myo'), 
    leftMyo, rightMyo;


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


// SETUP MYO
Myo.on("unlocked", function(){
    // this seems to work best here
    Myo.setLockingPolicy('none');

    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined" && this.arm === "left"){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        leftMyo.on('pose_off', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        leftMyo.on('locked', function(){
            console.log(this.arm + ": locked"); 
        });
    }
    if (typeof rightMyo === "undefined" && this.arm === "right"){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
            console.log(this.arm+ ":" + pose);
        });
        rightMyo.on('pose_off', function(pose){
            console.log(this.arm+ ":" + pose + " off");
        });
        rightMyo.on('unlocked', function(){
            console.log(this.arm + ": unlocked"); 
        });
    }
});

Myo.on("connected", function(){
    console.log(this);
});

Myo.connect('org.adamtindale.myoosc', require('ws'));
