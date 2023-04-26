import Vue from 'vue';
import App from './App.vue';
import './styles/global.less';
import router from './router';
import showMessage from './utils/showMessage';
Vue.prototype.$showMessage = showMessage;
// import './mock/index';
import './eventBus.js';

Vue.config.productionTip = false;

// 注册全局指令
import vLoading from './directives/loading.js';
import vLazy from './directives/lazy.js';
Vue.directive('loading', vLoading);
Vue.directive('Lazy', vLazy);

// 注入仓库

import store from './store';
// 一开始触发全局设置
store.dispatch('setting/fetchSetting');
new Vue({
  name: 'heartbeating',
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
