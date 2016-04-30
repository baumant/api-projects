'use strict';

var express = require('express'),
    mongo = require("mongodb"),
    routes = require("./app/routes/index.js");

require('dotenv').config({silent: true});

var app = express();
var mongoPort = process.env.MONGODB_URI || 'mongodb://localhost:27017/apiproject';

mongo.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apiproject', function(err, db){
    if(err){
        throw err;
    } else {
        console.log('Successfully connected to MongoDB: ' + mongoPort);
    }
    
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/controllers', express.static(__dirname + 'app/controllers'));
    
    db.createCollection("links", {
        capped: true,
        size: 5242880,
        max: 5000
    });
    
    db.createCollection("searches", {
        capped: true,
        size: 5242880,
        max: 5000
    });
    
    routes(app, db);
    
    var port = process.env.PORT || 5000;
    app.listen(port, function() {
        console.log('Node.js listening on port ' + port + '...');
    });
});


