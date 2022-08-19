import { Offcanvas } from 'bootstrap/dist/js/bootstrap.bundle';

export default {
  mounted() {
    // 購物車
    this.cartOffcanvas = new Offcanvas(document.getElementById('offcanvasCart'));
    // 我的最愛
    this.favoriteOffcanvas = new Offcanvas(document.getElementById('offcanvasFavorite'));
  },
  methods: {
    showOffcanvas() {
      this.cartOffcanvas.show();
    },
    hideOffcanvas() {
      this.cartOffcanvas.hide();
    },
    showFavorite() {
      this.favoriteOffcanvas.show();
    },
    hideFavorite() {
      this.favoriteOffcanvas.hide();
    },
  },
};
