const express = require('express');
const http = require('http'); 
const path = require('path');
const app = express();

let bodyParser = require('body-Parser');
let static = require('serve-static');

app.set('port', process.env.PORT || 3000);

//body-parser를 이용해서 파싱 객체의 형태로 보기좋게 만들어줌
app.use(bodyParser.urlencoded({ extended: false }));
//application/json 파싱
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'views')));
//__dirname 절대경로

app.use(function (req, res, next) {
  let paramId = req.query.id || req.body.id;
  let paramPw = req.query.pw || req.body.pw;

  res.writeHead('200', { 'content-Type': 'text/html;charset=utf8' });
  res.write('<h1>로그인 아이디와 비번</h1>');
  res.write(`<h4> ID : ${paramId}</h4> `);
  res.write(`<h4> PW : ${paramPw}</h4> `);
  res.end();
})
http.createServer(app).listen(app.get('port', function () {
  console.log('start' + app.get('port'));
}))