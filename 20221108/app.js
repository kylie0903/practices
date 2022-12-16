const http = require('http');

const hostname = '127.0.0.1';
const port = 4050;
const server = http.createServer();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//연결 이벤트 처리
server.on('connection', function () {
  console.log('클라이언트 접속');
});
//요청이벤트 처리
server.on('request', function (req , res) {
  console.log("클라이언트 요청");
  res.write('<h1>Hello</h1>');
});
server.on('close', function () {
  console.log('서버 종료');
});