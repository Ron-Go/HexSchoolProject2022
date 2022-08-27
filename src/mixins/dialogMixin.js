export default {
  mounted() {
    // 取得對話視窗DOM
    this.dialogModal = document.getElementById('infoModal');
  },
  methods: {
    // 觸發dialog視窗
    showDialog(mode) {
      this.dialogModal.showModal();
      this.dialogMode = mode;
      // 增加zoomin效果
      this.dialogModal.classList.add('animate__animated', 'animate__zoomIn');
      setTimeout(() => {
        // 移除zoomin效果
        this.dialogModal.classList.remove('animate__zoomIn');
        // 增加zoomout效果
        this.dialogModal.classList.add('animate__zoomOut');
      }, 2000);
      setTimeout(() => {
        this.dialogModal.close();
        // 移除zoomout效果
        this.dialogModal.classList.remove('animate__zoomOut');
        this.dialogMode = 0;
      }, 2500);
    },
  },
};
