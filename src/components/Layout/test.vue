<template>
  <div class="test-container">
    <Layout>
      <template #left>
        <div class="left">左边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
      <div class="main">主区域，宽度占满剩余空间，溢出隐藏</div>
      <template #right>
        <div class="right">右边栏区域，宽度适应内容，溢出隐藏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from './index.vue';
export default {
  components: {
    Layout
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/mixin.less';
.test-container {
  .self-fill(fixed);
}
.left {
  width: 200px;
  height: 100%;
  background: #f40;
}
.right {
  width: 200px;
  height: 100%;
  background: lightgreen;
}
.main {
  background: lightseagreen;
  height: 100%;
}
</style>
>
