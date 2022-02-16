import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';





Vue.config.productionTip = false
window.Vue = Vue; // 挂载Vue到window, 给工具使用
window.ELEMENT = ElementUI; // 挂载ElementUI到window， 给工具使用
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
