const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer(function (req, res) {
  var url = req.url;

  if (req.url == '/') {
    url = '/index.html';    
  }
  if (req.url == '/favicon.ico') {
    return res.writeHead(404);
  }
  res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });
    console.log(__dirname + url);
    res.end(fs.readFileSync(__dirname + url));
})
server.listen(port, hostname, function () {
  console.log(`server started  http://${hostname}:${port}/`)
});