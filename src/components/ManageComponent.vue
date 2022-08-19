<template lang="">
<div class="container position-relative" >
  <Loading
    :active="isLoading"
    :loader="loader"
    :is-full-page="fullPage"
    :color="color"
  ></Loading>
  <div v-if="!tempProducts.length" style="height:80vh"></div>
  <div v-else class="row">
      <div class="col-12 d-flex justify-content-end my-3">
          <button type="button" class="btn btn-primary text-white" onclick="" @click="addProduct">建立新產品</button>
      </div>
      <!-- 產品清單 -->
      <div class="col-12">
          <table class="table table-hover">
              <thead>
                  <tr>
                      <th>分類</th>
                      <th>產品名稱</th>
                      <th>星級評等</th>
                      <th>原價</th>
                      <th>售價</th>
                      <th>是否啟用</th>
                      <th width="120px">管理</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(product , key) in tempProducts" :key="'key' + key">
                      <td>{{ product.category }}</td>
                      <td>{{ product.title }}</td>
                      <td>
                        <template
                          v-for="(star , key) in tempProducts[key].rating"
                          :key="'star' + key">
                            <span class="text-warning">&star;</span>
                        </template>
                      </td>
                      <td class="text-right">{{ product.origin_price}}</td>
                      <td class="text-right">{{ product.price }}</td>
                      <td :class="{'text-success': product.is_enabled == true}" class="fw-bold">
                          {{`${ product.is_enabled == 1 ? '啟用' : '不啟用'}`}}
                      </td>
                      <td class="btn-group">
                        <button
                          type="button"
                          class="btn btn-outline-success btn-sm"
                          @click="modifyProduct(product)">編輯</button>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="deleteProduct(product)">刪除</button>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
  <!-- 分頁 -->
  <pagination
    :pagination="pagination"
    @send-page="getData"
  ></pagination>
</div>
  <!-- toastsMessage -->
  <toastMessage></toastMessage>
  <!-- 管理互動視窗 -->
  <manageModal
    ref="manageModal"
    :manageMode="manageMode"
    :manageProduct="manageProduct"
    @confirm-manage="confirmManage"
    @cancel-manage="cancelManage"
  ></manageModal>
</template>

<script>
// 重新指定bootstrap Modal變數
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
// 引入manageModal元件
import manageModal from '@/components/ManageModalComponent.vue';
// 引入pagination元件
import pagination from '@/components/PaginationComponent.vue';
// 引入toastMessage元件
import toastMessage from '@/components/ToastsMessage.vue';
// vue-loading-overlay 作為元件引入
import LoadingComponent from '@/mixins/LoadingComponentMixin';

export default {
  data() {
    return {
      tempProducts: {},
      // localProduct加上屬性imagesUrl，新增產品才有增加副圖功能
      manageProduct: { imagesUrl: [] },
      // 0.初始狀態、1.新增商品、2.編輯商品、3.刪除商品
      manageMode: 0,
      pagination: {},
      // 賦予互動視窗manageModal實體
      manageModal: {},
      // 賦予互動視窗statusModal實體
      statusModal: {},
    };
  },
  components: {
    manageModal,
    pagination,
    toastMessage,
  },
  mounted() {
    this.manageModal = new Modal(document.querySelector('#myModal'));
    this.getData();
  },
  methods: {
    // 取得商品資料
    getData(page = 1) {
      this.isLoading = true;
      // 用query的方式，代出商品資料
      // /?page=${ 頁數 }
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`)
        .then((res) => {
          // 取得api商品資料，存放tempProducts，準備渲染畫面
          this.tempProducts = res.data.products;
          // 取得分頁資訊，存放pagination
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch(() => {
        });
    },
    // 新增產品
    addProduct() {
      this.manageModal.show();
      this.manageMode = 1;
    },
    // 編輯商品
    // 按下編輯button
    // 1.把v-for渲染的item代入參數，賦予給manageProduct
    // 2.manageMode = 2，編輯狀態
    modifyProduct(item) {
      this.manageModal.show();
      this.manageMode = 2;
      // 深層複製
      this.manageProduct = JSON.parse(JSON.stringify(item));
    },
    // 刪除商品
    // 點擊刪除，商品資料帶入參數
    // manageMode = 3，刪除狀態
    deleteProduct(item) {
      this.manageModal.show();
      this.manageMode = 3;
      // 把商品資料代入manageProduct
      // 1.刪除產品時，能取得商品名稱，呈現在畫面
      // 2.取得id刪除資料用
      this.manageProduct = { ...item };
    },
    // 新增/編輯/刪除產品=>送出
    // 參數product從子元件傳入
    confirmManage(product) {
      // 不同模式做不同的事
      if (this.manageMode === 1) {
        // 新增商品
        this.axios.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, { data: product })
          .then((res) => {
            // 新增商品，再重新取得全部資料渲染
            this.getData();
            // 修改完再清空manageProduct
            this.manageProduct = {};
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            this.$httpToastMessage(res, '新增商品');
          })
          .catch((err) => {
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            this.$httpToastMessage(err.response, '新增商品');
          });
      } else if (this.manageMode === 2) {
        // 修改商品
        this.axios.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`, { data: product })
          .then((res) => {
            // 修改商品，再重新取得全部資料渲染
            // 修改完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
            // 修改完再清空manageProduct
            this.manageProduct = {};
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            setTimeout(() => {
              this.$httpToastMessage(res, '修改商品');
            }, 1000);
          })
          .catch((err) => {
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            this.$httpToastMessage(err.response, '修改商品');
          });
      } else if (this.manageMode === 3) {
        // 刪除商品
        this.axios.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${product.id}`)
          .then((res) => {
            // 刪除完再清空manageProduct
            this.manageProduct = {};
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            // 刪除商品，再重新取得全部資料渲染
            // 刪除完商品，getData()不使用參數預設值，代入當前頁數，避免跳回第一頁
            this.getData(this.pagination.current_page);
            this.$httpToastMessage(res, '刪除商品');
          })
          .catch((err) => {
            // manageMode回到初始狀態
            this.manageMode = 0;
            this.manageModal.hide();
            this.$httpToastMessage(err.response, '刪除商品');
          });
      }
    },
    // 取消新增、編輯、刪除、dismiss
    cancelManage() {
      // 清空manageProduct
      this.manageProduct = { imagesUrl: [] };
      // manageMode回初始狀態
      this.manageMode = 0;
    },
  },
  mixins: [LoadingComponent],
};
</script>
<style lang="">
</style>
