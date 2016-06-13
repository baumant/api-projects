'use strict';

var request = require("request"),
    async = require('async');
    
function github() {
    
    this.getData = function(req, res){
        
      var user = req.query.user,
          following = [],
          options = {
            url: 'https://api.github.com/users/' + user + '/following?per_page=100?access_token=' + req.query.access_token,
            json: true,
            headers: {
              'User-Agent': 'GitHub-Stats-App'
            }
          };
      following.push({name: user, og: true});
      request(options, function(err, response, data){
        if(err) throw err;
        
        for (var i = 0; i < data.length; i++) {
          following.push({
            name: data[i].login
          });
        }
        async.map(following, getFollowingData, function(err, results){
          if(err) throw err;
          sortFollowing('followers');
          res.send(following);
        });
      });
        
      var sortFollowing = function(sortParam){
        
        following.sort( function(a, b){
          a = a[sortParam];
          b = b[sortParam];
          
          if (a > b) {
            return -1;
          }
          if (a < b) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      };
          
      var getFollowingData = function(user, callback){
        request({
          url: 'https://api.github.com/users/' + user.name + '?access_token=' + req.query.access_token,
          json: true,
          headers: {
            'User-Agent': 'GitHub-Stats-App'
          }
        }, function(err, response, data) {
          if(err) throw err;
          user.repos = data.public_repos;
          user.followers = data.followers;
          user.avatar = data.avatar_url;
          user.link = data.html_url;
          user.company = data.company;
          user.website = data.blog;
          user.location = data.location;
          user.email = data.email;
          user.bio = data.bio;
          user.realname = data.name;
          callback(null, following);
        });
      };
        
    };
}

module.exports = new github();
