import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuejquery from 'vue-jquery'
Vue.use(vuejquery)
window.$ = window.jQuery = require('jquery')
window.toastr = require("toastr")
require("bootstrap")
import './assets/scss/app.scss'
Vue.config.productionTip = false
window.Vue = require('vue');


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
