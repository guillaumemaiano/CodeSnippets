var http = require("http");
var fs = require('fs');


var port = 9977;
var application = function(){
  var settings = JSON.parse(contentsOfSettings);
  var server = http.createServer(
      function(request, response){
          response.writeHead(200); // HTTP status code in header (200 for OK)
          response.write("<!DOCTYPE html><html><body>nothing</body></html>");// response body
          response.end(); // close the connection
      }
  );
  server.listen(port); // listen for connections on a port I'm not using otherwise
  console.log("Listening on port "+port);
}

try {
  var contentsOfSettings = fs.readFileSync('settings.json'); // Synchronous because you need the settings to execute properly
  try {
    try {
      application();
    }
    catch(e_net) {
      console.log("Network issue");
    }
  }
  catch(e_parse) {
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
