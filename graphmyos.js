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
Myo.on("status", function(){
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined" && this.arm === "left"){
        setupLeftMyo();
    }
    if (typeof rightMyo === "undefined" && this.arm === "right"){
        setupRightMyo();
    }
});

function setupRightMyo(){
        rightMyo = this; 
        rightMyo.on('pose', function(pose){
        });
        rightMyo.on('gyroscope', function(data){
            barcli_rx.update(data.x); 
            barcli_ry.update(data.y); 
            barcli_rz.update(data.z); 
        });
        rightMyo.on('accelerometer', function(data){
            barcli_rxa.update(data.x); 
            barcli_rya.update(data.y); 
            barcli_rza.update(data.z); 
        });
};

function setupLeftMyo(){
        leftMyo = this; 
        leftMyo.on('pose', function(pose){
        });
        leftMyo.on('gyroscope', function(data){
            barcli_lx.update(data.x); 
            barcli_ly.update(data.y); 
            barcli_lz.update(data.z); 
        });
        leftMyo.on('accelerometer', function(data){
            barcli_lxa.update(data.x); 
            barcli_lya.update(data.y); 
            barcli_lza.update(data.z); 
        });
};

Myo.on("connected", function(){
    //Myo.setLockingPolicy('none');
    console.log(this);
});

Myo.connect('org.adamtindale.myoosc', require('ws'));

