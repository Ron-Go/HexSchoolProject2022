import { createApp } from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLoading from 'vue-loading-overlay';
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
// 自定義methods => pushToastMessage
import $httpToastMessage from '@/methods/pushToastMessage';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import App from './App.vue';
import router from './router';

// vee-validate/rules 裡面全局定義所有可用規則
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
app.use(VueLoading);
app.component('vForm', Form);
app.component('vField', Field);
app.component('ErrorMessage', ErrorMessage);
// pushToastMessag加入全域下，其他地方可直接使用
app.config.globalProperties.$httpToastMessage = $httpToastMessage;
app.mount('#app');
