<template lang="">
<!-- 按esc鍵關閉Modal，相同的$emit事件 -->
<div class="modal fade" tabindex="-1" id="myModal"
    data-bs-backdrop="static"
    @keyup.esc="$emit('cancel-manage')">
    <!-- 新增、修改時modal-xl，刪除時modal-sm -->
  <div class="modal-dialog modal-dialog-scrollable"
    :class="{
      'modal-xl': manageMode === 1 || manageMode === 2,
    }">
    <div class="modal-content">
      <div class="modal-header"
        :class="{
          'text-primary': manageMode === 1,
          'text-success': manageMode === 2,
          'text-danger': manageMode === 3,
        }">
        <h5 class="modal-title">
          <span v-if="manageMode == 1">建立新產品</span>
          <span v-else-if="manageMode == 2">編輯產品</span>
          <span v-else-if="manageMode == 3">刪除產品</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          @click.prevent="$emit('cancel-manage')"></button>
      </div>
      <!-- 主要內容 -->
      <div class="modal-body">
        <form action="" v-if="manageMode == 2 || manageMode == 1">
          <div class="container-fluid">
            <div class="row">
              <div class="col-5">
                <!-- 商品主圖 -->
                <div class="mb-3">
                  <img class="img-fluid d-block mb-3" :src="manageProduct.imageUrl" alt="">
                  <label for="imgUrl" class="form-label fs-5 fw-bold w-100">商品主圖網址
                    <input type="text" class="form-control" id="imgUrl" placeholder="輸入主圖網址"
                    v-model="localProduct.imageUrl">
                  </label>
                </div>
                <!-- 商品副圖 -->
                <div v-if="Array.isArray(localProduct.imagesUrl)" class="mb-3">
                  <h5>商品副圖網址</h5>
                  <template v-for="(item , key) in localProduct.imagesUrl" :key="'img' + key">
                      <img class="img-fluid" :src="localProduct.imagesUrl[key]" alt="">
                      <label class="form-label w-100" for="url">副圖網址{{`${key + 1}`}}
                        <input type="text" id="url" class="form-control mb-3"
                          v-model="localProduct.imagesUrl[key]"
                          :placeholder="`輸入副圖網址${key + 1}`">
                      </label>
                  </template>
                  <!-- localProduct.imagesUrl沒有資料
                  或者localProduct.imagesUrl當下這筆已有資料
                  才可再新增下一筆 -->
                  <button type="button"
                    v-if="!localProduct.imagesUrl.length || localProduct.imagesUrl[localProduct.imagesUrl.length - 1]" class="btn btn-primary w-100 mb-3"
                    @click="localProduct.imagesUrl.push('')">新增</button>
                  <button type="button"
                    class="btn btn-outline-danger w-100"
                    @click="localProduct.imagesUrl.pop('')">刪除最後一個</button>
                </div>
              </div>
              <div class="col-7">
                <div class="row mb-3">
                  <div class="col-9 ms-auto">
                    <label for="title" class="form-label w-100">名稱
                      <input type="text" v-model="localProduct.title" class="form-control" id="title" placeholder="輸入名稱">
                    </label>
                  </div>
                  <div class="col-3 ms-auto">
                    <label for="category" class="form-label w-100">分類
                      <select id="category" v-model="localProduct.category" class="form-select">
                        <option value="" disabled>商品分類</option>
                        <option value="成車">成車</option>
                        <option value="車架組">車架組</option>
                        <option value="輪組">輪組</option>
                        <option value="安全帽">安全帽</option>
                        <option value="車衣">車衣</option>
                      </select>
                    </label>
                  </div>
                </div>
                <!--  -->
                <div class="row mb-3">
                  <div class="col-4 mb-3">
                    <label for="origin_price" class="form-label w-100">原價
                      <input type="number" class="form-control" min="0"
                        id="origin_price" placeholder="輸入原價"
                        v-model.number="localProduct.origin_price">
                    </label>
                  </div>
                  <div class="col-4">
                    <label for="price" class="form-label w-100">價格
                      <input type="number" class="form-control" min="0" id="price" placeholder="輸入價格"
                      v-model.number="localProduct.price">
                    </label>
                  </div>
                  <div class="col-4">
                    <label for="unit" class="form-label w-100">商品單位
                      <select id="unit" v-model="localProduct.unit" class="form-select">
                        <option value="" disabled>商品單位</option>
                        <option value="個">個</option>
                        <option value="組">組</option>
                        <option value="件">件</option>
                        <option value="頂">頂</option>
                      </select>
                    </label>
                  </div>
                  <div class="col-12 mb-3">
                    <label for="content" class="form-label w-100">商品內容
                      <textarea
                        type="text"
                        class="form-control"
                        name="content"
                        id="content"
                        cols="30"
                        rows="3"
                        v-model="localProduct.content"
                        placeholder="輸入商品內容"
                      ></textarea>
                    </label>
                  </div>
                  <div class="col-12">
                    <label for="description" class="form-label w-100">商品描述
                      <textarea
                        type="text"
                        class="form-control"
                        name="description"
                        id="description"
                        cols="30"
                        rows="3"
                        v-model="localProduct.description"
                        placeholder="輸入商品描述"
                      ></textarea>
                    </label>
                  </div>
                </div>
                <!--  -->
                <div class="row">
                  <div class="col-3">
                    <!-- 評等的v-model要加.number，不然資料型別是string，v-for無法渲染到畫面 -->
                    <label for="rating" class="form-label w-100">評等
                      <select class="form-select" v-model.number="localProduct.rating"
                        name="rating" id="rating">
                        <option value="" disabled>選擇商品星級評等</option>
                        <option class="text-danger" value="1">&star;</option>
                        <option value="2">&star;&star;</option>
                        <option value="3">&star;&star;&star;</option>
                        <option value="4">&star;&star;&star;&star;</option>
                        <option value="5">&star;&star;&star;&star;&star;</option>
                      </select>
                    </label>
                  </div>
                  <div class="col-4 mt-4">
                      <label for="enable" class="form-label">是否啟用
                        <input type="checkbox" class="form-check-input" id="enable" value="1"
                        v-model="localProduct.is_enabled"
                        true-value="1" false-value="0">
                      </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <!-- 刪除畫面 -->
        <div v-else-if="manageMode === 3" class="text-center">
            <h5 class="text-danger">再次確認刪除</h5>
            <h5>{{`--${localProduct.title}--`}}</h5>
        </div>
      </div>
      <div class="modal-footer">
        <button type="submit"
          class="btn btn-outline-danger"
          @click.prevent="$emit('cancel-manage')"
          data-bs-dismiss="modal">取消
        </button>
        <button
          type="submit"
          class="btn text-white"
          :class="{
            'btn-primary': manageMode == 1,
            'btn-success': manageMode == 2,
            'btn-danger': manageMode == 3,
          }"
          @click.prevent="$emit('confirm-manage', localProduct)"
        >
          <span v-if="manageMode == 1">新增</span>
          <span v-else-if="manageMode == 2">編輯</span>
          <span v-else-if="manageMode == 3">刪除</span>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      localProduct: {},
    };
  },
  props: ['manageMode', 'manageProduct'],
  mounted() {
  },
  watch: {
    // 監聽父元件props的manageMode，有更動時更新到子元件localProduct
    manageMode() {
      this.localProduct = { ...this.manageProduct };
    },
  },
};
</script>
