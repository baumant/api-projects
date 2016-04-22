'use strict';

var express = require('express');
var routes = require("./app/routes/index.js");

var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.use('/controllers', express.static(__dirname + 'app/controllers'));

routes(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port + '...');
});