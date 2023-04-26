<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`(${data.total})`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData.js';
import { getComments, postComment } from '@/Api/blog.js';

export default {
  components: {
    MessageArea
  },
  mixins: [fetchData({ total: 0, rows: [] })],
  data() {
    return {
      page: 1,
      limit: 10
    };
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll);
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 正在加载;
        return;
      }
      const range = 100;
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(formData, callback) {
      console.log({ ...formData });

      // 提交评论
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...formData
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback('评论成功'); // 告诉子组件，我这边处理完了
    }
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    }
  }
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  margin: 30px 0;
}
</style>
