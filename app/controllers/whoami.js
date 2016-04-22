function whoami() {
   this.getInfo = function(req, res) {
      var headers = {
         "ipaddress": null,
         "language": null,
         "software": null
      };

      headers.ipaddress = req.headers['x-forwarded-for'];
      headers.language = req.headers['accept-language'];
      headers.software = req.headers['user-agent'];
      res.json(headers);
   }
};

module.exports = new whoami();