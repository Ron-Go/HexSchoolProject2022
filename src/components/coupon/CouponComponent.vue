<template lang="">
<div class="container position-relative">
  <Loading
    :active="isLoading"
    :loader="loader"
    :is-full-page="fullPage"
    :color="color"
  ></Loading>
  <div v-if="!tempCoupons.length" style="height:80vh"></div>
  <div v-else class="row">
    <div class="col-12">
      <div class="text-end my-3">
        <button type="button" class="btn btn-primary text-white" @click="addCoupon">建立新優惠券</button>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>優惠名稱</th>
            <th>折扣碼</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th width="120px">是否啟用</th>
            <th width="120px">優惠券管理</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in tempCoupons" :key="'item' + key">
            <td>{{ item.title }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ convertDate(item.due_date) }}</td>
            <td
            :class="{
              'text-success':item.is_enabled,
              'text-danger':!item.is_enabled,
              'fw-bold':!item.is_enabled,
              }"
            >{{`${item.is_enabled ? '啟用' : '未啟用'}`}}</td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-success btn-sm"
                  @click="modifyCoupon(item)">編輯</button>
                <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="deleteCoupon(item)">刪除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<!-- pagination -->
<pagination
:pagination="pagination"
@send-page="getData"
></pagination>
</div>
<!-- couponModal -->
<couponModal
:couponMode="couponMode"
:coupon="coupon"
@confirm="confirmCoupon"
@cancel="cancel"
></couponModal>
<!-- toastMessage -->
<toastMessage></toastMessage>
</template>

<script>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import LoadingComponent from '@/mixins/LoadingComponentMixin';
import toastMessage from '@/components/ToastsMessage.vue';
import couponModal from './CouponModalComponent.vue';
import pagination from '../PaginationComponent.vue';

export default {
  components: {
    couponModal,
    toastMessage,
    pagination,
  },
  data() {
    return {
      tempCoupons: {},
      coupon: {
        is_enabled: 0,
      },
      pagination: {},
      couponMode: 0,
      couponModal: {},
      statusModal: {},
    };
  },
  mounted() {
    this.couponModal = new Modal(document.querySelector('#couponModal'));
    this.getData();
    console.log(this.$route);
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`)
        .then((res) => {
          this.tempCoupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 轉換時間
    // 把tempOrders內物件的create_at屬性轉換yyyy-mm-dd後回傳
    convertDate(unixCode) {
      // Unix時間，單位/秒 *1000 => 單位/毫秒
      const date = new Date(unixCode * 1000).toISOString().split('T');
      return date[0];
    },
    // 新增優惠券
    addCoupon() {
      this.couponMode = 1;
      // this.coupon = {};
      this.couponModal.show();
    },
    // 編輯優惠券
    modifyCoupon(item) {
      this.couponMode = 2;
      const tempItem = { ...item };
      this.coupon = tempItem;
      this.couponModal.show();
    },
    // 刪除優惠券
    deleteCoupon(item) {
      this.couponMode = 3;
      const tempItem = { ...item };
      this.coupon = tempItem;
      this.couponModal.show();
    },
    // couponMode回到初始狀態
    initialStatus() {
      this.coupon = {};
      this.couponMode = 0;
      this.couponModal.hide();
    },
    confirmCoupon(coupon) {
      // 不同模式做不同的事
      if (this.couponMode === 1) {
        // 新增優惠券
        this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, { data: coupon })
          .then((res) => {
            // 新增商品，再重新取得全部資料渲染
            this.getData();
            this.initialStatus();
            this.$httpToastMessage(res, '新增優惠券');
          })
          .catch((err) => {
            this.initialStatus();
            this.$httpToastMessage(err.response, '新增優惠券');
          });
      } else if (this.couponMode === 2) {
        // 修改優惠券
        this.axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`, { data: coupon })
          .then((res) => {
            // 修改商品，再重新取得全部資料渲染
            // 修改完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
            this.initialStatus();
            this.$httpToastMessage(res, '修改優惠券');
          })
          .catch((err) => {
            this.initialStatus();
            this.$httpToastMessage(err, '修改優惠券');
          });
      } else if (this.couponMode === 3) {
        // 刪除商品
        this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`)
          .then((res) => {
            this.initialStatus();
            // 刪除商品，再重新取得全部資料渲染
            // 刪除完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
            this.$httpToastMessage(res, '刪除商品');
          })
          .catch((err) => {
            this.initialStatus();
            this.$httpToastMessage(err.response, '刪除商品');
          });
      }
    },
    cancel() {
      // 清空coupon
      this.coupon = {};
      // couponMode回初始狀態
      this.couponMode = 0;
    },
  },
  mixins: [LoadingComponent],
};
</script>
<style lang=""></style>
