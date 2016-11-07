var Myo = require('myo');
var osc = require("osc");

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
    console.log(pose);
});


