<template>
  <div>
    <RighrList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RighrList from './';

export default {
  components: {
    RighrList
  },
  data() {
    return {
      list: [
        {
          name: '王德发',
          isSelect: false,
          children: [
            { name: '王大发的哇u哇', isSelect: false },
            { name: '你是微贷网嘎无敌阿无敌打完', isSelect: false }
          ]
        },
        { name: 'b', isSelect: true },
        { name: 'c', isSelect: false },
        { name: 'd', isSelect: false },
        { name: 'e', isSelect: false }
      ]
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>

<style></style>
