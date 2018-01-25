var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(cookieParser());
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
/**
 * anonymous function - 数据库-查操作
 *
 * @param  {type} param  查询的数值
 * @param  {String} sqlSyn sql语法  可选
 * @return {type}        description
 */
const checkExist = function (param, sqlSyn) {
  return new Promise((resolve, reject) => {
    // 防止中文乱码
    connection.query("set names utf8");
    let sql = sqlSyn || `SELECT name FROM userlist WHERE name='${param.body.name}'`;
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
  return new Promise((resolve, reject) => {
      // 防止中文乱码
      connection.query("set names utf8");
      //数据库设置id需要自动增加
      let addSql = `INSERT INTO userlist(id,name,password, surepsw) VALUES(0,'${param.body.name}', '${param.body.password}', '${param.body.surePsw}')`;
      connection.query(addSql, function(err, result) {
        if(err) {
          console.log('[INSERT ERROR] - ', err.message);
          return reject(err);
        }
        return resolve(result);
      })
  });
}

// 注册接口
app.post('/register', urlencodedParser, (req, res) => {
  // 数据直接放在sql语法中
  let param = req;
  // 是否已经存在该用户
  checkExist(param)
    .then((result) => {
      if(result.length != 0) {
        res.end(JSON.stringify({code: -1, msg: '该用户名已被注册'}));
      } else {
        // 注册该用户
        addUser(param)
        .then( (data) => {
          console.log('写入成功');
          res.end(JSON.stringify({code:200, msg: '注册成功'}));
        })
        .catch((err) => {
          console.log(err);
          res.end(JSON.stringify({msg: err}));
        })
      }
    })
    .catch((err) => {
      res.end(JSON.stringify({msg: err}));
    })
})

// 登录接口
app.get('/login', (req, res) => {
  // 数据直接放在sql语法中
  let param = req;
  // 查询用户名以及密码
  let loginSql = `SELECT name, password FROM userlist WHERE name ='${param.query.name}' AND password ='${param.query.password}'`;
  checkExist({}, loginSql)
    .then((result) => {
      let respone = {code: 200, msg: ''};
      if(result.length == 0) {
        respone = {code: -1, msg: '用户名或密码错误'}
      } else {
        res.cookie('name', param.query.name, { maxAge: new Date(Date.now() + 900000), httpOnly: false });
      }
      res.end(JSON.stringify(respone));
    })
    .catch((err) => {
      res.end(JSON.stringify({msg: err}));
    })
})

var server  = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例， 访问地址为 http://%s:%s', host, port);
})