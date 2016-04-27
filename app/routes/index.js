'use strict';

var timestamp = require(process.cwd() + '/app/controllers/timestamp.js'),
    whoami = require(process.cwd() + '/app/controllers/whoami.js'),
    Shorturl = require(process.cwd() + '/app/controllers/shorturl.js');

module.exports = function(app, db) {
    var shorturl = new Shorturl(db);
    
    app.route('/')
        .get(function(req, res) {
            
            res.sendFile(process.cwd() + '/public/index.html');
        });
    app.route('/api/timestamp')
        .get(function(req, res) {
            res.sendFile(process.cwd() + '/public/timestamp.html');
        })
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
};