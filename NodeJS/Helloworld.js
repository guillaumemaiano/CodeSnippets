 var http = require("http");

var server = http.createServer(
    function(request, response){
        response.writeHead(200); // HTTP status code in header (200 for OK)
        response.write("<!DOCTYPE html><html><body>nothing</body></html>");// response body
        response.end(); // close the connection
    }
);
server.listen(9977); // listen for connections on a port I'm not using otherwise
