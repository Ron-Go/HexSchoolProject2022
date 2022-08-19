<template lang="">
  <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"
            :class="{
              'text-success': !is_delete,
              'text-danger': is_delete,
            }"
            id="exampleModalLabel">
            <span v-if="!is_delete">訂單細節</span>
            <span v-else>刪除訂單</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div v-if="!is_delete">
          <div class="modal-body">
            <div v-if="tempOrder.user" class="container">
              <div class="row">
                <div class="col-6">
                  <h5>用戶資料</h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th style="width: 100px">姓名</th>
                        <td>{{ tempOrder.user.name }}</td>
                      </tr>
                      <tr>
                        <th>E-mail</th>
                        <td>{{ tempOrder.user.email }}</td>
                      </tr>
                      <tr>
                        <th>電話</th>
                        <td>{{ tempOrder.user.tel }}</td>
                      </tr>
                      <tr>
                        <th>地址</th>
                        <td>{{ tempOrder.user.address }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-6">
                  <h5>訂單細節</h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th style="width: 100px">訂單編號</th>
                        <td>{{ tempOrder.id }}</td>
                      </tr>
                      <tr>
                        <th>下單時間</th>
                        <td>{{ tempOrder.create_at }}</td>
                      </tr>
                      <tr>
                        <th>付款狀態</th>
                        <td
                          class="fw-bold"
                          :class="{
                            'text-success': tempOrder.is_paid,
                            'text-danger': !tempOrder.is_paid
                            }">{{`${tempOrder.is_paid ? '已付款':'尚未付款'}`}}</td>
                      </tr>
                      <tr>
                        <th>付款時間</th>
                        <td class="fw-bold">
                          <span v-if="tempOrder.paid_date" class="text-success">{{ tempOrder.paid_date }}</span>
                          <span v-else class="text-danger">時間不明</span>
                        </td>
                      </tr>
                      <tr>
                        <th>總金額</th>
                        <td class="text-success fw-bold">${{ tempOrder.total }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>選購商品</h5>
                  <div
                    v-for="(item, key) in tempOrder.products" :key="'product' + key"
                    class="card w-75 mb-3">
                    <div class="card-body">
                      <h5 class="card-title">{{ item.product.title }}</h5>
                      <p class="card-text">
                        單價：<span class="pe-3">${{ `${item.product.price}` }}</span>
                        數量：<span class="pe-3">{{`${item.qty}${item.product.unit}`}}</span>
                        總價：<span class="text-danger fw-bold">${{ `${item.total}` }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <p class="pe-3">變更付款狀態</p>
                    <div class="form-check form-switch">
                      <label class="form-check-label" :for="tempOrder.id">
                      <input class="form-check-input" type="checkbox" :id="tempOrder.id"
                      v-model="tempOrder.is_paid"
                      />
                      <span class="fw-bold"
                        :class="{'text-success':tempOrder.is_paid}">
                        {{ `${tempOrder.is_paid ? '已付款' : '未付款'}` }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('getData')"
              >取消</button>
            <button
            type="button"
            class="btn btn-primary"
            @click="$emit('updataPaid', tempOrder)">變更付款狀態</button>
          </div>
        </div>
        <!-- 刪除訂單 -->
        <div v-else>
          <div class="modal-body">
            <h4 class="text-danger text-center">確認刪除此訂單</h4>
            <table class="table">
              <tbody>
                <tr>
                  <th style="width: 100px">姓名</th>
                  <td>{{ tempOrder.user.name }}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>{{ tempOrder.user.email }}</td>
                </tr>
                <tr>
                  <th>電話</th>
                  <td>{{ tempOrder.user.tel }}</td>
                </tr>
                <tr>
                  <th>地址</th>
                  <td>{{ tempOrder.user.address }}</td>
                </tr>
                <tr>
                  <th style="width: 100px">訂單編號</th>
                  <td>{{ tempOrder.id }}</td>
                </tr>
                <tr>
                  <th>下單時間</th>
                  <td>{{ tempOrder.create_at }}</td>
                </tr>
                <tr>
                  <th>付款狀態</th>
                  <td
                    class="fw-bold"
                    :class="{
                      'text-success': tempOrder.is_paid,
                      'text-danger': !tempOrder.is_paid
                      }">{{`${tempOrder.is_paid ? '已付款':'尚未付款'}`}}</td>
                </tr>
                <tr>
                  <th>總金額</th>
                  <td class="text-success fw-bold">${{ tempOrder.total }}</td>
                </tr>
              </tbody>
            </table>
            <h5>選購商品</h5>
              <div
                v-for="(item, key) in tempOrder.products" :key="'product' + key"
                class="card w-75 mb-3">
                <div class="card-body">
                  <h5 class="card-title">{{ item.product.title }}</h5>
                  <p class="card-text">
                    單價：<span class="pe-3">${{ `${item.product.price}` }}</span>
                    數量：<span class="pe-3">{{`${item.qty}${item.product.unit}`}}</span>
                    總價：<span class="text-danger fw-bold">${{ `${item.total}` }}</span>
                  </p>
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('getData')"
              >取消</button>
            <button
            type="button"
            class="btn btn-primary"
            @click="$emit('deleteOrder', tempOrder)">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['order', 'is_delete'],
  data() {
    return {
      tempOrder: {},
    };
  },
  mounted() {},
  watch: {
    order() {
      this.tempOrder = { ...this.order };
    },
  },
};
</script>
<style lang=""></style>
