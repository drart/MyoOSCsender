var Myo = require('myo');
var osc = require("osc");

//Start talking with Myo Connect
Myo.connect('org.adamtindale.myoosc');

Myo.on('pose', function(pose){
    console.log(Myo.myos.length);
    console.log(pose);
});
