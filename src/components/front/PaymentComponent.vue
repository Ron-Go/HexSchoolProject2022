<template lang="">
  <div class="container" style="padding-top:56px;">
    <div class="row d-flex justify-content-center">
      <div class="col-12 col-sm-6 mt-5">
        <!-- 進度條 -->
        <progress-bar :progress="progress"></progress-bar>
      </div>
    </div>
    <div class="row d-flex justify-content-center my-5">
      <h4 class="text-center">訂單已建立成功</h4>
      <div class="col-12 col-sm-6 position-relative mt-5">
        <Loading
        :active="isLoading"
        :loader="loader"
        :is-full-page="fullPage"
        :color="color"></Loading>
        <table class="table">
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
          </tbody>
        </table>
        <button type="button" v-if="!order.is_paid" class="btn btn-primary btn-lg text-white w-100 mt-5" @click="toPaymentFinish">前往付款</button>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingPlugin from '@/mixins/LoadingComponentMixin';
import progressBar from '@/components/front/ProgressBar.vue';
import convertDate from '@/mixins/convertDateMixin';

export default {
  props: ['orderId'],
  components: {
    progressBar,
  },
  data() {
    return {
      // 進度條
      progress: {
        step: 1,
        percent: '0%',
      },
      order: {},
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    // 根據id取得訂單資料
    getOrder() {
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order/${this.orderId}`)
        .then((res) => {
          this.order = res.data.order;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    toPaymentFinish() {
      this.$router.push(`/front/finish/${this.orderId}`);
    },
  },
  mixins: [convertDate, LoadingPlugin],
};
</script>
<style lang=""></style>
