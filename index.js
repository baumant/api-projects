'use strict';

var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/public'));
app.get('/:input', function(req, res){
    var input = new Date(req.params.input);
    
    var date = {
        unix: null,
        natural: null
    }
    
    if(input == 'Invalid Date'){
        res.json(date);
    }
    else{
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = months[input.getMonth()];
        date.natural = month + ' ' + input.getDate() + ', ' + input.getFullYear();
        
        date.unix = input.getTime();
        
        res.json(date);
    }
})

var port = process.env.PORT || 5000;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});