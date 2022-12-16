const http = require('http');
let fs = require('fs'); //파일 연결 할때 선언하기

const hostname = '127.0.0.1';
const port = 4004;
const server = http.createServer((req, res) => {
  fs.readFile('about.html', function (err, data) { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();
  })  
    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});