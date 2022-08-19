<template lang="">
  <div class="modal fade" id="couponModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    @click="$emit('cancel')"
    @keyup.esc="$emit('cancel')">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
          class="modal-title"
          :class="{
            'text-primary': couponMode == 1,
            'text-success': couponMode == 2,
            'text-danger': couponMode == 3,
          }"
          id="exampleModalLabel">
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
              <!-- 新增/修改優惠券 -->
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
                    <input type="date" class="form-control" id="due_date" v-model="temp_due_date"
                    />
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
              <!-- 刪除優惠券 -->
              <div v-else-if="couponMode == 3">
                <h5>確認刪除此折扣碼：
                  <span class="text-danger">{{ tempCoupon.title }}</span> </h5>
                  <table class="table">
                    <tbody>
                      <tr>
                        <th>到期日</th>
                        <td>{{ convertDate }}</td>
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
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          @click.prevent="$emit('cancel')">Close</button>
          <button type="button"
          class="btn text-white"
          :class="{
            'btn-primary': couponMode == 1,
            'btn-success': couponMode == 2,
            'btn-danger': couponMode == 3,
          }"
          @click="$emit('confirm', tempCoupon)">
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
      temp_due_date: '',
    };
  },
  mounted() {
  },
  watch: {
    // 監聽外層props傳入的coupon
    coupon() {
      this.tempCoupon = { ...this.coupon };
      // 當couponMode ===1 或 0，this.temp_due_date傳入空字串
      // 否則this.temp_due_date傳入日期格式yyyy-mm-dd
      if (this.couponMode === 1 || this.couponMode === 0) {
        this.temp_due_date = '';
      } else {
        [this.temp_due_date] = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      }
    },
    couponMode() {
      // if (this.couponMode === 1) {
      //   this.tempCoupon.is_enabled = 0;
      // }
      this.tempCoupon.is_enabled = this.couponMode === 1 ? 0 : 0;
    },
    // 監聽temp_due_date，把到期日的設定yyyy-mm-dd，轉換成unixCode(十位數)存入tempCoupon.due_date
    temp_due_date() {
      this.tempCoupon.due_date = new Date(this.temp_due_date).getTime() / 1000;
    },
  },
  computed: {
    // // 監聽tempCoupon.due_date，把unix code轉成日期格式後回傳
    convertDate() {
      // 轉換後的時間格式為['YYYY-MM-DD' , '00:00:00.000Z']
      const date = new Date(this.tempCoupon.due_date * 1000).toISOString().split('T');
      return date[0];
    },
  },
  methods: {
  },
};
</script>
<style lang=""></style>
