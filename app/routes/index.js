'use strict';


var timestamp = require(process.cwd() + '/app/controllers/timestamp.js'),
    whoami = require(process.cwd() + '/app/controllers/whoami.js'),
    Shorturl = require(process.cwd() + '/app/controllers/shorturl.js'),
    imageSearch = require(process.cwd() + '/app/controllers/image-search.js'),
    metadata = require(process.cwd() + '/app/controllers/metadata.js'),
    github = require(process.cwd() + '/app/controllers/github.js'),
    ghAuth = require(process.cwd() + '/app/controllers/ghAuth.js');

module.exports = function(app, db) {
    var shorturl = new Shorturl(db);
    var imagesearch = new imageSearch(db);
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    
    app.route('/')
        .get(function(req, res) {
            
            res.sendFile(process.cwd() + '/public/index.html');
        });
    app.route('/api/timestamp')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/timestamp.html');
        });
    app.route('/api/timestamp/:input')
        .get(timestamp.getDate);
    
    app.route('/api/whoami')
        .get(whoami.getInfo);
        
    app.route('/api/shorturl')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/shorturl.html');
        });
    app.route('/api/shorturl/:url*')
        .get(shorturl.shorten);
    app.route('/:shortlink')
        .get(shorturl.linked);
    
    app.route('/api/imagesearch')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/imagesearch.html');
        });
    app.route('/api/imagesearch/:term')
        .get(imagesearch.search);
    app.route('/api/latest/imagesearch')
        .get(imagesearch.latest);
        
    app.route('/api/metadata')
        .get(function(req, res){
            res.sendFile(process.cwd() + '/public/metadata.html');
        })
        .post(metadata.getMetadata);
        
    app.route('/api/github')
        .get(github.getData);
    app.route('/auth/github')
        .get(ghAuth.authenticate);
};

