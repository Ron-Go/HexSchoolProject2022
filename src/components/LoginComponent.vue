<template lang="">
    <div class="container" id="app">
      <div class="position-relative position-absolute top-50 start-50 translate-middle" ref="loginDom">
        <Loading
          :active="isLoading"
          :loader="loader"
          :is-full-page="fullPage"
          :color="color"
        ></Loading>
        <form action="">
          <h3 class="text-center mb-4">登入後台</h3>
          <div class="d-flex flex-column align-items-center mb-4">
            <label for="userEmail">Email address
              <input
                type="email"
                class="form-control"
                id="userEmail"
                placeholder="name@example.com"
                v-model="user.username"
              />
            </label>
          </div>
          <div class="d-flex flex-column align-items-center mb-4">
            <label for="floatingPassword">Password
              <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="user.password"
            />
            </label>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg w-100"
            @click.prevent="login">
            登入
          </button>
        </form>
      </div>
    </div>
    <!-- toastMessage -->
    <toastMessage></toastMessage>
</template>

<script>
// 引入toastMessage 元件
import toastMessage from '@/components/ToastsMessage.vue';
import LoadingComponent from '@/mixins/LoadingComponentMixin';

export default {
  name: 'AdminComponent',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      api: {
        // url: 'https://vue3-course-api.hexschool.io/v2',
        // path: 'vue2022ron',
        url: process.env.VUE_APP_API,
        path: process.env.VUE_APP_PATH,
      },
      // vue-loading-overlay
      // loader: {},
      // fullPage: false,
    };
  },
  components: {
    toastMessage,
  },
  mounted() {
  },
  methods: {
    // 登入
    login() {
      // 開始loading
      // this.onLoading();
      this.isLoading = true;
      this.axios
        .post(`${this.api.url}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          // 把token、expired存入cookie
          document.cookie = `myToken = ${token}; expires = ${new Date(expired)};`;
          // 停止vue-loading
          // this.offLoading();
          // 跳頁到後台管理頁面
          this.$router.push('/admin/product');
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
          // this.offLoading();
          this.isLoading = false;
        });
    },
    // 開始vue-loading
    // onLoading() {
    //   this.loader = this.$loading.show({
    //     // Optional parameters
    //     // 若loading圖示只在某元素內出現，isFullPage: false
    //     isFullPage: this.fullPage,
    //     // isFullPage = false，所以container: this.$refs DOM元素
    //     container: this.fullPage ? null : this.$refs.loginDom,
    //     canCancel: true,
    //     onCancel: this.onCancel,
    //     loader: 'dots',
    //     width: 64,
    //     height: 64,
    //     backgroundColor: '#ffffff',
    //     opacity: 0.5,
    //   });
    // },
    // // 結束vue-loading
    // offLoading() {
    //   setTimeout(() => {
    //     this.loader.hide();
    //   }, 1000);
    // },
  },
  mixins: [LoadingComponent],
};
</script>
<style lang="">
</style>
