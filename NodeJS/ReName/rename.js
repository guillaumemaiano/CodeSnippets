// imports
var fs = require('fs');
// helper methods
var isEven = function(someNumber){
        return (someNumber%2 == 0) ? true : false;
};

// argument processing
process.argv.every(function (val, index, array) {
    var warningDisplayed = false;
    // Index 0 is "node"
    // Index 1 is the program's filename
    // even indexed values are arguments values
    // odd indexed values are argument parameters 
    if ( 0 != index && isEven(index) ) {
        if ( val.lastIndexOf("-", 0) === 0 ) {
            console.log(val);
            console.log("OK!");
        } else {
            console.log("Arguments: -din -dout -prefix");
            return false;
        } 
     } 
    return true;
});
