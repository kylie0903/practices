const express = require('express');
const http = require('http');
const app = express();

app.use(function (req, res, next) {
  console.log('미들웨어 실행');
  let userAgent = req.header('user-Agent');
  let paramName = req.query.name;

  res.writeHead(200,{'content-Type':'text/html;charset=utf8'})
  res.write('<h1>user-Agent : ' + userAgent +'</h1>')
  res.write('<h2>paramName : ' + paramName + '</h2>')
  res.end();

  // req.name = 'kylie';
  // next();
});
// app.use('/', function () {
//   res.write(`my name is ${req.name}`);
// });


http.createServer(app).listen(5000, function () {
  console.log('5000번 포트에서 서버실행 ')
})