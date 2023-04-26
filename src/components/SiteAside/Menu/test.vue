<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from './index.vue';
import '@/styles/global.less';
export default {
  components: {
    Menu
  }
};
</script>

<style scoped>
.test-container {
  height: 400px;
  width: 400px;
  margin: 100px auto;
  border: 2px solid #008c8c;
  background: black;
}
</style>
