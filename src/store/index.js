import { Store, install } from 'vuex';
import Vue from 'vue';
import banner from './banner.js';
import setting from './setting';
import about from './about';
import project from './project';
if (!window.Vuex) {
  install(Vue);
}
const store = new Store({
  modules: {
    banner,
    setting,
    about,
    project
  },
  strict: true //开启严格模式
});
export default store;
