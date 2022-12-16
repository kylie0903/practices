const express = require('express');
const router = express.Router();
const path = require('path');
const html = `
<form action="/name" method="POST">
  <input type="text" name="name" placeholder="이름을 적어주세요">
  <button>확인</button>
</form>`;
// '/' 주소로 request 들어올 시 get
//router.route('/').get((req, res) => {
  router.get('/',(req, res) => {
// res.send()는 res.write()와 res.end()의 통합 방식이기 때문에
// res.send()는 한 번 밖에 사용하지 못합니다.
// res.send()를 두 번 적으면 가장 위에 있는 코드만 적용이 되고
// 나머지 것들은 무시가 됩니다.
  res.send(html);
  });
router.get('/iog', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'views', 'login_get.html'));
})

// '/name' 주소로 request 들어올 시 post
router.route('/name').post((req, res) => {
  const paramName = req.body.name
//   res.writeHead(200,{'content-Type':'text/html;charset=utf8'})
//   res.write(`${nowHour}시입니다.`)
//   res.write(`<br>${paramHello}, ${paramName} 님`);
//   res.end()
  res.send(`어서오세요 ${paramName}님`);
});
// const nowHour = new Date().getHours();
// let say = '';
// if (nowHour > 6 && nowHour <= 12)
//   say = 'Good morning'
// else if (nowHour > 12 && nowHour <= 16)
//   say = 'Good afternoon'
// else if (nowHour > 16 && nowHour <= 21)
//   say = 'Good evening'
// else
//   say = 'Good night';
// const html = `
// <form action="/name/${say}" method="POST">
//   <input type="text" name="name" placeholder="이름을 적어주세요">
//   <button>확인</button>
// </form>`;
// router.get('/',(req, res) => {
//   res.send(html);
// });
// //router.route('/name/:say').post((req, res) => {
// router.post('/name/:say',(req, res) => {
//   const paramName = req.body.name;
//   const paramHello = req.params.say;
//   console.dir(req.params);
//   res.writeHead(200,{'content-Type':'text/html;charset=utf8'})
//   res.write(`${nowHour}시입니다.`)
//   res.write(`<br>${paramHello}, ${paramName} 님`);
//   res.end()
// });
// router 모듈 export
module.exports = router;
// router.get('/', () => {
  
// })
