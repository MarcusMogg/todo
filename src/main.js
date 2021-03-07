import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import Bus from '@/plugins/bus.js'
Vue.use(Bus)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
