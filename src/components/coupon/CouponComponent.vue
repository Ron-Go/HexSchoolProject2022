<template lang="">
<div class="container position-relative" style="height:100vh">
  <div class="row" ref="couponDom">
    <div class="col-12">
      <div class="text-end my-3">
        <button type="button" class="btn btn-primary" @click="addCoupon">建立新優惠券</button>
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
            <td>{{ item.due_date }}</td>
            <td
            :class="{
              'text-success':item.is_enabled,
              'text-danger':!item.is_enabled,
              }"
            >{{`${item.is_enabled ? '啟用' : '未啟用'}`}}</td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
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
<!-- statusModal -->
<statusModal
ref="statusModal"
></statusModal>
</template>

<script>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import couponModal from './CouponModalComponent.vue';
import statusModal from '../statusModalComponent.vue';
import pagination from '../PaginationComponent.vue';

export default {
  components: {
    couponModal,
    pagination,
    statusModal,
  },
  data() {
    return {
      tempCoupons: {},
      coupon: {},
      pagination: {},
      couponMode: 0,
      couponModal: {},
      statusModal: {},
    };
  },
  mounted() {
    this.couponModal = new Modal(document.querySelector('#couponModal'));
    this.statusModal = new Modal(document.querySelector('#statusModal'));
    this.getData();
  },
  methods: {
    getData(page = 1) {
      this.onLoading();
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`)
        .then((res) => {
          this.tempCoupons = res.data.coupons;
          this.pagination = res.data.pagination;
          this.convertDate();
          this.offLoading();
        })
        .catch(() => {
          this.offLoading();
        });
    },
    // 轉換時間
    // 把tempOrders內物件的create_at屬性轉換yyyy-mm-dd後回傳
    convertDate() {
      this.tempCoupons.forEach((value, index) => {
        // Unix時間，單位/秒 => 單位/毫秒
        const date = new Date(value.due_date * 1000).toISOString().split('T');
        [this.tempCoupons[index].due_date] = date;
      });
    },
    // 新增優惠券
    addCoupon() {
      this.couponMode = 1;
      this.coupon = {};
      this.couponModal.show();
    },
    // 編輯優惠券
    modifyCoupon(item) {
      this.couponMode = 2;
      const tempItem = { ...item };
      tempItem.due_date = Math.floor(new Date(tempItem.due_date) / 1000);
      this.coupon = tempItem;
      this.couponModal.show();
    },
    deleteCoupon(item) {
      this.couponMode = 3;
      const tempItem = { ...item };
      tempItem.due_date = Math.floor(new Date(tempItem.due_date) / 1000);
      this.coupon = tempItem;
      this.couponModal.show();
    },
    confirmCoupon(coupon) {
      // 不同模式做不同的事
      if (this.couponMode === 1) {
        // 新增優惠券
        this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`, { data: coupon })
          .then((res) => {
            // 新增商品，再重新取得全部資料渲染
            this.getData();
            // couponMode回到初始狀態
            this.coupon = {};
            this.couponMode = 0;
            this.couponModal.hide();
            this.returnMessage(res.data.message, 1000);
          })
          .catch((err) => {
            console.dir(err);
            this.returnMessage(err.data.message, 1000);
          });
      } else if (this.couponMode === 2) {
        // 修改商品
        this.axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`, { data: coupon })
          .then((res) => {
            // 修改商品，再重新取得全部資料渲染
            // 修改完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
            this.coupon = {};
            // couponMode回到初始狀態
            this.couponMode = 0;
            this.couponModal.hide();
            this.returnMessage(res.data.message, 1000);
          })
          .catch((err) => {
            this.returnMessage(err.data.message, 1000);
          });
      } else if (this.couponMode === 3) {
        // 刪除商品
        this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${coupon.id}`)
          .then((res) => {
            this.couponModal.hide();
            this.returnMessage(res.data.message, 1000);
            // couponMode回到初始狀態
            this.couponMode = 0;
            // 刪除商品，再重新取得全部資料渲染
            // 刪除完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
          })
          .catch((err) => {
            this.manageModal.hide();
            this.returnMessage(err.data.message, 1000);
          });
      }
    },
    cancel() {
      // 清空coupon
      this.coupon = {};
      // couponMode回初始狀態
      this.couponMode = 0;
    },
    // 開始vue-loading
    onLoading() {
      this.loader = this.$loading.show({
        // Optional parameters
        // 若loading圖示只在某元素內出現，isFullPage: false
        isFullPage: false,
        // isFullPage = false，所以container: this.$refs DOM元素
        container: this.$refs.couponDom,
        canCancel: false,
        onCancel: this.onCancel,
        loader: 'dots',
        width: 64,
        height: 64,
        backgroundColor: '#ffffff',
        opacity: 0.5,
      });
    },
    // 結束vue-loading
    offLoading() {
      setTimeout(() => {
        this.loader.hide();
      }, 0);
    },
    // 訊息互動視窗
    returnMessage(text, time = 2000) {
      setTimeout(() => {
        this.$refs.statusModal.textContent = text;
        this.statusModal.show();
      }, time);
    },
  },
};
</script>
<style lang=""></style>
