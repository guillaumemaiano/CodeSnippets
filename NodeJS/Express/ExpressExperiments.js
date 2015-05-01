var express = require('express');
var url = require('url');
var app = express();

app.get('/', // root route
        function(request, response) {
            response.sendFile(__dirname + "/index.html");
        });

app.get('/:username',
        function(req, resp) {
            var username = req.params.username;
        });

var port = 19094.
app.listen(port);
console.log("Listening on port "+port);
