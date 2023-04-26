<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from './index.vue';
export default {
  components: {
    SiteAside
  }
};
</script>

<style>
.test-container {
  width: 250px;
  height: 1000px;
}
</style>
