const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');


router.get('/', (req, res) => {
  console.log(req.session);
   res.render('newMemo',{username:null});
});
router.get('/makeSession', (req, res) => {
    if(req.session.test){
        res.send('세션이 이미 존재');
    }
    else {  
        req.session.test = "test string";
        res.send('세션 생성');
    }
})
try {
	fs.readdirSync('../public/uploads/'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('../public/uploads/'); // 폴더 생성
}
const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null,'../public/uploads/'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname); // 파일의 확장자
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
});
router.get('/mul', (req, res) => {
    res.render('newMemo')
	// res.sendFile(path.join(__dirname, 'multer'));
})
 

// app.post('/up', upload.single('img'), (req, res) => {
//   console.log(req.file); 
// });

router.get('/sub1', (req, res) => {
  // res.render('sub1');
  db.getMemo((rows) => {
    res.render('sub1',{rows:rows});
  })
});
router.post('/upload', upload.single('image'), (req, res) => { // 'image'라는 이름은 multipart.html의 <input type="file" name="image"> 에서 폼데이터 이름으로 온 것이다.
    
    // upload.single('image')의 업로드 정보가 req.file에 넣어진다.
    // <input type="text" name="title"> 의 텍스트 정보가 req.body에 넣어진다.
    console.log(req.file); 
    res.send('ok');
})
router.post('/writeMemo',upload.single('image'), (req,res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let img = '../uploads/'+ req.file.filename; 
  let cont = param['content'];
  let name = param['name'];
  console.log(param);
  console.log(img);
  console.log(name)
  db.insertMemo(cont,name,img,()=>{
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
  db.insertJoin(name,address,birth,id,pw,()=>{
    res.redirect('/');
  })
})
// 로그인 프로세스
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', function (request, res) {
    var username = request.body.id;
  var password = request.body.pwd;
    if (username && password) {            // id와 pw가 입력되었는지 확인        
      db.checkIdPw(username, password, (results) => {   
        
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                // request.session.is_logined = true;      // 세션 정보 갱신
                // request.session.nickname = username;
                // request.session.save(function () {
              console.log('router'+username);
               res.render('newMemo',{username:username}); 
                // });
            } else {              
                response.send(`<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); 
                document.location.href="/login";</script>`);    
            }            
        });

    } else {
        response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
        document.location.href="/login";</script>`);    
    }
});

// 로그아웃
router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});


module.exports = router;
