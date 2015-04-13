/**
* Demonstrates streams
*/

// requires
var http = require('http');
var fs = require('fs'); // require filesystem module

var server = http.createServer( function( request, response) {
    response.writeHead(200);
    request.on('readable', function() {
      var chunk = null;
      while ( null !== ( chunk = request.read()))
        {
            console.log("Chunk: "+chunk.toString());
        }
});

    request.on('end', function() {
            response.end();
    });            
});

server.listen(7777);



var server1 = http.createServer( function( request, response) {
    response.writeHead(200);
    request.on('readable', function(){
      var chunk = null;
      while ( null !== ( chunk = request.read()))
        {
            response.write(chunk);
        }
});

    request.on('end', function() {
            response.end();
    });            
});

server1.listen(8888);


http.createServer( function( request, response) {
    response.writeHead(200);
    request.pipe(response);
}).listen(9999);


var file = fs.createReadStream("readme.md");


