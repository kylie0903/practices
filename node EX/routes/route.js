const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');

router.get('/', (req, res) => {
  res.render('newMemo');
});
router.post('/writeMemo', (req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let cont = param['content'];
  let name = param['name'];
  db.insertMemo(cont,name,()=>{
    res.redirect('/');
  })
})

router.get('/sub1', (req, res) => {
  // res.render('sub1');
  db.getMemo((rows1,rows2, index) => {
    res.render('sub1',{rows1:rows1,rows2:rows2});
  })
});

router.get('/updateM', (req, res) => {
  let id = req.query.id;
  console.log(id)
  db.getMemoByid(id, (row) => {
    res.render('updateMemo', { row: row[0] })
  })
})

router.post('/updates', (req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['id'];
  let cont = param['content'];
  let name = param['name'];
  db.updateMemo(id,cont,name,()=>{
    res.redirect('/');
  })
})
router.get('/content', (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.getMemoByid(id, (row) => {
    res.render('content', { row: row[0] })
  })
  
})

router.get('/deleteM', (req, res) => {
  let id = req.query.id;
  console.log(id)
  db.deleteByid(id, () => {
    res.redirect('/sub1')
  })
});

// try {
//   fs.readFileSync('../public/uploads/'); //폴더가 있으면 사용
// } catch(err) {
//   console.log('폴더가 존재하지 않습니다.');
//   fs.mkdirSync('../public/uploads/'); //폴더를 생성
// }

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, '../public/uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);//파일의 확장자
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);//파일명 + 날짜 + 확장자명
    }
  }),
  limits :{fileSize: 1024 * 1024 * 2} //2메가까지 업로드 가능
})
router.get('/thumwrite', (req,res) => {
  res.render('thumwrite');
});
router.post('/productW',upload.single('product_img'),(req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let img = 'uploads/' + req.file.filename;
  let name = param['product_name'];
  let price = param['product_price'];
  db.insertProduct(img, name, price, () => {
    res.redirect('/');
  })
})
router.get('/join', (req, res) => {
  res.render('join')
})
router.post('/memberJoin', (req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let name = param['name'];
  let address = param['address'];  
  let birth = param['birth'];
  let id = param['id'];
  let pw = param['pw'];
  let repw = param['repw'];
  console.log(name);
  console.log(address);
  console.log(birth);
  console.log(id);
  console.log(pw);  
  console.log(repw);
  // res.render('sub1.ejs', {'data': param});
  db.memberJoin(name,address,birth,id,pw,() => {
    res.redirect('/');
  })
})
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/loginE', (req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param['user_id'];
  let pw = param['user_pw'];
  db.loginCheck(id,pw,(results)=>{
    // res.redirect('/');
    if (results.length>0) {
      res.redirect('/');
    } else {
      res.send(`<script>alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>`)
    }
  })
})



module.exports = router;
