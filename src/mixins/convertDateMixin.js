export default {
  methods: {
    // unix code轉換時間
    convertDate(unix) {
      const date = new Date(unix * 1000);
      return `${date.getFullYear()}/${(this.repairZoro(date.getMonth() + 1))}/${this.repairZoro(date.getDate())} ${this.repairZoro(date.getHours())}:${this.repairZoro(date.getMinutes())}:${this.repairZoro(date.getSeconds())}`;
    },
    // 月,日,時,分,秒的數值小於10，前面補零
    repairZoro(num) {
      return num < 10 ? `0${num}` : num;
    },
  },
};
