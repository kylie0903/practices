const express = require('express');
const router = express.Router();
const path = require('path');
const html = `<!doctype html>
    <html>
    <head>
    <title>node HTML</title>
    </head>
    <body>
    <h1>hello</h1>
    <form action='/name' method='POST'>
    <input type='text' name='name' placeholder= '이름 작성하기'>
    <button>확인</button>
    </form>
    </body>
    </html>
`;
router.get('/', (req,res) => {
  res.send(html);
});
router.route('/name').post((req, res) => {
  let paraname = req.body.name;
  //res.send는 res.writeHead().res.write(), res.end()를 한번 에 해결
  //res.send는 한번만 사용 가능 함 여러번 사용 불가능 
  //res.send는 두번 이상 사용해도 출력되지 않고 무시해 버림
  res.send(`${paraname}님 반갑습니다.`);
  res.send('<br> 안녕하세요');// 무시함
  // res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
  // res.write('안녕하세요');
  // res.write(`${paraname}님 반갑습니다.`);
  // res.end();
});
// router.get('/sub1', (req, res) => {
//   res.sendFile(path.join(__dirname, '../', 'views', 'sub1.html'));
// })
router.get('/sub1', (req, res) => {
  res.render('sub1');
});
router.get('/newMemo', (req, res) => {
  res.render('newMemo');
});
router.post('/writeMemo', function (req,res){
  let param = JSON.parse(JSON.stringify(req.body));
  let cont = param['content'];
  let title = param['title'];  
  let names = param['name'];
  let pw = param['pw'];
  console.log(cont);
  console.log(title);
  console.log(names);
  console.log(pw);
  res.render('memoList.ejs', { 'data': param });
})
router.get('/join', (req, res) => {
  res.render('join')
})
router.get('/memoList', (req, res) => {
  res.render('memoList');
});
// router.post('/writeMemo', (req,res) => {
  
 
// })


module.exports = router;
