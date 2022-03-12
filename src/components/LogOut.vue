<template lang="">
<<<<<<< HEAD
<div>
</div>
</template>
<script>
=======
<div class="position-relative" style="height:90vh" ref="logoutDom">
</div>
</template>
<script>
import loading from '../mixins/MixinLoading';

>>>>>>> feature/front/login
export default {
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
<<<<<<< HEAD
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then(() => {
=======
      this.onLoading(this.$refs.logoutDom);
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then(() => {
          this.offLoading();
>>>>>>> feature/front/login
          // 跳頁到登入頁面
          this.$router.push('/front/login');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
<<<<<<< HEAD
=======
  mixins: [loading],
>>>>>>> feature/front/login
};
</script>
<style lang=""></style>
