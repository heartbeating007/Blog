<template>
  <div class="pager-container" v-if="PageCount > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }"
      >|&lt;&lt;</a
    >
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handleClick(n)"
      v-for="(n, i) in PageNumber"
      :key="i"
      :class="{ active: current === n }"
      >{{ n }}
    </a>

    <a
      @click="handleClick(current + 1)"
      :class="{ disabled: current === PageCount }"
      >&gt;&gt;</a
    >
    <a
      @click="handleClick(PageCount)"
      :class="{ disabled: current === PageCount }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      // 当前页码
      type: Number,
      default: 1
    },
    total: {
      // 总数据量
      type: Number,
      default: 0
    },
    limit: {
      // 页容量
      type: Number,
      default: 10
    },
    visibleNumber: {
      //可见页码数
      type: Number,
      default: 10
    }
  },
  computed: {
    PageCount() {
      // 总页数
      return Math.ceil(this.total / this.limit);
    },
    PageNumber() {
      // 要显示的数字
      let Numberarr = [];
      for (let i = this.PageMin; i <= this.PageMax; i++) {
        Numberarr.push(i);
      }
      return Numberarr;
    },
    PageMin() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) min = 1;
      return min;
    },
    PageMax() {
      let max = this.PageMin + this.visibleNumber - 1;

      if (max > this.PageCount) max = this.PageCount;
      return max;
    }
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) newPage = 1;
      if (newPage > this.PageCount) newPage = this.PageCount;
      if (newPage === this.current) return;
      //   抛出一个事件，交给父组件处理
      this.$emit('pageChange', newPage);
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.pager-container {
  display: flex;
  justify-content: center;
  a {
    margin: 0 5px;
    color: @primary;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      color: @gray;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
