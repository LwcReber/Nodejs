
/**
 * 管道流
 */
 var fs = require('fs');

 // 创建一个可读流
 var readerStream = fs.createReadStream('pipInput.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('pipOut.txt');

// 管道读写操作
// 读取pipInput.txt文件内容，并将内容写入到pipOut.txt文件中
readerStream.pipe(writerStream);

console.log('执行完毕');
