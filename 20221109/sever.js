const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3232;
const server = http.createServer(function (req, res) {
 
  if(req.method == 'GET'){
  console.log(req.url);
  let urls = req.url;
  let queryD = url.parse(urls, true).query;
  console.log(queryD.id);
  console.log(queryD.pw);

  fs.readFile('./login.html', function (error, data) {
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });    
    res.write(data);
    res.end();
  })
  } else if (req.method == 'POST') {
    req.on('data', function (chunk) {
      console.log(chunk.toString());
      res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' });  
      res.end()

    })
    
  }
  // else {
  //   console.log('error');
  //   }
})
server.listen(port, hostname,  function () {
  console.log(`Server running at http://${hostname}:${port}/` )
})