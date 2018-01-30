## 使用nodejs的express框架作为后端，结合mysql，前后端分离，前端框架jquery，实现登录注册基本功能
需要开启数据库，手动创建userlist表，需要手动开启前后端服务，本项目后端端口8081，前端服务端口3000，请求server.js的接口

### nodejs 设置cookie问题
* 查找发现是跨域问题导致无法设置
* 解决办法
  1. nodejs server.js 代码
  把```Access-Control-Allow-Origin```原来的```*```设置为 前端的域名，本项目使用本地服务所以设置的是localhost
  ``` bash
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  ```
  设置```Access-Control-Allow-Credentials```为true
  ``` bash
    res.header('Access-Control-Allow-Credentials', true);
  ```
  2. 修改前端ajax请求配置
  ``` bash  
    xhrFields: {
      withCredentials: true
    }
  ```
  3. 开启上面两点后，可以使用nodejs操作cookie，并且可以在浏览器上查看到cookie
  ``` bash
  res.cookie('name', 'Tom' , { maxAge: new Date(Date.now() + 900000), httpOnly: false });
  ```
