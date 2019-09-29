const os = require('os')
const mem = os.freemem() / os.totalmem() * 100
console.log('内存使用率', mem.toFixed(2), '%')

const cpuStat = require('cpu-stat')
cpuStat.usagePercent((err, percent) => {
  console.log(`cup占用，${percent.toFixed(2)}%`);
  
})