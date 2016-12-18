var Myo = require('myo'), 
    leftMyo, rightMyo;

// SETUP MYO
Myo.on("unlocked", function(){
    //console.log(this);
    if (typeof leftMyo !== "undefined" && typeof rightMyo !== "undefined")
        return;
    if (typeof leftMyo === "undefined" && this.arm === "left"){
        leftMyo = this; 
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
        rightMyo.on('unlocked', function(){
            console.log(this.arm + ": unlocked"); 
        });
    }
});

Myo.on("connected", function(){
    //Myo.setLockingPolicy('none');
    console.log(this);
});

Myo.connect('org.adamtindale.myoosc', require('ws'));

