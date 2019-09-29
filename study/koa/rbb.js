const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class KKB {
  constructor () {
    this.middlewares = []
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // 创建上下文环境
      const ctx = this.createContext(req, res)
      const fun = this.compose(this.middlewares)
      // 执行合成中间件
      await fun(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }
  use (middlewares) {
    this.middlewares.push(middlewares)
  } 

  createContext (req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    ctx.req = ctx.request.req = req
    ctx.res = ctx.response.res = res
    return ctx
  }

  compose(middlewares) {
    return function(ctx) {
      return dispatch(0)
      function dispatch(i) {
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        // resolve以后，把下一个函数作为回调继续进行下一个函数执行
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i+1)
          })
        )
      }
    }
  }
  
}
module.exports = KKB