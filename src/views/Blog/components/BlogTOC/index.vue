<template>
  <div class="blog-toc-container">
    <h2>目录</h2>

    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from '@/views/Blog/components/RightList';
import { debounce } from '@/utils';
export default {
  props: {
    toc: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeAnchor: ''
    };
  },
  computed: {
    // 根据toc数据得到带有isSelect属性的toc数组
    tocWithSelect() {
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children)
        }));
      };
      return getTOC(this.toc);
    },
    // 得到所有标题元素
    doms() {
      const doms = [];
      const addToDoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            addToDoms(t.children);
          }
        }
      };
      addToDoms(this.toc);
      return doms;
    }
  },
  created() {
    this.setSelectDebounce = debounce(this.setSelect);
    this.$bus.$on('mainScroll', this.setSelectDebounce);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.setSelectDebounce);
  },
  components: {
    RightList
  },

  methods: {
    handleSelect(item) {
      location.hash = item.anchor;
    },
    // 设置选中效果activeAnchor为正确值
    setSelect(scrollDom) {
      if (!scrollDom) return;
      this.activeAnchor = '';
      const range = 100;
      for (const dom of this.doms) {
        if (!dom) {
          continue;
        }
        const top = dom.getBoundingClientRect().top;
        if (top >= 0 && top < range) {
          // 在规定的范围内
          this.activeAnchor = dom.id;
          return;
        } else if (top > range) {
          // 在规定的范围下方

          return;
        } else {
          // 在规定的范围上方
          this.activeAnchor = dom.id;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
