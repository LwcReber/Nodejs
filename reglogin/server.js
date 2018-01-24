var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// 创建application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'user'
});

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

connection.connect();
// 数据库-查操作 查询用户是否已经存在
const checkExist = function (name) {
  return new Promise(function(resolve, reject) {
    let sql = `SELECT name FROM userlist WHERE name='${name}'`;
    connection.query(sql, function(err, res, fils) {
      if(err) {
        console.log('[SELECT ERROR] - ', err.message);
        return reject(err);
      }
      return resolve(res);
    })
  });
};

// mysql 增操作
const addUser = function (param) {
  return new Promise(function(resolve, reject) {

    checkExist(param.body.name)
      .then(function(result) {
        if(result.length == 0) {
          // 防止中文乱码
          connection.query("set names utf8");
          let addSql = `INSERT INTO userlist(id,name,password) VALUES(0,'${param.body.name}', '${param.body.password}')`;
          connection.query(addSql, function(err, result) {
            if(err) {
              console.log('[INSERT ERROR] - ', err.message);
              return reject(err);
            }
            return resolve({code: 200});
          })
        } else {
          return resolve({code: -1});
        }
      })
      .catch(function(err) {
        return reject(err);
      })


  });
}

app.post('/process_post', urlencodedParser, function (req, res) {
  // 输出json格式
  // 数据直接放在sql语法中
  let param = req;

  addUser(param)
  .then(function(data) {
    console.log('写入成功');
    if (data.hasOwnProperty("code")) {
      if(data.code == -1 ) {
        res.end(JSON.stringify({msg: '该用户名已被注册'}));
      } else {
        res.end(JSON.stringify({msg: '注册成功'}));
      }
    }
  })
  .catch(function(err) {
    console.log(err);
    res.end(JSON.stringify({msg: err}));
  })

})

var server  = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例， 访问地址为 http://%s:%s', host, port);
})
