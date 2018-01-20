var http = require('http');
http.createServer (function (request, respone) {
  console.log(111);
  respone.writeHead(200, {'Content-Type': 'text/plain'});
  respone.end('Hello world\n');
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
