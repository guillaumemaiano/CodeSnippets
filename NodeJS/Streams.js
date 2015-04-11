/**
* Demonstrates streams
*/

// requires
var http = require('http');

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




// demonstrates piping from file to file, as well as read/write streams
// pipe is easier to use than chunk-based processes and ideal for this type of task
var file = fs.creadReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");
file.pipe(newFile);
