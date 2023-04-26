<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handlemousemove"
    @mouseleave="handlemouseleave"
  >
    <div class="ImageLoader-container" ref="image" :style="imagePosition">
      <ImageLoader
        @load="showWords"
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="description" ref="description">
      {{ carousel.description }}
    </div>
  </div>
</template>

<script>
import ImageLoader from '@/components/ImageLoader';
export default {
  props: ['carousel'],
  data() {
    return {
      titleWidth: 0,
      descriptionWidth: 0,
      containerSize: null, //外层容器的尺寸
      innerSize: null, //里面图片的尺寸
      mouseX: 0, //鼠标在容器内横坐标
      mouseY: 0 //鼠标在容器内纵坐标
    };
  },
  components: {
    ImageLoader
  },
  computed: {
    // 得到图片坐标
    imagePosition() {
      if (!this.innerSize || !this.containerSize) return;
      const extraWidth = this.innerSize.width - this.containerSize.width; //图片宽度-容器宽度 多出的宽度
      const extraHidth = this.innerSize.height - this.containerSize.height; //多出的高度
      const left = (
        (-extraWidth / this.containerSize.width) *
        this.mouseX
      ).toFixed(2);
      const top = (
        (-extraHidth / this.containerSize.height) *
        this.mouseY
      ).toFixed(2);
      return {
        transform: `translate(${left}px, ${top}px)`
      };
    },
    // 容器的中心点位置
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2
      };
    }
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descriptionWidth = this.$refs.description.clientWidth;
    this.setSize();
    // 设置一开始鼠标的位置
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener('resize', this.setSize);
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize);
  },
  methods: {
    // 调用该方法显示文字
    showWords() {
      // 标题
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 强行渲染一次
      this.$refs.title.clientWidth;
      this.$refs.title.style.transition = '1s';
      this.$refs.title.style.width = this.titleWidth + 'px';
      // 描述文字
      this.$refs.description.style.opacity = 1;
      this.$refs.description.style.width = 0;
      // 强行渲染一次
      this.$refs.description.clientWidth;
      this.$refs.description.style.transition = '2s 1s';
      this.$refs.description.style.width = this.descriptionWidth + 'px';
    },
    // 得到容器和图片的尺寸
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight
      };
    },
    // 得到鼠标在容器里的位置坐标
    handlemousemove(e) {
      const rect = this.$refs.container.getBoundingClientRect();
      this.mouseX = e.clientX - rect.x;
      this.mouseY = e.clientY - rect.y;
    },
    handlemouseleave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .ImageLoader-container {
    height: 110%;
    width: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }
  .title,
  .description {
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    letter-spacing: 3px;
    left: 30px;
    color: #fff;
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  }
  .title {
    top: calc(50% - 40px);
    font-size: 2em;
  }
  .description {
    top: calc(50% + 20px);
    font-size: 1.2em;
    color: lighten(@gray, 20%);
  }
}
</style>
