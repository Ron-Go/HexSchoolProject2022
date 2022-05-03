<template lang="">
  <div class="container position-relative" style="height:100vh">
    <div class="row" ref="orderDom">
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
                <span :class="{'text-success':item.is_paid}">{{ `${item.is_paid ? '已付款' : '未付款'}` }}</span>
              </td>
              <!-- 編輯 -->
              <td>
                <div class="btn-group">
                  <button type="button"
                    class="btn btn-outline-primary btn-sm"
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
  <!-- statusModal -->
  <statusModal
  ref="statusModal"
  ></statusModal>
</template>
<script>
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import orderModal from './OrderModalComponent.vue';
import statusModal from '../statusModalComponent.vue';
import pagination from '../PaginationComponent.vue';

export default {
  components: {
    orderModal,
    statusModal,
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
    this.statusModal = new Modal(document.querySelector('#statusModal'));
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
      this.onLoading();
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          // 取得api商品資料，存放tempProducts，準備渲染畫面
          this.tempOrders = res.data.orders;
          // 取得分頁資訊，存放pagination
          this.pagination = res.data.pagination;
          // this.convertDate();
          this.offLoading();
        })
        .catch((err) => {
          this.returnMessage(err.response.data.message, 1000);
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
          this.returnMessage(res.data.message, 1000);
        })
        .catch((err) => {
          console.dir(err);
          this.returnMessage(err.data.message, 1000);
        });
    },
    deleteConfirm(order) {
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`)
        .then((res) => {
          console.dir(res);
          this.getData();
          this.orderModal.hide();
          this.returnMessage(res.data.message, 1000);
        })
        .catch((err) => {
          console.dir(err);
          this.returnMessage(err.data.message, 1000);
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
    // 開始vue-loading
    onLoading() {
      this.loader = this.$loading.show({
        // Optional parameters
        // 若loading圖示只在某元素內出現，isFullPage: false
        isFullPage: false,
        // isFullPage = false，所以container: this.$refs DOM元素
        container: this.$refs.orderDom,
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
