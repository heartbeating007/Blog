<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from './index.vue';
export default {
  components: {
    Contact
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/global.less';
.test-container {
  height: 200px;
  width: 200px;
  margin: 100px auto;
  border: 2px solid #008c8c;
  background: black;
  padding: 100px 10px;
}
</style>
