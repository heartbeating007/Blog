<template>
  <div @click="handleClick" v-show="show" class="to-top-contaniner">Top</div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (!dom) {
        this.show = false;
        return;
      }
      this.show = dom.scrollTop >= 500;
    },
    handleClick() {
      // 回到顶部
      this.$bus.$emit('setMainScroll', 0);
    }
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.to-top-contaniner {
  background: @primary;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  position: fixed;
  right: 50px;
  bottom: 50px;
  z-index: 99;
  color: #fff;
  cursor: pointer;
}
</style>
