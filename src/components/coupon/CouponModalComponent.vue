<template lang="">
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="couponMode == 1">新增</span>
            <span v-else-if="couponMode == 2">編輯</span>
            <span v-else-if="couponMode == 3">刪除</span>優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div v-if="couponMode == 1 || couponMode == 2">
                <div class="mb-3">
                  <label for="title" class="w-100"
                    >折扣碼標題
                    <input type="text" class="form-control" id="title" v-model="tempCoupon.title" placeholder="請輸入coupon標題" />
                  </label>
                </div>
                <div class="mb-3">
                  <label for="couponCode" class="w-100"
                    >優惠碼
                    <input type="text" class="form-control" id="couponCode" v-model="tempCoupon.code" placeholder="請輸入coupon優惠碼" />
                  </label>
                </div>
                <div class="mb-3">
                  <label for="due_date" class="w-100"
                    >到期日
                    <input type="date" class="form-control" id="due_date" v-model="due_date" @change="changeDate" />
                  </label>
                </div>
                <div class="mb-3">
                  <label for="percent" class="w-100"
                    >折扣百分比
                    <input type="number" class="form-control" id="percent" v-model.number="tempCoupon.percent" min="0"/>
                  </label>
                </div>
                <div class="mb-3">
                  <div class="form-check form-switch">
                    <label class="form-check-label" for="enabled">
                      <input class="form-check-input"
                      type="checkbox" id="enabled"
                      :true-value="1" :false-value="0"
                      v-model="tempCoupon.is_enabled"/>
                      <span class="fw-bold"
                      :class="{ 'text-success': tempCoupon.is_enabled }">
                      {{ `${tempCoupon.is_enabled ? '已啟用' : '未啟用'}` }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div v-else-if="couponMode == 3">
                <h5>確認刪除此折扣碼：
                  <span class="text-danger">{{ tempCoupon.title }}</span> </h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>到期日</th>
                        <td>{{ due_date }}</td>
                      </tr>
                      <tr>
                        <th>折扣百分比</th>
                        <td>{{ tempCoupon.percent }}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          @click.prevent="$emit('cancel')">Close</button>
          <button type="button" class="btn btn-primary" @click="$emit('confirm', tempCoupon)">
            <span v-if="couponMode == 1">新增</span>
            <span v-else-if="couponMode == 2">編輯</span>
            <span v-else-if="couponMode == 3">刪除</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['coupon', 'couponMode'],
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  mounted() {
  },
  watch: {
    coupon() {
      this.tempCoupon = { ...this.coupon };
      // 轉換後的時間格式為['YYYY-MM-DD' , '00:00:00.000Z']
      const timeStamp = this.tempCoupon.due_date === undefined ? '' : new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      [this.due_date] = timeStamp;
    },
    couponMode() {
      if (this.couponMode === 1) {
        this.tempCoupon.is_enabled = 0;
      }
    },
    // 監聽輸入欄變更到期日的時候，觸發函式把日期字串'yyyy-mm-dd'轉成unix碼
    // due_date() {
    //   const timeStamp = Math.floor(new Date(this.due_date) / 1000);
    //   this.tempCoupon.due_date = timeStamp;
    // },
  },
  methods: {
    changeDate() {
      console.log(this.due_date);
      const timeStamp = Math.floor(new Date(this.due_date) / 1000);
      this.tempCoupon.due_date = timeStamp;
    },
  },
};
</script>
<style lang=""></style>
