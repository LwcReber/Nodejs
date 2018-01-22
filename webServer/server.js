var http = require('http');
var fs = require('fs');
var url = require('url');

//创建服务器
http.createServer( function ( request, respone) {
  // 解析请求 包括文件名
  var pathname = url.parse(request.url).pathname;

  // 输出请求的文件名
  console.log('request for' + pathname + 'received.');

  // 从文件系统中读取请求的文件内容
  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
      console.log(err);
      respone.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      respone.writeHead(200, {'Content-Type': 'text/html'});
      respone.write(data.toString());
    }
    respone.end()
  });

}).listen(8080);
console.log('server running at http://127.0.0.1:8080');
