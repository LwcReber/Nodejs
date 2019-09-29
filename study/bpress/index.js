const express = require('./bpress')
console.log(express)
const app = express()
app.get('/', (req, res) => {
  res.end('hello world')
})

app.listen(3000, () => {
  console.log('example app listnen at 3000');
  
})