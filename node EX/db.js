var mysql      = require('mysql');
var connection =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: 'memo',
  multipleStatements: true  // 다중쿼리용 설정
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// memo를 추출 할때
function getMemo(callback) {
  connection.query('SELECT * FROM memotable order by id desc;' + 'SELECT * FROM memotable order by id ', (err, rows) => {
    if (err) throw err;
    let rows1 = rows[0];
    let rows2 = rows[1];
    callback(rows1,rows2);
  })
};
//memo를 입력할때
function insertMemo(cont, name, callback) {
  connection.query(`insert into memotable(create_time,name,content) values(NOW(),'${name}','${cont}')`, (err) => {
    if(err) throw err;
    callback();
  })
}
//memo중에 id가 일치하는 데이터만 추출
//id는 primary Key로 같은 값을 갖고 있으면 안됨
function getMemoByid(id, callback) {
  connection.query(`select * from memotable where id=${id}`, (err,row) => {
     if(err) throw err;
    callback(row);
  })
}

//id가 일치하는 부분을 수정하는 함수
function updateMemo(id,cont,name,callback) {
  connection.query(`UPDATE memotable set create_time= now(),name='${name}',content='${cont}' where id=${id}`, (err) => {
    if (err) throw err;
    callback();
  })
}
function deleteByid(id, callback) {
  connection.query(`DELETE from memotable where id=${id}`, (err) => {
    if (err) throw err;
    callback();
  })
}

function insertProduct(img, name, price, callback) {
  connection.query(`INSERT INTO prduct1(create_time,img,name,price) values(NOW(),'${img}','${name}',${price})`, (err) => {
    if (err) throw err;
    callback();    
  })
}

function memberJoin(name, address, birth, id, pw,callback) {
  connection.query(`INSERT INTO member(create_time,name, address, birth, id, pw) values(NOW(),'${name}','${address}','${birth}','${id}','${pw}')`,(err) => {
    if (err) throw err;
    callback();    
  })
}
function loginCheck(id, pw,callback) {
  connection.query(`select * from member where id='${id}' and pw='${pw}'`,(err, results) => {
    if (err) throw err;
    callback(results);    
  })
}

module.exports = {
  getMemo,insertMemo,getMemoByid,updateMemo,deleteByid,insertProduct,memberJoin,loginCheck
}