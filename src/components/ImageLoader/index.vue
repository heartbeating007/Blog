<template>
  <div class="image-loader-container">
    <img
      :src="imgURL"
      @load="handleLoad"
      :style="{ opacity: urlLoaded, transition: `${duration}ms` }"
    />
    <img v-if="!loading" :src="placeholder" class="placeholder" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      urlLoading: false, //原图加载完成
      loading: false //所有工作的加载完成
    };
  },
  computed: {
    urlLoaded() {
      return this.urlLoading ? 1 : 0;
    },
    imgURL() {
      return 'http://localhost:7001' + this.src;
    }
  },
  methods: {
    handleLoad() {
      this.urlLoading = true;
      setTimeout(() => {
        this.loading = true;
        this.$emit('load');
      }, this.duration);
    }
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    .self-fill();
    object-fit: cover;
  }

  .placeholder {
    filter: blur(2vw);
  }
}
</style>
