'use strict';

function imagesearch(db){
    var searches = db.collection('searches');
    const request = require('request');
    
    this.search = function(req, res){
        var offset = req.query.offset,
            term = req.params.term,
            url = 'https://www.googleapis.com/customsearch/v1/',
            options = {
                cx: '009562735260234416916:ddyoiwybrxm',
                key: 'AIzaSyCXL3TRnCXCWD80-iiszNUN5PPjlWdODsc',
                searchType: 'image',
                q: term,
                start: offset
            },
            response = [];
            
        request({url: url, qs: options, json: true}, function(err, resp, body) {
            if(err) throw err;
            
            var time = new Date();
            //add search to recent searchess
            searches.insert(
                { 
                    term: options.q,
                    when: time.getMonth() + 1 + '-' + time.getDate() + '-' + time.getFullYear() + ' | ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
                }, function(err,data){
                if(err)throw err;
            })
            
            for(var x=0; x<body.items.length; x++){
                var searchResult = body.items[x];
                response.push( {
                    image: searchResult.link,
                    alt_text: searchResult.snippet,
                    page_url: searchResult.image.contextLink
                });
            }
            res.send(response)
        });
    };
    
    this.latest = function(req, res){
        var a = searches.find({},{_id:0}).sort( { $natural: -1 } ).limit(10).toArray(function(err,docs){
            if(err) throw err;
            res.send(docs);
        });
        
    };
};

module.exports = imagesearch;