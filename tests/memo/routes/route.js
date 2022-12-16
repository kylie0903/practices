var express = require('express');
var router = express.Router();
const fs = require('fs');
// const { check, validationResult } = require('express-validator');
//const db = require('./../db.js');

// router.get('/', (req, res) => {
//         res.render('memo')
//     //res.send('test');
// });

//페이지 연결
router.get('/', (req, res) => {
    res.render('newMemo')
});

// router.post('/store',
//   [check('content').isLength({ min: 1, max: 300 })],
//   function textMemo(req, res, next) {
//   let errs = validationResult(req);
//   console.log(errs);//콘솔 에러 출력하기
//   if(errs['errors'].length > 0){ //화면에 에러 출력하기 
//     res.render('newMemo',{errs:errs['errors']});
//   }else{
//       let param = JSON.parse(JSON.stringify(req.body));
//       let content = param['content'];
//       let title = param['title'];
//       let authur = param['authur'];
//     // db.insertMemo(content,authur,title, () =>{
//     //   res.redirect('/');
//     // });
//   }
//     });

router.get('/updateMemo', (req, res) => {
    let id = req.query.id;
    console.log(id);
    // db.getMemoById(id, (row) => {
    //     if (typeof id === 'undefined' || row.length <= 0) {
    //         res.status(404).json({ error: 'undefinde memo' });
    //     } else {
    //         res.render('updateMemo', { row: row[0] });
    //     }
    // })
});



router.post('/updateMemo',
    [check('content').isLength({ min: 1, max: 300 })],
    (req, res) => {
        //let errs = validationResult(req);
        let param = JSON.parse(JSON.stringify(req.body));
        let id = param['id'];
        let content = param['content'];
        let title = param['title'];
        console.log(id+content+title)

        // if (errs['errors'].length > 0) {
        //     db.getMemoById(id, (row) => {
        //         res.render('updqateMemo', { row: row[0], errs: errs['errors'] })
        //     })
        // } else {
        //     db.updateMemoById(id, content, title,() => {
        //         res.redirect('/');
        //     })
        // }
    });
// router.get('/deleteMemo', (req, res) => {
//     let id = req.query.id;
//     db.deleteMemoById(id, () => {
//         res.redirect('/');
//     });
// });


module.exports = router;