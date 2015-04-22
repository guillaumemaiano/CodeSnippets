var express = require('express');
var app = express();

app.get('/', // root route
        function(request, response) {
            response.sendFile(__dirname + "/index.html");
        });
var port = 19094.
app.listen(port);
console.log("Listening on port "+port);
