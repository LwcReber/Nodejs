var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'user'
});


connection.connect();
// 数据库-查操作
var sql = 'SELECT * FROM websites';
connection.query(sql, function(err, res, fils) {
  if(err) {
    console.log('[SELECT ERROR] - ', err.message);
  }
  console.log('-------------------------------------');
  console.log(res);
  console.log('---------------------------------------\n\n');
})

// // 数据库-增操作
// var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
// var addSqlParams = ['百度','www.baidu.com', '23456', 'CN'];
// connection.query(addSql, addSqlParams, function(err, result) {
//   if(err) {
//     console.log('[INSERT ERROR] - ', err.message);
//     return;
//   }
//   console.log('------------------------------');
//   console.log('INSERT ID:' , result);
//   console.log('---------------------------\n\n');
// })

// // 数据库-改操作
// var modSql = 'UPDATE websites SET name = ?, url=?WHERE ID=?';
// var modSqlParam = ['百度修改', 'http://www.baidu.com', 6];
// connection.query(modSql, modSqlParam, function (err, res) {
//   if(err) {
//     console.log('[UPDATE ERROR] - ' + err.message);
//     return;
//   }
//   console.log('------------------------');
//   console.log('UPDATE ROWS', res.affectedRows);
//   console.log('---------------------------\n\n');
// })

// 数据库-删操作
var delSql = 'DELETE FROM websites WHERE id=6';
connection.query(delSql, function (err, res) {
  if(err) {
    console.log('[DELETE ERROR] - ' + err.message);
    return;
  }
  console.log('------------------------');
  console.log('UPDATE ROWS', res.affectedRows);
  console.log('---------------------------\n\n');
})
connection.end();
