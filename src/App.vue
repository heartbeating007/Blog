<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="siteaside">
          <SiteAside />
        </div>
      </template>
      <template #default>
        <div class="main">
          <!-- vue-router 匹配到的组件会渲染到这里 -->
          <RouterView />
          <!--   全局组件，不用单独注册 -->
        </div>
      </template>
    </Layout>
    <ToTop />
  </div>
</template>

<script>
import Layout from './components/Layout';
import SiteAside from './components/SiteAside';
import ToTop from './components/ToTop';
export default {
  components: {
    Layout,
    SiteAside,
    ToTop
  }
};
</script>

<style lang="less" scoped>
@import './styles/mixin.less';
.app-container {
  .self-fill(fixed);
  .siteaside {
    width: 250px;
    height: 100%;
  }
  .main {
    height: 100%;
  }
}
</style>
