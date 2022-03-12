<template lang="">
<div>
</div>
</template>
<script>
export default {
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      this.axios
        .post(`${process.env.VUE_APP_API}/logout`)
        .then(() => {
          // 跳頁到登入頁面
          this.$router.push('/front/login');
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
};
</script>
<style lang=""></style>
