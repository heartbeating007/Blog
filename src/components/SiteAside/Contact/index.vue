<template>
  <ul class="contact-container">
    <li>
      <a target="_blank" :href="data.github">
        <div class="icon">
          <Icon Font="github" />
        </div>
        <span>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon Font="mail" />
        </div>
        <span>{{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`"
      >
        <div class="icon">
          <Icon Font="qq" />
        </div>
        <span>{{ data.qq }}</span>
      </a>
      <div class="prop"><img :src="`${data.qqQrCode}`" /></div>
    </li>
    <li>
      <a href="">
        <div class="icon weixin">
          <Icon Font="weixin" />
        </div>
        <span>{{ data.weixin }}</span>
      </a>
      <div class="prop"><img :src="`${data.weixinQrCode}`" /></div>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/Icon';
import '@/styles/global.less';
import { mapState } from 'vuex';
export default {
  components: {
    Icon
  },
  computed: {
    ...mapState('setting', ['data'])
  }
};
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  li {
    height: 30px;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      .icon {
        font-size: 26px;
        width: 36px;
      }
      .weixin {
        font-size: 32px;
        text-indent: -3px;
      }
    }
    &:hover {
      .prop {
        transform: scaleY(1);
      }
    }
  }
  .prop {
    position: absolute;
    left: 0;
    bottom: 35px;
    padding: 10px 15px;
    background: #fff;
    border-radius: 5px;
    transform: scaleY(0);
    transform-origin: center bottom;
    transition: 0.3s;
    img {
      width: 150px;
      height: 150px;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 8px;
      height: 8px;
      background: #fff;
      bottom: -4px;
    }
  }
}
</style>
