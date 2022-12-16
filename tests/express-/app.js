//npm으로 설치한 애들 연결하기
const express = require('express');
const router = require('./routes/route');
const app = express(); 
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, 'views'));
// app.use(expressLayout);
app.use('/', router);
// app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;