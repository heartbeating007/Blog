<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px'
    }"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String, //必须是字符串
      required: true //必须传递
    },
    size: {
      type: Number,
      default: 150 // 不传递则使用默认值
    }
  }
};
</script>

<style scoped>
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
