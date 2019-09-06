import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import IonicVue from '@ionic/vue'
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(IonicVue, moment)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
