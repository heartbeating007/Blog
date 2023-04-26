<template>
  <div class="blog-list-container" ref="container" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id
              }
            }"
          >
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink
            :to="{
              name: 'BlogDetail',
              params: {
                id: item.id
              }
            }"
          >
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ formatDate(item.createDate) }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <RouterLink
              :to="{
                name: 'CategoryBlog',
                params: {
                  CategoryId: item.category.id
                }
              }"
              >{{ item.category.name }}</RouterLink
            >
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <Empty v-if="data.rows.length === 0 && !isLoading" />
    <!-- 分页放到这里 -->
    <div class="pager-container">
      <Pager
        v-if="data.total"
        :current="routeInfo.page"
        :total="data.total"
        :visibleNumber="10"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import Pager from '@/components/Pager';
import fetchData from '@/mixins/fetchData.js';
import mainScroll from '@/mixins/mainScroll.js';
import { getBlogs } from '@/Api/blog.js';
import { formatDate } from '@/utils';
import Empty from '@/components/Empty';
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('container')],
  components: {
    Pager,
    Empty
  },

  methods: {
    formatDate,
    async fetchData() {
      const result = await getBlogs(
        this.routeInfo.page,
        this.routeInfo.limit,
        this.routeInfo.CategoryId
      );
      for (let item of result.rows) {
        item.thumb = 'http://localhost:7001' + item.thumb;
      }
      return result;
    },
    handlePageChange(newPage) {
      const query = {
        page: newPage,
        limit: this.routeInfo.limit
      };
      // 跳转到 当前的分类id 当前的页容量 newPage
      if (this.routeInfo.CategoryId === -1) {
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
            CategoryId: this.routeInfo.CategoryId
          }
        });
      }
    }
  },

  computed: {
    // 获取路由信息
    routeInfo() {
      const CategoryId = +this.$route.params.CategoryId || -1;
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
      return {
        CategoryId,
        page,
        limit
      };
    }
  },
  watch: {
    async $route() {
      this.isLoading = true;
      // 滚动高度为0
      this.$refs.container.scrollTop = 0;
      this.data = await this.fetchData();
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
.pager-container {
  margin: 20px;
}
</style>
