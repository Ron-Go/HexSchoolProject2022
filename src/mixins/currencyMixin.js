export default {
  methods: {
  // 轉換貨幣
    currency(num) {
      const n = parseInt(num, 10);
      return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
    },
  },
};