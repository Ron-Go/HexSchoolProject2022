<template lang="">
  <div class="position-relative" style="height: 80vh">
    <Loading
    :active="isLoading"
    :loader="loader"
    :is-full-page="fullPage"
    :color="color"
    ></Loading>
  </div>
  <!-- toastMessage -->
  <toastMessage></toastMessage>
</template>
<script>
// 引入toastMessage
import toastMessage from '@/components/ToastsMessage.vue';
// 引入vue-loading-overlay
import LoadingComponent from '@/mixins/LoadingComponentMixin';

export default {
  components: {
    toastMessage,
  },
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      this.isLoading = true;
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then((res) => {
          this.isLoading = false;
          // 跳頁到登入頁面
          this.$httpToastMessage(res, '登出系統');
          this.$router.push('/login/check');
        })
        .catch((err) => {
          this.$httpToastMessage(err.response, '登出系統');
          this.isLoading = false;
          // 返回登出的上一頁
          setTimeout(() => {
            this.$router.go(-1);
          }, 5000);
        });
    },
  },
  mixins: [LoadingComponent],
};
</script>
<style lang=""></style>
