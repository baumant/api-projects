'use strict';

function shorturl(db){
    var validUrl = require("valid-url"),
        baseUrl = "https://dry-hamlet-8316.herokuapp.com/",
        response = {
          _id: null,
          original: null,
          shortenedUrl: null
        },
        links = db.collection('links');
    
    this.shorten = function(req, res){
        var url = req.params.url + req.params[0];
        
        function createLink(){
            var link = Math.floor( (Math.random() * 10000) + 1 );
            response.shortenedUrl = baseUrl + link;
            response.original = url;
            response['_id'] = link;
            
            //find if random # was already generated for another link
            links.find({
                shortenedUrl: response.shortenedUrl
            }).toArray(function(err,docs){
                if(err) throw err;
                if(docs.length > 0){
                    createLink();
                }
            });
        };
        
        if(validUrl.isWebUri(url)){
            //check whether a link to the url has been created before
            links.find({
                original: url
            },{
                original: 1,
                shortenedUrl: 1,
                _id: 0
            }).toArray(function(err,docs){
               if(err) throw err;
               if(docs.length < 1){
                    
                    createLink();
                    
                    links.insert(response, function(err,data){
                        if(err) throw err;
                        var send = {
                            original: data.ops[0].original,
                            shortenedUrl: data.ops[0].shortenedUrl
                        };
                        res.send(send);
                    });
                    
               } else {
                   res.send(docs[0]);
               }
            });
        }
        else{
            res.send({ error : "Wrong url format, make sure you have a valid protocol and real site."});
        }
    }
    
    this.linked = function(req,res){
        var shortlink = req.params.shortlink;
        links.find({
            shortenedUrl: baseUrl + shortlink
        }).toArray(function(err,docs){
            if(err) throw err;
            if(docs.length < 1){
                res.sendStatus(404);
            } else {
                
                res.redirect(docs[0].original)
                
            }
        })
    }
};




module.exports = shorturl;