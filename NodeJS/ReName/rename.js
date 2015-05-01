// imports
var fs = require('fs');

// helper methods
var isEven = function(someNumber){
        return (someNumber%2 == 0) ? true : false;
};

var makeDateString = function() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
        dd='0'+dd
} 

if(mm<10) {
        mm='0'+mm
} 

today = yyyy+"_"+mm+"_"+dd; // UN standard
return today;
}

// variables
var directory_out = ".";
var directory_in = ".";
var prefix = makeDateString();

// argument processing
process.argv.every( function(val, index, array) {
    var action = "";
    var actions = ["dout", "din", "prefix"];
    // Index 0 is "node"
    // Index 1 is the program's filename
    // even indexed values are arguments values
    // odd indexed values are argument parameters 
    if ( 0 != index && isEven(index) ) {
        if ( val.lastIndexOf("-", 0) === 0 ) {
            actions.forEach(function(action_cursor, index, array){
                if (val==="-"+action_cursor) {
                    action = action_cursor;
                }
            });
        } else {
            console.log("Arguments: -din -dout -prefix");
            return false;
        }
       console.log(action); 
     } 
    else {
        switch (action) {
            case "dout":
               directory_out = val;
               break;
            case "din": 
               directory_in = val;
               break;
            case "prefix": 
               prefix = val;
               break;
            default:;
        }
    }
    return true;
});

    console.log("Settings:\nInput directory: "+directory_in);
    console.log("Output directory: "+directory_out);
    console.log("Prefix: "+prefix);

