/**
* Demonstrates streams
*/

// requires
var http = require('http');
var fs = require('fs');


// ** utility methods

// this method returns the date as a UNO formatted string, accurate to the second
var stringifyDateInUNOFormat() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var mn = today.getMinutes();
    var ss = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = "_"+yyyy+mm+dd+"_"+mn+":"+ss;
    return today;
}

// ** code examples

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
var duplicatesReadme = function() {
    var file = fs.createReadStream("readme.md");
    var newFile = fs.createWriteStream("readme_copy.md");
    file.pipe(newFile);
}


// merges the ideas of the server and the file write to create an *upload server*

var uploadServer = http.createServer(
        function( request, response ) {
            console.log("hi");
            request.on("request", function() {
                  console.log("Received a request");

                  // **  We need to read the filename from the JSON
                  var theUrl = url.parse( request.url );
                  // gets the query part of the URL and parses it creating an object
                  var queryObj = queryString.parse( theUrl.query );
                  // queryObj will contain the data of the query as an object
                  // and jsonData will be a property of it
                  // so, using JSON.parse will parse the jsonData to create an object
                  var requestSettings = JSON.parse( queryObj.jsonData );
                 
                  // ** upload the file
                  var fileName = requestSettings.filename;
                  if ( !fileName ) {
                      console.log("Request failed to set filename");
                      response.writeHead(400);
                      response.end("Missing filename");
                      return;
                  }
                  response.writeHead(200);
                  var fileUploaded = fs.createWriteStream(requestSettings);
                  request.pipe(fileUploaded);

            });            
            // ** respond to the end of the upload
            request.on('end', function(){
                response.end("Uploaded "+fileName);
            });
        }
        );

uploadServer.listen(11983);


// While using pipe is practical, it does take away some power
// this technique allows us to give feedback

var uploadServerWithFeedback = http.createServer(
        function( request, response ) {
        // 
        
        });

uploadServerWithFeedback.listen(11984);
