<template>
  <div class="app">
    <Empty />
  </div>
</template>

<script>
import Empty from './index';

export default {
  components: {
    Empty
  }
};
</script>

<style>
.app {
  width: 500px;
  height: 500px;
  margin: auto;
  border: 1px solid #f40;
  position: relative;
}
</style>
