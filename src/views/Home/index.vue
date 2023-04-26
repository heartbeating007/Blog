<template>
  <div
    v-loading="loading"
    class="home-container"
    ref="container"
    @wheel="hanldleWheel"
  >
    <ul
      @transitionend="hanldleTransitionEnd"
      class="carousel-container"
      :style="{
        marginTop
      }"
    >
      <li v-for="itme in data" :key="itme.id">
        <CarouselItem :carousel="itme" />
      </li>
    </ul>
    <div v-show="index > 0" class="icon icon-Up" @click="switchTO(index - 1)">
      <Icon Font="arrowUp" />
    </div>
    <div
      class="icon icon-Down"
      v-show="index < data.length - 1"
      @click="switchTO(index + 1)"
    >
      <Icon Font="arrowDown" />
    </div>
    <ul class="indicator">
      <li
        @click="switchTO(i)"
        v-for="(item, i) in data"
        :key="item.id"
        :class="{
          active: i === index
        }"
      ></li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from './CarouselItem.vue';
import Icon from '@/components/Icon';
import { mapState } from 'vuex';

export default {
  // 组件混入

  components: {
    CarouselItem,
    Icon
  },
  data() {
    return {
      index: 0, //当前显示的第几张轮播图
      containerHight: 0, //当前容器的高度
      switching: false //是否正在滚动
    };
  },
  created() {
    this.$store.dispatch('banner/fetchBanner');
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHight + 'px';
    },
    ...mapState('banner', ['loading', 'data'])
  },
  mounted() {
    this.containerHight = this.$refs.container.clientHeight;
    // 窗口尺寸调整时，获取最新窗口高度
    window.addEventListener('resize', this.handleResize);
  },

  methods: {
    //切换轮播图
    switchTO(i) {
      this.index = i;
    },
    hanldleTransitionEnd() {
      this.switching = false;
    },
    handleResize() {
      this.containerHight = this.$refs.container.clientHeight;
    },
    hanldleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY < -5 && this.index > 0) {
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.data.length - 1) {
        this.switching = true;
        this.index++;
      }
    }
  },
  // 组件销毁时清除事件

  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/mixin.less';
@import '~@/styles/var.less';
.home-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}
.carousel-container {
  height: 100%;
  width: 100%;
  transition: 500ms;
  li {
    height: 100%;
    width: 100%;
  }
}
.icon {
  cursor: pointer;
  .self-center();
  font-size: 30px;
  transform: translateX(-50%);
  color: @gray;
  &.icon-Up {
    top: 25px;
    animation: jump-Up 2s infinite;
  }
  &.icon-Down {
    top: auto;
    bottom: 25px;
    animation: jump-Down 2s infinite;
  }
  @jump: 10px;
  @keyframes jump-Up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-Down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;

  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    margin-bottom: 10px;
    cursor: pointer;
    border: 1px solid #fff;
    box-sizing: border-box;
    &.active {
      background: #fff;
    }
  }
}
</style>
