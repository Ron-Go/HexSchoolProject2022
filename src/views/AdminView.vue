<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ManageSystem</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/manage">商品</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/order">訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupon">優惠券</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/logout">登出</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  created() {
    this.adminCheck();
  },
  methods: {
    // 確認登入狀態
    adminCheck() {
      // 取得存在cookie的token資訊
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 把token加入axios的headers授權資料
      this.axios.defaults.headers.common.Authorization = token;
      this.axios.post(`${process.env.VUE_APP_API}/api/user/check`, token)
        .then(() => {
          // 檢查登入狀態，成功的話取得商品資料
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // logout() {
    //   this.axios
    //     .post(`${process.env.VUE_APP_API}/logout`)
    //     .then(() => {
    //       // 跳頁到登入頁面
    //       this.$router.push('/front/login');
    //     })
    //     .catch((err) => {
    //       console.dir(err);
    //     });
    // },
  },
};
</script>

<style lang="">
</style>
