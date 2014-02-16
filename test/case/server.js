var http = require('http');
var server = http.createServer(requestHandler);

function requestHandler(req, res) {
  var body = 'Hello from {{name}}';

  res.writeHead(200, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });

  res.write(body);
  res.end();
}

module.exports = exports = server;
