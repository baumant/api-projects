'use strict';

var request = require("request"),
    async = require('async');
    
function ghAuth() {
    
    this.authenticate = function(req, res){
        var client_id = process.env.GITHUBSTATS_KEY,
            client_secret = process.env.GITHUBSTATS_SECRET,
            url = 'https://github.com/login/oauth/access_token?client_id=' + client_id + '&client_secret=' + client_secret + '&code=' + req.query.code;
        
        request.post(url, function (error, response, body) {
            
            if (!error && response.statusCode == 200) {
                res.redirect('https://timothybauman.com/github-leaderboards/?'+body);
            }
        });

    };
}
module.exports = new ghAuth();