
// const add = (x, y) => x + y
// const square = z => z * z
// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach(fn => {
//     ret = fn(ret)
//   })
//   console.log(ret)
//   return ret
// }
// const fn = compose(add, square)
// console.log(fn)
// console.log(fn(1, 2))

function compose(middlewares) {
  return function() {
    return dispatch(0)
    function dispatch(i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      // resolve以后，把下一个函数作为回调继续进行下一个函数执行
      return Promise.resolve(
        fn(function next() {
          return dispatch(i+1)
        })
      )
    }
  }
}

async function fn1 (next) {
  console.log('fn1')
  await next()
  console.log('end fn1');
}

async function fn2 (next) {
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2');
}

async function fn3 (next) {
  console.log('fn3')
}
function delay() {
  return Promise.resolve(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()
