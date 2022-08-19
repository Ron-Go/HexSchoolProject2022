<template lang="">
  <div class="container position-relative" style="height:100vh">
    <Loading
    :active="isLoading"
    :loader="loader"
    :is-full-page="fullPage"
    :color="color"
    ></Loading>
    <div v-if="!tempOrders.length" style="height:80vh"></div>
    <div v-else class="row">
      <div class="col-12">
        <table class="table table-hover mt-5">
          <thead>
            <tr>
              <th>下單時間</th>
              <th>Email</th>
              <th>購買內容</th>
              <th>應付金額</th>
              <th>付款狀態</th>
              <th>訂單管理</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in tempOrders" :key="'item' + key">
              <td>{{ convertUnix(item.create_at) }}</td>
              <td>{{ item.user.email }}</td>
              <td>
                <ul class="list-unstyled" v-for="(item, key) in item.products" :key="'list' + key">
                  <li>{{ item.product.title }} / 數量：{{ item.qty }}{{ item.product.unit }}</li>
                </ul>
              </td>
              <td>{{ item.total }}</td>
              <!-- 是否付款 -->
              <td>
                <span
                  :class="{
                    'text-success':item.is_paid,
                    'text-danger': !item.is_paid,
                    'fw-bold': !item.is_paid,
                  }"
                >{{ `${item.is_paid ? '已付款' : '未付款'}` }}</span>
              </td>
              <!-- 編輯 -->
              <td>
                <div class="btn-group">
                  <button type="button"
                    class="btn btn-outline-success btn-sm"
                    @click="checkOrder(item)"
                    >檢視</button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteOrder(item)">刪除</button>
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
  <!-- orderModal -->
  <orderModal
    :order="order"
    :is_delete="is_delete"
    @getData="getData"
    @updataPaid="updataPaid"
    @deleteOrder="deleteConfirm"
  ></orderModal>
  <!-- toastMessage -->
  <toastMessage></toastMessage>
</template>
<script>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import toastMessage from '@/components/ToastsMessage.vue';
import LoadingComponent from '@/mixins/LoadingComponentMixin';
import orderModal from './OrderModalComponent.vue';
import pagination from '../PaginationComponent.vue';

export default {
  components: {
    toastMessage,
    orderModal,
    pagination,
  },
  data() {
    return {
      is_delete: false,
      tempOrders: {},
      order: {},
      pagination: {},
      orderModal: {},
      statusModal: {},
    };
  },
  mounted() {
    this.orderModal = new Modal(document.querySelector('#orderModal'));
    this.getData();
  },
  computed: {
    // 轉換時間
    // 把tempOrders內物件的create_at屬性轉換日期後回傳
    convertUnix() {
      return (unix) => {
        const date = new Date(unix * 1000);
        return `${date.getFullYear()}/${(this.repairZoro(date.getMonth() + 1))}/${this.repairZoro(date.getDate())} ${this.repairZoro(date.getHours())}:${this.repairZoro(date.getMinutes())}:${this.repairZoro(date.getSeconds())}`;
      };
    },
  },
  methods: {
    // 取得訂單資料
    getData(page = 1) {
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          // 取得api商品資料，存放tempProducts，準備渲染畫面
          this.tempOrders = res.data.orders;
          // 取得分頁資訊，存放pagination
          this.pagination = res.data.pagination;
          // this.convertDate();
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpToastMessage(err.response, '取得訂單');
        });
    },
    // 月,日,時,分,秒的數值小於10，前面補零
    repairZoro(num) {
      return num < 10 ? `0${num}` : num;
    },
    // 更新付款資訊
    updataPaid(order) {
      const paid = {
        is_paid: order.is_paid,
      };
      this.axios
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`, { data: paid })
        .then((res) => {
          console.dir(res);
          this.getData();
          this.orderModal.hide();
          this.$httpToastMessage(res, '更新訂單');
        })
        .catch((err) => {
          this.orderModal.hide();
          this.$httpToastMessage(err.response, '更新訂單');
        });
    },
    // 確認刪除
    deleteConfirm(order) {
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/${order.id}`)
        .then((res) => {
          this.getData();
          this.orderModal.hide();
          this.$httpToastMessage(res, '刪除訂單');
        })
        .catch((err) => {
          this.orderModal.hide();
          this.$httpToastMessage(err.response, '刪除訂單');
        });
    },
    // 檢視訂單
    checkOrder(order) {
      this.is_delete = false;
      this.order = order;
      this.orderModal.show();
    },
    // 刪除訂單
    deleteOrder(order) {
      this.is_delete = true;
      this.order = order;
      this.orderModal.show();
    },
  },
  mixins: [LoadingComponent],
};
</script>
<style lang=""></style>
