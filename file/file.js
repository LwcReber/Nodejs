 var fs = require('fs');

console.log('准备打开文件');
// 异步打开文件
// fs.open('input.txt', 'r+', function(err, fd) {
//   if(err) {
//     return console.error(err);
//   }
//   console.log('文件打开成功');
// })
//

// 获取文件信息

fs.stat('input.txt', function (err, stats) {
  if(err) {
    return console.error(err);
  }
  console.log(stats);
  console.log('读取文件信息成功');

  // 检测文件类型
  console.log('是否为文件'+ stats.isFile());
  console.log('是否为目标'+ stats.isDirectory());
})
