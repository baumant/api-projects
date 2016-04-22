'use strict';

var timestamp = require(process.cwd() + '/app/controllers/timestamp.js');
var whoami = require(process.cwd() + '/app/controllers/whoami.js');

module.exports = function(app) {

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
};