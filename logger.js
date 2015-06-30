


exports.write = function(message) {
  var http = require('http');

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(message + '\n');
  }).listen();

  var d = new Date().toISOString();
  console.log(d.replace("T"," ").substring(0, d.length - 5) + " | " + message);
};
