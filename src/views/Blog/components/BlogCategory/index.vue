<template>
  <div class="blog-category-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from '../RightList';
import fetchData from '@/mixins/fetchData.js';
import { getBlogTypes } from '@/Api/blog.js';
export default {
  mixins: [fetchData([])],
  components: {
    RightList
  },
  computed: {
    CategoryId() {
      return +this.$route.params.CategoryId || -1;
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );
      const result = [
        {
          name: '全部',

          id: -1,
          articleCount: totalArticleCount
        },
        ...this.data
      ];
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.CategoryId,
        aside: `${it.articleCount}篇`
      }));
    },
    limit() {
      return +this.$route.query.limit || 10;
    }
  },
  methods: {
    async fetchData() {
      return await getBlogTypes();
    },

    handleSelect(item) {
      const query = {
        page: 1,
        limit: this.limit
      };
      // 跳转到 当前的分类id 当前的页容量 newPage
      if (item.id === -1) {
        // 当前没有分类
        // /blog?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: 'Blog',
          query
        });
      } else {
        // 当前有分类
        // /blog/cate/${this.routeInfo.categoryId}?page=${newPage}&limit=${this.routeInfo.limit}
        this.$router.push({
          name: 'CategoryBlog',
          query,
          params: {
            CategoryId: item.id
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
