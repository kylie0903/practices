const http = require('http');
const { parse } = require('path');
let url = require('url');
//console.dir(url);
const hostname = '127.0.0.1';
const port = 8080;
const server = http.createServer((req, res) => {
  let path = url.parse(req.url).pathname; 
  console.log(path);
  if (path === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('main page');
  } else if (path ==='/about') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('about page');
  } else {
    res.statusCode = 404;
    res.write('error page');
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});