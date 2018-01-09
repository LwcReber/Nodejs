var events = require('events');
var eventEmitter = new events.EventEmitter();
//
// event.on('some_event', function () {
//   console.log('some_event事件触发');
// })
// setTimeout(function() {
//   event.emit('some_event');
// }, 1000)
//
var listener1 = function listener1() {
  console.log('监听listener1执行');
}

var listener2 = function listener2() {
  console.log('监听listener2执行');
}
// 绑定listener1事件，处理函数为listener1
eventEmitter.addListener('connection', listener1);

// 绑定listener2事件，处理函数listener2
eventEmitter.addListener('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');

console.log(eventListeners + ' 个监听器监听连接事件');

// 处理connection事件
eventEmitter.emit('connection');

// 移除监听绑定的listener1函数
eventEmitter.removeListener('connection', listener1);
console.log('listener1不再受监听');

//触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + '个监听器连接事件');

console.log('程序执行完毕');
