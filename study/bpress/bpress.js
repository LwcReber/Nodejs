const http = require('http')
const url = require('url')
const {EventEmitter} = require('events')
const router = []
class Application extends EventEmitter {
  get (path, handler) {
    if (typeof path === 'string') {
      router.push({
        path,
        method: 'get',
        handler
      })
    }
  }

  listen () {
    const server = http.createServer((req, res) => {
      const {pathname} = url.parse(req.url, true)
      for (const route of router) {
        const {path, method, handler} = route
        if (pathname === path && req.method.toLowerCase() === method) {
          return handler(req, res)
        }
      }
    })
    server.listen(...arguments)
    process.on("uncaughtException", err => {
      console.log('err', err)
    })
  }
}

module.exports = function createApplication () {
  return new Application()
}