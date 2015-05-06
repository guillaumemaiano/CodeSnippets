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


var processArguments = function() {
    // argument processing
    var action = "";
    var actions = ["dout", "din", "prefix"];
    process.argv.every( function(val, index, array) {
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
                throw "Call incorrect";
         }
      } 
     else {
         if ( index > 1) {
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
             default:
             console.log("Argument unknown\nArguments: -din -dout -prefix");
             throw "Argument unknown";
          }
            }
        }
    });

    console.log("Settings:\nInput directory: "+directory_in);
    console.log("Output directory: "+directory_out);
    console.log("Prefix: "+prefix);
}

var checkArgumentValidity = function() {
    // Checking if the output directory exists
    if (!fs.existsSync(directory_out)){
        //TODO Add confirmation check
        console.log("Output directory doesn't exist\nAttempting creation of "+directory_out);
        fs.mkdirSync(directory_out); // Some people go "antipattern" on this. Their arguments are good, but it mainly applies to other situations. Here, I want this.
    }
    // Checking if the input directory exists
    if (!fs.existsSync(directory_in)){
        console.log("Input directory not found, aborting process.\n");
        throw new Exception("Wrong input directory");
    }
};

var renameFiles = function(err, files) {
    if (err) throw err;
    files.forEach(function(){console.log("\rhey")});
};

var processFilesInDirectory = function() {
    processArguments();
    fs.readdir(directory_in, renameFiles);
};

processFilesInDirectory();
