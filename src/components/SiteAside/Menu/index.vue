<template>
  <nav class="menu-container">
    <!-- vue-router提供了全局的组件RouterLink，
    它的渲染结果是一个a元素 -->
    <!-- 为了避免刷新页面，vue-router实际上为它添加了点击事件，
    并阻止了默认行为，
    在事件内部使用hitory api更改路径 -->
    <RouterLink
      :exact="itme.exact"
      v-for="itme in items"
      :key="itme.title"
      :to="{ name: itme.name }"
      active-class="selected"
      exact-active-class=""
    >
      <div class="icon">
        <Icon :Font="itme.icon" />
      </div>
      <span>{{ itme.title }}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  components: {
    Icon
  },
  data() {
    return {
      items: [
        {
          name: 'Home',
          title: '首页',
          icon: 'home',
          exact: true
        },
        {
          name: 'Blog',
          title: '文章',
          icon: 'blog',
          exact: false // 激活状态是否要精确匹配
        },
        {
          name: 'About',
          title: '关于我',
          icon: 'about',
          exact: true
        },
        {
          name: 'Project',
          title: '项目&效果',
          icon: 'code',
          exact: true
        },
        {
          name: 'Message',
          title: '留言板',
          icon: 'chat',
          exact: true
        }
      ]
    };
  },
  methods: {
    isSelected(itme) {
      const path = itme.link.toLowerCase();
      const link = location.pathname.toLowerCase();
      if (itme.exact) {
        return link.startsWith(path);
      } else {
        return path === link;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.menu-container {
  margin: 24px 0;
  color: @gray;
  a {
    &.selected {
      background: darken(@words, 3%);
    }
    display: flex;
    padding: 0 50px;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>
