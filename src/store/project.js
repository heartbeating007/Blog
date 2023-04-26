import { getProject } from '@/Api/project';
export default {
  namespaced: true,
  state: {
    loading: false,
    data: []
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    async fetchProject(ctx) {
      if (ctx.state.data.length) {
        return;
      }
      ctx.commit('setLoading', true);
      const resp = await getProject();
      for (var item of resp) {
        item.thumb = 'http://localhost:7001' + item.thumb;
        item.qqQrCode = 'http://localhost:7001' + item.qqQrCode;
        item.weixinQrCode = 'http://localhost:7001' + item.weixinQrCode;
      }

      ctx.commit('setData', resp);
      ctx.commit('setLoading', false);
    }
  }
};
