<template>
  <div class="empty-container">
    <Icon :Font="'empty'" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
import Icon from '../Icon';
export default {
  components: {
    Icon
  },
  props: {
    text: {
      type: String,
      default: '无数据'
    }
  }
};
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_2164449_nalfgtq7il.css';
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
.empty-container {
  .self-center();
  color: @gray;
  text-align: center;
}
.icon-container {
  font-size: 172px;
}
</style>
