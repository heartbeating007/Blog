import Vue from 'vue';
import VueRouter from 'vue-router';

if (!window.VueRouter) {
  Vue.use(VueRouter); //使用一个vue插件
}

import routes from './routes';
import { titleController } from '@/utils';
const router = new VueRouter({
  routes, //路由匹配规则
  mode: 'history' //路由匹配模式
});
// 路由确认过后设置标题
router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});
export default router;
