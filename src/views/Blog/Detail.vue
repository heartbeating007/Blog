<template>
  <Layout>
    <div ref="mainContainer" class="main-container" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>
    <template #right>
      <div class="right-container" :v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>
    </template>
  </Layout>
</template>

<script>
import fetchData from '@/mixins/fetchData.js';
import { getBlog } from '@/Api/blog.js';
import Layout from '@/components/Layout';
import BlogDetail from './components/BlogDetail';
import BlogTOC from './components/BlogTOC';
import BlogComment from './components/BlogComment';
import mainScroll from '@/mixins/mainScroll.js';
import { titleController } from '@/utils';
export default {
  mixins: [fetchData(null), mainScroll('mainContainer')],
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id);
      if (!resp) {
        // 如果没有数据，跳转到404
        this.$router.push('/404');
        return;
      }
      titleController.setRouteTitle(resp.title);
      return resp;
    }
  },

  updated() {
    const hash = location.hash;
    location.hash = '';
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },

  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment
  }
};
</script>
<style lang="less" scoped>
.main-container {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  scroll-behavior: smooth;
}
.right-container {
  position: relative;
  width: 300px;
  height: 100%;
  // overflow-y: scroll;
  box-sizing: border-box;
  padding: 20px;
}
</style>
