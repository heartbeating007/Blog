<template>
  <Layout>
    <BlogList />
    <template #right>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout';
import BlogCategory from '@/views/Blog/components/BlogCategory';
import BlogList from '@/views/Blog/components/BlogList';
export default {
  components: {
    Layout,
    BlogCategory,
    BlogList
  }
};
</script>

<style></style>
