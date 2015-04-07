// requires
var http = require("http");
var fs = require('fs');
var EventEmitter =require('events').EventEmitter;
// settings
var port = 9988;
var duration = 3000;

// emitters
var events = new EventEmitter();

// methods
var setupImprovedServer = function(server) {
  server.on('request', function(request, response) {
    response.writeHead(200);
    response.write("<!DOCTYPE html><html><body><h1>Improved!</h1></body></html>");
    response.end();
  });
};

var demonstrateAnotherSyntaxForServerDeclaration = function(){
  // demonstrates events
  events.on("close",function(){console.log("Bye!");});
  // the next exemple improves the server declaration to be more readable
  var server2 = http.createServer();
  setupImprovedServer(server2);
  server2.listen(port); // listen for connections on a port I'm not using otherwise
  console.log("Listening on port "+port+" for the next "+duration/1000+" seconds.");
  setTimeout(function() {
    server2.close();
  // demonstrates events
  events.emit('close');
  }, duration);
}

var application = function() {
  var server = http.createServer(
      function(request, response) {
          response.writeHead(200); // HTTP status code in header (200 for OK)
          response.write("<!DOCTYPE html><html><body>nothing</body></html>");// response body
          response.end(); // close the connection
      }
  );
  server.listen(port); // listen for connections on a port I'm not using otherwise
  console.log("Listening on port "+port+" for the next "+duration/1000+" seconds.");
  setTimeout(function() {
    server.close();
    demonstrateAnotherSyntaxForServerDeclaration();
  }, duration);

  process.on('SIGTERM', function () { // gracefully deals with server being killed (SIGKILL cannot be handled)
    console.log("Shutting down");
    server.close(function () {
      process.exit(0);
    });
  });
   
}



try {
  var contentsOfSettings = fs.readFileSync('settings.json'); // Synchronous because you need the settings to execute properly
  try {
    var settings = JSON.parse(contentsOfSettings);
    if (settings.port){ //TODO test for existence properly
      port = settings.port;
      duration = settings.duration;
    }
    try {
      application();
    }
    catch(e_net) {
      console.log("Network issue");
    }
  }
  catch(e_parse) {
    console.log(e_parse);

    console.log("Settings file couldn't be parsed correctly");
  }
}
catch(e_file) {
  if (e_file.code === 'ENOENT'){
    console.log("Settings file not found");
    return;
  }
  else {
    console.log(e_file);
  }
}
