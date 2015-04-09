/**
* Demonstrates streams
*/

// requires
var http = require('http');

var server = http.createServer( function( request, response) {
    response.writeHead(200);
    request.on('readable', function(){
      var chunk = null;
      while ( null !== ( chunk = request.read()))
        {
            request.on('end',function(){
                response.end();
            });            
        }
});	
});

server.listen(7777);
