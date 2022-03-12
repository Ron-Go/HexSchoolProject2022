<template lang="">
<div class="position-relative" style="height:90vh" ref="logoutDom">
</div>
</template>
<script>
import loading from '../mixins/MixinLoading';

export default {
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      this.onLoading(this.$refs.logoutDom);
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then(() => {
          this.offLoading();
          // 跳頁到登入頁面
          this.$router.push('/front/login');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mixins: [loading],
};
</script>
<style lang=""></style>
