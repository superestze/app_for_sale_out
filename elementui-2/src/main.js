import Vue from 'vue'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import store from './store/store.js'

Vue.use(ElementUI)

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
