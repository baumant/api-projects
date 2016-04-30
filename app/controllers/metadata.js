'use strict';
var multer = require("multer");
var upload = multer().single('datafile');

function metadata(){
    
  this.getMetadata = function(req,res){

      upload(req, res, function (err) {
        if (err) throw err;
        var response = {
            filesize: req.file.size
        }
        res.send(response);
      });
      
  };
  
}

module.exports = new metadata();