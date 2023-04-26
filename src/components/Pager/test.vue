<template>
  <div>
    <Pager
      :total="total"
      :current="current"
      @pageChange="handlepageChange($event)"
    />
  </div>
</template>

<script>
import '@/styles/global.less';
import Pager from './index.vue';
export default {
  components: {
    Pager
  },
  data() {
    return {
      current: 1,
      total: 1000,
      limit: 10,
      visibleNumber: 10
    };
  },
  methods: {
    handlepageChange(newPage) {
      this.current = newPage;
    }
  }
};
</script>

<style scoped>
@import '~@/styles/global.less';
.pager-container {
  margin: 100px auto;
}
</style>
