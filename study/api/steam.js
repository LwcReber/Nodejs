const fs = require('fs')
const rs1 = fs.createReadStream('./test.png')
const ws1 = fs.createWriteStream('./test2.png')
rs1.pipe(ws1)