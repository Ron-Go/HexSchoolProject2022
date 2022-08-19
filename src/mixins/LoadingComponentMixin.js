// 作為元件使用
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  data() {
    return {
    // vue-loading-overlay
      isLoading: false,
      loader: 'dots',
      fullPage: false,
      color: '#fd5f00',
    };
  },
  components: {
    Loading,
  },
};
