export default {
  name: "test",
  state: {
    list: []
  },
  reducers: {
    getAppList(state, action) {
      return state;
    }
  },
  effects: {
    async getAppList() {
      const ret = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(100);
        }, 100);
      });

      return ret;
    }
  }
};
