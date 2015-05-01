// imports
var fs = require('fs');
// helper methods
var isEven = function(someNumber){
        return (someNumber%2 == 0) ? true : false;
};

// argument processing
process.argv.every(function (val, index, array) {
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
    return true;
});
