var mysql      = require('mysql');
var connection =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database:'1128'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// memo를 추출 할때
function getMemo(callback) {
  connection.query('SELECT * FROM memotable order by id desc', (err, rows) => {
    if (err) throw err;
    callback(rows);
  })
};
function insertMemo(cont, name,img, callback) {
  connection.query(`insert into memotable(create_time,name,cont,img) values(NOW(),'${name}','${cont}','${img}')`, (err) => {
    if(err) throw err;
    callback();
  })
}

function insertJoin(name, address, birth, id, pw, callback) {
  connection.query(`insert into member(create_time,name,user_id,user_pw,user_add, user_birth) values(NOW(),'${name}','${id}','${pw}','${address}','${birth}')`, (err) => {
    if(err) throw err;
    callback();
  })
}

function checkIdPw(username,password, callback) {
  connection.query(`SELECT * FROM member WHERE user_id ='${username}' AND user_pw = '${password}'`,(err, results) => {
          console.log(results)
          if (err) throw err;
          callback(results);
  })
};
module.exports = {
  getMemo,insertMemo,insertJoin,checkIdPw
}