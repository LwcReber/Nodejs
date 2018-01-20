
/**
 * 链式流-- 解压文件
 */

 var fs  = require('fs');

 var zlib = require('zlib');

 // 解压input.txt.gz文件为guninput.txt
 fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('guninput.txt'));
console.log('解压完成');
