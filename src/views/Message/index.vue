<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`（${data.total}）`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea';
import fetchData from '@/mixins/fetchData.js';
import * as msgApi from '@/Api/message.js';
import mainScroll from '@/mixins/mainScroll.js';
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll('messageContainer')],
  components: {
    MessageArea
  },
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
    async fetchData() {
      return msgApi.getMessage(this.page, this.limit);
    },
    async handleSubmit(data, callback) {
      const resp = await msgApi.postMessage({ ...data });
      callback('感谢您的留言');
      this.data.rows.unshift(resp);
      this.data.total++;
    },
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
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
