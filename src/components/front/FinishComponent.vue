<template lang="">
<div class="container d-flex  flex-column justify-content-center align-items-center" style="padding-top:56px;">
  <div class="col-10 col-md-7 mt-5">
    <!-- 進度條 -->
    <progress-bar :progress="progress"></progress-bar>
  </div>
  <div class="col-12 col-md-7 d-flex flex-column justify-content-center my-5">
    <div class="position-relative bg-light p-3">
      <Loading
      :active="isLoading"
      :loader="loader"
      :is-full-page="fullPage"
      :color="color"></Loading>
      <div v-if="!finishPayment && !order.is_paid">
        <h5 class="text-center mb-3">選擇付款方式</h5>
        <div class="d-flex flex-row justify-content-evenly mb-3">
          <div class="form-check">
            <input type="radio"  v-model="paymentMode" class="form-check-input me-2" id="radio01" value="creditCard">
            <label for="radio01" class="form-check-label">信用卡</label>
          </div>
          <div class="form-check">
            <input type="radio"  v-model="paymentMode" class="form-check-input me-2" id="radio02" value="paypel">
            <label for="radio02" class="form-check-label">Paypel</label>
          </div>
        </div>
        <div class="text-center">
          <button type="button" class="btn btn-primary text-white"
            :disabled="paymentMode !== 'creditCard' && paymentMode !== 'paypel'"
            @click="goPayment">付款去</button>
        </div>
      </div>
      <h5 v-else class="text-danger text-center py-1">
        <span class="d-block">您已完成付款</span>
        <span class="d-block pt-3">將盡快安排商品出貨</span>
      </h5>
    </div>
    <table class="table my-5">
      <tbody>
        <tr>
          <th class="py-3">訂單編號：</th>
          <td class="text-danger fw-bold py-3">{{ order.id }}</td>
        </tr>
        <tr>
          <th class="py-3">訂單建立時間：</th>
          <td v-if="order.create_at" class="fw-bold py-3">{{ convertDate(order.create_at) }}</td>
        </tr>
        <template v-if="order.user">
          <tr>
            <th class="py-3">收件人姓名：</th>
            <td class="py-3">{{ order.user.name }}</td>
          </tr>
          <tr>
            <th class="py-3">收件人電話：</th>
            <td class="py-3">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th class="py-3">收件人地址：</th>
            <td class="py-3">{{ order.user.address }}</td>
          </tr>
        </template>
        <tr>
          <th class="py-3">購買商品</th>
          <td>
            <div v-for="(item, key) in order.products" :key="'key' + key">
              <div class="d-flex flex-column justify-content-between p-3 bg-light mt-2">
                <h6>{{ item.product.title }}</h6>
                <div class="d-flex justify-content-between">
                  <span>{{`數量：${item.qty}`}}</span>
                  <span>{{`總價：${item.final_total}`}}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <template v-if="!finishPayment">
          <tr>
            <th class="py-3">付款總金額</th>
            <td class="py-3">{{ order.total }}</td>
          </tr>
          <tr>
            <th class="py-3">付款狀態</th>
            <td class="py-3 fw-bold"
              :class="{
                'text-success': order.is_paid,
                'text-danger': !order.is_paid,
                }">
              {{ `${order.is_paid ? '已付款' : '未付款'}` }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <router-link v-if="finishPayment" class="btn btn-primary text-white w-100 w-md-25 mx-auto" to="/">回首頁</router-link>
  </div>
</div>
</template>
<script>
import LoadingPlugin from '@/mixins/LoadingComponentMixin';
import progressBar from '@/components/front/ProgressBar.vue';
import convertDate from '@/mixins/convertDateMixin';

export default {
  data() {
    return {
      // 進度條
      progress: {
        step: 2,
        percent: '50%',
      },
      paymentMode: '',
      finishPayment: false,
      order: {},
      orderId: '',
    };
  },
  components: {
    progressBar,
  },
  mounted() {
    this.orderId = this.$route.params.id;
    this.getOrder();
  },
  methods: {
    // 付款
    goPayment() {
      this.isLoading = true;
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`)
        .then((res) => {
          this.finishPayment = res.data.success;
          this.progress.step = 3;
          this.progress.percent = '100%';
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 根據id取得訂單資料
    getOrder() {
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`)
        .then((res) => {
          this.order = res.data.order;
          // 如取得訂單資料後，資料呈現已付款，則執行goPayment
          if (this.order.is_paid) {
            this.goPayment();
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mixins: [convertDate, LoadingPlugin],
};
</script>
<style lang="">
</style>
