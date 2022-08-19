<template lang="">
  <!-- <router-view></router-view> -->
  <div class="container" style="padding-top:56px" id="order">
    <div class="row d-flex justify-content-center">
      <div class="col-10 col-md-6 mt-5">
        <!-- 進度條 -->
        <progress-bar :progress="progress"></progress-bar>
      </div>
    </div>
    <div class="row d-flex flex-column align-items-center mb-5">
      <h4 class="text-center my-5">{{ dataConfirm ? '確認訂單資料' : '輸入訂單資料'}}</h4>
      <div class="col-md-6 mb-5">
        <h5 class="mb-3">訂單明細</h5>
        <div class="border border-secondary p-3 pb-0">
          <div v-for="(item, key) in cart.products" :key="'item' + key"
            class="bg-light p-2 mb-3">
            <div>
              <p>{{ item.product.title }}</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="d-block mb-0">數量：{{ item.qty }}</p>
              <p class="d-block mb-0">總價：{{`$${currency(item.final_total)}`}}</p>
            </div>
          </div>
          <table class="table">
            <tbody>
              <tr>
                <th>小計</th>
                <td class="text-end">{{`$${currency(cart.total)}`}}</td>
              </tr>
              <tr>
                <th>折扣</th>
                <td class="text-success fw-bold text-end">{{`$${currency(cart.total - cart.finalTotal)}`}}</td>
              </tr>
              <tr>
                <th>總價</th>
                <td class="text-danger fw-bold text-end">{{`$${cart.finalTotal}`}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="!dataConfirm" class="col-12 col-md-6">
        <h5 class="mb-3">收件人資料</h5>
        <v-form v-slot="{ errors }" ref="formDom" @submit="onCheckOrder">
          <!-- name -->
          <div class="row">
            <div class="col-6 mb-3">
              <label for="name" class="form-label">姓名</label>
              <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名" rules="required" v-model="orderData.user.name"></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>
            <div class="col-6 mb-3">
              <label for="tel" class="form-label">電話</label>
              <v-field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" :rules="isPhone" v-model="orderData.user.tel"></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>
          </div>
          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label">電子郵件</label>
            <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"
              rules="email|required" placeholder="請輸入 Email" v-model.trim="orderData.user.email"></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <!-- address -->
          <div class="mb-3">
            <label for="address" class="form-label">地址</label>
            <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址" rules="required" v-model="orderData.user.address"></v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>
          <!-- remark -->
          <div class="mb-3">
            <label for="remark" class="form-label">備註</label>
            <textarea class="form-control" name="remark" id="remark" cols="30" rows="5" v-model="orderData.message"></textarea>
          </div>
          <div class="mb-3 text-center">
            <button type="submit" class="btn btn-primary btn-lg text-white w-100 w-md-25">下一步</button>
          </div>
        </v-form>
      </div>
      <div v-else class="col-12 col-md-6 position-relative">
        <Loading
        :active="isLoading"
        :loader="loader"
        :is-full-page="fullPage"
        :color="color"></Loading>
        <h5 class="mb-3">收件人資料</h5>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th class="py-3">姓名：</th>
              <td class="py-3">{{ orderData.user.name }}</td>
            </tr>
            <tr>
              <th class="py-3">電話：</th>
              <td class="py-3">{{ orderData.user.tel }}</td>
            </tr>
            <tr>
              <th class="py-3">電子郵件：</th>
              <td class="py-3">{{ orderData.user.email }}</td>
            </tr>
            <tr>
              <th class="py-3">地址：</th>
              <td class="py-3">{{ orderData.user.address }}</td>
            </tr>
            <tr>
              <th class="py-3">備註：</th>
              <td class="py-3">{{ orderData.message }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mb-3 d-flex justify-content-between">
          <button type="button" class="btn btn-primary btn-lg text-white w-25" @click="dataConfirm = !dataConfirm">上一步</button>
          <button type="button" class="btn btn-primary btn-lg text-white w-25" @click="SendData">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/utils/emitter';
import LoadingPlugin from '@/mixins/LoadingComponentMixin';
import currencyMixin from '@/mixins/currencyMixin';
import progressBar from '@/components/front/ProgressBar.vue';

export default {
  data() {
    return {
      // 進度條
      progress: {
        step: 1,
        percent: '0%',
      },
      cart: {},
      // 訂單資訊
      orderData: {
        user: {},
      },
      // 訂單ID
      orderId: '',
      dataConfirm: false,
    };
  },
  components: {
    progressBar,
  },
  mounted() {
    // 監聽get-cartToOrder事件，從offcanvas取得購物車資料
    emitter.on('cart-to-order', (item) => {
      this.cart = item;
    });
  },
  methods: {
    // veeValidate rules規範
    isPhone(value) {
      const phoneNumber = /^(0)[0-9]{9}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    // 確認訂單資料
    onCheckOrder() {
      this.dataConfirm = !this.dataConfirm;
      this.$router.push('/front/order');
    },
    // 送出訂單資料
    SendData() {
      this.isLoading = true;
      this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: this.orderData })
        .then((res) => {
          console.dir(res.data.orderId);
          this.isLoading = false;
          // 送出submit成功，清除orderData.user資料
          this.orderData.user = {};
          // 發送send-orderToCart事件，到offcanvasCart，更新購物車商品數量
          emitter.emit('send-orderToCart');
          // 前往付款頁面
          this.$router.push(`payment/${res.data.orderId}`);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  unmounted() {
    emitter.off('get-cartToOrder');
  },
  mixins: [currencyMixin, LoadingPlugin],
};
</script>
<style lang=""></style>
