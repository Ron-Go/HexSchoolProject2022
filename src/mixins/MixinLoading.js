export default {
  methods: {
    // 開始vue-loading
    onLoading(containerDom) {
      this.loader = this.$loading.show({
        // Optional parameters
        // 若loading圖示只在某元素內出現，isFullPage: false
        isFullPage: false,
        // isFullPage = false，所以container: this.$refs DOM元素
        container: containerDom,
        canCancel: false,
        onCancel: this.onCancel,
        loader: 'dots',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.5,
      });
    },
    // 結束vue-loading
    offLoading() {
      setTimeout(() => {
        this.loader.hide();
      }, 0);
    },
  },
};
