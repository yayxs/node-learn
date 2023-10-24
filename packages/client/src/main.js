import Vue from 'vue';
import axios from './http';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.prototype.$http = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
