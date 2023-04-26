<template>
  <div class="site-aside-container">
    <template v-if="data">
      <Avatar :url="data.avatar" :size="150" />
      <h1>{{ data.siteTitle }}</h1>
    </template>
    <Menu />
    <Contact v-if="data" />
    <p v-if="data">{{ data.icp }}</p>
  </div>
</template>

<script>
import Contact from './Contact';
import Menu from './Menu';
import Avatar from '@/components/Avatar';
import { mapState } from 'vuex';
export default {
  components: {
    Contact,
    Menu,
    Avatar
  },
  computed: {
    ...mapState('setting', ['data'])
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.site-aside-container {
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
  .avatar-container {
    margin: 0 auto;
  }
  h1 {
    font-size: 1.2em;
    color: #fff;
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 12px;
  }
}
</style>
