const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

//   生成环境production
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    devtool: 'none', //去除源码地图
    // 通过 configureWebpack 选项，可对 webpack 进行额外的配置
    // 该配置最终会和 vue-cli 的默认配置进行合并（webpack-merge）
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios'
    },
    plugins: [new BundleAnalyzerPlugin()]
  };
} else {
  module.exports = {};
}
