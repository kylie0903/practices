const http = require('http');

const hostname = '127.0.0.1';//localhost
const port = 3031;
let hello = '안녕!';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.write('<!DOCTYPE HTML>');
  res.write('<html>')
  res.write('<head>');
  res.write('<title>server</title>');
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>자기소개</h1>');
  res.write('<h3>박순옥</h3>');
  res.write('<h3>프론트엔드</h3>');
  res.write('<h3>노원구 중계동</h3>');
  res.write(`http://${hostname}:${hello}/`);
  res.write('</body>');
  res.end(`</html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});