
var request = require("request");
var fs = require("fs");

exports.download = function(uri, filename, callback){
  request.head(uri, function() {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};