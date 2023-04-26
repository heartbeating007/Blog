// // 事件总线
// const listeners = {};
// // listeners = {
// //   // 事件：监听者
// //   eventName1: [handler1, handler2, handler3],
// //   eventName2: [handler1, handler2, handler3]
// // };

// export default {
//   // 监听一个组件
//   $on(eventName, handler) {
//     // 如果listeners里面没有eventName这个事件，就创建一个
//     if (!listeners[eventName]) {
//       listeners[eventName] = new Set();
//     }
//     // 把监听者函数加入到listeners[eventName]里面去
//     listeners[eventName].add(handler);
//   },
//   // 取消监听事件
//   $off(eventName, handler) {
//     //   如果里面没有handler监听者就直接返回
//     if (!listeners[eventName]) {
//       return;
//     }
//     //   有监听者，就把handler监听者删除
//     listeners[eventName].delete(handler);
//   },
//   //   触发一个事件
//   $emit(eventName, ...args) {
//     //   如果没有这个事件就返回
//     if (!listeners[eventName]) {
//       return;
//     }
//     //   如果有这个事件，就把每一个监听者函数执行一遍，并且把数据给他
//     for (const handler of listeners[eventName]) {
//       handler(...args);
//     }
//   }
// };

// Vue实例里面本来就有上面三个方法

import Vue from 'vue';
const app = new Vue();
Vue.prototype.$bus = app;

export default app;

// 也可以直接导出一个vue实例来实现
